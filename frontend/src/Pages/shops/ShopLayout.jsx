import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import "./shop.css";

const ShopLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.clear()
    navigate("/",{ replace: true });
  };

  const Sidebar = () => (
    <>
      <h4 className="neon-text mb-4 ">Shop Panel</h4>

      <NavLink to="dashboard" className="shop-link" onClick={() => setShowMenu(false)}>
        Dashboard
      </NavLink>

      <NavLink to="rentals" className="shop-link" onClick={() => setShowMenu(false)}>
        Products
      </NavLink>

      {/* <NavLink to="add-rental" className="shop-link" onClick={() => setShowMenu(false)}>
        Add Rentals
      </NavLink> */}

      <NavLink to="bookings" className="shop-link" onClick={() => setShowMenu(false)}>
         Bookings
      </NavLink>

      <NavLink to="profile" className="shop-link" onClick={() => setShowMenu(false)}>
        Profile
      </NavLink>

      <Button variant="outline-info" className="w-100 mt-4" onClick={logout}>
        Logout
      </Button>
    </>
  );

  return (
    <Container fluid className="shop-bg">
      <Row>
        <Col md={2} className="shop-sidebar d-none d-md-block">
          <Sidebar />
        </Col>

        <Col className="d-md-none mobile-header">
          <Button
            variant="outline-info"
            className="menu-btn"
            onClick={() => setShowMenu(true)}
          >
            ☰
          </Button>
        </Col>

        <Offcanvas
          show={showMenu}
          onHide={() => setShowMenu(false)}
          placement="start"
          className="mobile-sidebar"
        >
          <Offcanvas.Header closeButton>
            
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Sidebar />
          </Offcanvas.Body>
        </Offcanvas>

        <Col md={10} className="p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default ShopLayout;
