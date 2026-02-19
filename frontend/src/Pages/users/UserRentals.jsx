import { useEffect, useState } from "react";
import { Row, Col, Card, Button ,Form,Modal,Badge} from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";


const UserRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [selectedRental, setSelectedRental] = useState(null);
const [slots,setSlots]=useState([])
const navigate=useNavigate()

const checkSlot= async ( pid)=>{
const response= await axios.get(`http://localhost:5000/api/user/checkrentalslot/${pid}`)
setSlots(response.data.myslot)
}
const blockedRanges = slots.map(s => {
  const start = new Date(s.start_date);
  const end = new Date(s.end_date);

  start.setHours(0,0,0,0);
  end.setHours(23,59,59,999);

  return { start, end };
});


  useEffect(() => {
    axios.get("http://localhost:5000/api/shop/userlistrentals")
      .then(res => setRentals(res.data.rentals)
      );
      // console.log(rentals);
      
  }, []);


const RentalBookingModal = ({ show, onHide, rental }) => {
  const [workAddress, setWorkAddress] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

const handleSubmit = async (e) => {
e.preventDefault();

const start = new Date(startDate);
const end = new Date(endDate);
if (end < start ) {
  alert("End date must be after start date");
  return;
}
const diffTime = end - start;
const days = Math.floor(diffTime / (1000 * 60 * 60 * 24)) +1;

const bookingData = {
  rental_name: rental.name,
  rental_image: rental.image,
  work_address: workAddress,
  shop_name: rental.shopid.name,
  rent_amount: days * rental.price,
  rent_length: `${days} days`,
  start_date: startDate.toLocaleDateString("en-CA"),
  end_date: endDate.toLocaleDateString("en-CA"),
  shop_id: rental.shopid._id,
  user_id: localStorage.getItem("userid"),
  rental_id: rental._id
};
console.log(startDate,endDate);
console.log(bookingData.start_date,bookingData.end_date);


 try {
 const req= await axios.post('http://localhost:5000/api/user/bookmyrental',bookingData)
  alert("Rental Booking request sent Successfully ")
    onHide();
    navigate('/user/rental-bookings')
 } catch (error) {
  alert(error.response.data.message)
 }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book Rental</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Rental</Form.Label>
            <Form.Control value={rental?.name || ""} disabled />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Shop</Form.Label>
            <Form.Control value={rental?.shopid.name || ""} disabled />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Work Address</Form.Label>
            <Form.Control
              placeholder="Enter work location"
              value={workAddress}
              onChange={(e) => setWorkAddress(e.target.value)}
            />
          </Form.Group>



<Form.Group className="mb-3">
  <Form.Label>Start Date</Form.Label>
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    minDate={new Date()}
    excludeDateIntervals={blockedRanges}
    className="form-control"
    placeholderText="Select start date"
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>End Date</Form.Label>
  <DatePicker
    selected={endDate}
    onChange={(date) => setEndDate(date)}
    minDate={startDate || new Date()}
    excludeDateIntervals={blockedRanges}
    className="form-control"
    placeholderText="Select end date"
  />
</Form.Group>


          <Button type="submit" className="w-100 neon-btn" >
            Confirm Booking
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

  return (
    <>
      <h3 className="neon-text mb-3">All Rentals</h3>
      <Row>
        {rentals.length==0 ? <h4 className="text-light text-center">No Rentals Found !</h4> : rentals.map((r) => (
          <Col md={3} key={r._id}>
            <Card className="glass-card">
              <Card.Img src={`http://localhost:5000/uploads/${r.image}`}  />
                              
              <Card.Body className="text-start">
<h5 className="neon-text ">{r.name}</h5>

                <p className="text-light small mb-1">{r.category}</p>

                <p className="price-text">₹ {r.price} / day</p>

                <p className="description-text">{r.description}</p>

                <Button
  className="neon-btn"
  onClick={() => {
    setSelectedRental(r);
    setShowModal(true);
    checkSlot(r._id)
  }}
>
  Rent Now
</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <RentalBookingModal
  show={showModal}
  onHide={() => setShowModal(false)}
  rental={selectedRental}
  
/>
    </>
  );
};

export default UserRentals;
