import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../redux/thunks/authThunks";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const authError = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(signupUser({ name, email, userName, password, contactNumber, birthDate }));
    }
  };
useEffect(()=>{
  if (status === "succeeded") {
    navigate(-1, { replace: true });
  }
}, [status])
  

  return {
    isLogin,
    setIsLogin,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    contactNumber,
    setContactNumber,
    birthDate,
    setBirthDate,
    userName,
    setUserName,
    handleSubmit,
    authError
  };
};

export default useAuth;
