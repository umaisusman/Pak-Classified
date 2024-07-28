import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import styles from '../styles.module.css';

const CategorySection = ({ categories }) => {
  return (
    <Container className={`my-5 ${styles.categorySectionContainer}`}>
      <h2 className={`text-center ${styles.sectionTitle}`}>Explore By Category</h2>
      <Row>
        {categories.map((category) => (
          <Col lg={3} md={4} sm={6} key={category._id} className="my-3">
            <Card className={`text-center ${styles.categoryCard}`}>
              <Card.Img variant="top" src={category.image} className={styles.categoryImage} />
              <Card.Body>
                <Card.Title className={styles.categoryTitle}>{category.name}</Card.Title>
                <Card.Text className={styles.categoryCount}>
                  {category.adCount === 1 ? `${category.adCount} Car` : `${category.adCount} Cars`}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategorySection;
