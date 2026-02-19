import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Card, Row, Col, Button, Modal, Form, Badge } from "react-bootstrap";
import "./user.css";

const UserWorkerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const getBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/getworkerbookings/${localStorage.getItem("userid")}`
      );
      setBookings(res.data.mybookings);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (bid) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/user/changeuserbookingstatus/${bid}`
      );
      getBookings();
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
    if (status === "completed") return "info";
    return "secondary";
  };

  const WorkerFeedbackModal = ({ show, onHide, worker }) => {
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
        worker_id: worker._id,
        user_id: localStorage.getItem("userid"),
      };

      try {
        await axios.post(
          "http://localhost:5000/api/user/workerfeedback",
          bookingData
        );
        alert("Your Feedback is recorded successfully");
        onHide();
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    if (!worker) return null;

    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Give Your Feedback</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Worker</Form.Label>
              <Form.Control value={worker.name} disabled />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Expertise</Form.Label>
              <Form.Control value={worker.expertise} disabled />
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
                type="number"
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

  const WorkerComplaintModal = ({ show, onHide, worker }) => {
    const [complaint, setComplaint] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      const ComplaintData = {
        complaint: complaint,
        worker_id: worker._id,
        user_id: localStorage.getItem("userid"),
      };

      try {
        await axios.post(
          `http://localhost:5000/api/user/regiisterworkercompalint`,
          ComplaintData
        );
        alert("Your Complaint is recorded successfully");
        onHide();
      } catch (error) {
        alert("error registering complaint");
      }
    };

    if (!worker) return null;

    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Give Your Compalint</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Worker</Form.Label>
              <Form.Control value={worker.name} disabled />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Expertise</Form.Label>
              <Form.Control value={worker.expertise} disabled />
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
      <h4 className="neon-text mb-4">My Worker Bookings</h4>

      {/* DESKTOP TABLE */}
      <div className="d-none d-md-block">
        <Table responsive hover className="dark-table">
          <thead>
            <tr>
              <th>Worker</th>
              <th>Number</th>
              <th>Expertise</th>
              <th>Fee</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length == 0 ? (
              <tr>
                <td colSpan={6} className="text-light text-center">
                  No Bookings Found !
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id}>
                  <td className="text-dark">{b.worker_id.name}</td>
                  <td className="text-dark">{b.worker_id.number}</td>
                  <td className="text-dark">{b.worker_id.expertise}</td>
                  <td className="text-dark">₹{b.worker_id.fee}</td>
                  <td>
                    <Badge bg={statusColor(b.status)}>
                      {b.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="info"
                        onClick={() => changeStatus(b._id)}
                        style={b.status=="approved" ? {display:'inline'} : {display:'none'}}
                        disabled={b.status == "completed" }
                      >
                        Completed
                      </Button>

                      {b.status === "completed" && (
                        <>
                          <Button size="sm" variant="danger"    onClick={() => {
                          setSelectedWorker(b.worker_id);
                          setShowComplaintModal(true);
                        }}>
                            Complaint
                          </Button>
                          <Button
                            size="sm"
                            className="neon-btn"
                            onClick={() => {
                              setSelectedWorker(b.worker_id);
                              setShowModal(true);
                            }}
                          >
                            Feedback
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* MOBILE CARDS */}
      <Row className="d-md-none g-3">
        {bookings.length == 0 ? (
          <h4 className="text-light text-center">No Bookings Found !</h4>
        ) : (
          bookings.map((b) => (
            <Col xs={12} key={b._id}>
              <Card className="booking-card">
                <Card.Body>
                  <div className="booking-header">
                    <h6 className="booking-title">
                      {b.worker_id.name}
                    </h6>
                    <Badge bg={statusColor(b.status)}>
                      {b.status}
                    </Badge>
                  </div>

                  <div className="booking-row">
                    <span>Phone</span>
                    <strong>{b.worker_id.number}</strong>
                  </div>

                  <div className="booking-row">
                    <span>Expertise</span>
                    <strong>{b.worker_id.expertise}</strong>
                  </div>

                  <div className="booking-row">
                    <span>Fee</span>
                    <strong>₹{b.worker_id.fee}</strong>
                  </div>
                </Card.Body>

                <Card.Footer className="d-grid gap-2">
                  <Button
                    variant="info"
                    onClick={() => changeStatus(b._id)}
                    disabled={b.status !== "pending"}
                  >
                    Completed
                  </Button>

                  {b.status === "completed" && (
                    <>
                      <Button variant="danger" onClick={()=>{
                          setSelectedWorker(b.worker_id);
                          setShowComplaintModal(true);
                      }} >Complaint</Button>
                      <Button
                        className="neon-btn"
                        onClick={() => {
                          setSelectedWorker(b.worker_id);
                          setShowModal(true);
                        }}
                      >
                        Give Feedback
                      </Button>
                    </>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <WorkerFeedbackModal
        show={showModal}
        onHide={() => setShowModal(false)}
        worker={selectedWorker}
      />
      <WorkerComplaintModal
        show={showComplaintModal}
        onHide={() => setShowComplaintModal(false)}
        worker={selectedWorker}
      />
    </>
  );
};

export default UserWorkerBookings;
