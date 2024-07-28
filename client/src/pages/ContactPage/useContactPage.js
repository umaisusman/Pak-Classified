import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replyEmail, sentEmail } from "../../redux/thunks/emailThunk";

const useContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const emailError = useSelector((state) => state.email.error);
  const emailStatus = useSelector((state) => state.email.status);
  const emailMessage = useSelector((state) => state.email.email);

  useEffect(() => {
    if (emailStatus === "succeeded") {
      setSuccessMessage("Email Sent successfully");
      setSubject("");
      setMessage("");
    }
  }, [emailStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      sentEmail({
        to: "waleedahmad4015394@gmail.com",
        subject,
        text: `from ${name} \n email : ${email} \n message : ${message}`,
      })
    )
      .then(() => {
        dispatch(
          replyEmail({
            to: email,
            subject: "Thank You For Contacting Us!",
            text: `Dear ${name}, \n Thank you for reaching out to Pak Classified. We appreciate your interest and the opportunity to assist you. \n \n Your message is important to us, and we have received your inquiry. Our team is currently reviewing the details and will get back to you within a day with a comprehensive response. \n \n In the meantime, if you have any additional information or questions, please feel free to reply to this email or contact our customer support team. \n \n Thank you for choosing Pak Classified. We look forward to assisting you further. \n \n Best regards, \n \n Waleed Ahmad \n Managing Director \n Pak Classified Co. \n waleedahmad4015.dev@gmail.com \n pakclassified.com.pk`,
          })
        );
      })
      .catch((error) => console.log(error.message));
  };

  return {
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    successMessage,
    emailError,
    emailStatus,
    handleSubmit,
  };
};

export default useContactPage;
