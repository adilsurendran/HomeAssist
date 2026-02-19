import axios from "axios";
import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ShopAddRental = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validate = (data) => {
    let newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!data.price) {
      newErrors.price = "Price is required";
    } else if (data.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!data.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!data.image) {
      newErrors.image = "Product image is required";
    }

    if (!data.description.trim()) {
      newErrors.description = "Description is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shopid = localStorage.getItem("shopid");

    const formValues = {
      name: e.target.name.value,
      price: e.target.price.value,
      category: e.target.category.value,
      description: e.target.description.value,
      image: e.target.image.files[0],
    };

    const validationErrors = validate(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("id", shopid);
    formData.append("name", formValues.name);
    formData.append("price", formValues.price);
    formData.append("category", formValues.category);
    formData.append("description", formValues.description);
    formData.append("image", formValues.image);

    try {
      await axios.post(
        "http://localhost:5000/api/shop/addrental",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Product added successfully");
      navigate("/shop/rentals");
    } catch (err) {
      console.log(err);
      alert("Failed to add product");
    }
  };

  return (
    <>
      <h3 className="neon-text mb-3">Add Product</h3>

      <Card className="dark-card p-4" style={{ maxWidth: "500px" }}>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter product name"
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter price"
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder="Enter category"
              isInvalid={!!errors.category}
            />
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter product description"
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary">
            Add Product
          </Button>

        </Form>
      </Card>
    </>
  );
};

export default ShopAddRental;
