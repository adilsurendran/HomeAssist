import { useEffect, useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import "./admin.css";
import axios from "axios";

const AdminFeedbacks = () => {
  const [view, setView] = useState("workers");
  const [workerfeed,setWorkerFeed]= useState([])
  const [shopfeed,setShopFeed]= useState([])

  const getworkerfeedbacks= async ()=>{
    const worker=await axios.get('http://localhost:5000/api/admin/getworkerfeedbacks')
    setWorkerFeed(worker.data.feedback)
    console.log(worker.data.feedback);
    
  }
  const getshopfeedbacks= async ()=>{
    const shop=await axios.get('http://localhost:5000/api/admin/getshopfeedbacks')
    setShopFeed(shop.data.feedback)
  }

  useEffect(()=>{
    getworkerfeedbacks()
    getshopfeedbacks()

  },[])
  return (
    <>
    
      <h3 className="neon-text mb-4">View Feedbacks</h3>

      <div className="mb-3 d-flex gap-3">
        <Button
          className={view === "shops" ? "neon-btn" : "btn-outline-info"}
          onClick={() =>{ getworkerfeedbacks()
             setView("workers")
            
          }}
        >
          Workers Feedback
        </Button>

        <Button
          className={view === "workers" ? "neon-btn" : "btn-outline-info"}
          onClick={() =>{getshopfeedbacks() 
             setView("shops")
            
          }}
        >
          Shops Feedback
        </Button>
      </div>

      <Table responsive hover className="dark-table text-dark">
        <thead>
          <tr>
            <th>User Name</th>
            <th>{view == "shops" ? "Shop Name" : "Worker Name"}</th>
            <th>Rating</th>
            <th>Feedback</th>
          </tr>
        </thead>

        <tbody >
          { (view =="shops" ? shopfeed : workerfeed).map((u) => (
            <tr key={u._id} >
              <td className="text-dark">{u.user_id.name}</td>
              <td className="text-dark">{view == "shops" ? u.shop_id.name : u.worker_id.name}</td>
              <td className="text-dark">{u.rating}</td>
              <td className="text-dark">{u.feedback}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminFeedbacks;
