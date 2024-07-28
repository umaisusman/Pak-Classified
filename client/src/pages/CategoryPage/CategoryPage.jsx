// src/pages/CategoryPage/CategoryPage.jsx
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import car1 from "../../assets/images/car1.png";
import CategoryCard from "./CategoryCard";
import useCategoryPage from "./useCategoryPage";
import styles from "./CategoryPage.module.css";

const CategoryPage = () => {
  const { categories, status } = useCategoryPage();

  if (status === "loading" || !categories) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <div>
      {/* Header section */}
      <div className={styles.headerSection}>
        <Image src={car1} fluid className={styles.headerImage} />
        <div className={styles.overlay}>
          <h1 className={styles.overlayText}>Category</h1>
        </div>
      </div>

      {/* Heading between header and cards */}
      <div className={styles.headingSection}>
        <h2 className={styles.headingText}>Our Categories</h2>
      </div>

      {/* Cards section */}
      <Container fluid>
        <Row>
          {categories.map((category) => (
            <Col md={12} className={styles.cardContainer} key={category._id}>
              <CategoryCard category={category} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CategoryPage;
