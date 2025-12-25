import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api";
import { useState } from "react";

const Topbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      navigate('/');
    }
  };

  const handleEnquiries = () => {
    navigate('/admin/enquiries');
  };

  const handleAdminSettings = () => {
    navigate('/admin/admin-settings');
  };

  return (
    <div className="topbar">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input 
          className="search" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="topbar-right">
        <button 
          className="icon-btn notification-btn" 
          onClick={handleEnquiries}
          title="View Enquiries"
        >
          <span className="icon">🔔</span>
          <span className="notification-badge">3</span>
        </button>

        <div 
          className="avatar" 
          onClick={handleAdminSettings}
          title="Admin Settings"
        >
          A
        </div>

        <button 
          className="icon-btn logout-btn" 
          onClick={handleLogout}
          title="Logout"
        >
          <span className="icon">⎋</span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
