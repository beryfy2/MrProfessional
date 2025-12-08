import type { ReactNode } from 'react';

type Item = { label: string; icon: ReactNode; active?: boolean; onClick?: () => void };

export default function Sidebar({ width = 270, items }: { width?: number; items: Item[] }) {
  return (
    <aside className="sidebar" style={{ width }}>
      <div className="sidebar-header">MR PRO + Admin</div>
      <nav style={{ padding: 8 }}>
        {items.map((it) => (
          <button key={it.label} onClick={it.onClick} className={`nav-btn ${it.active ? 'active' : ''}`}>
            <span style={{ color: '#0f4260' }}>{it.icon}</span>
            <span style={{ fontWeight: 500 }}>{it.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
