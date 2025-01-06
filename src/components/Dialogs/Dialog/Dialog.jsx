/* eslint-disable react/prop-types */
import { useEffect, useCallback } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Dialog(props) {
  const { children, show, onClose, hideCloseButton } = props;

  const onEscapePress = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", onEscapePress);
    return () => {
      window.removeEventListener("keydown", onEscapePress);
    };
  }, [onEscapePress]);

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-screen flex justify-center items-center h-screen transition duration-500 bg-black/20 backdrop-blur-md ease-in-out ${show ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      {!hideCloseButton ? (
        <button type="button" className="right-3 top-3 absolute hover:text-error" onClick={onClose}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      ) : null}
      {children}
    </div>
  );
}

export default Dialog;
