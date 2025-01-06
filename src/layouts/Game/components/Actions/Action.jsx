/* eslint-disable react/prop-types */
import Tippy from "@tippyjs/react";

// provider
import { useActionPanel } from "../../../../providers/ActionPanelProvider";

const Action = (props) => {
  const { image, tooltip, name, aria, id } = props;

  const { setShowPanel } = useActionPanel();

  return (
    <Tippy content={tooltip}>
      <button
        id={id}
        type="button"
        onClick={() => setShowPanel(id)}
        aria-label={aria}
        className="flex flex-col items-center justify-center"
      >
        <img className="w-8 h-8 rounded-lg object-cover" src={image} alt={name} />
      </button>
    </Tippy>
  );
};

export default Action;
