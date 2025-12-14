import { useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, Users, ListOrdered, Mail, Settings } from 'lucide-react';
import './index.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeDetail from './pages/EmployeeDetail';
import Enquiries from './pages/Enquiries';
import NavItems from './pages/NavItems';
import NavItemDetail from './pages/NavItemDetail';
import TitleDetail from './pages/TitleDetail';
import SubtitleDetail from './pages/SubtitleDetail';
import AdminSettings from './pages/AdminSettings';
import Login from './pages/Login';
import { getToken, logout } from './lib/api';

type Page =
  | { key: 'dashboard' }
  | { key: 'employees' }
  | { key: 'employeeDetail'; id: string }
  | { key: 'enquiries' }
  | { key: 'navItems' }
  | { key: 'navItemDetail'; id: string }
  | { key: 'titleDetail'; id: string }
  | { key: 'subtitleDetail'; id: string }
  | { key: 'settings' };

function App() {
  const [page, setPage] = useState<Page>({ key: 'dashboard' });
  const [authed, setAuthed] = useState<boolean>(!!getToken());

  const title = useMemo(() => {
    switch (page.key) {
      case 'dashboard':
        return 'Dashboard';
      case 'employees':
        return 'Employees';
      case 'employeeDetail':
        return 'Employee Details';
      case 'enquiries':
        return 'Enquiries';
      case 'navItems':
        return 'Nav Items';
      case 'navItemDetail':
        return 'Nav Item Detail';
      case 'titleDetail':
        return 'Title Detail';
      case 'subtitleDetail':
        return 'Subtitle Detail';
      case 'settings':
        return 'Admin Settings';
    }
  }, [page]);

  useEffect(() => {
    document.title = `MR PRO + Admin — ${title}`;
  }, [title]);

  if (!authed) {
    return <Login onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="layout">
      <Sidebar
        width={270}
        items={[
          { label: 'Dashboard', icon: <LayoutDashboard size={18} />, active: page.key === 'dashboard', onClick: () => setPage({ key: 'dashboard' }) },
          { label: 'Employees', icon: <Users size={18} />, active: page.key === 'employees' || page.key === 'employeeDetail', onClick: () => setPage({ key: 'employees' }) },
          { label: 'Nav Items', icon: <ListOrdered size={18} />, active: page.key === 'navItems' || page.key === 'navItemDetail' || page.key === 'subtitleDetail', onClick: () => setPage({ key: 'navItems' }) },
          { label: 'Enquiries', icon: <Mail size={18} />, active: page.key === 'enquiries', onClick: () => setPage({ key: 'enquiries' }) },
          { label: 'Admin Settings', icon: <Settings size={18} />, active: page.key === 'settings', onClick: () => setPage({ key: 'settings' }) }
        ]}
      />
      <div className="content">
        <Topbar title={title} onLogout={() => { logout(); setAuthed(false); }} />
        <main className="main">
          {page.key === 'dashboard' && <Dashboard />}
          {page.key === 'employees' && (
            <Employees
              onView={(id) => setPage({ key: 'employeeDetail', id })}
              onAdd={() => setPage({ key: 'employeeDetail', id: 'new' })}
            />
          )}
          {page.key === 'employeeDetail' && (
            <EmployeeDetail key={page.id} id={page.id} onBack={() => setPage({ key: 'employees' })} />
          )}
          {page.key === 'enquiries' && <Enquiries />}
          {page.key === 'navItems' && (
            <NavItems onEdit={(id) => setPage({ key: 'navItemDetail', id })} />
          )}
          {page.key === 'navItemDetail' && (
            <NavItemDetail id={page.id} onBack={() => setPage({ key: 'navItems' })} onEditTitle={(tid) => setPage({ key: 'titleDetail', id: tid })} />
          )}
          {page.key === 'titleDetail' && (
            <TitleDetail id={page.id} onBack={(navItemId) => setPage({ key: 'navItemDetail', id: navItemId })} onEditSubtitle={(sid) => setPage({ key: 'subtitleDetail', id: sid })} />
          )}
          {page.key === 'subtitleDetail' && (
            <SubtitleDetail id={page.id} onBack={(titleId) => setPage({ key: 'titleDetail', id: titleId })} />
          )}
          {page.key === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}

export default App;
