import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import "./shop.css";
import { useNavigate } from "react-router-dom";

const ShopRentals = () => {
  const [rentals, setRentals] = useState([]);
  const shopid = localStorage.getItem("shopid");
  const navigate = useNavigate();

  const fetchRentals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/getrentals/${shopid}`
      );
      setRentals(response.data.rentals);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (pid) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/shop/deleteproduct/${pid}`
      );
      fetchRentals();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  return (
    <>
      {/* HEADER + ADD BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="neon-text">Products</h3>

        <Button
          variant="success"
          className="neon-btn"
          onClick={() => navigate("/shop/add-rental")}
        >
          ➕ Add products
        </Button>
      </div>

      <Row className="g-4">
        {rentals.length === 0 ? (
          <div>
            <h5 className="text-light">No products found</h5>
          </div>
        ) : (
          rentals.map((r) => (
            <Col lg={4} md={6} sm={12} key={r._id}>
              <Card className="rental-card h-100">
                <div className="image-wrapper">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/uploads/${r.image}`}
                    className="rental-img"
                  />

                  <Badge
                    className={`availability-badge ${
                      r.availability === "Available"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {r.availability}
                  </Badge>
                </div>

                <Card.Body>
                  <h5 className="neon-text">{r.name}</h5>
                  <p className="text-light small mb-1">{r.category}</p>
                  <p className="price-text">₹ {r.price} / day</p>

                  <p className="small text-light mb-2">
                    Verified:{" "}
                    <Badge bg={r.verified === "yes" ? "info" : "secondary"}>
                      {r.verified}
                    </Badge>
                  </p>

                  <p className="description-text">{r.description}</p>

                  <div className="d-flex gap-2 mt-3">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="w-100"
                      onClick={() =>
                        navigate(`/shop/update-rental/${r._id}`)
                      }
                    >
                      Update
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="w-100"
                      onClick={() => deleteProduct(r._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default ShopRentals;
