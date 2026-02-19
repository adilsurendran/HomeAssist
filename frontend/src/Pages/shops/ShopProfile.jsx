import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const ShopProfile = () => {
  const [shop,setShop] = useState([])
  const shopid=localStorage.getItem("shopid")

  const fetchShop= async ()=>{
    const response= await axios.get(`http://localhost:5000/api/shop/getshop/${shopid}`)
    //  setShop(await response.data)
    console.log(response);
    
    
    setShop(response.data);
    
  }
  useEffect(()=>{
    fetchShop()
  },[])
  return (
    <>
    {
<div className="column d-lg-flex ms-md-5">
      <div  className="col-sm-10 col-lg-4 mb-sm-3">
        <Card className="p-4" >
      <Card.Img  src={`http://localhost:5000/uploads/${shop.image}`} style={{height:'55vh',padding:'8mm 8mm'}}/>
        </Card>
      </div>
      <div className="col-sm-12 col-lg-8 p-lg-5  mt-lg-4">
      <h3 className="neon-text mt-3 pt-sm-4">Profile</h3>

      <Card className="dark-card p-4" style={{ maxWidth: "450px" }}>
        
        <p><strong>Shop Name:</strong> {shop.name}</p>
        <p><strong>Email:</strong> {shop.mail}</p>
        <p><strong>Phone:</strong> {shop.number}</p>
        <p><strong>Location:</strong> {shop.address}</p>
      </Card>
      </div>
    </div>
    }
    </>
  );
};

export default ShopProfile;
