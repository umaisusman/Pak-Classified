import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAboutUsPage from './useAboutUsPage';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  const { images } = useAboutUsPage();

  const styles = {
    heroSection: {
      position: 'relative',
      textAlign: 'center',
      color: 'white',
    },
    heroImage: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      filter: 'blur(1px)',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(43, 57, 64, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlayText: {
      fontSize: '3rem',
      fontWeight: 'bold',
      zIndex: 1,
    },
    contentSection: {
      backgroundColor: '#f8f9fa',
      padding: '40px 0',
    },
    imageRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
    },
    image: {
      width: '48%',
      height: 'auto',
    },
    heading: {
      color: '#2b3940',
      marginBottom: '20px',
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    paragraph: {
      fontSize: '1rem',
      color: '#4a4a4a',
      marginBottom: '20px',
    },
    icon: {
      color: '#00b074',
      marginRight: '10px',
    },
    buttonGroup: {
      marginTop: '20px',
    },
    socialButton: {
      backgroundColor: '#00b074',
      border: 'none',
      marginRight: '10px',
    },
    lastSocialButton: {
      backgroundColor: '#00b074',
      border: 'none',
    },
    list: {
      listStyle: 'none',
      paddingLeft: 0,
      marginBottom: '20px',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      color: '#4a4a4a',
      fontSize: '1rem',
    },
  };

  return (
    <div>
      <div style={styles.heroSection}>
        <Image src={images[0]} fluid style={styles.heroImage} />
        <div style={styles.overlay}>
          <h1 style={styles.overlayText}>About Us</h1>
        </div>
      </div>
      <div style={styles.contentSection}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div style={styles.imageRow}>
                <Image src={images[0]} fluid style={styles.image} />
                <Image src={images[1]} fluid style={styles.image} />
              </div>
              <div style={styles.imageRow}>
                <Image src={images[2]} fluid style={styles.image} />
                <Image src={images[3]} fluid style={styles.image} />
              </div>
            </Col>
            <Col md={6}>
              <h2 style={styles.heading}>Our Work</h2>
              <p style={styles.paragraph}>
                <FaCheckCircle style={styles.icon} />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec turpis condimentum, mollis neque vel, feugiat dui. Donec sed justo ac turpis convallis iaculis. Nulla ultrices ligula eu tellus venenatis, id tempus risus placerat.
              </p>
              <p style={styles.paragraph}>
                <FaCheckCircle style={styles.icon} />
                Integer rutrum nisl eget libero luctus, at malesuada sapien fringilla. Mauris ultrices, nisl et scelerisque malesuada, enim odio tristique nunc, nec tristique nunc justo id sapien. Nullam condimentum, elit nec lacinia dapibus, lacus felis vestibulum lacus, at tincidunt ipsum mi a sem. Vestibulum tristique augue eget ex tincidunt, at bibendum dolor viverra.
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <FaCheckCircle style={styles.icon} />
                  Customer Support
                </li>
                <li style={styles.listItem}>
                  <FaCheckCircle style={styles.icon} />
                  Technical Assistance
                </li>
                <li style={styles.listItem}>
                  <FaCheckCircle style={styles.icon} />
                  Feedback and suggestion
                </li>
              </ul>
              <div style={styles.buttonGroup}>
                <Button style={styles.socialButton} onClick={() => window.open("https://www.facebook.com")}>
                  <FaFacebook size={20} color="#ffffff" />
                </Button>
                <Button style={styles.socialButton} onClick={() => window.open("https://www.twitter.com")}>
                  <FaTwitter size={20} color="#ffffff" />
                </Button>
                <Button style={styles.lastSocialButton} onClick={() => window.open("https://www.instagram.com")}>
                  <FaInstagram size={20} color="#ffffff" />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AboutUsPage;
