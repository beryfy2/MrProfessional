import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <h2>MR PRO + Admin</h2>
      <NavLink to="/admin/dashboard">Dashboard</NavLink>
      <NavLink to="/admin/employees">Employees</NavLink>
      <NavLink to="/admin/nav-items">Nav Items</NavLink>
      <NavLink to="/admin/enquiries">Enquiries</NavLink>
      <NavLink to="/admin/careers">Careers</NavLink>
      <NavLink to="/admin/admin-settings">Admin Settings</NavLink>
    </nav>
  );
}
