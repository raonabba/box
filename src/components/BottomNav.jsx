import { Home, PencilLine, Trophy, ShieldCheck } from 'lucide-react';
const tabs = [
  { key: 'home', label: '홈', icon: Home },
  { key: 'record', label: '기록', icon: PencilLine },
  { key: 'ranking', label: '랭킹', icon: Trophy },
  { key: 'coach', label: '코치', icon: ShieldCheck },
];
export default function BottomNav({ current, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-md border-t border-line bg-panel/95 backdrop-blur">
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = current === tab.key;
          return (
            <button key={tab.key} onClick={() => onChange(tab.key)} className={`flex flex-col items-center justify-center rounded-2xl px-2 py-3 text-xs font-semibold transition ${active ? 'bg-accent/20 text-neon shadow-glow' : 'text-slate-300 hover:bg-white/5'}`}>
              <Icon size={18} />
              <span className="mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
