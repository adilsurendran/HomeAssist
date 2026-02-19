import { Row, Col, Card } from "react-bootstrap";
import {
  FaUser,
  FaStore,
  FaUserTie,
  FaCommentDots,
  FaUsers,
  FaExclamationTriangle
} from "react-icons/fa";
import "./admin.css";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [feedbacks,setFeedbacks]= useState("")
  const [complaints,setComplaints]=useState("")

  const getData = async () => {
    try {
      const FedandCo= await axios.get("http://localhost:5000/api/admin/getFedandCO");
      setFeedbacks(FedandCo.data.totalfeedcount)
      setComplaints(FedandCo.data.totalcomplaintcount)
      const res = await axios.get("http://localhost:5000/api/admin/getalldata");
      setData(res.data.myall);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) return null;

  return (
    <>
      <h3 className="neon-text mb-4">Dashboard</h3>

      <Row className="g-4">

        <Col md={4}>
          <Card className="admin-card text-light">
            <div className="icon-box"><FaUser /></div>
            <h5>Users</h5>
            <p>Verified: <span className="text-success">{data.filter(u => u.status === "approved" && u.role == "user").length}</span></p>
            <p>Pending: <span className="text-warning">{data.filter(u => u.status !== "approved" && u.role == "user").length}</span></p>
          </Card>
        </Col>
        

        <Col md={4}>
          <Card className="admin-card text-light">
            <div className="icon-box"><FaStore /></div>
            <h5>Shops</h5>
            <p>Verified: <span className="text-success">{data.filter(u => u.status === "approved" && u.role == "shop").length}</span></p>
            <p>Pending: <span className="text-warning">{data.filter(u => u.status !== "approved" && u.role == "shop").length}</span></p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="admin-card text-light">
            <div className="icon-box"><FaUserTie /></div>
            <h5>Workers</h5>
            <p>Verified: <span className="text-success">{data.filter(u => u.status === "approved" && u.role == "worker").length}</span></p>
            <p>Pending: <span className="text-warning">{data.filter(u => u.status !== "approved" && u.role == "worker").length}</span></p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="admin-card text-light">
            <div className="icon-box"><FaCommentDots /></div>
            <h2>{feedbacks}</h2>
            <p>Feedbacks</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="admin-card text-light">
            <div className="icon-box"><FaUsers /></div>
            <h2>{data.filter(u => u.status === "approved").length-1}</h2>
            <p>Community</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="admin-card text-light">
            <div className="icon-box"><FaExclamationTriangle /></div>
            <h2>{complaints}</h2>
            <p>Complaints</p>
          </Card>
        </Col>

      </Row>
    </>
  );
};

export default AdminDashboard;
