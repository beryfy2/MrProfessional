import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { logout } from "../lib/api";
import "../App.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;