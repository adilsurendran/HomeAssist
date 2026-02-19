import { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const UserWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();

  // check booked slots for worker
  const checkSlot = async (wid) => {
    const response = await axios.get(
      `http://localhost:5000/api/user/checkworkerslot/${wid}`
    );
    setSlots(response.data.myslot);
  };

  // block booked date ranges
  const blockedRanges = slots.map((s) => {
    const start = new Date(s.start_date);
    const end = new Date(s.end_date);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/showWorkers")
      .then((res) => setWorkers(res.data.workers));
  }, []);

  // ---------------- MODAL ----------------

  const WorkerBookingModal = ({ show, onHide, worker }) => {
    const [workAddress, setWorkAddress] = useState("");
    const [workDescription, setWorkDescription] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end < start) {
        alert("End date must be after start date");
        return;
      }

      const diffTime = end - start;
      const days =
        Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

      const bookingData = {
        work_description: workDescription,
        work_address: workAddress,
        work_amount: days * worker.fee,
        work_duration: `${days} days`,
        start_date: startDate.toLocaleDateString("en-CA"),
        end_date: endDate.toLocaleDateString("en-CA"),
        user_id: localStorage.getItem("userid"),
        worker_id: worker._id,
      };

      try {
        await axios.post(
          "http://localhost:5000/api/user/bookmyworker",
          bookingData
        );
        alert("Worker booking request sent Successfully");
        onHide();
        navigate("/user/worker-bookings");
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Worker</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Worker</Form.Label>
              <Form.Control value={worker?.name || ""} disabled />
            </Form.Group>



            <Form.Group className="mb-2">
              <Form.Label>Work Description</Form.Label>
              <Form.Control
                placeholder="What work should be done?"
                value={workDescription}
                onChange={(e) =>
                  setWorkDescription(e.target.value)
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Work Address</Form.Label>
              <Form.Control
                placeholder="Enter work location"
                value={workAddress}
                onChange={(e) =>
                  setWorkAddress(e.target.value)
                }
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

            <Button type="submit" className="w-100 neon-btn">
              Confirm Booking
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  // ---------------- UI ----------------

  return (
    <>
      <h3 className="neon-text mb-3">All Workers</h3>
      <Row>
        {workers.length == 0 ? (
          <h4 className="text-light text-center">
            No Workers Found !
          </h4>
        ) : (
          workers.map((w) => (
            <Col md={3} key={w._id}>
              <Card className="glass-card">
                <Card.Img
                  src={`http://localhost:5000/uploads/${w.image}`}
                />

                <Card.Body className="text-start">
                  <h5 className="neon-text">{w.name}</h5>

                  <p className="text-light small mb-1">
                    {w.category}
                  </p>

                  <p className="price-text">
                    ₹ {w.fee} / day
                  </p>

                  <p className="description-text">
                    {w.description}
                  </p>

                  <Button
                    className="neon-btn"
                    onClick={() => {
                      setSelectedWorker(w);
                      setShowModal(true);
                      checkSlot(w._id);
                    }}
                  >
                    Hire Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <WorkerBookingModal
        show={showModal}
        onHide={() => setShowModal(false)}
        worker={selectedWorker}
      />
    </>
  );
};

export default UserWorkers;
