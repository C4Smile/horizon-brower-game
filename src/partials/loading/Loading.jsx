/* eslint-disable react/prop-types */

// styles
import "./styles.css";

/**
 * Loading
 * @param {object} props - Props
 * @returns Loading component
 */
function Loading(props) {
  const { color = "stroke-blue-800", loaderClass, strokeWidth = "4", ...rest } = props;

  return (
    <div {...rest} className={`loading ${rest.className}`}>
      <div className="loader-container">
        <div className={`loader ${loaderClass}`}>
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className={`path ${color}`}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth={strokeWidth}
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Loading;
