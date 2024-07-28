import { useState, useEffect } from 'react';
import car1 from '../../assets/images/car1.png';
import car2 from '../../assets/images/car2.png';
import car3 from '../../assets/images/car3.png';
import car4 from '../../assets/images/car1.png';

const useAboutUsPage = () => {
  const images = [car1, car2, car3, car4];

  return {
    images,
  };
};

export default useAboutUsPage;
