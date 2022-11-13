import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

// @emotion/css
import { css } from "@emotion/css";

// react-cool-onclickoutside
import useOnclickOutside from "react-cool-onclickoutside";

import SitoContainer from "sito-container";

// contexts
import { useMode } from "../../context/ModeProvider";
import { useNotification } from "../../context/NotificationProvider";

const Notification = () => {
  const { notificationState } = useNotification();
  const { modeState } = useMode();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const ref = useOnclickOutside(() => {
    setOpen(false);
  });

  useEffect(() => {
    setOpen(notificationState.visible);
  }, [notificationState]);

  return (
    <SitoContainer
      ref={ref}
      sx={{
        position: "fixed",
        bottom: "10px",
        left: "10px",
        background: modeState.palette[notificationState.type].main,
        width: "300px",
        height: "30px",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "transform 500ms ease",
        transform: open ? "scale(1)" : "scale(0)",
        zIndex: open ? 99 : -1,
      }}
    >
      {/* onClose={handleClose}
      severity={notificationState.type}
      style={{ opacity: open ? 1 : 0, zIndex: open ? 98 : -1, minWidth: 250 }}*/}
      <label
        className={css({
          color: modeState.palette[notificationState.type].contrastText,
        })}
      >
        {notificationState.message}
      </label>
      <button
        onClick={handleClose}
        className={css({
          padding: "2px 0px 0px 0px",
          background: "none",
          color: "aliceblue",
          border: "none",
          borderRadius: "100%",
          width: "24px",
          height: "24px",
          fontSize: "20px",
          cursor: "pointer",
          transition: "background 500ms ease",
          "&:hover": {
            background: "red",
          },
        })}
      >
        <FiX />
      </button>
    </SitoContainer>
  );
};

export default Notification;
