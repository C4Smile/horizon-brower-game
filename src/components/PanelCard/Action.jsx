/* eslint-disable react/prop-types */
import Tippy from "@tippyjs/react";

function Action(props) {
  const { id, onClick, icon, tooltip, aria } = props;

  return (
    <Tippy content={tooltip}>
      <button onClick={onClick} id={id} aria-label={aria} name={tooltip}>
        {icon}
      </button>
    </Tippy>
  );
}

export default Action;
