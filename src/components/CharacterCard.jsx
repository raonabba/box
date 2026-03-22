import { Swords, Wind, Dumbbell, Sparkles, Shield } from 'lucide-react';
export default function CharacterCard({ member, rank }) {
  const expPercent = Math.max(0, Math.min(100, member.exp));
  const stats = [
    { label: 'STR', value: member.stats.strength, icon: Dumbbell },
    { label: 'END', value: member.stats.endurance, icon: Shield },
    { label: 'SKL', value: member.stats.skill, icon: Sparkles },
    { label: 'SPD', value: member.stats.speed, icon: Wind },
  ];
  return (
    <section className="pixel-card overflow-hidden">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="badge mb-2">PLAYER CARD</div>
          <h2 className="text-2xl font-bold text-white">{member.name}</h2>
          <p className="text-sm text-slate-300">{member.title || 'Box Adventurer'}</p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-panelSoft text-gold"><Swords size={28} /></div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-panelSoft p-3"><p className="text-xs text-slate-400">LEVEL</p><p className="text-2xl font-bold text-gold">LV {member.level}</p></div>
        <div className="rounded-2xl border border-line bg-panelSoft p-3 text-right"><p className="text-xs text-slate-400">BOX RANK</p><p className="text-2xl font-bold text-neon">#{rank || '-'}</p></div>
      </div>
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-300"><span>EXP</span><span>{member.exp}/100</span></div>
        <div className="h-4 overflow-hidden rounded-full border border-line bg-slate-900"><div className="h-full rounded-full bg-gradient-to-r from-neon to-accent transition-all" style={{ width: `${expPercent}%` }} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => { const Icon = stat.icon; return <div key={stat.label} className="rounded-2xl border border-line bg-panelSoft p-3"><div className="mb-1 flex items-center gap-2 text-slate-300"><Icon size={14} /><span className="text-xs">{stat.label}</span></div><p className="text-lg font-bold text-white">{stat.value}</p></div>; })}
      </div>
      {!!member.badges?.length && <div className="mt-4 flex flex-wrap gap-2">{member.badges.slice(0,3).map((badge) => <span key={badge} className="badge-gold">{badge}</span>)}</div>}
    </section>
  );
}
