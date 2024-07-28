import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
  Accordion,
  Spinner,
} from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaCheckCircle,
  FaHeart,
  FaEdit,
  FaCar,
  FaTrash,
} from "react-icons/fa";
import car1 from "../../assets/images/car1.png";
import {useDetailsPage} from "./useDetailsPage";
import styles from "./DetailsPage.module.css";
import { MdMessage } from "react-icons/md";

export const DetailsPage = () => {
  const {
    commentText,
    setCommentText,
    formData,
    setFormData,
    editMode,
    setEditMode,
    categories,
    ad,
    adStatus,
    comments,
    commentStatus,
    commentError,
    countries,
    provinces,
    cities,
    cityAreas,
    currentUser,
    handleLike,
    handleSubmitComment,
    handleDeleteComment,
    handleEditToggle,
    handleEditChange,
    handleEditSubmit,
    handleLocation,
    details,
    setDetails,
    handleDelete,
    handleInbox
  } = useDetailsPage();

  if (!ad || !comments) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <Image src={ad.image || car1} fluid className={styles.headerImage} />
        <div className={styles.overlay}>
          <h1 className={styles.overlayText}>{ad.name}</h1>
        </div>
      </div>

      {/* Main Container */}
      <Container className="mt-5">
        <Row >
          {/* Main Content */}
          <Col md={9} >
            {editMode ? (
              <Card className={`${styles.cardShadow} mb-5`}>
                <Card.Body className={styles.editForm}>
                  <Form onSubmit={handleEditSubmit}>
                    <Form.Group controlId="adName">
                      <Form.Label>Ad Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={details.name}
                        onChange={handleEditChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="adDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        rows={3}
                        value={details.description}
                        onChange={handleEditChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="adPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="text"
                        name="price"
                        value={details.price}
                        onChange={handleEditChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="adCategory">
                      <Form.Label>Category   <span className={styles.smallSpan}> (Don't want to change ? Leave it blank)</span></Form.Label>
                      <Form.Control
                        as="select"
                        name="categoryId"
                        value={details.categoryId}
                        onChange={handleEditChange}
                      >
                        <option>Select Category </option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Group controlId="formCountry">
                        <Form.Label>Country <span className={styles.smallSpan}> (Don't want to change ? Leave it blank)</span></Form.Label>
                        <Form.Control
                          as="select"
                          name="country"
                          value={formData.country}
                          onChange={handleLocation}
                        >
                          <option value="">Select a country</option>
                          {countries.map((country) => (
                            <option key={country._id} value={country._id}>
                              {country.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formProvince">
                        <Form.Label>Province <span className={styles.smallSpan}> (Don't want to change ? Leave it blank)</span></Form.Label>
                        <Form.Control
                          as="select"
                          name="province"
                          value={formData.province}
                          onChange={handleLocation}
                        >
                          <option value="">Select a province</option>
                          {provinces.map((province) => (
                            <option key={province._id} value={province._id}>
                              {province.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formCity">
                        <Form.Label>City <span className={styles.smallSpan}> (Don't want to change ? Leave it blank)</span></Form.Label>
                        <Form.Control
                          as="select"
                          name="city"
                          value={formData.city}
                          onChange={handleLocation}
                        >
                          <option value="">Select a city</option>
                          {cities.map((city) => (
                            <option key={city._id} value={city._id}>
                              {city.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formCityArea">
                        <Form.Label>City Area <span className={styles.smallSpan}> (Don't want to change ? Leave it blank)</span></Form.Label>
                        <Form.Control
                          as="select"
                          name="cityArea"
                          value={formData.cityArea}
                          onChange={handleLocation}
                        >
                          <option value="">Select a city area</option>
                          {cityAreas.map((cityArea) => (
                            <option key={cityArea._id} value={cityArea._id}>
                              {cityArea.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="formCityArea">
                        <Form.Label>Privacy</Form.Label>
                        <Form.Control
                          as="select"
                          name="public"
                          value={formData.public}
                          onChange={handleEditChange}
                        >
                          <option value={ad.public}>{ad.public?"Public" : "Private"}</option>
                          <option value={!ad.public}>{!ad.public?"Public" : "Private"}</option>

                        </Form.Control>
                      </Form.Group>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleEditToggle}
                      className="ms-2"
                    >
                      Cancel
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            ) : (
              <Card className={`${styles.cardShadow} mb-5 `}>
                <Card.Body className={styles.cardBody}>
                  {currentUser && ad.postedById._id === currentUser._id && (
                    <>
                    <Button
                      className={styles.editButton}
                      onClick={handleEditToggle}
                    >
                      <FaEdit /> Edit
                    </Button>
                    <Button
                    
                      className={`${styles.deleteButton}`}
                      variant="danger"
                      onClick={handleDelete}
                    >
                      <FaTrash /> Delete
                    </Button>
                    </>
                  )}
                 <Row className="align-items-center mt-5">
  <Col md={6} className="text-center">
    <Image
      src={ad.image}
      roundedCircle
      className={`mb-3 ${styles.profileImage}`}
      alt="Profile Picture"
    />
  </Col>
  <Col md={6}>
    <h3 className={styles.carTitle}>{ad.name}</h3>
    <div className="d-flex flex-wrap align-items-center mt-2">
      <div className="d-flex align-items-center me-3 mb-2">
        <FaMapMarkerAlt className="me-1" style={{ color: "#00b074" }} />
        <span>{ad.cityAreaId.cityId.name}, {ad.cityAreaId.name}</span>
      </div>
      <div className="d-flex align-items-center me-3 mb-2">
        <FaDollarSign className="me-1" style={{ color: "#00b074" }} />
        <span>{ad.price}</span>
      </div>
      <div className="d-flex align-items-center me-3 mb-2">
        <FaCar className="me-1" style={{ color: "#00b074" }} />
        <span>{ad.categoryId.name} Category</span>
      </div>

                        {currentUser && currentUser._id && (
                          <div className={styles.outerDiv}>
                             <button
                              className={styles.likeButton}
                              onClick={handleInbox}
                            >
                              <MdMessage
                               color={"blue"}
                              />
                            </button>
                            <button
                              className={styles.likeButton}
                              onClick={() => handleLike(ad._id)}
                            >
                              <FaHeart
                                className="likeButtonid"
                                color={
                                  ad.likes &&
                                  ad.likes.length > 0 &&
                                  ad.likes.some(
                                    (like) => like.user === currentUser._id
                                  )
                                    ? "red"
                                    : "Gray"
                                }
                              />
                            </button>
                            <div
                              style={{
                                color: "black",
                                fontSize: "15px",
                                position: "absolute",
                                right: "13px",
                              }}
                            >
                              {ad.likes.length}
                            </div>
                           
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <h5 className={styles.sectionTitle}>Car Description</h5>
                  <p>{ad.description}</p>
                  <h5 className={`${styles.sectionTitle} mb-4`}>Features</h5>
                  <ul className={styles.featureList}>
                    <li className={styles.featureItem}>
                      <FaCheckCircle
                        className="me-2"
                        style={{ color: "#00b074" }}
                      />
                      Posted On: {new Date(ad.postedOn).toLocaleDateString()}
                    </li>
                    <li className={styles.featureItem}>
                      <FaCheckCircle
                        className="me-2"
                        style={{ color: "#00b074" }}
                      />
                      Ad Category: {ad.categoryId.name}
                    </li>
                    <li className={styles.featureItem}>
                      <FaCheckCircle
                        className="me-2"
                        style={{ color: "#00b074" }}
                      />
                      Location: {ad.cityAreaId.cityId.name},{" "}
                      {ad.cityAreaId.name}
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            )}

          
          </Col>

          {/* Sidebar */}
          <Col md={3}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>User Name</Accordion.Header>
                <Accordion.Body>{ad.postedById.name || "N/A"}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Published On</Accordion.Header>
                <Accordion.Body>
                  {new Date(ad.postedOn).toLocaleDateString()}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>City Area</Accordion.Header>
                <Accordion.Body>
                  {ad.cityAreaId.cityId.name}, {ad.cityAreaId.name}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Price</Accordion.Header>
                <Accordion.Body>{ad.price}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Contact</Accordion.Header>
                <Accordion.Body>
                  {ad.postedById.contactNumber || "N/A"}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>

          <Col md={9}>
            {/* Comments Section */}
            <Card className={`${styles.cardShadow} mb-5`}>
              <Card.Body className={styles.commentSection}>
                <h5 className={styles.sectionTitle}>Comments</h5>
                {comments.map((comment) => (
                  <div key={comment._id} className={styles.commentContainer}>
                    <Image
                      src={comment.postedById.image}
                      alt="Profile"
                      className={`${styles.commentProfileImage} ${styles.profileImage}`}
                    />
                    <div className={styles.commentDetails}>
                      <p className={styles.commentAuthor}>
                        {comment.postedById.name}
                      </p>

                      <p className={styles.commentText}>{comment.text}</p>
                    </div>
                    {currentUser &&
                      comment.postedById &&
                      comment.postedById._id === currentUser._id && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteComment(comment._id)}
                          className={styles.commentDeleteButton}
                        >
                          Delete
                        </Button>
                      )}
                  </div>
                ))}

                {currentUser && (
                  <Form onSubmit={handleSubmitComment}>
                    <Form.Group controlId="commentText">
                      <Form.Label>Write a Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                    </Form.Group>
                    <Button type="submit" className="mt-3">
                      Submit
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

