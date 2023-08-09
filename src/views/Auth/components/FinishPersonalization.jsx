import { useMemo, useState, useCallback } from "react";

// contexts
import { useUser } from "../../../contexts/UserProvider";
import { useLanguage } from "../../../contexts/LanguageProvider";
import { useNotification } from "../../../contexts/NotificationProvider";

// components
import Nation from "./Nation";
import Personalization from "./Personalization";
import Loading from "../../../components/Loading/Screen";
import { useEffect } from "react";

function FinishPersonalization() {
  const { languageState } = useLanguage();
  const { errors } = useMemo(() => {
    return {
      inputs: languageState.texts.inputs,
      auth: languageState.texts.auth,
      errors: languageState.texts.errors,
    };
  }, [languageState]);

  const { userState } = useUser();

  const { setNotificationState } = useNotification();
  const showNotification = useCallback(
    (ntype, message) =>
      setNotificationState({
        type: "set",
        ntype,
        message,
      }),
    [setNotificationState]
  );

  const [loading, setLoading] = useState(false);

  const [doing, setDoing] = useState(0);
  const [helperTexts, setHelperTexts] = useState({});

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

  useEffect(() => {
    console.log(userState);
    if (userState.user) {
      switch (userState.user.state) {
        case "-1":
          setDoing(2);
          break;
        case "-2":
          setDoing(1);
          break;
        default:
          break;
      }
    }
  }, [userState]);

  return userState.user?.state < 0 ? (
    <div className="min-h-screen fixed top-0 left-0 w-full pt-20 overflow-auto flex items-center justify-center">
      {loading ? <Loading className="fixed-loading" /> : null}
      {doing === 1 ? (
        <Nation
          setLoading={setLoading}
          changeDoing={() => setDoing(2)}
          showNotification={showNotification}
        />
      ) : null}
      {doing === 2 ? (
        <Personalization
          setLoading={setLoading}
          helperTexts={helperTexts}
          setHelperTexts={setHelperTexts}
          showNotification={showNotification}
          requiredValidator={requiredValidator}
        />
      ) : null}
    </div>
  ) : null;
}

export default FinishPersonalization;
