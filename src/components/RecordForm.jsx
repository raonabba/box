import { useMemo, useState } from 'react';
import { Save } from 'lucide-react';
export default function RecordForm({ members, wod, onSubmit, defaultMemberId }) {
  const [memberId, setMemberId] = useState(defaultMemberId || members[0]?.id || '');
  const [mode, setMode] = useState('RX');
  const [result, setResult] = useState('');
  const [note, setNote] = useState('');
  const selectedMember = useMemo(() => members.find((member) => member.id === memberId), [memberId, members]);
  const placeholder = wod.recordType === 'time' ? '예: 4:58' : '예: 100';
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!memberId || !result) return;
    onSubmit({ memberId, wodId: wod.id, mode, result, note });
    setResult('');
    setNote('');
  };
  return (
    <section className="pixel-card">
      <div className="mb-4"><div className="badge">RECORD INPUT</div><h3 className="mt-2 text-xl font-bold text-white">오늘 기록 등록</h3><p className="mt-1 text-sm text-slate-400">저장 즉시 EXP 반영, 코치 승인 시 official 랭킹 반영</p></div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div><label className="form-label">이름 선택</label><select value={memberId} onChange={(e)=>setMemberId(e.target.value)} className="input">{members.map((member)=><option key={member.id} value={member.id}>{member.name}</option>)}</select></div>
        <div><label className="form-label">오늘 WOD</label><input className="input opacity-80" value={wod.name} readOnly /></div>
        <div><label className="form-label">기록 입력 {wod.recordType === 'time' ? '(mm:ss)' : '(kg)'}</label><input className="input" value={result} onChange={(e)=>setResult(e.target.value)} placeholder={placeholder} /></div>
        <div><label className="form-label">모드 선택</label><div className="grid grid-cols-2 gap-3">{['RX','Scaled'].map((value)=><button type="button" key={value} onClick={()=>setMode(value)} className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${mode===value ? 'border-neon bg-neon/10 text-neon' : 'border-line bg-panelSoft text-slate-300'}`}>{value}</button>)}</div></div>
        <div><label className="form-label">메모</label><textarea className="input min-h-[96px] resize-none" value={note} onChange={(e)=>setNote(e.target.value)} placeholder={`${selectedMember?.name || '회원'}의 느낌, 페이스, 실패 지점 등을 적어보세요`} /></div>
        <button type="submit" className="btn-primary w-full"><Save size={18} />저장하고 결과 보기</button>
      </form>
    </section>
  );
}
