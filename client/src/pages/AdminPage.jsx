// src/components/AdminPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds } from "../redux/thunks/adThunks";
import { getCategories } from "../redux/thunks/categoryThunks";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const AdminPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAds());
    dispatch(getCategories());
  }, [dispatch]);

  const ads = useSelector((state) => state.ads.ads);
  const categories = useSelector((state) => state.categories.categories);

  const styles = {
    container: {
      backgroundColor: "#f8f9fa",
      padding: "30px",
      borderRadius: "10px",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      color: "#00b074",
    },
    sectionTitle: {
      color: "#00b074",
      marginBottom: "20px",
    },
    card: {
      border: "1px solid #00b074",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
    },
    cardTitle: {
      color: "#00b074",
      fontWeight: "bold",
    },
    cardText: {
      color: "#555",
    },
    buttonGroup: {
      marginTop: "20px",
      display: "flex",
      justifyContent: "center",
    },
    customButton: {
      backgroundColor: "#00b074",
      border: "none",
      marginLeft: "10px",
    },
    customButtonHover: {
      backgroundColor: "#008c61",
    },
    cardImageStyle: {
      height: "200px",
      objectFit: "cover",
    },
  };

  return (
    <Container style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>
      <h2 style={styles.sectionTitle}>Advertisements</h2>
      <Row>
        {ads.map((ad) => (
          <Col key={ad._id} md={4}>
            <Card style={styles.card}>
              <Card.Body>
                <Card.Title style={styles.cardTitle}>{ad.name}</Card.Title>
                <Card.Text style={styles.cardText}>{ad.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h2 style={styles.sectionTitle}>Categories</h2>
      <Row>
        {categories.map((category) => (
          <Col key={category._id} md={4}>
            <Card style={styles.card}>
              <Card.Body>
                <Card.Title style={styles.cardTitle}>{category.name}</Card.Title>
                <Card.Img
                  variant="top"
                  src={category.image}
                  style={styles.cardImageStyle}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={styles.buttonGroup}>
        <Button style={styles.customButton}>Add New Advertisement</Button>
        <Button style={styles.customButton}>Add New Category</Button>
      </div>
    </Container>
  );
};

export default AdminPage;
