import { ArrowUp, CheckCircle2, Medal, ShieldQuestion, Sparkles, Star } from 'lucide-react';
export default function ResultPanel({ result }) {
  if (!result) {
    return <section className="pixel-card"><div className="badge">RESULT</div><p className="mt-3 text-sm text-slate-300">기록을 저장하면 PR, EXP, 레벨업, 스탯 상승 결과가 여기에 표시됩니다.</p></section>;
  }
  const { memberName, wodName, inputValue, isPR, isFirstRecord, expBase, levelUpCount, statGain, mode } = result;
  const pendingOfficialText = result.pendingOfficialBonus > 0 ? `코치 승인 시 추가 EXP +${result.pendingOfficialBonus}` : '공식 인증 보너스 없음';
  return (
    <section className="pixel-card border-neon/40">
      <div className="mb-4 flex items-start justify-between"><div><div className="badge">RESULT</div><h3 className="mt-2 text-xl font-bold text-white">{memberName} · {wodName}</h3><p className="text-sm text-slate-400">제출 기록 {inputValue} · {mode}</p></div><span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-bold text-amber-200"><ShieldQuestion size={14} />unofficial</span></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-panelSoft p-3"><div className="mb-1 flex items-center gap-2 text-xs text-slate-400"><Sparkles size={14} /><span>획득 EXP</span></div><p className="text-2xl font-bold text-neon">+{expBase}</p><p className="mt-1 text-xs text-slate-400">{pendingOfficialText}</p></div>
        <div className="rounded-2xl border border-line bg-panelSoft p-3"><div className="mb-1 flex items-center gap-2 text-xs text-slate-400"><ArrowUp size={14} /><span>레벨업</span></div><p className="text-2xl font-bold text-gold">{levelUpCount > 0 ? `+${levelUpCount}` : '0'}</p><p className="mt-1 text-xs text-slate-400">{levelUpCount > 0 ? '새 레벨 달성' : '다음 레벨 진행 중'}</p></div>
      </div>
      <div className="mt-4 rounded-2xl border border-line bg-panelSoft p-4"><p className="mb-3 text-xs text-slate-400">스탯 상승</p><div className="grid grid-cols-2 gap-3 text-sm"><StatLine label="Strength" value={statGain.strength} /><StatLine label="Endurance" value={statGain.endurance} /><StatLine label="Skill" value={statGain.skill} /><StatLine label="Speed" value={statGain.speed} /></div></div>
      <div className="mt-4 flex flex-wrap gap-2">{isFirstRecord && <Badge icon={Star} text="Rookie of the Box" gold />}{isPR && <Badge icon={Medal} text="PR Breaker" />}{isPR && wodName === 'FRAN' && <Badge icon={CheckCircle2} text="Fran Hunter" />}{!isPR && !isFirstRecord && <Badge icon={ShieldQuestion} text="기존 기록 유지" muted />}</div>
    </section>
  );
}
function StatLine({ label, value }) { return <div className="rounded-xl border border-line bg-slate-950/50 px-3 py-2"><div className="text-xs text-slate-400">{label}</div><div className="font-bold text-white">{value > 0 ? `+${value}` : '+0'}</div></div>; }
function Badge({ icon: Icon, text, gold = false, muted = false }) { const cls = muted ? 'border-slate-500/30 bg-slate-500/10 text-slate-300' : gold ? 'border-gold/30 bg-gold/10 text-gold' : 'border-neon/30 bg-neon/10 text-neon'; return <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold ${cls}`}><Icon size={14} />{text}</span>; }
