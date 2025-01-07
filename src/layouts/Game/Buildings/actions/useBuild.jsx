import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer, faSpinner } from "@fortawesome/free-solid-svg-icons";

// providers
import { queryClient, useHorizonApiClient } from "../../../../providers/HorizonApiProvider";

// actions
import { BuildingQueueActions } from "../../../../api/BuildingApiClient";

// utils
import { ReactQueryKeys } from "../../../../utils/queryKeys";

export const useBuildAction = (props) => {
  const { t } = useTranslation();

  const { userId, currentBuildings } = props;

  const horizonApiClient = useHorizonApiClient();

  const toBuild = useMutation({
    mutationFn: ({ buildingId }) =>
      horizonApiClient.Building.enqueue({
        playerId: userId,
        buildingId,
        action: BuildingQueueActions.Building,
      }),
    onSuccess: async (result) => {
      const { error, status } = result;

      if (status !== 201) {
        console.error(error);
      } else {
        queryClient.invalidateQueries([ReactQueryKeys.Buildings, userId]);
        console.info(200);
      }
    },
    onError: async (error) => {
      console.error(error);
    },
  });

  const [itemId, setItemId] = useState(null);

  const action = useCallback(
    (row) => {
      const isLoading = itemId === row.id && toBuild.isPending;
      return {
        id: BuildingQueueActions.Building,
        onClick: async () => {
          setItemId(row.id);
          toBuild.mutate({ buildingId: row.id });
        },
        hidden: currentBuildings?.find((b) => b.buildingId === row.id),
        icon: (
          <FontAwesomeIcon
            className="text-xl text-light-primary"
            icon={isLoading ? faSpinner : faHammer}
          />
        ),
        tooltip: t("_game:buildings.actions.build.label"),
        aria: t("_game:buildings.actions.build.aria"),
      };
    },
    [currentBuildings, itemId, t, toBuild],
  );

  return { action };
};
