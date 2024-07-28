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
import car1 from "../assets/images/car1.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMe } from "../redux/thunks/authThunks";
import { userAds } from "../redux/thunks/adThunks";
import ProfilePictureModal from "./ProfilePictureModal";

const savedPosts = [
  {
    id: 1,
    title: "2017 Ford Mustang",
    description: "A sporty car with powerful performance.",
    price: "$25,000",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "2020 BMW 3 Series",
    description: "A luxury car with advanced features.",
    price: "$35,000",
    image: "https://via.placeholder.com/150",
  },
  // Add more saved posts as needed
];

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const ads = useSelector((state) => state.ads.uAds);
  const status = useSelector((state) => state.ads.status);
  const userStatus = useSelector((state) => state.auth.status);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getMe(localStorage.getItem("token")));
    dispatch(userAds(localStorage.getItem("token")));
  }, [dispatch]);

  const handleProfilePictureClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdate = () => {
    dispatch(getMe(localStorage.getItem("token"))); // Re-fetch user data
  };

  const styles = {
    coverPhoto: {
      position: "relative",
      height: "40vh",
      marginBottom: "2rem",
    },
    coverImage: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
    overlay: {
      position: "absolute",
      top: "0",
      left: "0",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    profilePicture: {
      position: "absolute",
      bottom: "-40px",
      left: "30px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    profileImage: {
      width: "150px",
      height: "150px",
      border: "5px solid white",
      background: "white",
    },
    profileInfo: {
      marginLeft: "20px",
      color: "#ffffff",
    },
    profileName: {
      fontWeight: "bold",
      color: "#ffffff",
    },
    inboxButton: {
      position: "absolute",
      right: "30px",
      bottom: "10px",
    },
    myAds: {
      padding: "0 15px",
    },
    savedAds: {
      padding: "0 15px",
    },
  };

  if (!user || !ads || status === "loading" || userStatus === "loading") {
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
  } else {
    return (
      <Container className="mt-5">
        {/* Cover Photo and Profile Picture */}
        <div style={styles.coverPhoto}>
          <Image src={car1} fluid style={styles.coverImage} />
          <div style={styles.overlay}></div>
          <div style={styles.profilePicture} onClick={handleProfilePictureClick}>
            <Image
              src={user.image}
              roundedCircle
              fluid
              style={styles.profileImage}
            />
            <div style={styles.profileInfo}>
              <h3 style={styles.profileName}>{user.name}</h3>
              <p>@{user.userName}</p>
            </div>
          </div>
          <Button variant="primary" style={styles.inboxButton}>
            <FaComments /> Inbox
          </Button>
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
            <Card className="mb-4" style={styles.myAds} key={ad._id}>
              <Row className="no-gutters">
                <Col md={4} style={{ margin: "auto" }}>
                  <Card.Img src={ad.image} />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>
                      {ad.name}{" "}
                      <span
                        style={{
                          fontSize: "13px",
                          border: "2px solid #dc3545",
                          borderRadius: "3px",
                          padding: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        {ad.statusId.name}
                      </span>
                    </Card.Title>
                    <Card.Text>
                      {" "}
                      {ad.description.length > 150
                        ? ad.description.substring(0, 150) + "..."
                        : ad.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Price: </strong>
                      {ad.price}
                    </Card.Text>
                    <Button variant="outline-success">
                      <FaEdit />
                    </Button>
                    <Button variant="outline-primary" className="ml-2">
                      <FaEye />
                    </Button>
                    <Button variant="outline-danger" className="ml-2">
                      <FaTrash />
                    </Button>
                    <Button variant="outline-secondary" className="ml-2">
                      <FaShare />
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Row>
        <Row>
          <h3 className="mb-4">Saved Ads</h3>
          {savedPosts.map((post) => (
            <Card className="mb-4" style={styles.savedAds} key={post.id}>
              <Row className="no-gutters">
                <Col md={4} style={{ margin: "auto" }}>
                  <Card.Img src={post.image} />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    <Card.Text>
                      <strong>Price: </strong>
                      {post.price}
                    </Card.Text>
                    <Button variant="outline-primary" className="ml-2">
                      <FaEye />
                    </Button>
                    <Button variant="outline-danger" className="ml-2">
                      <FaEyeSlash />
                    </Button>
                    <Button variant="outline-secondary" className="ml-2">
                      <FaShare />
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Row>

        <ProfilePictureModal show={showModal} handleClose={handleCloseModal} onUpdate={handleUpdate} />
      </Container>
    );
  }
};
