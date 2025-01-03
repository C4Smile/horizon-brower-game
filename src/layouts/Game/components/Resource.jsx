import Tippy from "@tippyjs/react";
import { memo, useMemo } from "react";

// providers
import { useGame } from "../../../providers/GameApiProvider.jsx";
import { staticUrlPhoto } from "../../../utils/utils.js";


// eslint-disable-next-line react-refresh/only-export-components
const Resource = (props) => {

  const { resources } = useGame();

  const { resourceId, inStock, maxCapacity } = props;

  const resourceData = useMemo(() => resources?.find((res) => res.id === resourceId), [resources, resourceId]);

  const tooltip = useMemo(() => {
    return `${resourceData?.name ?? ""} ${inStock} / ${maxCapacity}`
  }, [inStock, maxCapacity, resourceData]);

  return (
    <Tippy content={tooltip}>
      <div className="flex flex-col items-center justify-center">
        <img className="w-8 h-8 rounded-full object-cover" src={staticUrlPhoto(resourceData?.image ?? "")}
             alt={resourceData?.name} />
        <p className="text-light-primary">{inStock}</p>
      </div>
    </Tippy>);
};

export default memo((props) => <Resource {...props} />);