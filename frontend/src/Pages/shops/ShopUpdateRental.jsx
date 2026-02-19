import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

function ShopUpdateRentals() {
    // const productid= pid

  const pid = useParams().id
  const navigate = useNavigate();

  const [myproduct, setMyproduct] = useState({});

  const [mname, setmname] = useState("");
  const [mprice, setmprice] = useState("");
  const [mcategory, setmcategory] = useState("");
  const [mdescription, setmdescription] = useState("");
  const [mimage, setmimage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", pid);
    formData.append("name", mname);
    formData.append("price", mprice);
    formData.append("category", mcategory);
    formData.append("description", mdescription);
    if (mimage) {
      formData.append("image", mimage);
    }

    console.log(formData);

    try {
      await axios.put(
        "http://localhost:5000/api/shop/updateproducts",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Product updated successfully");
      navigate("/shop/rentals");
    } catch (err) {
      console.log(err);
      alert("Failed to update product");
    }
  };

  const fetchproductdata = async () => {



    const product = await axios.get(
      `http://localhost:5000/api/shop/fetchproduct/${pid}`
    );
    // setMyproduct(product.data);
    setmimage(product.data.image)
    setmname(product.data.name);
    setmprice(product.data.price);
    setmcategory(product.data.category);
    setmdescription(product.data.description);
  };

  useEffect(() => {
    fetchproductdata();
    
    
  },[]);

  return (
    <div style={{ padding: "30px", width: "60%", margin: "auto" }}>
      <h3 className="mb-4 text-light">Update Product</h3>


        <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label className="text-light" >Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"      
            placeholder="Enter product name"
            value={mname}
            onChange={(e) => setmname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-light">Price</Form.Label>
          <Form.Control
            type="number"
            name="price"     
            placeholder="Enter price"
            value={mprice}
            onChange={(e) => setmprice(e.target.value)}
          />
        </Form.Group>



        <Form.Group className="mb-3">
          <Form.Label className="text-light">Category</Form.Label>
          <Form.Select name="category" value={mcategory}  onChange={(e) => setmcategory(e.target.value)}> 
            <option disabled >Select category</option>
            <option value="Power Tools">Power Tools</option>
            <option value="Construction Tools">Construction Tools</option>
            <option value="Cleaning Tools">Cleaning Tools</option>
            <option value="Gardening Tools">Gardening Tools</option>
            <option value="Lifting & Moving Tools">Lifting & Moving Tools</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-light">Product Image</Form.Label>

          
          
          <Form.Control
            type="file"
            name="image"
             onChange={(e) => setmimage(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="text-light">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description" 
            value={mdescription} 
            onChange={(e) => setmdescription(e.target.value)} 
            placeholder="Enter product description"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Update Product
        </Button>
      </Form>
    </div>
  );
}

export default ShopUpdateRentals;
