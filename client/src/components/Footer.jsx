import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaInfoCircle, FaShieldAlt, FaFileContract, FaBriefcase, FaQuestionCircle, FaEnvelope } from 'react-icons/fa';
import { GrContact } from 'react-icons/gr';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#2b3940',
      color: '#ffffff',
      padding: '40px 0',
    },
    sectionTitle: {
      color: '#00b074',
      borderBottom: '2px solid #00b074',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    icon: {
      marginRight: '10px',
      color: '#00b074',
    },
    link: {
      color: '#ffffff',
      textDecoration: 'none',
      display: 'block',
      marginBottom: '10px',
      transition: 'color 0.3s',
    },
    socialIcon: {
      color: '#ffffff',
      textDecoration: 'none',
      margin: '0 10px',
      transition: 'color 0.3s',
    },
    copyRightText: {
      marginTop: '20px',
      color: '#bbbbbb',
    },
  };

  return (
    <div style={styles.footer}>
      <Container>
        <Row>
          <Col md={3}>
            <h5 style={styles.sectionTitle}>Company</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#about" style={styles.link}>
                  <FaBriefcase style={styles.icon} />
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" style={styles.link}>
                  <GrContact style={styles.icon} />
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#privacy" style={styles.link}>
                  <FaShieldAlt style={styles.icon} />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" style={styles.link}>
                  <FaFileContract style={styles.icon} />
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 style={styles.sectionTitle}>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#faq" style={styles.link}>
                  <FaQuestionCircle style={styles.icon} />
                  FAQ
                </a>
              </li>
              <li>
                <a href="#support" style={styles.link}>
                  <FaEnvelope style={styles.icon} />
                  Support
                </a>
              </li>
              <li>
                <a href="#about" style={styles.link}>
                  <FaInfoCircle style={styles.icon} />
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" style={styles.link}>
                  <GrContact style={styles.icon} />
                  Contact Us
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 style={styles.sectionTitle}>Contact</h5>
            <ul className="list-unstyled">
              <li>Ferozepur Road, Gulberg III, Lahore</li>
              <li>(0300) 1 387 387</li>
              <li>email@gmail.com</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 style={styles.sectionTitle}>Follow Us</h5>
            <p>Stay connected through our social media channels:</p>
            <div>
              <a href="https://www.facebook.com" style={styles.socialIcon} className="social-icon">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.twitter.com" style={styles.socialIcon} className="social-icon">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.instagram.com" style={styles.socialIcon} className="social-icon">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com" style={styles.socialIcon} className="social-icon">
                <FaLinkedin size={20} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-3 text-center">
          <Col>
            <div className="text-center" style={styles.copyRightText}>
              <p>&copy; PakClassified. All Right Reserved. Designed by Team XYZ</p>
            </div>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .social-icon:hover {
          color: #00b074 !important;
        }
        a:hover {
          color: #00b074 !important;
        }
      `}</style>
    </div>
  );
};

export default Footer;
