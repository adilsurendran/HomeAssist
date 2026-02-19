import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Table, Card, Badge, Row, Col, Form, Button } from "react-bootstrap";

const ShopBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const getBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/shop/getshoprentalbookings/${localStorage.getItem("shopid")}`
      );
      console.log(res);
      setBookings(res.data.mybookings);
    } catch (error) {
      console.log(error);
    }
  };
  const canMarkReturn = (endDate) => {
  const today = new Date();
  const bookingEnd = new Date(endDate);

  // remove time part for accurate comparison
  today.setHours(0, 0, 0, 0);
  bookingEnd.setHours(0, 0, 0, 0);

  return bookingEnd <= today;
};

const handleReturn = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/api/shop/updateBookingStatus/${id}`
    );

    alert("Marked as returned");

    getBookings(); // 🔥 Refresh data

  } catch (error) {
    console.log(error);
  }
};

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    getBookings();
  }, []);

  const statusColor = (status) => {
    if (status === "rented") return "danger";
    if (status !== "rented") return "success";
    return "secondary";
  };

  // 🔎 Search Filter
const filteredBookings = useMemo(() => {
  return bookings.filter((b) => {
    const searchText = search.toLowerCase();

    const rentalName = b.rental_id?.name?.toLowerCase() || "";
    const userName = b.user_id?.name?.toLowerCase() || "";
    const address = b.work_address?.toLowerCase() || "";

    // Format dates
    const formattedStart = formatDate(b.start_date).toLowerCase();
    const formattedEnd = formatDate(b.end_date).toLowerCase();

    return (
      rentalName.includes(searchText) ||
      userName.includes(searchText) ||
      address.includes(searchText) ||
      formattedStart.includes(searchText) ||
      formattedEnd.includes(searchText)
    );
  });
}, [search, bookings]);

  const openMap = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };


  return (
    <>
      {/* Header + Search */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h4 className="neon-text mb-0">My Bookings</h4>
        </Col>

        <Col md={4} className="text-end">
          <Form.Control
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      {/* DESKTOP TABLE */}
      <div className="d-none d-md-block">
        <Table responsive hover className="dark-table">
          <thead>
            <tr>
              <th>Rental</th>
              <th>User</th>
              <th>Work Address</th>
              <th>Amount</th>
              <th>Duration</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-light text-center"
                  style={{ background: "transparent" }}
                >
                  No Bookings Found !
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b._id}>
                  <td className="text-dark">{b.rental_id?.name}</td>
                  <td className="text-dark">{b.user_id?.name}</td>
                  <td className="text-dark">{b.work_address}</td>
                  <td className="text-dark">₹{b.rent_amount}</td>
                  <td className="text-dark">{b.rent_duration}</td>
                  <td className="text-dark">
                    {formatDate(b.start_date)} -{" "}
                    {formatDate(b.end_date)}
                  </td>
             <td>
  {b.status === "rented" ? (
    <button
      className="btn btn-success btn-sm"
       disabled={!canMarkReturn(b.end_date)}
      onClick={() => handleReturn(b._id)}
    >
      Mark Returned
    </button>
  ) : (
    <Badge bg="secondary">Returned</Badge>
  )}
  
</td>
<td>
  {/* ✅ VIEW LOCATION */}
                  {b.location && (
                    <Button
                      variant="success"
                      className="ms-2"
                      onClick={() => openMap(b.location.lat, b.location.lng)}
                    >
                      View Location
                    </Button>
                  )}

</td>
                  
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* MOBILE CARDS */}
      <Row className="d-md-none g-3">
        {filteredBookings.length === 0 ? (
          <h4 className="text-light text-center">
            No Bookings Found !
          </h4>
        ) : (
          filteredBookings.map((b) => (
            <Col xs={12} key={b._id}>
              <Card className="booking-card">
                <Card.Body>
                  <div className="booking-header d-flex justify-content-between align-items-center">
                    <h6 className="booking-title mb-0">
                      {b.rental_id?.name}
                    </h6>
                    <Badge bg={statusColor(b.status)}>
                      {b.status === "rented"
                        ? "On-Rent"
                        : "Returned"}
                    </Badge>
                  </div>

                  <div className="booking-row mt-2">
                    <span>User</span>
                    <strong className="float-end">
                      {b.user_id?.name}
                    </strong>
                  </div>

                  <div className="booking-row">
                    <span>Address</span>
                    <strong className="float-end">
                      {b.work_address}
                    </strong>
                  </div>

                  <div className="booking-row">
                    <span>Amount</span>
                    <strong className="float-end">
                      ₹{b.rent_amount}
                    </strong>
                  </div>

                  <div className="booking-row">
                    <span>Duration</span>
                    <strong className="float-end">
                      {b.rent_duration}
                    </strong>
                  </div>

                  <div className="booking-row">
                    <span>Date</span>
                    <strong className="float-end">
                      {formatDate(b.start_date)} -{" "}
                      {formatDate(b.end_date)}
                    </strong>
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

export default ShopBookings;
