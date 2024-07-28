import React from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import car1 from '../../../assets/images/car1.png';
import car2 from '../../../assets/images/car2.png';
import car3 from '../../../assets/images/car3.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from '../../../redux/thunks/authThunks';
import styles from '../styles.module.css';

export const HeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe(localStorage.getItem('token')));
  }, [dispatch]);

  const authError = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);

  const handleClick = () => {
    if (authError || status === 'rejected') {
      navigate('/auth');
    } else {
      navigate('/postad');
    }
  };

  return (
    <div className={styles.heroSection}>
      <Carousel controls={false} indicators={false} interval={3000}>
        <Carousel.Item>
          <img src={car1} alt="Car 1" className={`${styles.carouselImage} d-block w-100`} />
        </Carousel.Item>
        <Carousel.Item>
          <img  src={car2} alt="Car 2" className={`${styles.carouselImage} d-block w-100`} />
        </Carousel.Item>
        <Carousel.Item>
          <img  src={car3} alt="Car 3" className={`${styles.carouselImage} d-block w-100`} />
        </Carousel.Item>
      </Carousel>
      <div className={styles.overlay}>
        <Container className={`text-center ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Shift Into Gear: Your Destination for Car Excellence.</h1>
          <p className={styles.heroText}>Accelerate Your Search: Your Road to Car Happiness Begins Here</p>
          <Button href="#search" className={styles.postButton}>
            Search A Car
          </Button>
          <Button onClick={handleClick} className={styles.postButton2}>
            Post Advertisement 
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
