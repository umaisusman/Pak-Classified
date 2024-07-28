import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAd, fetchAd, likeAd, updateAd } from "../../redux/thunks/adThunks";
import {
  postComment,
  deleteComment,
  fetchComments,
} from "../../redux/thunks/commentsThunks";
import { getCategories } from "../../redux/thunks/categoryThunks";
import {
  fetchCitiesByProvince,
  fetchCityAreasByCity,
  fetchCountries,
  fetchProvincesByCountry,
} from "../../redux/thunks/locationThunks";
import { accessChat } from "../../redux/thunks/chatThunks";

export const useDetailsPage = () => {
  const [commentText, setCommentText] = useState("");
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ad = useSelector((state) => state.ads.ad);

  const [details, setDetails] = useState({
    name: "",
    categoryId: "",
    cityAreaId: "",
    description: "",
    price: "",
    public: "",
  });
  console.log('details:', details)

  useEffect(() => {
    dispatch(fetchAd(id));
    dispatch(fetchComments(id));
    dispatch(getCategories());
    dispatch(fetchCountries()); 
  }, [dispatch, id]);

  console.log('ad' , ad);
  useEffect(() => {
    if (ad) {
      setDetails({
        name: ad.name,
        description: ad.description,
        price: ad.price,
        public:ad.public,
      });
    }

  }, [ad,setDetails]);
  const categories = useSelector((state) => state.categories.categories);
  const adStatus = useSelector((state) => state.ads.status);
  const comments = useSelector((state) => state.comments.comments);
  const commentStatus = useSelector((state) => state.comments.status);
  const commentError = useSelector((state) => state.comments.error);

  const countries = useSelector((state) => state.location.countries);
  const provinces = useSelector((state) => state.location.provinces);
  const cities = useSelector((state) => state.location.cities);
  const cityAreas = useSelector((state) => state.location.cityAreas);
  const currentUser = useSelector((state) => state.auth.user);

  const handleLike = () => {
    if (!currentUser) {
      navigate("/auth");
      return;
    }

    const token = localStorage.getItem("token");
    dispatch(likeAd({ id: id, token }))
      .then(() => dispatch(fetchAd(id)))
      .catch((error) => console.error(error));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/auth");
      return;
    }
    if (!commentText.trim()) return;
    dispatch(postComment({ adId: ad._id, text: commentText }));
    setCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleEditChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDetails({
       ...details,
       [name]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAd({ id: ad._id, adData: details })).then(() => {
      setEditMode(false);
      dispatch(fetchAd(id));
    });
  };

  const handleLocation = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      const newFormData = {
        ...prevData,
        [name]: value,
      };

      if (name === "country") {
        newFormData.province = "";
        newFormData.city = "";
        newFormData.cityAreaId = "";
        dispatch(fetchProvincesByCountry(value));
      } else if (name === "province") {
        newFormData.city = "";
        newFormData.cityAreaId = "";
        dispatch(fetchCitiesByProvince(value));
      } else if (name === "city") {
        newFormData.cityAreaId = "";
        dispatch(fetchCityAreasByCity(value));
      } else if(name === "cityArea") {
        setDetails({
          ...details,
          cityAreaId: value,
        });
      }

      return newFormData;
    });
  };

  const handleDelete = () => {
    dispatch(deleteAd(id));
    navigate('/#AdListing');
  };

  const handleInbox = ()=>{
    if(ad.postedById !== currentUser._id){
      dispatch(accessChat(ad.postedById))
      navigate('/chat');
    }
  }

  return {
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
  };
};
