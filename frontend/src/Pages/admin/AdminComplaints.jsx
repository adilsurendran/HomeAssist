import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "./admin.css";
import axios from "axios";



const AdminComplaints = () => {
  const [view, setView] = useState("workers");
  const [workercomplaints,setWorkerComplaints]= useState([])
  const [shopcomplaints,setShopComplaints]= useState([])
  const [reply,setReply] = useState([])
  const [complaint_id,setComplaintid]=useState("")

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getworkercomplaints= async ()=>{
    const worker=await axios.get('http://localhost:5000/api/admin/getworkercomplaints')
    setWorkerComplaints(worker.data.complaint)  
  }
  const replyonworker = async ()=>{
    const body= {complaint_id,reply}
    await axios.post('http://localhost:5000/api/admin/givereplyonworker',body)
    alert("reply sent successfully on worker")
    handleClose()
  }


  const getshopfcomplaints= async ()=>{
    const shop=await axios.get('http://localhost:5000/api/admin/getshopcomplaints')
    setShopComplaints(shop.data.complaint)
  }
  const replyonshop = async ()=>{
    const body= {complaint_id,reply}
    await axios.post('http://localhost:5000/api/admin/givereplyonshop',body)
    alert("reply sent successfully for shop")
    handleClose()
  }

  useEffect(()=>{
    getworkercomplaints()
    getshopfcomplaints()

  },[])


  return (
    <>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Complaint Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3">
              <Form.Label>Enter Your Reply</Form.Label>
              <Form.Control as="textarea" rows={3}  onChange={(e)=>setReply(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{view === "shops" ? replyonshop() : replyonworker()} }>
           Send Reply
          </Button>
        </Modal.Footer>
      </Modal>
    
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
            <th>User Name</th>
            <th>{view == "shops" ? "Shop Name" : "Worker Name"}</th>
            <th>Complaint</th>
            <th>Reply</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody >
          { (view =="shops" ? shopcomplaints : workercomplaints).map((u) => (
            <tr key={u._id} >
              <td className="text-dark">{u.user_id.name}</td>
              <td className="text-dark">{view == "shops" ? u.shop_id.name : u.worker_id.name}</td>
              <td className="text-dark">{u.complaint}</td>
              <td className="text-dark">{u.reply}</td>
              <td ><Button variant="info" 
              onClick={()=>{setComplaintid(u._id)
                            handleShow()
              }}
              disabled={u.status == "seen"}
              >Reply</Button></td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminComplaints;
