import { Row, Col, Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import "./user.css";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [rentals, setRentals] = useState([]);
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/shop/userlistrentals")
      .then(res => setRentals(res.data.rentals.slice(0, 3)));

    axios.get("http://localhost:5000/api/user/showWorkers")
      .then(res => setWorkers(res.data.workers.slice(0, 3)));
  }, []);

  return (
    <>
      <h3 className="neon-text mb-3">Welcome 👋</h3>

      <h5 className="section-title" style={rentals.length !=0 ? {display:'block'}: {display:'none'}}  >Popular Rentals</h5>
      <Row>
        {rentals.filter((b)=>b.verified == "approved").map(r => (
          <Col md={4} key={r._id}>
            <Card className="glass-card">
              <Card.Img src={`http://localhost:5000/uploads/${r.image}`} />
              <Card.Body className="text-light">
                <Card.Title>{r.name}</Card.Title>
                <p>₹{r.price}/day</p>
                <Button onClick={() => navigate("/user/rentals")}>View More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h5 className="section-title mt-4" style={workers.length !=0 ? {display:'block'}: {display:'none'}}>Skilled Workers</h5>
      <Row>
        {workers.filter((b)=>b.login_id.status == "approved").map(w => (
          <Col md={3} key={w._id}>
            <Card className="glass-card text-center">
              <Card.Img src={`http://localhost:5000/uploads/${w.image}`} />
              <Card.Body className="text-light">
                <Card.Title>{w.name}</Card.Title>
                <small>{w.expertise}</small>
                <Button onClick={() => navigate("/user/workers")}>View More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UserDashboard;
