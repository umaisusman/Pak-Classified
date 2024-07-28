import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Image,
  Spinner,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import CustomLinkContainer from "./CustomLinkContainer";
import { useNavigate, Link } from "react-router-dom";
import { getMe } from "../redux/thunks/authThunks";
import VerificationModal from "./verificationModal";

export const NavbarComponent = () => {
  const auth = useSelector((state) => state.auth);
  console.log("auth:", auth);
  const status = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getMe(localStorage.getItem("token")));
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (auth.user && !auth.user.isVerified) {
      setShowModal(true);
    }
  }, [auth.user]);

  const handleLogout = () => {
    dispatch(logout());

    setTimeout(() => {
      navigate("/");
    }, 500); // Adding a timeout of 500ms
  };

 

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderAuthButtons = () => {
    if (authError === "jwt malformed" || authError === "jwt expired") {
      localStorage.removeItem("token");
      return (
        <Link
          to="/auth"
          className="btn btn-success"
          style={{ marginRight: "10px" }}
        >
          Login
        </Link>
      );
    }

    if (auth.token) {
      return (
        <>
          {auth.user ? (
            <>
              <Nav.Link onClick={handleLogout} style={styles.link}>
                Logout
              </Nav.Link>
              <CustomLinkContainer to="/profile">
                <Image
                  src={auth.user.image}
                  roundedCircle
                  style={{ height: "40px", width:"40px", marginLeft: "10px" }}
                />
              </CustomLinkContainer>
            </>
          ) : (
            <Spinner animation="border" role="status" />
          )}
        </>
      );
    } else {
      return (
        <Link
          to="/auth"
          className="btn btn-success"
          style={{ marginRight: "10px" }}
        >
          Login
        </Link>
      );
    }
  };

  // if (status === "loading" || !auth.user) {
  //   return (
  //     <Container className="d-flex justify-content-center align-items-center">
  //       <Spinner animation="border" role="status" />
  //     </Container>
  //   );
  // }

  const styles = {
    navbar: {
      backgroundColor: "#ffffff",
      margin: "15px 5px",
      height: "40px",
      zIndex: "20",
    },
    brand: {
      color: "#00b074",
      cursor: "pointer",
      fontWeight: "900",
      fontSize: "30px",
    },
    link: {
      color: "#2b3940",
      fontSize: "1.1rem",
    },
  };

  return (
    <>
      <Navbar bg="light" expand="lg" style={styles.navbar}>
        <Container fluid style={{ backgroundColor: "#ffffff", padding: "0" }}>
          <CustomLinkContainer to="/">
            <Navbar.Brand style={styles.brand}>Pak Classified</Navbar.Brand>
          </CustomLinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav>
              <CustomLinkContainer to="/">
                <Nav.Link style={styles.link}>Home</Nav.Link>
              </CustomLinkContainer>
              <CustomLinkContainer to="/about">
                <Nav.Link style={styles.link}>About</Nav.Link>
              </CustomLinkContainer>
              <CustomLinkContainer to="/categories">
                <Nav.Link style={styles.link}>Categories</Nav.Link>
              </CustomLinkContainer>
              <CustomLinkContainer to="/contact">
                <Nav.Link style={styles.link}>Contact</Nav.Link>
              </CustomLinkContainer>
            </Nav>
            {renderAuthButtons()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <VerificationModal
        show={showModal}
        handleClose={handleCloseModal}
      />
    </>
  );
};

