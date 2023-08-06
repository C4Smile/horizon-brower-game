import { useRef, useCallback, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";

// images
import noPhoto from "../../assets/images/no-photo.webp";

// components
import Loading from "../Loading/Section";

function PhotoUpload({ id, className, imgClassName, label, value, onChange }) {
  const inputRef = useRef(null);

  const handleClick = useCallback(() => {
    console.log(inputRef);
    if (inputRef !== null) inputRef.current.click();
  }, [inputRef]);

  const [loading, setLoading] = useState(true);

  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input accept="image/*" ref={inputRef} type="file" onChange={(e) => onChange(id, e)} />
      {loading ? (
        <Loading className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-dark-background2" />
      ) : null}
      <div className="group w-full h-full relative">
        <div className="pointer-events-none opacity-0 group-hover:opacity-[1] transition w-full h-full absolute flex items-center justify-center top-0 left-0 bg-dark-drawer-background">
          <FontAwesomeIcon icon={faAdd} className="text-4xl" />
        </div>
        <img
          loading="lazy"
          alt="model-photo"
          className={`w-full h-full object-cover ${imgClassName}`}
          onClick={handleClick}
          onLoad={() => setLoading(false)}
          src={value.length ? value : noPhoto}
        />
      </div>
    </div>
  );
}

PhotoUpload.defaultProps = {
  value: "",
};

PhotoUpload.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  imgClassName: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default PhotoUpload;
