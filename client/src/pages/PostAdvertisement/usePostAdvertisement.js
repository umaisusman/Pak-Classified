import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAd } from '../../redux/thunks/adThunks';
import { useNavigate } from 'react-router-dom';
import {
  fetchCountries,
  fetchProvincesByCountry,
  fetchCitiesByProvince,
  fetchCityAreasByCity,
} from '../../redux/thunks/locationThunks';
import { getCategories } from '../../redux/thunks/categoryThunks';

const usePostAdvertisement = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    categoryId: '',
    cityAreaId: '',
    image: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countries = useSelector((state) => state.location.countries);
  const provinces = useSelector((state) => state.location.provinces);
  const cities = useSelector((state) => state.location.cities);
  const cityAreas = useSelector((state) => state.location.cityAreas);
  const categories = useSelector((state) => state.categories.categories);
  const adStatus = useSelector((state)=>state.ads.status)

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(getCategories());
  }, [dispatch]);

  const handleLocation = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      const newFormData = {
        ...prevData,
        [name]: value,
      };

      if (name === 'country') {
        newFormData.province = '';
        newFormData.city = '';
        newFormData.cityAreaId = '';
        dispatch(fetchProvincesByCountry(value));
      } else if (name === 'province') {
        newFormData.city = '';
        newFormData.cityAreaId = '';
        dispatch(fetchCitiesByProvince(value));
      } else if (name === 'city') {
        newFormData.cityAreaId = '';
        dispatch(fetchCityAreasByCity(value));
      }

      return newFormData;
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(createAd(formData));
    if (createAd.fulfilled.match(resultAction)) {
      const adId = resultAction.payload._id;
      navigate(`/ads/${adId}`);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleLocation,
    countries,
    provinces,
    cities,
    cityAreas,
    categories,
    adStatus,
  };
};

export default usePostAdvertisement;
