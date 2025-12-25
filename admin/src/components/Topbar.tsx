import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api";
import { useState, useRef, useEffect } from "react";

const Topbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !(profileRef.current as HTMLElement).contains(e.target as Node)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="topbar">
      {/* Search */}
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          className="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right */}
      <div className="topbar-right">
        {/* Notification */}
        <button
          className="icon-btn notification-btn"
          onClick={() => navigate("/admin/enquiries")}
        >
          🔔
          <span className="notification-badge">3</span>
        </button>

        {/* Profile */}
        <div className="profile-wrapper" ref={profileRef}>
          <div
            className="avatar"
            onClick={() => setOpenProfile((p) => !p)}
          >
            A
          </div>

          {openProfile && (
            <div className="profile-dropdown">
              <button
                onClick={() => {
                  navigate("/admin/admin-settings");
                  setOpenProfile(false);
                }}
              >
                ⚙ Admin Settings
              </button>

              <button
                className="logout"
                onClick={handleLogout}
              >
                ⎋ Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
