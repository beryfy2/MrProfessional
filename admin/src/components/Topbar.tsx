import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="topbar">
      <input className="search" placeholder="Search..." />

      <div className="topbar-right">
        <span className="icon">🔔</span>

        <div className="avatar">A</div>

        <span className="icon logout" onClick={handleLogout}>⎋</span>
      </div>
    </div>
  );
};

export default Topbar;
