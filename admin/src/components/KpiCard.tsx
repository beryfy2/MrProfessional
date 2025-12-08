import type { ReactNode } from 'react';

export default function KpiCard({
  title,
  value,
  changePct,
  icon,
  color = 'indigo'
}: {
  title: string;
  value: number;
  changePct: number;
  icon: ReactNode;
  color?: 'indigo' | 'violet';
}) {
  return (
    <div className="card">
      <div className="kpi-header">
        <div>
          <div className="kpi-title">{title}</div>
          <div className="kpi-value">{value}</div>
        </div>
        <div className={`kpi-icon ${color === 'indigo' ? 'indigo' : 'violet'}`}>{icon}</div>
      </div>
      <div className="kpi-trend">↑ +{changePct}% <span>vs last month</span></div>
    </div>
  );
}
