import React, { useState } from 'react';
import { Modal, Button, Form, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture, removeProfilePicture } from '../../redux/slices/profileSlice';
import { FaUpload, FaTrashAlt, FaEye } from 'react-icons/fa';

const ProfilePictureModal = ({ show, handleClose, onUpdate }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.profile.status);
  const user = useSelector((state) => state.auth.user);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Show a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpdatePicture = () => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    dispatch(updateProfilePicture(formData)).then(() => {
      setUploading(false);
      handleClose();
      onUpdate();
    });
  };

  const handleRemovePicture = () => {
    dispatch(removeProfilePicture()).then(() => {
      handleClose();
      onUpdate();
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Upload new profile picture</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        </Form>
        {uploading && <Spinner animation="border" />}
        {!uploading && preview && <Image src={preview} fluid />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => window.open(user.image)} disabled={uploading}>
          <FaEye /> Show Image
        </Button>
        <Button variant="secondary" onClick={handleClose} disabled={uploading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdatePicture} disabled={uploading || !file}>
          <FaUpload /> Update
        </Button>
        <Button variant="danger" onClick={handleRemovePicture} disabled={uploading}>
          <FaTrashAlt /> Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfilePictureModal;
