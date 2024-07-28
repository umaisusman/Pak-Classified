import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import {
  FaEnvelope,
  FaPhone,
  FaEye,
  FaComments,
  FaEdit,
  FaTrash,
  FaShare,
  FaEyeSlash,
} from "react-icons/fa";
import car1 from "../../assets/images/car1.png";
import { useProfilePage } from "./useProfilePage";
import styles from "./ProfilePage.module.css";
import ProfilePictureModal from "./ProfilePictureModal";
import { ShareModal } from "./ShareModal";
import { MdBookmarkRemove } from "react-icons/md";

const ProfilePage = () => {
  const {
    user,
    ads,
    status,
    userStatus,
    showModal,
    handleProfilePictureClick,
    handleCloseModal,
    handleUpdate,
    savedPosts,
    handleCloseShareModal,
    handleShowShareModal,
    showShareModal,
    setShowShareModal,
    selectedAd,
    setSelectedAd,
    navigate,
    handleDelete,
    savedAds,
    handleRemoveSaved,
  } = useProfilePage();

  if (!user || !ads || !savedAds) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      {/* Cover Photo and Profile Picture */}
      <div className={styles.coverPhoto}>
        <Image src={car1} fluid className={styles.coverImage} />
        <div className={styles.overlay}></div>
        <div
          className={styles.profilePicture}
          onClick={handleProfilePictureClick}
        >
          <Image
            src={user.image}
            roundedCircle
            fluid
            className={styles.profileImage}
          />
          <div className={styles.profileInfo}>
            <h3 className={styles.profileName}>{user.name}</h3>
            <p>@{user.userName}</p>
          </div>
        </div>
      </div>

      <Row>
        <Col md={4}>
          <Card className="mb-4 text-center mt-4">
            <ListGroup variant="flush">
              <ListGroupItem>
                <strong>{ads.impressionsSum}</strong> Impressions
              </ListGroupItem>
              <ListGroupItem>
                <strong>{ads.likesSum}</strong> Likes
              </ListGroupItem>
              <ListGroupItem>
                <strong>{ads.userAds.length}</strong> Ads
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h3>Profile Details</h3>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <FaEnvelope /> {user.email}
              </Card.Text>
              <Card.Text>
                <FaPhone /> {user.contactNumber}
              </Card.Text>
              <Card.Text>
                Some more details about the userdata can go here.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <h3 className="mb-4">My Ads</h3>
        {ads.userAds.map((ad) => (
          <Card className={`${styles.myAds} mb-4`} key={ad._id}>
            <Row className="no-gutters">
              <Col md={4} className="d-flex align-items-center p-1">
                <Card.Img src={ad.image}  style={{
                      height: '200px',
                      width: '100%',
                      borderRadius: '5px',
                      objectFit: 'cover',
                      overflow: 'hidden',
                    }} className={styles.adImage} />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title>
                    {ad.name}{" "}
                    {ad.statusId.name === "pending" && (
                      <span className={styles.statusPending}>
                        (Pending For Public)
                      </span>
                    )}
                    {ad.statusId.name === "approved" && (
                      <span className={styles.statusApproved}>(Approved)</span>
                    )}
                    {ad.statusId.name === "rejected" && (
                      <span className={styles.statusRejected}>
                        (Pending For Rejected)
                      </span>
                    )}
                  </Card.Title>

                  <Card.Text>
                    {ad.description.length > 150
                      ? ad.description.substring(0, 150) + "..."
                      : ad.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price: </strong>
                    {ad.price}
                  </Card.Text>
                  <Button
                    variant="warning"
                    className="ml-2"
                    onClick={() => navigate(`/ads/${ad._id}`)}
                  >
                    <FaEye /> View
                  </Button>
                  <span> </span>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => handleDelete(ad._id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                  <span> </span>
                  <Button
                    variant="secondary"
                    className="ml-2"
                    onClick={() => handleShowShareModal(ad)}
                  >
                    <FaShare /> Share
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </Row>
      <Row>
        <h3 className="mb-4">Saved Ads</h3>
        {savedAds.map((savedAd) => (
          <Card className={`${styles.savedAds} mb-4`} key={savedAd._id}>
            <Row className="no-gutters">
              <Col md={4} className="d-flex align-items-center p-1">
                <Card.Img src={savedAd.image}  style={{
                      height: '200px',
                      width: '100%',
                      borderRadius: '5px',
                      objectFit: 'cover',
                      overflow: 'hidden',
                    }} className={styles.adImage} />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title>{savedAd.name}</Card.Title>
                  <Card.Text>
                    {savedAd.description.length > 150
                      ? savedAd.description.substring(0, 150) + "..."
                      : savedAd.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price: </strong>
                    {savedAd.price}
                  </Card.Text>
                  <Button
                    variant="warning"
                    className="ml-2 mx-1"
                    onClick={() => navigate(`/ads/${savedAd._id}`)}
                  >
                    <FaEye /> View
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => handleRemoveSaved(savedAd._id)}
                  >
                    <MdBookmarkRemove /> Remove
                  </Button>
                  <Button
                    variant="secondary"
                    className="ml-2 mx-1"
                    onClick={() => handleShowShareModal(savedAd)}
                  >
                    <FaShare /> Share
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </Row>

      <ProfilePictureModal
        show={showModal}
        handleClose={handleCloseModal}
        onUpdate={handleUpdate}
      />
      <ShareModal
        show={showShareModal}
        handleClose={handleCloseShareModal}
        adUrl={`http://localhost:5173/ads/${selectedAd?._id}`}
      />
    </Container>
  );
};
export default ProfilePage;
