import { FiCompass } from "react-icons/fi";

// @emotion/css
import { css } from "@emotion/css";

// sito components
import SitoContainer from "sito-container";

// prop-types
import PropTypes from "prop-types";

// contexts
import { useMode } from "../../context/ModeProvider";

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
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backdropFilter: "blur(4px)",
        background: `${modeState.palette.background.sidebar}ce`,
        ...sx,
      }}
    >
      <FiCompass
        className={`loading ${css({
          color: modeState.palette.font.h1.color,
          fontSize: "60px",
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
