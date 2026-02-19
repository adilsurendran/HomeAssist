import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "./user.css";
import axios from "axios";



const UserComplaintView = () => {
  const [view, setView] = useState("workers");
  const [workercomplaints,setWorkerComplaints]= useState([])
  const [shopcomplaints,setShopComplaints]= useState([])
  const userid= localStorage.getItem("userid")
  



  const getworkercomplaints= async ()=>{
    const worker=await axios.get(`http://localhost:5000/api/user/getworkercomplaints/${userid}`)
    setWorkerComplaints(worker.data.complaint)  
  }


  const getshopfcomplaints= async ()=>{
    const shop=await axios.get(`http://localhost:5000/api/user/getshopcomplaints/${userid}`)
    setShopComplaints(shop.data.complaint)
  }

  useEffect(()=>{
    getworkercomplaints()
    getshopfcomplaints()

  },[])


  return (
    <>
    
      <h3 className="neon-text mb-4">View Complaints</h3>

      <div className="mb-3 d-flex gap-3">
        <Button
          className={view === "shops" ? "neon-btn" : "btn-outline-info"}
          onClick={() =>{ getworkercomplaints()
             setView("workers")
            
          }}
        >
          Workers Complaints
        </Button>

        <Button
          className={view === "workers" ? "neon-btn" : "btn-outline-info"}
          onClick={() =>{getshopfcomplaints() 
             setView("shops")
            
          }}
        >
          Shops Complaints
        </Button>
      </div>

      <Table responsive hover className="dark-table text-dark">
        <thead>
          <tr>
            
            <th>{view == "shops" ? "Shop Name" : "Worker Name"}</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Reply</th>
          </tr>
        </thead>

        <tbody >
          { (view =="shops" ? shopcomplaints : workercomplaints).map((u) => (
            <tr key={u._id} >
              <td className="text-dark">{view == "shops" ? u.shop_id.name : u.worker_id.name}</td>
              <td className="text-dark">{u.complaint}</td>
              <td className="text-dark">{u.status}</td>
              <td className="text-dark">{u.reply == null ? "Waiting For reply" : u.reply}</td>             
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserComplaintView;
