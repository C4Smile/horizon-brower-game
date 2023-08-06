import { useEffect, useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createCookie } from "some-javascript-utils/browser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faLockOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// contexts
import { useUser } from "../../contexts/UserProvider";
import { useLanguage } from "../../contexts/LanguageProvider";
import { useNotification } from "../../contexts/NotificationProvider";

// components
import Loading from "../../components/Loading/Screen";
import PrintAfter from "../../components/PrintAfter/PrintAfter";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import SimpleInput from "../../components/SimpleInput/SimpleInput";

// services
import {
  signUp,
  saveNation as saveRemoteNation,
  saveNick as saveRemoteNick,
} from "../../services/users";
import { nations } from "../../services/nation";

// utils
import { logUser } from "../../utils/auth";

import config from "../../config";

// styles
import styles from "./signIn.module.css";

function SignUp() {
  const { languageState } = useLanguage();
  const { setNotificationState } = useNotification();

  const [doing, setDoing] = useState(0);

  const [helperTexts, setHelperTexts] = useState({});

  const { auth, inputs, errors } = useMemo(() => {
    return {
      inputs: languageState.texts.inputs,
      auth: languageState.texts.auth,
      errors: languageState.texts.errors,
    };
  }, [languageState]);

  const [user, setUser] = useState("");

  const handleUser = useCallback((e) => {
    setUser(e.target.value);
  }, []);

  const [email, setEmail] = useState("");

  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = (e) => setPassword(e.target.value);

  const toggleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const [rPassword, setRPassword] = useState("");
  const [showRPassword, setShowRPassword] = useState(false);

  const handleRPassword = (e) => setRPassword(e.target.value);

  const toggleShowRPassword = () =>
    setShowRPassword((showRPassword) => !showRPassword);

  const navigate = useNavigate();

  const { userState, setUserState } = useUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userState.user) navigate("/");
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [userState]);

  const showNotification = useCallback(
    (ntype, message) =>
      setNotificationState({
        type: "set",
        ntype,
        message,
      }),
    [setNotificationState]
  );

  const requiredValidator = useCallback(
    (inputs, keys) => {
      for (const item of keys) {
        if (!inputs || !inputs[item].length) {
          document.getElementById(item)?.focus();
          showNotification("error", errors[`${item}Required`]);
          return true;
        }
      }
    },
    [errors, showNotification]
  );

  const onSubmit = useCallback(
    async (e) => {
      setHelperTexts({});
      e.preventDefault();
      let noValid = requiredValidator({ user, password, email }, [
        "user",
        "password",
        "email",
      ]);

      if (noValid) return;
      if (password !== rPassword) {
        document.getElementById("password")?.focus();
        showNotification("error", errors.passwordsAreNotEqual);
        return;
      }

      try {
        setLoading(true);
        const response = await signUp(user, email, password);
        if (response.message) {
          if (response.message === "email") {
            document.getElementById("email")?.focus();
            showNotification("error", errors.emailUsed);
          } else if (response.message === "user") {
            document.getElementById("user")?.focus();
            showNotification("error", errors.userUsed);
          }
        } else {
          const { expiration, token } = response;
          createCookie(config.basicKey, expiration, token);
          logUser(false, { user: response.user });
          setDoing(1);
        }
      } catch (err) {
        console.error(err);
        if (String(err) === "AxiosError: Network Error")
          showNotification("error", errors.notConnected);
        else showNotification("error", String(err));
      }
      setLoading(false);
    },
    [
      user,
      password,
      rPassword,
      email,
      errors,
      requiredValidator,
      showNotification,
    ]
  );

  const [nation, setNation] = useState("");
  const [nationList, setNationList] = useState([]);

  const fetchNations = async () => {
    setLoading(true);
    try {
      const response = await nations();
      const { rows } = response;
      setNationList(rows);
    } catch (err) {
      console.error(err);
      if (String(err) === "AxiosError: Network Error")
        showNotification("error", errors.notConnected);
      else showNotification("error", String(err));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (doing === 1) fetchNations();
  }, [doing]);

  const saveNation = useCallback(async () => {
    setLoading(true);
    try {
      await saveRemoteNation(nation);
      logUser(false, { nation });
      setDoing(2);
    } catch (err) {
      console.error(err);
      if (String(err) === "AxiosError: Network Error")
        showNotification("error", errors.notConnected);
      else showNotification("error", String(err));
    }
    setLoading(false);
  }, [nation, errors, showNotification]);

  useEffect(() => {
    if (nation.length) saveNation();
  }, [nation]);

  const [nick, setNick] = useState("");
  const [photo, setPhoto] = useState("");
  const onChangePhoto = useCallback(
    (id, elem) => {
      if (elem.target.files[0].size > 15288000) {
        showNotification("error", languageState.texts.errors.fileToBig);

        elem.target.value = "";
      } else {
        if (!elem.target.files || !elem.target.files[0]) return;

        const FR = new FileReader();

        FR.addEventListener("load", function (evt) {
          setPhoto(evt.target?.result);
        });

        FR.readAsDataURL(elem.target.files[0]);
      }
    },
    [languageState, showNotification]
  );

  const handleNick = (e) => setNick(e.target.value);

  const saveNick = useCallback(
    async (e) => {
      setLoading(true);

      try {
        setHelperTexts({});
        e.preventDefault();
        let noValid = requiredValidator({ nick }, ["nick"]);
        if (noValid) return;
        const response = await saveRemoteNick(nick, photo);
        if (response.message === "ok") {
          setUserState({
            type: "logged-in",
            user: { user, nick, photo, nation },
          });
          navigate("/");
        } else {
          if (response.message === "nick") {
            document.getElementById("nick")?.focus();
            showNotification("error", errors.emailUsed);
          }
        }
      } catch (err) {
        console.error(err);
        if (String(err) === "AxiosError: Network Error")
          showNotification("error", errors.notConnected);
        else showNotification("error", String(err));
      }
      setLoading(false);
    },
    [
      user,
      nick,
      photo,
      nation,
      requiredValidator,
      showNotification,
      setUserState,
      errors,
      navigate,
    ]
  );

  return (
    <>
      {loading ? <Loading className="fixed-loading" /> : null}
      {doing === 0 ? (
        <form
          onSubmit={onSubmit}
          className={`entrance bg-light-background dark:bg-dark-background ${styles.main}`}
        >
          <h2>{auth.signUp.title}</h2>
          <SimpleInput
            id="user"
            className="input-control"
            label={auth.labels.user}
            inputProps={{
              className: "input primary !pl-8 w-full",
              value: user,
              onChange: handleUser,
              type: "text",
            }}
            leftIcon={
              <FontAwesomeIcon
                className="absolute text-white top-[50%] -translate-y-[50%] left-3"
                icon={faUser}
              />
            }
            helperText={helperTexts.user}
          />

          <SimpleInput
            id="email"
            className="input-control"
            label={inputs.email}
            inputProps={{
              className: "input primary !pl-8 w-full",
              value: email,
              onChange: handleEmail,
              type: "email",
            }}
            leftIcon={
              <FontAwesomeIcon className="input-icon" icon={faEnvelope} />
            }
            helperText={helperTexts.email}
          />
          <SimpleInput
            id="password"
            className="input-control"
            label={auth.labels.password}
            inputProps={{
              className: "input primary !pl-8 w-full",
              value: password,
              onChange: handlePassword,
              type: !showPassword ? "password" : "string",
            }}
            leftIcon={
              <button tabIndex={-1} type="button" onClick={toggleShowPassword}>
                <FontAwesomeIcon
                  className="absolute text-white top-[50%] -translate-y-[50%] left-3"
                  icon={showPassword ? faLockOpen : faLock}
                />
              </button>
            }
            helperText={helperTexts.password}
          />
          <SimpleInput
            id="rPassword"
            className="input-control"
            label={auth.labels.rPassword}
            inputProps={{
              className: "input primary !pl-8 w-full",
              value: rPassword,
              onChange: handleRPassword,
              type: !showRPassword ? "password" : "string",
            }}
            leftIcon={
              <button tabIndex={-1} type="button" onClick={toggleShowRPassword}>
                <FontAwesomeIcon
                  className="absolute text-white top-[50%] -translate-y-[50%] left-3"
                  icon={showRPassword ? faLockOpen : faLock}
                />
              </button>
            }
            helperText={helperTexts.rPassword}
          />
          <p>
            {auth.signUp.already}
            <Link
              to="/auth/"
              className="ml-1 underline dark:text-white text-dark-background2"
            >
              {auth.signUp.link}
            </Link>
            .
          </p>

          <p>
            {languageState.texts.auth.signUp.terms.body}
            <a
              className="ml-1 underline"
              target="_blank"
              rel="noreferrer"
              href="/terms-condition"
            >
              {languageState.texts.auth.signUp.terms.link}
            </a>
          </p>
          <button
            type="submit"
            name="sign-up"
            aria-label={auth.signUp.submit}
            className="button primary self-end hover:bg-pdark hover:border-pdark cursor-default"
          >
            {auth.signUp.submit}
          </button>
        </form>
      ) : null}
      {doing === 1 ? (
        <div className={`appear ${styles.nation}`}>
          <h2 className="text-center">{auth.signUp.nation.title}</h2>
          <div className="flex items-start justify-center gap-5 mt-5 flex-wrap">
            {nationList.map((nation, i) => (
              <PrintAfter
                key={nation.id}
                delay={(i + 1) * 300}
                animation="appear"
              >
                <button
                  name="select-nation"
                  onClick={() => setNation(nation.id)}
                  className={`group ${styles.nationCard}`}
                  aria-label={`${languageState.texts.ariaLabels.selectNation} ${nation.name}`}
                >
                  <img
                    src={`${config.apiPhoto}${nation.photo}`}
                    alt={nation.name}
                  />

                  <div
                    className={`group-hover:opacity-100 group-hover:translate-y-0 ${styles.nationCardContent}`}
                  >
                    <h3>{nation.name}</h3>
                    <p>{nation.description}</p>
                  </div>
                </button>
              </PrintAfter>
            ))}
          </div>
        </div>
      ) : null}
      {doing === 2 ? (
        <form
          onSubmit={saveNick}
          className="flex flex-col items-center justify-start"
        >
          <h2>{auth.signUp.nick.title}</h2>
          <PhotoUpload
            id="photo"
            label={languageState.texts.auth.labels.photo}
            className="w-full rounded-full object-cover relative"
            imgClassName="w-[100px] h-[100px] my-5 m-auto rounded-full"
            value={photo}
            onChange={onChangePhoto}
          />
          <SimpleInput
            id="nick"
            className="input-control"
            label={languageState.texts.auth.labels.nick}
            inputProps={{
              className: "input primary w-full",
              value: nick,
              onChange: handleNick,
              type: "text",
            }}
          />
          <button
            type="submit"
            name="save-personalization"
            aria-label={`${languageState.texts.buttons.save} ${auth.signUp.nick.title}`}
            className="button primary self-end hover:bg-pdark hover:border-pdark cursor-default"
          >
            {languageState.texts.buttons.save}
          </button>
        </form>
      ) : null}
    </>
  );
}

export default SignUp;
