import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsHouseDoor } from 'react-icons/bs';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <div className={styles.errorText}>
              <h1>404</h1>
              <h2>Oops! Page not found</h2>
              <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
              <Button variant="primary" href="/" className={`mt-3 ${styles.btnPrimary}`}>
                <BsHouseDoor className="mr-2" /> Go to Home
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFoundPage;
