import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// utils
import { getUserName, logoutUser } from "../../utils/auth";

// contexts
import { useUser } from "../../contexts/UserProvider";

// services
import { signOutUser } from "../../services/auth";

// components
import Loading from "../../components/Loading/Screen";

function SignOut() {
  const navigate = useNavigate();

  const { setUserState } = useUser();

  const signOut = async () => {
    try {
      await signOutUser(getUserName());
      setUserState({ type: "logged-out" });
      logoutUser();
    } catch (err) {
      console.error(err);
    }
    navigate("/");
  };

  useEffect(() => {
    signOut();
  }, []);

  return <Loading className="fixed-loading" />;
}

export default SignOut;
