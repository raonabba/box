export const initialData = {
  members: [
    {
      id: 'm1',
      name: '준호',
      level: 12,
      exp: 340,
      stats: { strength: 14, endurance: 11, skill: 8, speed: 10 },
      title: 'Box Vanguard',
      badges: ['PR Breaker'],
      officialApprovals: 3,
    },
    {
      id: 'm2',
      name: '민수',
      level: 10,
      exp: 120,
      stats: { strength: 12, endurance: 9, skill: 7, speed: 8 },
      title: 'Scaled Slayer',
      badges: [],
      officialApprovals: 2,
    },
    {
      id: 'm3',
      name: '현수',
      level: 8,
      exp: 70,
      stats: { strength: 9, endurance: 10, skill: 6, speed: 7 },
      title: 'Steady Engine',
      badges: [],
      officialApprovals: 1,
    },
    {
      id: 'm4',
      name: '민호',
      level: 7,
      exp: 40,
      stats: { strength: 8, endurance: 7, skill: 7, speed: 6 },
      title: 'Fresh Recruited',
      badges: [],
      officialApprovals: 1,
    },
  ],
  wods: [
    {
      id: 'w1',
      name: 'FRAN',
      recordType: 'time',
      category: 'short_metcon',
      description: '21-15-9 Thrusters (40kg) / Pull-ups',
      rxStandard: '40kg + Pull-ups',
      scaledStandard: '25kg + Ring Row',
    },
  ],
  records: [
    {
      id: 'r1', memberId: 'm1', memberName: '준호', wodId: 'w1', wodName: 'FRAN', recordType: 'time', result: '4:48', resultValue: 288, mode: 'RX', note: '초반 스프린트 성공', isPR: true, isFirstRecord: true, official: true, officialBonusApplied: true, titleUnlocked: 'PR Breaker', expBase: 100, expOfficial: 30, statGain: { strength: 1, endurance: 0, skill: 0, speed: 2 }, createdAt: '2026-03-17T09:10:00+09:00'
    },
    {
      id: 'r2', memberId: 'm2', memberName: '민수', wodId: 'w1', wodName: 'FRAN', recordType: 'time', result: '5:10', resultValue: 310, mode: 'RX', note: '후반 호흡 흔들림', isPR: true, isFirstRecord: true, official: true, officialBonusApplied: true, titleUnlocked: null, expBase: 100, expOfficial: 30, statGain: { strength: 1, endurance: 0, skill: 0, speed: 2 }, createdAt: '2026-03-17T09:20:00+09:00'
    },
    {
      id: 'r3', memberId: 'm3', memberName: '현수', wodId: 'w1', wodName: 'FRAN', recordType: 'time', result: '5:32', resultValue: 332, mode: 'RX', note: '꾸준한 페이스', isPR: true, isFirstRecord: true, official: true, officialBonusApplied: true, titleUnlocked: null, expBase: 100, expOfficial: 30, statGain: { strength: 1, endurance: 0, skill: 0, speed: 2 }, createdAt: '2026-03-17T09:35:00+09:00'
    },
    {
      id: 'r4', memberId: 'm4', memberName: '민호', wodId: 'w1', wodName: 'FRAN', recordType: 'time', result: '6:02', resultValue: 362, mode: 'Scaled', note: '첫 FRAN 완주', isPR: true, isFirstRecord: true, official: true, officialBonusApplied: true, titleUnlocked: 'Rookie of the Box', expBase: 90, expOfficial: 30, statGain: { strength: 1, endurance: 0, skill: 0, speed: 2 }, createdAt: '2026-03-17T09:50:00+09:00'
    }
  ],
  todayWodId: 'w1',
};
