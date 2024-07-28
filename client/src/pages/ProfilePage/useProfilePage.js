import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, getSavedAds } from '../../redux/thunks/authThunks';
import { deleteAd, removeSaveAd, saveAd, userAds } from '../../redux/thunks/adThunks';
import { useNavigate } from 'react-router-dom';

const savedPosts = [
  {
    id: 1,
    title: '2017 Ford Mustang',
    description: 'A sporty car with powerful performance.',
    price: '$25,000',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: '2020 BMW 3 Series',
    description: 'A luxury car with advanced features.',
    price: '$35,000',
    image: 'https://via.placeholder.com/150',
  },
  // Add more saved posts as needed
];

export const useProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const ads = useSelector((state) => state.ads.uAds);
  const status = useSelector((state) => state.ads.status);
  const userStatus = useSelector((state) => state.auth.status);
  const savedAds = useSelector((state) => state.auth.savedAds);
  	console.log('savedAds:', savedAds)
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getMe(localStorage.getItem('token')));
    dispatch(userAds(localStorage.getItem('token')));
    dispatch(getSavedAds())
  }, [dispatch]);

  const handleProfilePictureClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdate = () => {
    dispatch(getMe(localStorage.getItem('token'))); // Re-fetch user data
  };

  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const handleShowShareModal = (ad) => {
    setSelectedAd(ad);
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
    setSelectedAd(null);
  };
  const handleDelete = (id) => {
    dispatch(deleteAd(id))

    dispatch(userAds(localStorage.getItem('token')));
  };

  const handleRemoveSaved = (id) => {
    dispatch(removeSaveAd({ id })).then(()=>{
    dispatch(getSavedAds())
    })
  };

  return {
    user,
    ads,
    status,
    userStatus,
    showModal,
    handleProfilePictureClick,
    handleCloseModal,
    handleUpdate,
    savedPosts,
    handleShowShareModal,
    handleCloseShareModal,
    showShareModal, setShowShareModal,
    selectedAd, setSelectedAd,
    navigate, handleDelete,
    savedAds, handleRemoveSaved


  };
};

export default useProfilePage;
