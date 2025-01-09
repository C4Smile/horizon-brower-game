import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// icons
import { faDownLong, faHammer, faFire, faUpLong } from "@fortawesome/free-solid-svg-icons";

// providers
import { useHorizonApiClient } from "../../../providers/HorizonApiProvider";
import { useGame } from "../../../providers/GameApiProvider";
import { useAccount } from "../../../providers/AccountProvider";

// utils
import { ReactQueryKeys } from "../../../utils/queryKeys";

// components
import Tabs from "../../../components/Tabs/Tabs";
import PanelCard from "../../../components/PanelCard/PanelCard";

// api
import { useEnqueueAction } from "./actions/useEnqueue.jsx";
import { BuildingQueueActions } from "../../../api/BuildingApiClient.js";

function Buildings() {
  const { t } = useTranslation();

  const { buildings, buildingTypes } = useGame();

  const horizonApiClient = useHorizonApiClient();

  const { account } = useAccount();

  const playerBuildings = useQuery({
    queryFn: () => horizonApiClient.Building.getMyBuildings(account?.horizonUser?.id),
    queryKey: [ReactQueryKeys.Buildings, account?.horizonUser?.id],
    enabled: !!account?.horizonUser?.id
  });

  const playerQueue = useQuery({
    queryFn: () => horizonApiClient.Building.getMyQueue(account?.horizonUser?.id),
    queryKey: [ReactQueryKeys.BuildingsQueue, account?.horizonUser?.id],
    enabled: !!account?.horizonUser?.id
  });

  const [currentTab, setCurrentTab] = useState(1);

  // actions
  const build = useEnqueueAction({
    userId: account?.horizonUser?.id,
    buildingAction: BuildingQueueActions.Building,
    icon: faHammer,
    tooltip: t("_game:buildings.actions.build.label"),
    aria: t("_game:buildings.actions.build.aria")
  });

  const upgrade = useEnqueueAction({
    userId: account?.horizonUser?.id,
    buildingAction: BuildingQueueActions.Upgrading,
    icon: faUpLong,
    tooltip: t("_game:buildings.actions.upgrade.label"),
    aria: t("_game:buildings.actions.upgrade.aria")
  });

  const downgrade = useEnqueueAction({
    userId: account?.horizonUser?.id,
    buildingAction: BuildingQueueActions.Downgrading,
    icon: faDownLong,
    tooltip: t("_game:buildings.actions.downgrade.label"),
    aria: t("_game:buildings.actions.downgrade.aria")
  });

  const demolish = useEnqueueAction({
    userId: account?.horizonUser?.id,
    buildingAction: BuildingQueueActions.Demolishing,
    icon: faFire,
    tooltip: t("_game:buildings.actions.demolish.label"),
    aria: t("_game:buildings.actions.demolish.aria")
  });

  const actions = useCallback((row) => {
    const found = playerBuildings?.data?.find((b) => b.buildingId === row.id);
    return [build.action(row, found), upgrade.action(row, !found), downgrade.action(row, !found), demolish.action(row, !found)];
  }, [build, playerBuildings?.data, upgrade]);

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
              <PanelCard {...b} actions={actions(b)} />
            </li>
          ))}
      </ul>
    </>
  );
}

export default Buildings;
