import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// sito components
import SitoContainer from "sito-container";

// layouts
import Main from "./layouts/Main";
import Empty from "./layouts/Empty";

// views
import SignUp from "./views/Auth/SignUp";
import SignIn from "./views/Auth/SignIn";
import SignOut from "./views/Auth/SignOut";
import NotFound from "./views/NotFound/NotFound";
// home views
import Fortress from "./views/Home/Fortress";
import Resources from "./views/Home/Resources";
import Building from "./views/Home/Building";
import Troops from "./views/Home/Troops";
import Technologies from "./views/Home/Technologies";
import Heros from "./views/Home/Heros";
import Market from "./views/Home/Market";
import Profile from "./views/Home/Profile";
import Settings from "./views/Home/Settings";
// selection
import SelectNation from "./views/Home/SelectNation/SelectNation";

// context
import { useUser } from "./context/UserProvider";
import { useMode } from "./context/ModeProvider";

// utils
import { getUserName, userLogged } from "./utils/functions";

// services
import { getUserData } from "./services/data/post";

// theme
import light from "./assets/theme/light";
import dark from "./assets/theme/dark";

import config from "./config";

const App = () => {
  const { modeState } = useMode();
  const { setUserState } = useUser();

  const [hasNation, setHasNation] = useState(true);

  useEffect(() => {
    document.body.style.background =
      modeState.mode !== "light"
        ? dark.palette.background.screen
        : light.palette.background.screen;
  }, [modeState]);

  const fetch = async () => {
    try {
      const response = await getUserData(getUserName());
      const { data } = response;
      if (data.nation) sessionStorage.setItem(config.userNation, data.nation);
      else setHasNation(false);
      if (data.nick) sessionStorage.setItem(config.userNick, data.nick);
    } catch (err) {
      window.location.href = "/auth/sign-out";
    }
  };

  useEffect(() => {
    if (userLogged()) fetch();
  }, []);

  return (
    <SitoContainer
      sx={{
        minWidth: "100%",
        minHeight: "100vh",
        ...modeState.palette.font,
        hr: modeState.palette.hr,
        a: modeState.palette.a,
        button: modeState.palette.button,
        "& .primary": modeState["& .primary"],
        "& .secondary": modeState["& .secondary"],
        "& .navbar": {
          background: modeState.palette.background.sidebar,
        },
        "& .sidebar": {
          background: modeState.palette.background.sidebar,
        },
      }}
    >
      {/*       "nation": "R2FyZGVuIFBhcmsncyBCYW5kaXQgQm95cw", */}
      <BrowserRouter>
        <Routes>
          {hasNation ? (
            <Route path="/" element={<Main />}>
              <Route index element={<Fortress />} />
              <Route exact path="/resources" element={<Resources />} />
              <Route exact path="/buildings" element={<Building />} />
              <Route exact path="/troops" element={<Troops />} />
              <Route exact path="/technologies" element={<Technologies />} />
              <Route exact path="/heros" element={<Heros />} />
              <Route exact path="/market" element={<Market />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/settings" element={<Settings />} />
            </Route>
          ) : (
            <Route index element={<SelectNation />} />
          )}
          <Route path="/auth" element={<Empty />}>
            <Route index element={<SignIn />} />
            <Route exact path="/auth/sign-up" element={<SignUp />} />
            <Route exact path="/auth/sign-out" element={<SignOut />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SitoContainer>
  );
};

export default App;
