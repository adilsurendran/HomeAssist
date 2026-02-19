// import React, { useState } from "react";
// import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
// import axios from "axios";
// import {  useNavigate } from "react-router-dom";

// import "./auth.css";

// const AuthPage = () => {
//   const [show, setShow] = useState(false);
//   const [type, setType] = useState("");
//   const [password,SetPassword] = useState("")
//     const [mail,setMail] = useState("")

// const navigate=useNavigate()

//   // const [userData, setUserData] = useState({
//   //   name: "",
//   //   email: "",
//   //   phone: "",
//   //   address: "",
//   //   password: "",
//   //   confirmpassword: "",
//   //   photo: null,
//   // });

//   const [shopData, setShopData] = useState({
    
//     shopName: "",
//     email: "",
//     address: "",
//     phone: "",
//     workingdays: "",
//     photo: null,
//     password: "",
//     confirmpassword: ""
//   });
  

//   const [workerData, setWorkerData] = useState({
//     name: "",
//     expertise: "",
//     email: "",
//     address: "",
//     phone: "",
//     workingdays: "",
//     workinghours: "",
//     fee : "",
//     photo: null,
//     password: "",
//     confirmpassword: ""
//   });

  

//  const checkLogin = async () => {
//   try {
//     const body = { mail, password };
//     const res = await axios.post(
//       "http://localhost:5000/api/auth/checklogin",
//       body
//     );

//     const { role, _id } = res.data;

//     // if (role === "user") {
//     //   localStorage.setItem("userid", _id);
//     //   alert("You are a User, Welcome");
//     //   navigate('/user')
//     // } 
//      if (role === "worker") {
//       localStorage.setItem("workerid", _id);
//       alert("You are a Worker, Welcome");
//       navigate('/worker')
//     } 
//     else if (role === "shop") {
//       localStorage.setItem("shopid", _id);
//       console.log(localStorage.getItem("shopid"));
      
//       alert("You are a Shop Owner, Welcome");
      
//       navigate('/shop')
      
//     } 
//     else if (role === "admin") {
//       localStorage.setItem("adminid", _id);
//       alert("You are an Admin, Welcome");
//       navigate('/admin')
//     }

//   } catch (err) {
//     alert(err.response?.data?.message || "Login failed");
//     navigate("/");
//   }
// };


//   const openModal = (role) => {
//     setType(role);
//     setShow(true);
//   };

//   const closeModal = () => {
//     setShow(false);
//     setType("");
//   };

 

// // const submitUser = async (e) => {
// //   e.preventDefault();

// //   const fd = new FormData();
// //   fd.append("name", userData.name);
// //   fd.append("email", userData.email);
// //   fd.append("phone", userData.phone);
// //   fd.append("address",userData.address);
// //   fd.append("photo", userData.photo);
// //   fd.append("password",userData.password);

// //   try {
// //       if(userData.password != userData.confirmpassword){
// //         alert("password does not match")
// //       }

// //     await axios.post(
// //       "http://localhost:5000/api/auth/registeruser",
// //       fd,
// //       {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //       }
// //     );
// // alert("data saved successfully")
// //     setShow(false);
// //     setUserData({
// //       name: "",
// //       email: "",
// //       phone: "",
// //       address : "",
// //       photo: null,
// //     });


// //   } catch (error) {
// //     alert(error)
// //     console.error("User registration failed", error);
// //   }
// // };

//   const submitShop = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();
    
//     fd.append("name", shopData.shopName);
//     fd.append("email", shopData.email);
//     fd.append("phone", shopData.phone);
//     fd.append("address",shopData.address)
//     fd.append("password",shopData.password)
//     fd.append("confirmpassword",shopData.confirmpassword)
//     fd.append("photo", shopData.photo);

//     // send fd to backend later
// try {
//   if(shopData.password != shopData.confirmpassword){
//     alert("Password dont match")
//   }
//   await axios.post(
//     'http://localhost:5000/api/auth/registershop',fd,
//     {
//       headers :{
//           "Content-Type":"multipart/form-data",
//       },
//     }
//   )
//   alert("Data saved Successfully")
//   setShow(false);
// } catch (error) {
  
//   console.log(error);
  
  
// }

//   };

//   const submitWorker = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     fd.append("name", workerData.name);
//     fd.append("expertise",workerData.expertise)
//     fd.append("fee",workerData.fee);
//     fd.append("address",workerData.address)
//     fd.append("workingdays",workerData.workingdays);
//     fd.append("workinghours",workerData.workinghours);
//     fd.append("email", workerData.email);
//     fd.append("phone", workerData.phone);
//     fd.append("photo", workerData.photo);
//     fd.append("password",workerData.password);

//     // sending fd to backend 
//     try {
//       if(workerData.password != workerData.confirmpassword){
//         alert("Password dont match")
//       }
//       await axios.post('http://localhost:5000/api/auth/registerworker',
//         fd,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       )
//       alert("Data saved successfully ")
//       setShow(false)
//     } catch (error) {
//       console.log(error);
      
//     }
//   };

//   return (
//     <Container fluid className="auth-bg">
//       <Row className="justify-content-center align-items-center min-vh-100">
//         <Col md={5}>
//           <Card className="auth-card shadow-lg">
//             <Card.Body>
//               <h2 className="text-center neon-text mb-4">
//                 Service Hub Login
//               </h2>

//               {/* ===== LOGIN FORM ===== */}
//               <Form>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setMail(e.target.value)}}  />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control type="password" placeholder="Enter password" onChange={(e)=>{SetPassword(e.target.value)}}  />
//                 </Form.Group>

//                 <Button className="w-100 neon-btn mb-3" onClick={()=> checkLogin()}>
//                   Login
//                 </Button>
//               </Form>

//               <div className="text-center text-muted mb-2">
//                 New here?
//               </div>

//               <div className="d-flex justify-content-between gap-2">
//                 {/* <Button variant="outline-info" onClick={() => openModal("User")}>
//                   User Register
//                 </Button> */}
//                 <Button
//                   variant="outline-warning"
//                   onClick={() => openModal("Shop")}
//                 >
//                   Shop Register
//                 </Button>
//                 <Button
//                   variant="outline-success"
//                   onClick={() => openModal("Worker")}
//                 >
//                   Worker Register
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* ================= REGISTRATION MODAL ================= */}
//       <Modal show={show} onHide={closeModal} centered>
//         <Modal.Header closeButton className="modal-light">
//           <Modal.Title>{type} Registration</Modal.Title>
//         </Modal.Header>

//         <Modal.Body className="modal-dark">
//           {/* ===== USER REGISTER ===== */}
//           {/* {type === "User" && (
//             <Form onSubmit={submitUser}>
//               <Form.Group className="mb-2">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   value={userData.name}
//                   onChange={(e) =>
//                     setUserData({ ...userData, name: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   value={userData.email}
//                   onChange={(e) =>
//                     setUserData({ ...userData, email: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control
//                   value={userData.phone}
//                   onChange={(e) =>
//                     setUserData({ ...userData, phone: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   value={userData.address}
//                   onChange={(e) =>
//                     setUserData({ ...userData, address: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Photo</Form.Label>
//                 <Form.Control
//                   type="file"
//                   onChange={(e) =>
//                     setUserData({ ...userData, photo: e.target.files[0] })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   value={userData.password}
//                   onChange={(e) =>
//                     setUserData({ ...userData, password: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   value={userData.confirmpassword}
//                   onChange={(e) =>
//                     setUserData({ ...userData, confirmpassword: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Button type="submit" className="w-100 neon-btn">
//                 Register User
//               </Button>
//             </Form>
//           )} */}

//           {/* ===== SHOP REGISTER ===== */}
//           {type === "Shop" && (
//             <Form onSubmit={submitShop}>


//               <Form.Group className="mb-2">
//                 <Form.Label>Shop Name</Form.Label>
//                 <Form.Control
//                   value={shopData.shopName}
//                   onChange={(e) =>
//                     setShopData({ ...shopData, shopName: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   value={shopData.email}
//                   onChange={(e) =>
//                     setShopData({ ...shopData, email: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control
//                   value={shopData.phone}
//                   onChange={(e) =>
//                     setShopData({ ...shopData, phone: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   value={shopData.address}
//                   onChange={(e) =>
//                     setShopData({ ...shopData, address: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>


//               <Form.Group className="mb-3">
//                 <Form.Label>Shop Photo</Form.Label>
//                 <Form.Control
//                   type="file"
//                   onChange={(e) =>
//                     setShopData({ ...shopData, photo: e.target.files[0] })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   value={shopData.password}
//                   onChange={(e) =>
//                     setShopData({ ...shopData, password: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   value={shopData.confirmpassword}
//                   onChange={(e) =>
//                     setShopData({ ...shopData, confirmpassword: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>



//               <Button type="submit" className="w-100 neon-btn">
//                 Register Shop
//               </Button>
//             </Form>
//           )}

//           {/* ===== WORKER REGISTER ===== */}
//           {type === "Worker" && (
//             <Form onSubmit={submitWorker}>
//               <Form.Group className="mb-2">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   value={workerData.name}
//                   onChange={(e) =>
//                     setWorkerData({ ...workerData, name: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Expertise</Form.Label>
//                 <Form.Control
//                   value={workerData.expertise}
//                   onChange={(e) =>
//                     setWorkerData({ ...workerData, expertise: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   value={workerData.email}
//                   onChange={(e) =>
//                     setWorkerData({ ...workerData, email: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control
//                   value={workerData.phone}
//                   onChange={(e) =>
//                     setWorkerData({ ...workerData, phone: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   value={workerData.address}
//                   onChange={(e) =>
//                     setWorkerData({ ...workerData, address: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Working Days</Form.Label>
//                 <Form.Control
//                   value={workerData.workingdays}
//                   onChange={(e) =>
//                     setWorkerData({ ...workerData, workingdays: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Wage / per-day </Form.Label>
//                 <Form.Control
//                   value={workerData.fee}
//                   onChange={(e) =>
//                     setWorkerData({ ...workerData, fee: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Working Hours</Form.Label>
//                 <Form.Control
//                   value={workerData.workinghours}
//                   onChange={(e) =>
//                     setWorkerData({ ...workerData, workinghours: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Photo</Form.Label>
//                 <Form.Control
//                   type="file"
//                   onChange={(e) =>
//                     setWorkerData({ ...workerData, photo: e.target.files[0] })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   value={workerData.password}
//                   onChange={(e) =>
//                     setWorkerData({ ...workerData, password: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-2">
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   value={workerData.confirmpassword}
//                   onChange={(e) =>
//                     setWorkerData({ ...workerData, confirmpassword: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Button type="submit" className="w-100 neon-btn">
//                 Register Worker
//               </Button>
//             </Form>
//           )}
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default AuthPage;


import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const AuthPage = () => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [password, SetPassword] = useState("");
  const [mail, setMail] = useState("");

  const [loginErrors, setLoginErrors] = useState({});
  const [shopErrors, setShopErrors] = useState({});
  const [workerErrors, setWorkerErrors] = useState({});

  const navigate = useNavigate();

  const [shopData, setShopData] = useState({
    shopName: "",
    email: "",
    address: "",
    phone: "",
    workingdays: "",
    photo: null,
    password: "",
    confirmpassword: "",
  });

  const [workerData, setWorkerData] = useState({
    name: "",
    expertise: "",
    email: "",
    address: "",
    phone: "",
    workingdays: "",
    workinghours: "",
    fee: "",
    photo: null,
    password: "",
    confirmpassword: "",
    category:[]
  });

  // ================= LOGIN VALIDATION =================
  const validateLogin = () => {
    let errors = {};

    if (!mail.trim()) {
      errors.mail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(mail)) {
      errors.mail = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const checkLogin = async () => {
    const errors = validateLogin();
    setLoginErrors(errors);

    if (Object.keys(errors).length !== 0) return;

    try {
      const body = { mail, password };
      const res = await axios.post(
        "http://localhost:5000/api/auth/checklogin",
        body
      );

      const { role, _id } = res.data;

      if (role === "worker") {
        localStorage.setItem("workerid", _id);
        navigate("/worker");
      } else if (role === "shop") {
        localStorage.setItem("shopid", _id);
        navigate("/shop");
      } else if (role === "admin") {
        localStorage.setItem("adminid", _id);
        navigate("/admin");
      }
    } catch (err) {
      console.log(err);
      
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const openModal = (role) => {
    setType(role);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
    setType("");
    setShopErrors({});
    setWorkerErrors({});
  };

  // ================= SHOP VALIDATION =================
  const validateShop = () => {
    let errors = {};

    if (!shopData.shopName.trim())
      errors.shopName = "Shop name is required";

    if (!shopData.email.trim())
      errors.email = "Email is required";

    if (!shopData.phone.trim())
      errors.phone = "Phone is required";
  if (!/^\d{10}$/.test(shopData.phone)) {
    errors.phone =  "Phone number must be exactly 10 digits";
    
  }
    if (!shopData.address.trim())
      errors.address = "Address is required";

    if (!shopData.password)
      errors.password = "Password is required";
  if (shopData.password.length < 6) {
    errors.password ="Password must be at least 6 characters";
    
  }
    if (shopData.password !== shopData.confirmpassword)
      errors.confirmpassword = "Passwords do not match";

    if (!shopData.photo)
      errors.photo = "Photo is required";

    return errors;
  };

  const submitShop = async (e) => {
    e.preventDefault();

    const errors = validateShop();
    setShopErrors(errors);

    if (Object.keys(errors).length !== 0) return;

    const fd = new FormData();
    fd.append("name", shopData.shopName);
    fd.append("email", shopData.email);
    fd.append("phone", shopData.phone);
    fd.append("address", shopData.address);
    fd.append("password", shopData.password);
    fd.append("photo", shopData.photo);

    try {
      await axios.post(
        "http://localhost:5000/api/auth/registershop",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
alert("data saved successfully")

      setShow(false);
    } catch (error) {
      alert(error.message)
      console.log(error);
    }
  };

  // ================= WORKER VALIDATION =================
  const validateWorker = () => {
    let errors = {};

    if (!workerData.name.trim())
      errors.name = "Name is required";

    if (!workerData.expertise.trim())
      errors.expertise = "Expertise is required";

    if (!workerData.email.trim())
      errors.email = "Email is required";

    if (!workerData.phone.trim())
      errors.phone = "Phone is required";
  if (!/^\d{10}$/.test(workerData.phone)) {
    errors.phone= "Phone number must be exactly 10 digits"
  }
    if (!workerData.address.trim())
      errors.address = "Address is required";

    if (!workerData.workingdays.trim())
      errors.workingdays = "Working days required";

    if (!workerData.workinghours.trim())
      errors.workinghours = "Working hours required";

    if (!workerData.fee.trim())
      errors.fee = "Fee required";

    if (!workerData.password)
      errors.password = "Password required";

  if (workerData.password.length < 6) {
    errors.password ="Password must be at least 6 characters"
  }

    if (workerData.password !== workerData.confirmpassword)
      errors.confirmpassword = "Passwords do not match";

    if (!workerData.photo)
      errors.photo = "Photo required";

    return errors;
  };

  const submitWorker = async (e) => {
    e.preventDefault();

    const errors = validateWorker();
    setWorkerErrors(errors);

    if (Object.keys(errors).length !== 0) return;

    const fd = new FormData();
    fd.append("name", workerData.name);
    fd.append("expertise", workerData.expertise);
    fd.append("fee", workerData.fee);
    fd.append("address", workerData.address);
    fd.append("workingdays", workerData.workingdays);
    fd.append("workinghours", workerData.workinghours);
    fd.append("category", workerData.category);
    fd.append("email", workerData.email);
    fd.append("phone", workerData.phone);
    fd.append("photo", workerData.photo);
    fd.append("password", workerData.password);

    try {
      await axios.post(
        "http://localhost:5000/api/auth/registerworker",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
alert("data saved successfully")

      setShow(false);
    } catch (error) {
      alert(error.message)
      console.log(error);
    }
  };

  // console.log(workerData.category);
  

  return (
    <Container fluid className="auth-bg">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={5}>
          <Card className="auth-card shadow-lg">
            <Card.Body>
              <h2 className="text-center neon-text mb-4">
                Home Assist 
              </h2>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setMail(e.target.value)}
                  />
                  <small className="text-danger">
                    {loginErrors.mail}
                  </small>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => SetPassword(e.target.value)}
                  />
                  <small className="text-danger">
                    {loginErrors.password}
                  </small>
                </Form.Group>

                <Button
                  className="w-100 neon-btn mb-3"
                  onClick={() => checkLogin()}
                >  
                  Login
                </Button>
              </Form>

              <div className="text-center text-muted mb-2">
                New here?
              </div>

              <div className="d-flex justify-content-between gap-2">
                <Button
                  variant="outline-warning"
                  onClick={() => openModal("Shop")}
                >
                  Shop Register
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => openModal("Worker")}
                >
                  Worker Register
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* MODAL CODE REMAINS SAME AS YOUR PREVIOUS VERSION */}
      <Modal show={show} onHide={closeModal} centered>
         <Modal.Header closeButton className="modal-light">
           <Modal.Title>{type} Registration</Modal.Title>
         </Modal.Header>

         <Modal.Body className="modal-dark">
                {/* ===== SHOP REGISTER ===== */}
            {/* SHOP REGISTER */}
          {type === "Shop" && (
            <Form onSubmit={submitShop}>
              {[
                { label: "Shop Name", key: "shopName" },
                { label: "Email", key: "email", type: "email" },
                { label: "Phone", key: "phone" },
                { label: "Address", key: "address" },
              ].map((field, i) => (
                <Form.Group className="mb-2" key={i}>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type={field.type || "text"}
                    value={shopData[field.key]}
                    onChange={(e) =>
                      setShopData({ ...shopData, [field.key]: e.target.value })
                    }
                  />
                  <small className="text-danger">
                    {shopErrors[field.key]}
                  </small>
                </Form.Group>
              ))}

              <Form.Group className="mb-2">
                <Form.Label>Shop Photo</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setShopData({ ...shopData, photo: e.target.files[0] })
                  }
                />
                <small className="text-danger">{shopErrors.photo}</small>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={shopData.password}
                  onChange={(e) =>
                    setShopData({ ...shopData, password: e.target.value })
                  }
                />
                <small className="text-danger">{shopErrors.password}</small>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={shopData.confirmpassword}
                  onChange={(e) =>
                    setShopData({
                      ...shopData,
                      confirmpassword: e.target.value,
                    })
                  }
                />
                <small className="text-danger">
                  {shopErrors.confirmpassword}
                </small>
              </Form.Group>

              <Button type="submit" className="w-100 neon-btn">
                Register Shop
              </Button>
            </Form>
          )}

          {/* WORKER REGISTER */}
          {/* {type === "Worker" && (
            <Form onSubmit={submitWorker}>
              {[
                { label: "Name", key: "name" },
                { label: "Expertise", key: "expertise" },
                { label: "Email", key: "email", type: "email" },
                { label: "Phone", key: "phone" },
                { label: "Address", key: "address" },
                { label: "Working Days", key: "workingdays" },
                { label: "Wage / per-day", key: "fee" },
                { label: "Working Hours", key: "workinghours" },
                { label: "Category", key: "category" },
              ].map((field, i) => (
                <Form.Group className="mb-2" key={i}>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type={field.type || "text"}
                    value={workerData[field.key]}
                    onChange={(e) =>
                      setWorkerData({
                        ...workerData,
                        [field.key]: e.target.value,
                      })
                    }
                  />
                  <small className="text-danger">
                    {workerErrors[field.key]}
                  </small>
                </Form.Group>
              ))}

              <Form.Group className="mb-2">
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setWorkerData({
                      ...workerData,
                      photo: e.target.files[0],
                    })
                  }
                />
                <small className="text-danger">{workerErrors.photo}</small>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={workerData.password}
                  onChange={(e) =>
                    setWorkerData({
                      ...workerData,
                      password: e.target.value,
                    })
                  }
                />
                <small className="text-danger">{workerErrors.password}</small>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={workerData.confirmpassword}
                  onChange={(e) =>
                    setWorkerData({
                      ...workerData,
                      confirmpassword: e.target.value,
                    })
                  }
                />
                <small className="text-danger">
                  {workerErrors.confirmpassword}
                </small>
              </Form.Group>

              <Button type="submit" className="w-100 neon-btn">
                Register Worker
              </Button>
            </Form>
          )} */}

          {type === "Worker" && (
  <Form onSubmit={submitWorker}>
    {[
      { label: "Name", key: "name", placeholder:"Enter your name" },
      { label: "Expertise", key: "expertise", placeholder:"Enter your skills"  },
      { label: "Email", key: "email", type: "email", placeholder:"Enter your username"  },
      { label: "Phone", key: "phone", placeholder:"Enter your phone"  },
      { label: "Address", key: "address", placeholder:"Enter your full address"  },
      { label: "Working Days", key: "workingdays", placeholder:"Eg: Monday-Saturday"  },
      { label: "Wage / per-hour", key: "fee", placeholder:"Required wage/hour" },
      { label: "Working Hours", key: "workinghours",placeholder:"Eg: 10AM - 5PM" },
    ].map((field, i) => (
      <Form.Group className="mb-2" key={i}>
        <Form.Label>{field.label}</Form.Label>
        <Form.Control
          type={field.type || "text"}
          value={workerData[field.key]}
          placeholder={field.placeholder}
          onChange={(e) =>
            setWorkerData({
              ...workerData,
              [field.key]: e.target.value,
              
            })
          }
        />
        <small className="text-danger">{workerErrors[field.key]}</small>
      </Form.Group>
    ))}

<Form.Group className="mb-2">
  <Form.Label>Category</Form.Label>
  <Form.Select
    multiple
    value={workerData.category || []}
    onChange={(e) => {
      const selectedCategories = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setWorkerData({
        ...workerData,
        category: selectedCategories,
      });
    }}
  >
    {[
      "Electrician",
      "Plumber",
      "Carpenter",
      "Painter",
      "Cleaner",
      "Mechanic",
      "AC Technician",
      "Mason",
    ].map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </Form.Select>

  <small className="text-danger">{workerErrors.category}</small>

  <div className="mt-2">
    <strong>Selected Categories:</strong>{" "}
    {(workerData.category || []).length
      ? workerData.category.join(", ")
      : "None"}
  </div>
</Form.Group>

    <Form.Group className="mb-2">
      <Form.Label>Photo</Form.Label>
      <Form.Control
        type="file"
        onChange={(e) =>
          setWorkerData({
            ...workerData,
            photo: e.target.files[0],
          })
        }
      />
      <small className="text-danger">{workerErrors.photo}</small>
    </Form.Group>

    <Form.Group className="mb-2">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        value={workerData.password}
        onChange={(e) =>
          setWorkerData({
            ...workerData,
            password: e.target.value,
          })
        }
      />
      <small className="text-danger">{workerErrors.password}</small>
    </Form.Group>

    <Form.Group className="mb-2">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control
        type="password"
        value={workerData.confirmpassword}
        onChange={(e) =>
          setWorkerData({
            ...workerData,
            confirmpassword: e.target.value,
          })
        }
      />
      <small className="text-danger">{workerErrors.confirmpassword}</small>
    </Form.Group>

    <Button type="submit" className="w-100 neon-btn">
      Register Worker
    </Button>
  </Form>
)}

        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default AuthPage;
