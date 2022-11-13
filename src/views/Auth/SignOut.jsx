import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Loading from "../../components/Loading/Screen";

// services
import { logout } from "../../services/post";

// utils
import { getUserName, logoutUser } from "../../utils/functions";

const SignOut = () => {
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await logout(getUserName());
    } catch (err) {
      console.log(err);
    }
    logoutUser();
    navigate("/auth");
  };

  useEffect(() => {
    signOut();
  }, []);

  return <Loading visible />;
};

export default SignOut;
