import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

function UserProfile() {
  const [user,setUser] = useState([])
  const userid=localStorage.getItem("userid")

  const fetchUser= async ()=>{
    const response= await axios.get(`http://localhost:5000/api/user/getuser/${userid}`)
    
    setUser(response.data);
    
  }
  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <>
{
<div className="column d-lg-flex ms-md-5">
      <div  className="col-sm-10 col-lg-4 mb-sm-3">
        <Card className="p-4" >
      <Card.Img  src={`http://localhost:5000/uploads/${user.image}`} style={{height:'55vh',padding:'8mm 8mm'}}/>
        </Card>
      </div>
      <div className="col-sm-12 col-lg-8 p-lg-5  mt-lg-4">
      <h3 className="neon-text mt-3 pt-sm-4">Profile</h3>

      <Card className="dark-card p-4" style={{ maxWidth: "450px" }}>
        
        <p><strong>user Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.mail}</p>
        <p><strong>Phone:</strong> {user.number}</p>
        <p><strong>Location:</strong> {user.address}</p>
      </Card>
      </div>
    </div>
    }    
    </>
  )
}

export default UserProfile
