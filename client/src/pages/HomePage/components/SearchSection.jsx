import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchAd } from '../../../redux/thunks/adThunks';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles.module.css';

const SearchSection = ({ cities, categories }) => {
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [cityId, setCityId] = useState('');
  const [showCards, setShowCards] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchedAds = useSelector((state) => state.ads.searchedAds);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryId === 'Select Category') {
      setCategoryId(undefined);
    }
    if (cityId === 'Select Location') {
      setCityId(undefined);
    }
    if (keyword === '') {
      setKeyword(undefined);
    }
    dispatch(searchAd({ keyword, categoryId, cityId }));
    setShowCards(true);
  };

  const handleCloseCards = () => {
    setShowCards(false);
  };

  const handleReadMore = (adId) => {
    setTimeout(() => navigate(`/ads/${adId}`), 1000);
  };

  return (
    <Container className={styles.searchSectionContainer} id="search">
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col sm={3} className="p-3">
            <Form.Control
              type="text"
              placeholder="Keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Col>
          <Col sm={3} className="p-3">
            <Form.Control
              as="select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={styles.searchSelect}
            >
              <option>Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col sm={3} className="p-3">
            <Form.Control
              as="select"
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              className={styles.searchSelect}
            >
              <option>Select Location</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col sm={3} className="p-3">
            <Button type="submit" className={styles.searchButton}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      {showCards && (
        <div className={styles.searchResultsContainer}>
          <FaTimes className={styles.closeIcon} onClick={handleCloseCards} />
          {!searchedAds || searchedAds.length === 0 ? (
            <div className={styles.noResultsMessage}>No Ads Found</div>
          ) : (
            <Row className={styles.searchResultsGrid}>
              {searchedAds.map((ad) => (
                <Col md={6} key={ad._id} className="my-3">
                  <Card className={styles.searchResultCard}>
                    <Card.Img variant="top" src={ad.image} className={styles.searchResultImage} />
                    <Card.Body>
                      <Card.Title className={styles.searchResultTitle}>{ad.name}</Card.Title>
                      <Card.Text className={styles.searchResultDescription}>
                        {ad.description.length > 150 ? `${ad.description.substring(0, 150)}...` : ad.description}
                        <a href="#" className={styles.readMoreLink} onClick={() => handleReadMore(ad._id)}>
                          Read More.
                        </a>
                      </Card.Text>
                      <Button
                        onClick={() => handleReadMore(ad._id)}
                        className={styles.moreDetailButton}
                      >
                        More Detail
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </Container>
  );
};

export default SearchSection;
