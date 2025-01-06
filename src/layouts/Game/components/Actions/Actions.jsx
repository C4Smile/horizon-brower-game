import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// components
import Action from "./Action";

// images
import buildings from "../../../../assets/images/buildings.png";
import guns from "../../../../assets/images/guns.png";
import researches from "../../../../assets/images/researches.png";
import ships from "../../../../assets/images/ships.png";

const actions = ["buildings", "ships", "techs", "guns"];
const images = [buildings, ships, researches, guns];

const Actions = () => {
  const { t } = useTranslation();

  const parsedActions = useMemo(() => {
    return actions.map((action, i) => ({
      id: action,
      name: t(`_game:actions.${action}.name`),
      tooltip: t(`_game:actions.${action}.name`),
      aria: t(`_game:actions.${action}.aria`),
      image: images[i],
    }));
  }, [t]);

  return (
    <ul className="flex gap-3 bg-dark p-2 rounded-lg">
      {parsedActions.map((action) => (
        <li key={action.id}>
          <Action {...action} />
        </li>
      ))}
    </ul>
  );
};

export default Actions;
