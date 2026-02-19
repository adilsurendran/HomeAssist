import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Badge, Row, Col ,Button,Form, Modal} from "react-bootstrap";
import "./user.css";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedShopProduct, setSelectedShopProduct] = useState(null);

  const getBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/getrentalbookings/${localStorage.getItem("userid")}`
      );
      setBookings(res.data.mybookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const statusColor = (status) => {
    if (status === "approved") return "success";
    if (status === "pending") return "warning";
    return "secondary";
  };

// worker feedback handling is done here
const ShopFeedbackModal = ({ show, onHide, product }) => {
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (rating > 5 || rating < 0) {
        return alert("Please Enter Valid Rating");
      }

      const bookingData = {
        feedback: feedback,
        rating: rating,
        booking_id:product._id,
        shop_id: product.shop_id._id,
        user_id: localStorage.getItem("userid"),
      };

      try {
        await axios.post(
          "http://localhost:5000/api/user/userfeedbackonshop",
          bookingData
        );
        alert("Your Feedback is recorded successfully");
        onHide();
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    if (!product) return null;

    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Give Your Feedback</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Product Name</Form.Label>
              <Form.Control value={product.rental_id.name} disabled />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control value={product.shop_id.name} disabled />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Your Feedback</Form.Label>
              <Form.Control
                placeholder="Enter work feedback"
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating (out of 5)</Form.Label>
              <Form.Control
                type="decimal"
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 neon-btn">
              Send Feedback
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };


//shop complaint is handled in here

  const ShopComplaintModal = ({ show, onHide, shop }) => {
    const [complaint, setComplaint] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      const ComplaintData = {
        complaint: complaint,
        shop_id: shop.shop_id._id,
        user_id: localStorage.getItem("userid")
      };

      try {
        await axios.post(
          `http://localhost:5000/api/user/registershopcompalint`,
          ComplaintData
        );
        alert("Your Complaint is recorded successfully");
        onHide();
      } catch (error) {
        alert("error registering complaint");
      }
    };

    if (!shop) return null;

    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Give Your Compalint</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Shop</Form.Label>
              <Form.Control value={shop.shop_id.name} disabled />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Your Complaint</Form.Label>
              <Form.Control
                placeholder="Enter work complaint"
                onChange={(e) => setComplaint(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 neon-btn">
              Send Complaint
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <h4 className="neon-text mb-4">My Bookings</h4>

      <Row className="g-4">
        {bookings.length === 0 ? (
          <h4 className="text-light text-center">No Bookings Found !</h4>
        ) : (
          bookings.map((b) => (
            <Col lg={4} md={6} xs={12} key={b._id}>
              <Card className="booking-card-new">
                
                {/* IMAGE */}
                <div className="booking-img-wrapper">
                  <img
                    src={`http://localhost:5000/uploads/${b.rental_id?.image}`}
                    alt={b.rental_id?.name}
                    className="booking-img"
                  />
                  <Badge
                    bg={statusColor(b.status)}
                    className="booking-status"
                  >
                    {b.status}
                  </Badge>
                </div>

                <Card.Body>
                  <h6 className="booking-title">
                    {b?.rental_id?.name}
                  </h6>

                  <div className="booking-row">
                    <span>Shop</span>
                    <strong>{b.shop_id?.name}</strong>
                  </div>

                  <div className="booking-row">
                    <span>Address</span>
                    <strong>{b.shop_id?.address}</strong>
                  </div>

                  <div className="booking-row">
                    <span>Amount</span>
                    <strong>₹{b.rent_amount}</strong>
                  </div>

                  <div className="booking-row">
                    <span>Duration</span>
                    <strong>{b.rent_duration}</strong>
                  </div>
                </Card.Body>
                <Card.Footer>
                  
                <Button variant="info" className="me-5" onClick={()=>{
                  setSelectedShopProduct(b)
                  setShowModal(true)
                }} >Feedback</Button>

                <Button variant="danger" className="ms-5" onClick={()=>{
                  setSelectedShopProduct(b)
                  setShowComplaintModal(true)
                }} >Complaint</Button>  
                
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <ShopFeedbackModal
        show={showModal}
        onHide={() => setShowModal(false)}
        product={selectedShopProduct}
      />
      <ShopComplaintModal
        show={showComplaintModal}
        onHide={() => setShowComplaintModal(false)}
        shop={selectedShopProduct}
      />
    </>
  );
};

export default UserBookings;
