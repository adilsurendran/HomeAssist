import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Card, Row, Col, Badge } from "react-bootstrap";
import './worker.css'
const WorkerHistory = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/worker/getworkerhistory/${localStorage.getItem("workerid")}`
      );
      setBookings(res.data.history);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const renderStars = (rating = 0) => {
    return "⭐".repeat(Math.round(rating));
  };

  return (
    <>
      <h4 className="neon-text mb-4">My Reviews & Feedback</h4>

      {/* DESKTOP TABLE */}
      <div className="d-none d-md-block">
        <Table responsive hover className="dark-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Rating</th>
              <th>Feedback</th>
             
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-light text-center" style={{ background: "transparent" }}>
                  No Reviews Yet
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id}>
                  <td className="text-dark fw-bold">{b.user_id.name}</td>
                  <td className="text-dark">{b.user_id.number}</td>
                  <td className="text-warning">
                    {renderStars(b.rating)} ({b.rating}/5)
                  </td>
                  <td className="text-dark">{b.feedback || "No feedback"}</td>
          
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* MOBILE REVIEW CARDS */}
      <Row className="d-md-none g-3">
        {bookings.length === 0 ? (
          <h4 className="text-light text-center">No Reviews Yet</h4>
        ) : (
          bookings.map((b) => (
            <Col xs={12} key={b._id}>
              <Card className="glass-card review-card text-light">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold">{b.user_id.name}</h6>
                    <span className="text-warning">
                      {renderStars(b.rating)}
                    </span>
                  </div>

                 

                  <div className="review-box mt-3">
                    <p className="mb-1 fst-italic">
                      “{b.feedback || "No feedback provided"}”
                    </p>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
       
                    <span className="text-info">{b.rating}/5</span>
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

export default WorkerHistory;
