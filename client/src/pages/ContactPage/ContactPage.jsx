import React, { useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Image, Spinner } from "react-bootstrap";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import car1 from "../../assets/images/car1.png";
import { getMe } from "../../redux/thunks/authThunks";
import { useNavigate } from "react-router-dom";
import styles from "./ContactPage.module.css";
import useContactPage from "./useContactPage";

export const ContactPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const {
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    successMessage,
    emailError,
    emailStatus,
    handleSubmit,
  } = useContactPage();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getMe(localStorage.getItem("token")));
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, setName, setEmail]);

  if (status === "loading" || (status !== "succeeded" && !authError)) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </Container>
    );
  }

  return (
    <Container fluid className={styles.container}>
      <div className={styles.headerSection}>
        <Image src={car1} fluid className={styles.headerImage} />
        <div className={styles.overlay}>
          <h1 className={styles.overlayText}>Contact Us</h1>
        </div>
      </div>

      <Row className={styles.cardSection}>
        <Col xs={12}>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <h2 className={styles.cardTitle}>Contact For Any Query</h2>
              <Row>
                <Col xs={4}>
                  <FaMapMarkerAlt size={24} className={styles.icon} />
                  <p>Gulberg III, Lahore</p>
                </Col>
                <Col xs={4}>
                  <FaEnvelope size={24} className={styles.icon} />
                  <p>evs@gmail.com</p>
                </Col>
                <Col xs={4}>
                  <FaPhoneAlt size={24} className={styles.icon} />
                  <p>0300 1 387 387</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34045.80106678057!2d74.35671514999999!3d31.5204018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919058321571d19%3A0x8952926724471411!2sGulberg%20III%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1701716176078!5m2!1sen!2sus"
                width="100%"
                height="450"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={styles.mapFrame}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>
                {emailError && (
                  <div
                    className="error"
                    style={{ color: "red", marginBottom: "1rem" }}
                  >
                    {emailError}
                  </div>
                )}

                {successMessage && (
                  <div
                    className="error"
                    style={{ color: "green", marginBottom: "1rem" }}
                  >
                    {successMessage}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.formButton}
                  >
                    {emailStatus === "loading" ? (
                      <Spinner animation="border" role="status" />
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
