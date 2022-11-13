import { FiCompass } from "react-icons/fi";

// @emotion/css
import { css } from "@emotion/css";

// sito components
import SitoContainer from "sito-container";

// prop-types
import PropTypes from "prop-types";

// contexts
import { useMode } from "../../context/ModeProvider";

// images
import compass from "../../assets/images/Compass.svg";

const Loading = (props) => {
  const { modeState } = useMode();

  const { sx, visible } = props;

  return (
    <SitoContainer
      sx={{
        opacity: visible ? 1 : 0,
        zIndex: visible ? 99 : -1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 400ms ease",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        backdropFilter: "blur(4px)",
        background: `${modeState.palette.background.sidebar}ce`,
        ...sx,
      }}
    >
      <img
        src={compass}
        alt="compass"
        className={`loading ${css({
          color: modeState.palette.font.h1.color,
          width: "80px",
          filter: modeState.mode === "light" ? "" : "invert(1)",
        })}`}
      />
    </SitoContainer>
  );
};

Loading.defaultProps = {
  sx: {},
  visible: false,
};

Loading.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
  visible: PropTypes.bool,
};

export default Loading;
