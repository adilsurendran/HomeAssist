import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./worker.css";

const WorkerLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const Sidebar = ({ mobile }) => (
    <div className="worker-sidebar-inner">
      {mobile && (
        <div className="text-end mb-3">
          <Button className="neon-btn" onClick={() => setShowMenu(false)}>
            <FaTimes />
          </Button>
        </div>
      )}

      <h4 className="neon-text mb-4">Worker Panel</h4>

      <NavLink to="dashboard" className="worker-link" onClick={()=>setShowMenu(false)}>Dashboard</NavLink>
      <NavLink to="requests" className="worker-link"  onClick={()=>setShowMenu(false)}>Work Requests</NavLink>
      <NavLink to="history" className="worker-link"   onClick={()=>setShowMenu(false)}>Feedback</NavLink>
      <NavLink to="profile" className="worker-link"   onClick={()=>setShowMenu(false)}>Profile</NavLink>

      <Button className="w-100 mt-4 logout-btn" onClick={logout}>
        Logout
      </Button>
    </div>
  );

  return (
    <div className="worker-bg">
      <aside className="worker-sidebar d-none d-lg-block">
        <Sidebar />
      </aside>

      <div className="worker-main">
        <div className="mobile-header d-md-none">
          <Button className="menu-btn neon-btn" onClick={() => setShowMenu(true)}>
            <FaBars />
          </Button>
        </div>

        <Offcanvas
          show={showMenu}
          onHide={() => setShowMenu(false)}
          placement="start"
          className="mobile-sidebar"
        >
          <Offcanvas.Body>
            <Sidebar mobile />
          </Offcanvas.Body>
        </Offcanvas>

        <div className="worker-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WorkerLayout;
