// @emotion/css
import { css } from "@emotion/css";

// prop-types
import PropTypes from "prop-types";

// contexts
import { useMode } from "../../contexts/ModeProvider";

// images
import compass from "../../assets/images/Compass.svg";

const Loading = (props) => {
  const { modeState } = useMode();

  const { className } = props;

  return (
    <div className={className}>
      <img
        src={compass}
        alt="compass"
        className={`loading ${css({
          color: modeState.palette.font.h1.color,
          width: "80px",
          filter: modeState.mode === "light" ? "" : "invert(1)",
        })}`}
      />
    </div>
  );
};

Loading.propTypes = {
  className: PropTypes.string,
};

export default Loading;
