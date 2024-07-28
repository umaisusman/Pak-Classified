import React from 'react';
import { Card, Col, Row , Container } from 'react-bootstrap';
import { FaBookmark, FaHeart, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from '../styles.module.css';
import { FaBookBookmark } from 'react-icons/fa6';

const AdvertisementListing = ({ advertisements, user, handleLike, handleSave }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <h2 id='AdListing' className={`text-center ${styles.sectionTitle}`}>Advertisement Listing</h2>

    <Row>
      {advertisements.map((ad) => (
        <Col md={6} key={ad._id} className="my-3">
          <Card>
            <div className={styles.cardImageContainer}>
              <Card.Img variant="top" src={ad.image} className={styles.advertisementImage} />
              {user && user._id && (
                <button className={styles.likeButton} onClick={() => handleLike(ad._id)}>
                  <FaHeart
                    color={
                      ad.likes &&
                      ad.likes.length > 0 &&
                      ad.likes.some((like) => like.user === user._id)
                        ? 'red'
                        : 'white'
                    }
                  />
                </button>
              )}
              {user && user._id && (
                <button className={styles.saveButton} onClick={() => handleSave(ad._id)}>
                  <FaBookmark
                    color={
                      ad.saved &&
                      ad.saved.length > 0 &&
                      ad.saved.some((save) => save.user === user._id)
                        ? 'yellow'
                        : 'white'
                    }
                  />
                </button>
              )}
            </div>
            <Card.Body>
              <Card.Title>{ad.name}</Card.Title>
              <Card.Text>
                {ad.description.length > 150 ? `${ad.description.substring(0, 150)}...` : ad.description}
                <a href="#" className={styles.readMoreLink} onClick={() => setTimeout(() => navigate(`/ads/${ad._id}`), 1000)}>
                  Read More.
                </a>
              </Card.Text>
              <button
                className={`btn btn-primary ${styles.moreDetailButton}`}
                onClick={() => setTimeout(() => navigate(`/ads/${ad._id}`), 1000)}
              >
                More Detail
              </button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </Container>
  );
};

export default AdvertisementListing;
