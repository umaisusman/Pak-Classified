import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaYoutube, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export  const ShareModal = ({ show, handleClose, adUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(adUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Share Ad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
        <Form.Control value={adUrl} readOnly />
        <InputGroup.Text id="basic-addon2" as="button" onClick={handleCopy}>
        
              {copied ? 'Copied!' : 'Copy Link'}
            
        </InputGroup.Text>
      </InputGroup>
        <div className="d-flex justify-content-center">
          <Button variant="danger" className="mx-2">
            <FaYoutube /> YouTube
          </Button>
          <Button variant="primary" className="mx-2">
            <FaFacebook /> Facebook
          </Button>
          <Button variant="info" className="mx-2">
            <FaTwitter /> Twitter
          </Button>
          <Button variant="primary" className="mx-2">
            <FaLinkedin /> LinkedIn
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

