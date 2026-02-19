import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./admin.css";

const AdminLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const Sidebar = ({ mobile }) => (
    <div className="admin-sidebar-inner">
      {mobile && (
        <div className="d-flex justify-content-end mb-3">
          <Button
            variant="outline-info"
            className="neon-btn"
            onClick={() => setShowMenu(false)}
          >
            <FaTimes />
          </Button>
        </div>
      )}

      <h4 className="neon-text mb-4">Admin Panel</h4>

      <NavLink to="dashboard" className="admin-link" onClick={() => setShowMenu(false)}>
        Dashboard
      </NavLink>
      <NavLink to="users" className="admin-link" onClick={() => setShowMenu(false)}>
        Users
      </NavLink>
      <NavLink to="shops" className="admin-link" onClick={() => setShowMenu(false)}>
        Shops
      </NavLink>
      <NavLink to="workers" className="admin-link" onClick={() => setShowMenu(false)}>
        Workers
      </NavLink>
      <NavLink to="feedbacks" className="admin-link" onClick={() => setShowMenu(false)}>
        Feedbacks
      </NavLink>
      <NavLink to="complaints" className="admin-link" onClick={() => setShowMenu(false)}>
        Complaints
      </NavLink>

      <Button variant="danger" className="w-100 mt-4 neon-btn" onClick={logout}>
        Logout
      </Button>
    </div>
  );

  return (
    <Container fluid className="admin-bg">
      <Row>
        <Col md={2} className="admin-sidebar d-none d-md-block">
          <Sidebar />
        </Col>

        <Col className="d-md-none mobile-header">
          <Button
            variant="outline-info"
            className="menu-btn neon-btn"
            onClick={() => setShowMenu(true)}
          >
            <FaBars />
          </Button>
        </Col>

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

        <Col md={10} className="p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;
