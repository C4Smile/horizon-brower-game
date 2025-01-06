import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// providers
import { useHorizonApiClient } from "../../../../../providers/HorizonApiProvider";
import { useGame } from "../../../../../providers/GameApiProvider";
import { useAccount } from "../../../../../providers/AccountProvider";

// utils
import { ReactQueryKeys } from "../../../../../utils/queryKeys";

// components
import Tabs from "../../../../../components/Tabs/Tabs";
import PanelCard from "../../../../../components/PanelCard/PanelCard";

function Buildings() {
  const { t } = useTranslation();

  const { buildings, buildingTypes } = useGame();

  const horizonApiClient = useHorizonApiClient();

  const { account } = useAccount();

  const playerBuildings = useQuery({
    queryFn: () => horizonApiClient.Building.getMyBuildings(account?.horizonUser?.id),
    queryKey: [ReactQueryKeys.Buildings, account?.horizonUser?.id],
    enabled: !!account?.horizonUser?.id,
  });

  const [currentTab, setCurrentTab] = useState(1);

  return (
    <>
      <h3 className="text-light-primary text-3xl mb-3">{t("_game:buildings.title")}</h3>
      <Tabs
        currentTab={currentTab}
        onChange={(_, value) => setCurrentTab(value)}
        tabs={buildingTypes.map(({ id, name, image }) => ({ id, name, image }))}
      />
      <ul className="flex flex-col gap-5 mt-5">
        {buildings
          .filter((b) => b.typeId === currentTab)
          .map((b) => (
            <li key={b.id}>
              <PanelCard {...b} />
            </li>
          ))}
      </ul>
    </>
  );
}

export default Buildings;
