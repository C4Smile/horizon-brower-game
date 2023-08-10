import { Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";

import io from "socket.io-client";

// some-javascript-utils
import { getUserLanguage } from "some-javascript-utils/browser";

// components
import Printer from "./views/Printer/Printer";

// layouts
import View from "./layouts/View";
import Auth from "./layouts/Auth";

// views
import SignOut from "./views/Auth/SignOut";
import SignIn from "./views/Auth/SignIn";
import SignUp from "./views/Auth/SignUp";
import Recovery from "./views/Auth/Recovery";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";

// contexts
import { useMode } from "./contexts/ModeProvider";
import { useUser } from "./contexts/UserProvider.jsx";
import { useLanguage } from "./contexts/LanguageProvider";

// utils
import { logoutUser, userLogged, fromLocal, getUserName } from "./utils/auth";

// services
import { validateBasicKey } from "./services/auth";

import config from "./config";

// lazy
const Notification = loadable(() =>
  import("./components/Notification/Notification")
);
const FinishPersonalization = loadable(() =>
  import("./views/Auth/components/FinishPersonalization")
);

const App = () => {
  const { setModeState } = useMode();

  const { setLanguageState } = useLanguage();
  const { userState, setUserState } = useUser();

  const [, setLoading] = useState(true);

  const fetch = async () => {
    try {
      const value = await validateBasicKey();
      if (!value) {
        logoutUser();
      } else setUserState({ type: "logged-in", user: fromLocal() });
    } catch (err) {
      if (String(err) !== "AxiosError: Network Error") {
        logoutUser();
      }
    }
  };

  useEffect(() => {
    try {
      setLanguageState({ type: "set", lang: getUserLanguage(config.language) });
    } catch (err) {
      console.error(err);
    }
    try {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        localStorage.setItem("theme", "dark");
        setModeState(false);
      } else {
        document.documentElement.classList.add("list");
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setModeState(true);
      }
    } catch (err) {
      console.error(err);
    }
    if (userLogged()) fetch();
    setLoading(false);
  }, []);

  const { modeState } = useMode();

  useEffect(() => {
    if (modeState) {
      document.body.classList.add("bg-light-background");
      document.body.classList.remove("bg-dark-background");
    } else {
      document.body.classList.remove("bg-light-background");
      document.body.classList.add("bg-dark-background");
    }
  }, [modeState]);

  useEffect(() => {
    console.log(config.apiSocket);
    if (
      userState.user &&
      (!userState.socket || (userState.socket && !userState.socket.connected))
    ) {
      const newSocket = io(config.apiSocket, { transports: ["polling"] });

      newSocket.on("connect", () => {
        console.info("connect", getUserName());
        newSocket.emit("send-user-id", getUserName());
      });
      newSocket.on("user-logged", (options) => {
        const { date } = options;
        localStorage.setItem("date", date);
      });
      newSocket.on("plus-minute", (date) => {
        localStorage.setItem("date", date);
      });

      /* setUserState({ type: "socket", socket: newSocket }); */
      return () => {
        newSocket.close();
      };
    }
  }, [userState, setUserState]);

  return (
    <div>
      <Notification />
      <BrowserRouter>
        {/* <Routes>
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
          <Route exact path="/chat" element={<ChatLayout />}>
            <Route index element={<Chat />} />
          </Route>
          <Route path="/auth" element={<Empty />}>
            <Route index element={<SignIn />} />
            <Route exact path="/auth/sign-up" element={<SignUp />} />
            <Route exact path="/auth/sign-out" element={<SignOut />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes> */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Suspense>
                <FinishPersonalization />
                <View />
              </Suspense>
            }
          >
            <Route index element={<Home />} />
          </Route>
          <Route exact path="/auth" element={<Auth />}>
            <Route index element={<SignIn />} />
            <Route exact path="/auth/sign-up" element={<SignUp />} />
            <Route exact path="/auth/recovery" element={<Recovery />} />
          </Route>

          <Route exact path="/sign-out" element={<SignOut />} />
          <Route
            exact
            path="/terms-conditions"
            element={
              <Suspense>
                <Printer text="terms" />
              </Suspense>
            }
          />
          <Route
            exact
            path="/about"
            element={
              <Suspense>
                <Printer text="about" />
              </Suspense>
            }
          />
          <Route
            exact
            path="/privacy-policy"
            element={
              <Suspense>
                <Printer text="privacyPolicy" />
              </Suspense>
            }
          />
          <Route
            exact
            path="/cookies-policy"
            element={
              <Suspense>
                <Printer text="cookiesPolicy" />
              </Suspense>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
