import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Container, Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./user.css";

const UserLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const Sidebar = ({ mobile }) => (
    <div className="user-sidebar-inner">
      {mobile && (
        <div className="text-end mb-3">
          <Button className="neon-btn" onClick={() => setShowMenu(false)}>
            <FaTimes />
          </Button>
        </div>
      )}

      <h4 className="neon-text mb-4">User Panel</h4>

      <NavLink to="dashboard" className="user-link" onClick={() => setShowMenu(false)}>Dashboard</NavLink>
      <NavLink to="rentals" className="user-link" onClick={() => setShowMenu(false)}>Rentals</NavLink>
      <NavLink to="workers" className="user-link" onClick={() => setShowMenu(false)}>Workers</NavLink>
      <NavLink to="rental-bookings" className="user-link" onClick={() => setShowMenu(false)}>Rental Bookings</NavLink>
      <NavLink to="worker-bookings" className="user-link" onClick={() => setShowMenu(false)}>Worker Bookings</NavLink>
      <NavLink to="complaint-monitoring" className="user-link" onClick={() => setShowMenu(false)}>Complaint Monitoring</NavLink>
      <NavLink to="profile" className="user-link" onClick={() => setShowMenu(false)}>Profile</NavLink>

      <Button className="w-100 mt-4 logout-btn" onClick={logout}>Logout</Button>
    </div>
  );

  return (
    <div className="user-bg">
      <aside className="user-sidebar d-none d-md-block">
        <Sidebar />
      </aside>

      <div className="user-main">
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

        <div className="user-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
