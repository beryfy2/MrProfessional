import { Users, Mail } from 'lucide-react';
import KpiCard from '../components/KpiCard';
import { useEffect, useState } from 'react';
import { getJSON } from '../lib/api';

type KPIs = {
  totalEmployees: { value: number; changePct: number };
  newEnquiries: { value: number; changePct: number };
};

export default function Dashboard() {
  const [kpis, setKpis] = useState<KPIs | null>(null);

  useEffect(() => {
    getJSON<KPIs>('/kpis').then(setKpis).catch(() => setKpis({ totalEmployees: { value: 0, changePct: 0 }, newEnquiries: { value: 0, changePct: 0 } }));
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="grid-2">
        <KpiCard title="Total Employees" value={kpis?.totalEmployees.value ?? 0} changePct={kpis?.totalEmployees.changePct ?? 0} icon={<Users size={20} />} color="indigo" />
        <KpiCard title="New Enquiries" value={kpis?.newEnquiries.value ?? 0} changePct={kpis?.newEnquiries.changePct ?? 0} icon={<Mail size={20} />} color="violet" />
      </div>
    </div>
  );
}
