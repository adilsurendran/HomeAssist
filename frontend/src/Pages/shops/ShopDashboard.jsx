import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const ShopDashboard = () => {
  const [rentals,setRentals]= useState([])
    const [bookings, setBookings] = useState([]);
    const shopid = localStorage.getItem("shopid");
const fetchRentals= async ()=>{
  try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/getrentals/${shopid}`
      );
      setRentals(response.data.rentals);
    const res = await axios.get(
        `http://localhost:5000/api/shop/getshoprentalbookings/${shopid}`
      );
      console.log(res);
      
      setBookings(res.data.mybookings);
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(()=>{
  fetchRentals()
},[])
  return (
    <>
      <h3 className="neon-text mb-4">Dashboard</h3>

      <Row className="g-4">
        <Col md={4}>
          <Card className="dark-card">
            <Card.Body>
              <p>Total Machinery</p>
              <h3>{rentals.reduce((b)=> b + 1,0)}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="dark-card">
            <Card.Body>
              <p>Active Rentals</p>
              <h3>{bookings.filter(w=>w.status == "rented").reduce((b)=> b + 1,0)}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="dark-card">
            <Card.Body>
              <p>Total Earnings</p>
              <h3>{bookings.filter((a)=>a.status=="returned").reduce((a,b)=>a + b.rent_amount,0)}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ShopDashboard;
