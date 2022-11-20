import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Loading from "../../components/Loading/Screen";

// services
import { logout } from "../../services/post";

// contexts
import { useUser } from "../../context/UserProvider";

// utils
import { getUserName, logoutUser } from "../../utils/functions";

import config from "../../config";

const SignOut = () => {
  const navigate = useNavigate();

  const { userState, setUserState } = useUser();

  const signOut = async () => {
    try {
      await logout(getUserName());
      sessionStorage.removeItem(config.userNick);
      sessionStorage.removeItem(config.userNation);
      setUserState({ type: "logOut" });
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
