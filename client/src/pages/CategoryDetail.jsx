import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryDetail = () => {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:4500/api/categories/${id}`
        );
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!category) {
    return <div>No category found</div>;
  }

  return (
    <Container fluid style={{ backgroundColor: "#f8f9fa" }}>
      <Row className="mb-5 mt-1 pt-2">
        <Col className="text-center">
          <div
            className="position-relative d-inline-block"
            style={{ height: "400px", width: "100%" }}
          >
            <Image
              src={category.image}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                filter: "blur(1px)",
              }}
            />
            <div
              className="position-absolute"
              style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(43, 57, 64, 0.6)",
                zIndex: 0,
              }}
            />
            <div
              className="position-absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {category.name}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2 className="text-center mb-4" style={{ color: "#00b074" }}>
            {category.title}
          </h2>
        </Col>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
          style={{ width: '100%' }}
        >
          <Card className="border-0 shadow-sm">
            <Row noGutters>
              <Col md={4}>
                <Card.Img
                  src={category.image || '/about.jpg'} // Fallback image
                  alt={category.name}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title className="text-success">
                    {category.name}
                  </Card.Title>
                  <Card.Subtitle className="my-2 text-muted">
                    Car
                  </Card.Subtitle>
                  <Card.Text>
                    {category.description || `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </motion.div>
      </Row>
    </Container>
  );
};

export default CategoryDetail;


