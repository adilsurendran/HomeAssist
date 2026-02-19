// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Table, Card, Badge, Row, Col, Button } from "react-bootstrap";


// const WorkerRequests = () => {
//   const [bookings, setBookings] = useState([]);

//   const getBookings = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/worker/getworkerbookings/${localStorage.getItem("workerid")}`
//       );
//       console.log(res);
//       setBookings(res.data.bookings);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const changeStatus = async (wid)=>{
//     try {
//       await axios.patch(`http://localhost:5000/api/worker/changebookingstatus/${wid}`)
//       getBookings()
//     } catch (error) {
//       console.log(error);
      
//     }
//   }
// const formatDate = (date) => {
//   return new Date(date).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

//   const Rejectrequest = async (wid)=>{
//     try {
//       await axios.patch(`http://localhost:5000/api/worker/rejectworkrequest/${wid}`)
//       getBookings()
//     } catch (error) {
//       console.log(error);
      
//     }
//   }
  

//   useEffect(() => {
//     getBookings();
//   }, []);


//   return (
//     <>
//       <h4 className="neon-text mb-4">My Bookings</h4>

//       {/* DESKTOP TABLE */}
//       <div className="d-none d-md-block">
//         <Table responsive hover className="dark-table">
//           <thead>
//             <tr>
//               <th>User Name</th>
//               <th>Number</th>
//               <th>Work Location</th>
//               <th>Booking Date</th>

//               <th>Status</th>
//               <th>Action</th>

//             </tr>
//           </thead>

//           <tbody>
//             {bookings.length==0 ? <tr ><td colSpan={6} className="text-light text-center" style={{background:'transparent'}}>No Bookings Found !</td></tr> : bookings.map((b) => (
//               <tr  key={b._id}>
//                 <td className="text-dark">{b.user_id.name}</td>
//                 <td className="text-dark">{b.user_id.number}</td>
//                 <td className="text-dark">{b.work_address}</td>
//                   <td className="text-dark">
//     {formatDate(b.start_date)} - {formatDate(b.end_date)}
//   </td>
//                 <td className="text-dark">{b.status}</td>
//                 <td>
//                   <Button variant="info" disabled={b.status != "pending"} onClick={()=> changeStatus(b._id)} >Approve</Button>
//                   <Button variant="danger" style={b.status == "pending" ? {display:'inline'} : {display:'none'}} onClick={()=> Rejectrequest(b._id)}>Reject</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//       {/* MOBILE CARDS */}
//       <Row className="d-md-none g-3">
//         {bookings.length==0 ? <h4 className="text-light text-center">No Bookings Found !</h4> : bookings.map((b) => (
          
//           <Col xs={12} key={b._id}>
//             <Card className="glass-card booking-card">
//               <Card.Body className="text-light">
//                 <h6 className="fw-bold">{b.user_id.name}</h6>
//                 <small className="text-muted">{b.user_id.number}</small>

//                 <div className="mt-2">
//                   <p className="mb-1">
//                     <strong>Address:</strong> {b.work_address}
//                   </p>
//                   <p>
//                     Status: {b.status}
//                   </p>

//                 </div>
//               </Card.Body>
//               <Card.Footer>
//                 <Button variant="info" onClick={()=> changeStatus(b._id)} >Approve</Button>
//               </Card.Footer>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };

// export default WorkerRequests;

import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Card, Badge, Row, Col, Button } from "react-bootstrap";


const WorkerRequests = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/worker/getworkerbookings/${localStorage.getItem("workerid")}`
      );
      console.log(res);
      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (wid)=>{
    try {
      await axios.patch(`http://localhost:5000/api/worker/changebookingstatus/${wid}`)
      getBookings()
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const Rejectrequest = async (wid)=>{
    try {
      await axios.patch(`http://localhost:5000/api/worker/rejectworkrequest/${wid}`)
      getBookings()
    } catch (error) {
      console.log(error);
    }
  }

  // ✅ GOOGLE MAP OPEN FUNCTION
  const openMap = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    getBookings();
  }, []);


  return (
    <>
      <h4 className="neon-text mb-4">My Bookings</h4>

      {/* DESKTOP TABLE */}
      <div className="d-none d-md-block">
        <Table responsive hover className="dark-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Number</th>
              <th>Work Location</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th>Action</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length==0 ? 
            <tr>
              <td colSpan={6} className="text-light text-center" style={{background:'transparent'}}>
                No Bookings Found !
              </td>
            </tr> 
            : bookings.map((b) => (
              <tr key={b._id}>
                <td className="text-dark">{b.user_id.name}</td>
                <td className="text-dark">{b.user_id.number}</td>
                <td className="text-dark">{b.work_address}</td>
                <td className="text-dark">
                  {formatDate(b.start_date)} - {formatDate(b.end_date)}
                </td>
                <td className="text-dark">{b.status}</td>
                <td>
                  <Button variant="info" disabled={b.status != "pending"} onClick={()=> changeStatus(b._id)} >
                    Approve
                  </Button>

                  <Button variant="danger" style={b.status == "pending" ? {display:'inline'} : {display:'none'}} onClick={()=> Rejectrequest(b._id)}>
                    Reject
                  </Button>

                 

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
            ))}
          </tbody>
        </Table>
      </div>

      {/* MOBILE CARDS */}
      <Row className="d-md-none g-3">
        {bookings.length==0 ? 
        <h4 className="text-light text-center">No Bookings Found !</h4> 
        : bookings.map((b) => (
          
          <Col xs={12} key={b._id}>
            <Card className="glass-card booking-card">
              <Card.Body className="text-light">
                <h6 className="fw-bold">{b.user_id.name}</h6>
                <small className="text-muted">{b.user_id.number}</small>

                <div className="mt-2">
                  <p className="mb-1">
                    <strong>Address:</strong> {b.work_address}
                  </p>
                  <p>
                    Status: {b.status}
                  </p>
                </div>
              </Card.Body>

              <Card.Footer>
                <Button variant="info" onClick={()=> changeStatus(b._id)} >
                  Approve
                </Button>

                {/* ✅ MOBILE VIEW LOCATION */}
                {b.location && (
                  <Button
                    variant="success"
                    className="ms-2"
                    onClick={() => openMap(b.location.lat, b.location.lng)}
                  >
                    View Location
                  </Button>
                )}

              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default WorkerRequests;
