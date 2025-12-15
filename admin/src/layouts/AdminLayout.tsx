import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../App.css";

const AdminLayout = () => {
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
