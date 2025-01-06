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
import TabComponent from "../../../../../components/Tabs/TabComponent";
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

  console.log(buildingTypes);

  return (
    <section id="building-panel" className="p-4 rounded-lg bg-ocean min-w-[500px] min-h-[400px]">
      <h3 className="text-light-primary text-3xl">{t("_game:buildings.title")}</h3>
      <Tabs
        currentTab={currentTab}
        onChange={(_, value) => setCurrentTab(value)}
        tabs={buildingTypes.map(({ id, name, image }) => ({ id, name, image }))}
      />
      <ul>
        {buildings
          .filter((b) => b.typeId === currentTab)
          .map((b) => (
            <li key={b.id}>
              <PanelCard {...b} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default Buildings;
