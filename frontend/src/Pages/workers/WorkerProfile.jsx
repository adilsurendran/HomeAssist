// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Card } from 'react-bootstrap'

// function WorkerProfile() {
//   const [worker,setworker] = useState([])
//   const workerid=localStorage.getItem("workerid")

//   const fetchworker= async ()=>{
//     const response= await axios.get(`http://localhost:5000/api/worker/getworker/${workerid}`)
    
//     setworker(response.data);
    
//   }
//   useEffect(()=>{
//     fetchworker()
//   },[])
//   return (
//     <>
// {
// <div className="column d-lg-flex ms-md-5">
//       <div  className="col-sm-10 col-lg-4 mb-sm-3">
//         <Card className="p-4" >
//       <Card.Img  src={`http://localhost:5000/uploads/${worker.image}`} style={{height:'55vh',padding:'8mm 8mm'}}/>
//         </Card>
//       </div>
//       <div className="col-sm-12 col-lg-8 p-lg-5  mt-lg-4">
//       <h3 className="neon-text mt-3 pt-sm-4">Profile</h3>

//       <Card className="dark-card p-4" style={{ maxWidth: "450px" }}>
        
//         <p><strong>worker Name:</strong> {worker.name}</p>
//         <p><strong>Email:</strong> {worker.mail}</p>
//         <p><strong>Phone:</strong> {worker.number}</p>
//         <p><strong>Location:</strong> {worker.address}</p>
//       </Card>
//       </div>
//     </div>
//     }    
//     </>
//   )
// }

// export default WorkerProfile
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'

function WorkerProfile() {

  const [worker, setworker] = useState({})
  const [editMode, setEditMode] = useState(false)

  const workerid = localStorage.getItem("workerid")

  const fetchworker = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/worker/getworker/${workerid}`
    )
    setworker(response.data)
  }

  useEffect(() => {
    fetchworker()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setworker({ ...worker, [name]: value })
  }

  const handleUpdate = async () => {
    try {
     let res= await axios.put(
        `http://localhost:5000/api/worker/updateworker/${workerid}`,
        worker
      )
      console.log(res);
      
      alert("Profile Updated Successfully")
      setEditMode(false)
      fetchworker()
    } catch (error) {
      console.log(error)
      alert("Update Failed")
    }
  }

  return (
    <>
      <div className="column d-lg-flex ms-md-5">

        <div className="col-sm-10 col-lg-4 mb-sm-3">
          <Card className="p-4">
            <Card.Img
              src={`http://localhost:5000/uploads/${worker.image}`}
              style={{ height: '55vh', padding: '8mm 8mm' }}
            />
          </Card>
        </div>

        <div className="col-sm-12 col-lg-8 p-lg-5 mt-lg-4">
          <h3 className="neon-text mt-3 pt-sm-4">Profile</h3>

          <Card className="dark-card p-4" style={{ maxWidth: "450px" }}>

            {editMode ? (
              <>
                <Form.Group className="mb-2">
                  <Form.Label>Worker Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={worker.name || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="mail"
                    value={worker.mail || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="number"
                    value={worker.number || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={worker.address || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Expertise</Form.Label>
                  <Form.Control
                    type="text"
                    name="expertise"
                    value={worker.expertise || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Fee</Form.Label>
                  <Form.Control
                    type="number"
                    name="fee"
                    value={worker.fee || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Working Days</Form.Label>
                  <Form.Control
                    type="text"
                    name="workingdays"
                    value={worker.workingdays || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Working Hours</Form.Label>
                  <Form.Control
                    type="text"
                    name="workinghours"
                    value={worker.workinghours || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="success" onClick={handleUpdate}>
                  Update
                </Button>

                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <p><strong>Worker Name:</strong> {worker.name}</p>
                <p><strong>Email:</strong> {worker.mail}</p>
                <p><strong>Phone:</strong> {worker.number}</p>
                <p><strong>Location:</strong> {worker.address}</p>
                <p><strong>Expertise:</strong> {worker.expertise}</p>
                <p><strong>Fee:</strong> ₹{worker.fee}</p>
                <p><strong>Working Days:</strong> {worker.workingdays}</p>
                <p><strong>Working Hours:</strong> {worker.workinghours}</p>

                <Button variant="primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              </>
            )}

          </Card>
        </div>

      </div>
    </>
  )
}

export default WorkerProfile
