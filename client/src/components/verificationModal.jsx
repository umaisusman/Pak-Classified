import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resendVerification, verifyEmail } from "../redux/thunks/authThunks";

const VerificationModal = ({ show, handleClose }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { status, error, user, message } = useSelector((state) => state.auth);
  const [infoMessage, setInfoMessage] = useState(null);
  const [successMessage , setSuccessMessage] = useState(null)

  const resendVerificationEmail = () => {
    setInfoMessage(<Spinner animation="border" role="status" />)
      dispatch(resendVerification())
      
  };
  
  useEffect(()=>{
    if(status === "succeeded" && message){
    setInfoMessage(message)
  }
  }, [message , status, user])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    status ===  "loading" ? setInfoMessage(<Spinner animation="border" role="status" />) : null
    const token = localStorage.getItem("token");
    dispatch(verifyEmail({ otp, token }));
  };
 
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Email Verification Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please verify your email address to continue using our services.</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="otp">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            style={{
              marginTop: "20px",
              backgroundColor: "#00b074",
              borderColor: "#00b074",
            }}
          >
            Submit OTP
          </Button>
          {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
          {successMessage}
        </Form>
        <Button
          variant="primary"
          onClick={resendVerificationEmail}
          style={{
            marginTop: "20px",
            backgroundColor: "#00b074",
            borderColor: "#00b074",
          }}
        >
          Resend Verification Email
        </Button>
        <div>{infoMessage}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerificationModal;
