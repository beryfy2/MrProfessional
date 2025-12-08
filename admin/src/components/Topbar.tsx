export default function Topbar({ title, onLogout }: { title: string; onLogout?: () => void }) {
  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <input className="topbar-search" placeholder="Search..." />
        <div className="avatar">A</div>
        <div style={{ fontSize: 14, color: '#374151' }}>Admin</div>
        {onLogout && (
          <button className="logout" onClick={onLogout}>Logout</button>
        )}
      </div>
    </header>
  );
}
