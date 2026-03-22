import { Flame, Swords, ShieldAlert } from 'lucide-react';
export default function WodCard({ wod, recentPR, myBest }) {
  return (
    <section className="pixel-card">
      <div className="mb-3 flex items-center justify-between"><div className="badge">TODAY'S WOD</div><Flame size={18} className="text-gold" /></div>
      <h3 className="text-2xl font-bold text-white">{wod.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{wod.description}</p>
      <div className="mt-4 grid gap-3">
        <div className="rounded-2xl border border-line bg-panelSoft p-3"><div className="mb-1 flex items-center gap-2 text-xs text-slate-400"><Swords size={14} /><span>RX 기준</span></div><p className="font-semibold text-white">{wod.rxStandard}</p></div>
        <div className="rounded-2xl border border-line bg-panelSoft p-3"><div className="mb-1 flex items-center gap-2 text-xs text-slate-400"><ShieldAlert size={14} /><span>Scaled 기준</span></div><p className="font-semibold text-white">{wod.scaledStandard}</p></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-slate-950/60 p-3"><p className="text-xs text-slate-400">최근 PR</p><p className="mt-1 font-bold text-neon">{recentPR ? `${recentPR.memberName} · ${recentPR.result}` : '아직 없음'}</p></div>
        <div className="rounded-2xl border border-line bg-slate-950/60 p-3"><p className="text-xs text-slate-400">내 최고 기록</p><p className="mt-1 font-bold text-gold">{myBest ? myBest.result : '기록 없음'}</p></div>
      </div>
    </section>
  );
}
