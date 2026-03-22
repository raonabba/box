export function parseTimeToSeconds(input) {
  if (!input) return null;
  const value = String(input).trim();
  if (/^\d+$/.test(value)) return Number(value);
  const parts = value.split(':').map(Number);
  if (parts.some(Number.isNaN)) return null;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return null;
}

export function normalizeRecordValue(recordType, input) {
  if (recordType === 'time') return parseTimeToSeconds(input);
  const numeric = Number(input);
  return Number.isNaN(numeric) ? null : numeric;
}

export function isBetterRecord(recordType, newValue, oldValue) {
  if (newValue == null || oldValue == null) return false;
  return recordType === 'time' ? newValue < oldValue : newValue > oldValue;
}

export function getBestRecord(records, memberId, wodId, recordType, officialOnly = false) {
  const filtered = records.filter((record) => record.memberId === memberId && record.wodId === wodId && (!officialOnly || record.official));
  if (!filtered.length) return null;
  return filtered.reduce((best, current) => {
    if (!best) return current;
    return isBetterRecord(recordType, current.resultValue, best.resultValue) ? current : best;
  }, null);
}

export function calculateBaseExp({ isPR, mode }) {
  let exp = 20;
  if (mode === 'RX') exp += 10;
  if (isPR) exp += 50;
  return exp;
}

export function calculateOfficialExpBonus({ isFirstOfficial }) {
  let exp = 10;
  if (isFirstOfficial) exp += 20;
  return exp;
}

export function getStatGainByWod(wod) {
  if (!wod) return { strength: 0, endurance: 0, skill: 0, speed: 0 };
  if (wod.category === 'short_metcon') return { strength: 1, endurance: 0, skill: 0, speed: 2 };
  if (wod.category === 'endurance') return { strength: 0, endurance: 2, skill: 0, speed: 1 };
  if (wod.category === 'skill') return { strength: 0, endurance: 0, skill: 2, speed: 1 };
  if (wod.category === 'heavy_lift') return { strength: 2, endurance: 0, skill: 0, speed: 0 };
  return { strength: 1, endurance: 1, skill: 0, speed: 0 };
}

export function applyMemberProgress(member, expGain, statGain) {
  const totalExp = member.exp + expGain;
  const levelUp = Math.floor(totalExp / 100);
  const nextExp = totalExp % 100;
  return {
    updatedMember: {
      ...member,
      level: member.level + levelUp,
      exp: nextExp,
      stats: {
        strength: member.stats.strength + (statGain.strength || 0),
        endurance: member.stats.endurance + (statGain.endurance || 0),
        skill: member.stats.skill + (statGain.skill || 0),
        speed: member.stats.speed + (statGain.speed || 0),
      },
    },
    levelUpCount: levelUp,
  };
}

export function getAchievementTitles({ member, wod, isPR, isFirstRecord, officialApprovalsAfterApproval }) {
  const titles = [];
  if (isFirstRecord) titles.push('Rookie of the Box');
  if (isPR) titles.push('PR Breaker');
  if (isPR && wod?.name === 'FRAN') titles.push('Fran Hunter');
  if (officialApprovalsAfterApproval >= 5) titles.push('Certified Athlete');
  return { newTitles: titles, mergedBadges: [...new Set([...(member.badges || []), ...titles])] };
}

export function buildSubmission({ member, wod, records, inputValue, mode, note }) {
  const resultValue = normalizeRecordValue(wod.recordType, inputValue);
  if (resultValue == null) return { error: '기록 형식이 올바르지 않습니다.' };
  const bestRecord = getBestRecord(records, member.id, wod.id, wod.recordType, false);
  const officialBest = getBestRecord(records, member.id, wod.id, wod.recordType, true);
  const isFirstRecord = !bestRecord;
  const isPR = isFirstRecord || isBetterRecord(wod.recordType, resultValue, bestRecord.resultValue);
  const expBase = calculateBaseExp({ isPR, mode });
  const statGain = getStatGainByWod(wod);
  const record = {
    id: `r-${Date.now()}`,
    memberId: member.id,
    memberName: member.name,
    wodId: wod.id,
    wodName: wod.name,
    recordType: wod.recordType,
    result: inputValue,
    resultValue,
    mode,
    note,
    isPR,
    isFirstRecord,
    official: false,
    officialBonusApplied: false,
    titleUnlocked: isFirstRecord ? 'Rookie of the Box' : isPR ? 'PR Breaker' : null,
    expBase,
    expOfficial: 0,
    statGain,
    createdAt: new Date().toISOString(),
  };
  const baseProgress = applyMemberProgress(member, expBase, statGain);
  return { record, baseProgress, bestRecord, officialBest, isPR, isFirstRecord };
}

export function approveRecordAndApply(data, recordId) {
  const record = data.records.find((item) => item.id === recordId);
  if (!record || record.official) return data;
  const member = data.members.find((item) => item.id === record.memberId);
  if (!member) return data;
  const hadOfficialBefore = data.records.some((item) => item.memberId === member.id && item.official && item.id !== recordId);
  const officialBonus = calculateOfficialExpBonus({ isFirstOfficial: !hadOfficialBefore });
  const memberAfterBonus = applyMemberProgress({ ...member, officialApprovals: member.officialApprovals + 1 }, officialBonus, { strength: 0, endurance: 0, skill: 0, speed: 0 }).updatedMember;
  const approvals = (member.officialApprovals || 0) + 1;
  const { newTitles, mergedBadges } = getAchievementTitles({ member: memberAfterBonus, wod: data.wods.find((w) => w.id === record.wodId), isPR: record.isPR, isFirstRecord: record.isFirstRecord, officialApprovalsAfterApproval: approvals });
  const finalMember = { ...memberAfterBonus, officialApprovals: approvals, badges: mergedBadges, title: newTitles.includes('Certified Athlete') ? 'Certified Athlete' : memberAfterBonus.title };
  return {
    ...data,
    members: data.members.map((item) => (item.id === member.id ? finalMember : item)),
    records: data.records.map((item) => item.id === recordId ? { ...item, official: true, officialBonusApplied: true, expOfficial: officialBonus, titleUnlocked: newTitles[0] || item.titleUnlocked } : item),
  };
}

export function getCurrentWeekRange() {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const start = new Date(now);
  start.setDate(now.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return { start, end };
}

export function getWeeklyRanking(data, wodId) {
  const { start, end } = getCurrentWeekRange();
  const candidates = data.records.filter((record) => {
    const createdAt = new Date(record.createdAt);
    return record.official && record.wodId === wodId && createdAt >= start && createdAt < end;
  });
  const bestPerMember = new Map();
  candidates.forEach((record) => {
    const existing = bestPerMember.get(record.memberId);
    if (!existing || isBetterRecord(record.recordType, record.resultValue, existing.resultValue)) bestPerMember.set(record.memberId, record);
  });
  return [...bestPerMember.values()].sort((a, b) => a.recordType === 'time' ? a.resultValue - b.resultValue : b.resultValue - a.resultValue);
}

export function getPRRanking(data, wodId) {
  const officialRecords = data.records.filter((record) => record.official && record.wodId === wodId);
  const bestPerMember = new Map();
  officialRecords.forEach((record) => {
    const existing = bestPerMember.get(record.memberId);
    if (!existing || isBetterRecord(record.recordType, record.resultValue, existing.resultValue)) bestPerMember.set(record.memberId, record);
  });
  return [...bestPerMember.values()].sort((a, b) => a.recordType === 'time' ? a.resultValue - b.resultValue : b.resultValue - a.resultValue);
}

export function getRecentPR(records) {
  const prRecords = records.filter((record) => record.isPR).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return prRecords[0] || null;
}
