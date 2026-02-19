import { useEffect, useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import "./admin.css";
import axios from "axios";

const AdminUsers = () => {
  const [view, setView] = useState("approved");
  const [myusers, setMyusers] = useState([])
  // const [newstatus, setNewstatus]= useState("")
  const getusers= async ()=>{
    const usersdata=await axios.get('http://localhost:5000/api/admin/getallusers')
    setMyusers(usersdata.data.user)
  }
const changeStatus= async (userlogid) => {

 await axios.patch(`http://localhost:5000/api/admin/userstatus/${userlogid}`)
 getusers()
}

  useEffect(()=>{
    getusers()

  },[])
  return (
    <>
    
      <h3 className="neon-text mb-4">Manage Users</h3>

      <div className="mb-3 d-flex gap-3">
        <Button
          className={view === "approved" ? "neon-btn" : "btn-outline-info"}
          onClick={() =>{ getusers()
             setView("approved")
            
          }}
        >
          Approved Users
        </Button>

        <Button
          className={view === "pending" ? "neon-btn" : "btn-outline-info"}
          onClick={() =>{getusers() 
             setView("pending")
            
          }}
        >
          Pending Users
        </Button>
      </div>

      <Table responsive hover className="dark-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          { myusers.filter(b=>view=="approved" ? b.login_id.status == "approved" : b.login_id.status != "approved").map((u) => (
            <tr key={u._id}>
              <td className="text-dark">{u.name}</td>
              <td className="text-dark">{u.login_id.mail}</td>
              <td>
                <Badge bg={view === "approved" ? "success" : "danger"}>
                  {view === "approved" ? "Approved" : "Pending"}
                </Badge>
              </td>
              <td>
                {u.login_id.status === "approved" ? (
                  <Button size="sm" variant="danger" 
                  onClick={()=>{
                    // setNewstatus("pending")
                    changeStatus(u.login_id._id)
                    

                  }}>
                    Reject
                  </Button>
                ) : (
                  <Button size="sm" variant="success"
                  onClick={()=>{
                    changeStatus(u.login_id._id)
                    // setNewstatus("approved")
                    

                  }}>
                    Approve
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminUsers;
