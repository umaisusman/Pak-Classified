import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAds, likeAd, saveAd } from '../../redux/thunks/adThunks';
import { getCategories } from '../../redux/thunks/categoryThunks';
import { getCities } from '../../redux/thunks/cityThunks';
import { getMe } from '../../redux/thunks/authThunks';

const useHomePage = () => {
  const dispatch = useDispatch();
  const advertisements = useSelector((state) => state.ads.ads);
  	console.log('advertisements:', advertisements)
  const categories = useSelector((state) => state.categories.categories);
  const cities = useSelector((state) => state.cities.cities);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getAds());
    dispatch(getCategories());
    dispatch(getCities());
    dispatch(getMe(localStorage.getItem('token')));
  }, [dispatch]);

  const handleLike = (id) => {
  	console.log('id:', id)
    const token = localStorage.getItem('token');
    dispatch(likeAd({ id, token }))
      .then(() => dispatch(getAds()))
      .catch((error) => console.log(error));
  };

  const handleSave = (id) => {
  	console.log('id:', id)
    dispatch(saveAd({ id }))
      .then(() => dispatch(getAds()))
      .catch((error) => console.log(error));
  };

  return {
    advertisements,
    categories,
    cities,
    user,
    handleLike,
    handleSave
  };
};

export default useHomePage;
