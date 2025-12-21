import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEnquiries = () => {
    navigate('/admin/enquiries');
  };

  const handleAdminSettings = () => {
    navigate('/admin/admin-settings');
  };

  return (
    <div className="topbar">
      <input className="search" placeholder="Search..." />

      <div className="topbar-right">
        <span className="icon" onClick={handleEnquiries}>🔔</span>

        <div className="avatar" onClick={handleAdminSettings}>A</div>

        <span className="icon logout" onClick={handleLogout}>⎋</span>
      </div>
    </div>
  );
};

export default Topbar;
