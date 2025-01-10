/* eslint-disable react/prop-types */
import { useMemo } from "react";
import Tippy from "@tippyjs/react";

// utils
import { staticUrlPhoto } from "../../utils/utils";

const Cost = (props) => {
  const { resource, level, factor, base } = props;

  const calculating = useMemo(() => {
    return base + base * (level > 0 ? level + 1 : 1) * factor;
  }, [level, factor, base]);

  return (
    <Tippy content={resource.name}>
      <div className="flex gap-2 items-center">
        <img
          className="w-4 h-4 object-cover rounded-full"
          src={staticUrlPhoto(resource.image)}
          alt={resource.name}
        />
        <p className="text-white">{calculating}</p>
      </div>
    </Tippy>
  );
};

export default Cost;
