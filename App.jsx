import { useEffect, useMemo, useState } from 'react';
import { RefreshCcw, Swords, Trophy } from 'lucide-react';
import CharacterCard from './components/CharacterCard';
import WodCard from './components/WodCard';
import RecordForm from './components/RecordForm';
import ResultPanel from './components/ResultPanel';
import RankingBoard from './components/RankingBoard';
import CoachPanel from './components/CoachPanel';
import BottomNav from './components/BottomNav';
import { getStoredData, initStorage, resetStoredData, saveStoredData } from './utils/storage';
import { approveRecordAndApply, buildSubmission, getBestRecord, getPRRanking, getRecentPR, getWeeklyRanking } from './utils/gameLogic';

export default function App() {
  const [data, setData] = useState(() => initStorage());
  const [tab, setTab] = useState('home');
  const [selectedMemberId, setSelectedMemberId] = useState('m1');
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => { saveStoredData(data); }, [data]);

  const todayWod = useMemo(() => data.wods.find((wod) => wod.id === data.todayWodId), [data]);
  const selectedMember = useMemo(() => data.members.find((member) => member.id === selectedMemberId) || data.members[0], [data, selectedMemberId]);
  const weeklyRanking = useMemo(() => getWeeklyRanking(data, todayWod.id), [data, todayWod.id]);
  const prRanking = useMemo(() => getPRRanking(data, todayWod.id), [data, todayWod.id]);
  const myRank = useMemo(() => { const index = prRanking.findIndex((record) => record.memberId === selectedMember.id); return index >= 0 ? index + 1 : null; }, [prRanking, selectedMember]);
  const myBest = useMemo(() => getBestRecord(data.records, selectedMember.id, todayWod.id, todayWod.recordType, true), [data.records, selectedMember, todayWod]);
  const recentPR = useMemo(() => getRecentPR(data.records), [data.records]);
  const pendingCount = useMemo(() => data.records.filter((record) => !record.official).length, [data.records]);

  const handleSubmitRecord = ({ memberId, wodId, mode, result, note }) => {
    const member = data.members.find((item) => item.id === memberId);
    const wod = data.wods.find((item) => item.id === wodId);
    const submission = buildSubmission({ member, wod, records: data.records, inputValue: result, mode, note });
    if (submission.error) { alert(submission.error); return; }
    const updatedMembers = data.members.map((item) => item.id === member.id ? submission.baseProgress.updatedMember : item);
    const updatedMemberAfterBase = updatedMembers.find((item) => item.id === member.id);
    const updatedData = {
      ...data,
      members: updatedMembers.map((item) => item.id === member.id ? { ...item, badges: Array.from(new Set([...(item.badges || []), ...(submission.isFirstRecord ? ['Rookie of the Box'] : []), ...(submission.isPR ? ['PR Breaker'] : []), ...(submission.isPR && wod.name === 'FRAN' ? ['Fran Hunter'] : [])])) } : item),
      records: [...data.records, submission.record],
    };
    setData(updatedData);
    setSelectedMemberId(memberId);
    setTab('record');
    setLastResult({ memberName: member.name, wodName: wod.name, inputValue: result, mode, isPR: submission.isPR, isFirstRecord: submission.isFirstRecord, expBase: submission.record.expBase, pendingOfficialBonus: 10 + (submission.officialBest ? 0 : 20), levelUpCount: submission.baseProgress.levelUpCount, statGain: submission.record.statGain, updatedMember: updatedMemberAfterBase });
  };

  const handleApproveRecord = (recordId) => { const currentData = getStoredData(); const updated = approveRecordAndApply(currentData, recordId); setData(updated); };
  const handleReset = () => { const fresh = resetStoredData(); setData(fresh); setSelectedMemberId('m1'); setLastResult(null); setTab('home'); };

  return (
    <div className="min-h-screen bg-bg text-white"><div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-24 pt-5"><header className="mb-5 flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.24em] text-neon">BOX LEVEL UP GM</p><h1 className="mt-1 text-2xl font-black text-white">박스 레벨업 GM</h1><p className="text-sm text-slate-400">우리 박스 안에서 레벨업하는 크로스핏 RPG</p></div><button onClick={handleReset} className="rounded-2xl border border-line bg-panel px-3 py-3 text-slate-300" title="목업 데이터 초기화"><RefreshCcw size={18} /></button></header>
      <div className="mb-4 grid grid-cols-2 gap-3">{data.members.map((member)=><button key={member.id} onClick={()=>setSelectedMemberId(member.id)} className={`rounded-2xl border px-3 py-3 text-left transition ${selectedMemberId === member.id ? 'border-neon bg-neon/10 shadow-glow' : 'border-line bg-panel'}`}><p className="font-bold text-white">{member.name}</p><p className="text-xs text-slate-400">LV {member.level}</p></button>)}</div>
      {tab === 'home' && <main className="space-y-4"><CharacterCard member={selectedMember} rank={myRank} /><WodCard wod={todayWod} recentPR={recentPR} myBest={myBest} /><section className="pixel-card"><div className="mb-4 flex items-center justify-between"><div><div className="badge">SUMMARY</div><h3 className="mt-2 text-xl font-bold text-white">내 순위 요약</h3></div><Trophy size={18} className="text-gold" /></div><div className="grid grid-cols-3 gap-3"><SummaryBox label="박스 PR 순위" value={myRank ? `#${myRank}` : '-'} /><SummaryBox label="미승인 기록" value={pendingCount} /><SummaryBox label="공식 인증 수" value={selectedMember.officialApprovals || 0} /></div><div className="mt-4 rounded-2xl border border-line bg-panelSoft p-4"><div className="mb-2 flex items-center gap-2 text-sm text-neon"><Swords size={16} />최근 PR 알림</div><p className="text-sm text-slate-200">{recentPR ? `${recentPR.memberName}가 ${recentPR.wodName}에서 ${recentPR.result} 기록으로 PR을 달성했습니다.` : '최근 PR 알림이 없습니다.'}</p></div></section></main>}
      {tab === 'record' && <main className="space-y-4"><RecordForm members={data.members} wod={todayWod} onSubmit={handleSubmitRecord} defaultMemberId={selectedMemberId} /><ResultPanel result={lastResult} /></main>}
      {tab === 'ranking' && <main><RankingBoard weeklyRanking={weeklyRanking} prRanking={prRanking} currentMemberId={selectedMemberId} /></main>}
      {tab === 'coach' && <main><CoachPanel records={data.records} onApprove={handleApproveRecord} /></main>}
      </div><BottomNav current={tab} onChange={setTab} /></div>
  );
}
function SummaryBox({ label, value }) { return <div className="rounded-2xl border border-line bg-panelSoft p-3"><p className="text-xs text-slate-400">{label}</p><p className="mt-1 text-xl font-bold text-white">{value}</p></div>; }
