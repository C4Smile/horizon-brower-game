import { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// components
import PhotoUpload from "../../../components/PhotoUpload/PhotoUpload";
import SimpleInput from "../../../components/SimpleInput/SimpleInput";

// contexts
import { useUser } from "../../../contexts/UserProvider";
import { useLanguage } from "../../../contexts/LanguageProvider";

// services
import { saveNick as saveRemoteNick } from "../../../services/users";
import { getUserName, getUserNation } from "../../../utils/auth";

function Personalization({
  setLoading,
  helperTexts,
  setHelperTexts,
  showNotification,
  requiredValidator,
}) {
  const navigate = useNavigate();
  const { languageState } = useLanguage();

  const { auth, errors } = useMemo(() => {
    return {
      inputs: languageState.texts.inputs,
      auth: languageState.texts.auth,
      errors: languageState.texts.errors,
    };
  }, [languageState]);

  const { userState, setUserState } = useUser();

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
            user: { user: getUserName(), nick, photo, nation: getUserNation() },
          });
          console.log(userState);
          // navigate("/");
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
      nick,
      photo,
      requiredValidator,
      showNotification,
      setUserState,
      errors,
      navigate,
      setHelperTexts,
      setLoading,
    ]
  );

  return (
    <form
      onSubmit={saveNick}
      className="flex flex-col items-center justify-start"
    >
      <h2>{auth.signUp.nick.title}</h2>
      <PhotoUpload
        id="photo"
        label={languageState.texts.auth.labels.photo}
        className="w-full rounded-full object-cover relative"
        imgClassName="!w-[100px] !h-[100px] my-5 m-auto rounded-full"
        value={photo}
        onChange={onChangePhoto}
      />
      <SimpleInput
        id="nick"
        helperText={helperTexts.nick}
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
  );
}

Personalization.propTypes = {
  user: PropTypes.string,
  nation: PropTypes.string,
  setLoading: PropTypes.func,
  helperTexts: PropTypes.object,
  setHelperTexts: PropTypes.func,
  showNotification: PropTypes.func,
  requiredValidator: PropTypes.func,
};

export default Personalization;
