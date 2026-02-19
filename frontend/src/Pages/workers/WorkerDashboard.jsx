import { Row, Col, Card } from "react-bootstrap";
import { FaBriefcase, FaClock, FaStar, FaUser ,FaMoneyBill, FaMoneyBillWave  } from "react-icons/fa";
import "./worker.css";
import { useEffect, useState } from "react";
import axios from "axios";

const WorkerDashboard = () => {
  // const stats = [
  //   { title: "Total Jobs", count: 24, icon: <FaBriefcase /> },
  //   { title: "Pending Requests", count: 5, icon: <FaClock /> },
  //   { title: "Completed", count: 18, icon: <FaStar /> },
  //   { title: "Profile Views", count: 120, icon: <FaUser /> },
  // ];

  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/worker/getworkerbookings/${localStorage.getItem("workerid")}`
      );
      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getBookings()
  },[])

  return (
    <>
      <h3 className="neon-text mb-4">Dashboard</h3>
          <div className='d-flex direction-row column row'>
          
          
            <Card className="glass-card text-center  col-md-3 row-sm-12  text-light">
              <div className="icon-box"><FaBriefcase /></div>
              <h4>{bookings.filter(w=>w.status == "approved").reduce((b)=> b + 1,0)}</h4>
              <p>Ongoing Works</p>
            </Card>

            <Card className="glass-card text-center row-sm-12 col-md-3 text-light">
              <div className="icon-box"><FaClock /></div>
              <h4>{bookings.filter(w=>w.status == "pending").reduce((b)=> b + 1,0)}</h4>
              <p>Pending Requests</p>
            </Card>

            <Card className="glass-card text-center row-sm-12 col-md-3 text-light">
              <div className="icon-box"><FaStar /></div>
              <h4>{bookings.filter(w=>w.status == "completed").reduce((b)=> b + 1,0)}</h4>
              <p>Completed</p>
            </Card>

            <Card className="glass-card text-center text-light row-sm-12 col-md-3">
              <div className="icon-box"><FaMoneyBillWave /></div>
              <h4>{bookings.filter((a)=>a.status=="completed").reduce((a,b)=>a + b.work_amount,0)}</h4>
              <p>Revenue</p>
            </Card>
        
         
          </div>
       
      
    </>
  );
};

export default WorkerDashboard;
