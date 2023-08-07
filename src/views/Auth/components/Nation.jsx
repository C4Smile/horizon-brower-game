import { useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

// components
import PrintAfter from "../../../components/PrintAfter/PrintAfter";

// utils
import { logUser } from "../../../utils/auth";

// contexts
import { useLanguage } from "../../../contexts/LanguageProvider";
import { useNotification } from "../../../contexts/NotificationProvider";

// services
import { nations } from "../../../services/nation";
import { saveNation as saveRemoteNation } from "../../../services/users";

import config from "../../../config";

// styles
import styles from "../signIn.module.css";

function Nation({ updateNation, changeDoing, setLoading }) {
  const { languageState } = useLanguage();
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

  const { auth, errors } = useMemo(() => {
    return {
      inputs: languageState.texts.inputs,
      auth: languageState.texts.auth,
      errors: languageState.texts.errors,
    };
  }, [languageState]);

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
    fetchNations();
  }, []);

  const saveNation = useCallback(async () => {
    setLoading(true);
    try {
      await saveRemoteNation(nation);
      logUser(false, { nation });
      updateNation(nation);
      changeDoing();
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

  return (
    <div className={`appear ${styles.nation}`}>
      <h2 className="text-center">{auth.signUp.nation.title}</h2>
      <div className="flex items-start justify-center gap-5 mt-5 flex-wrap">
        {nationList.map((nation, i) => (
          <PrintAfter key={nation.id} delay={(i + 1) * 300} animation="appear">
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
  );
}

Nation.propTypes = {
  user: PropTypes.string,
  updateNation: PropTypes.function,
  changeDoing: PropTypes.func,
  setLoading: PropTypes.func,
};

export default Nation;
