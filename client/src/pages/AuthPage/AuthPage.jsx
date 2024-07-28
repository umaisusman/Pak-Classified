import React from "react";
import { Container } from "react-bootstrap";
import AuthForm from "./AuthForm";
import useAuth from "./useAuth";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  const {
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
  } = useAuth();

  return (
    <Container className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>{isLogin ? "Login" : "Signup"}</h2>
      </div>
      <AuthForm
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        contactNumber={contactNumber}
        setContactNumber={setContactNumber}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        userName={userName}
        setUserName={setUserName}
        handleSubmit={handleSubmit}
        authError={authError}
      />
    </Container>
  );
};

export default AuthPage;
