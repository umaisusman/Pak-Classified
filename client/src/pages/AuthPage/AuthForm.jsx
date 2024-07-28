import React from "react";
import { Button, Form, Nav } from "react-bootstrap";
import styles from "./AuthForm.module.css";

const AuthForm = ({
  isLogin,
  setIsLogin,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  contactNumber,
  setContactNumber,
  birthDate,
  setBirthDate,
  userName,
  setUserName,
  handleSubmit,
  authError,
}) => {
  return (
    <>
      <Nav
        variant="tabs"
        defaultActiveKey="login"
        className="justify-content-center"
      >
        <Nav.Item>
          <Nav.Link
            eventKey="login"
            active={isLogin}
            onClick={() => setIsLogin(true)}
            className={isLogin ? styles.navLink : styles.navLinkInactive}
          >
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="signup"
            active={!isLogin}
            onClick={() => setIsLogin(false)}
            className={!isLogin ? styles.navLink : styles.navLinkInactive}
          >
            Signup
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <Form.Group controlId="formBasicName" className={styles.formGroup}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicUserName" className={styles.formGroup}>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>
          </>
        )}
        <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        {!isLogin && (
          <>
            <Form.Group
              controlId="formBasicContactNumber"
              className={styles.formGroup}
            >
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicBirthDate" className={styles.formGroup}>
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter birth date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </Form.Group>
          </>
        )}
        <Form.Group controlId="formBasicPassword" className={styles.formGroup}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {authError && (
          <div className={styles.error}>
            {authError === "jwt malformed" ? null : authError}
          </div>
        )}
        <Button variant="primary" type="submit" className={styles.button}>
          {isLogin ? "Login" : "Signup"}
        </Button>
      </Form>
    </>
  );
};

export default AuthForm;
