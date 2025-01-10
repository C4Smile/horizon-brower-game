import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// providers
import { queryClient, useHorizonApiClient } from "../../../../providers/HorizonApiProvider";
import { useNotification } from "../../../../providers/NotificationProvider";

// utils
import { ReactQueryKeys } from "../../../../utils/queryKeys";

export const useEnqueueAction = (props) => {
  const { t } = useTranslation();

  const { userId, buildingAction, icon, aria, tooltip } = props;

  const { setNotification } = useNotification();

  const horizonApiClient = useHorizonApiClient();

  const mutateFn = useMutation({
    mutationFn: ({ buildingId }) =>
      horizonApiClient.Building.enqueue({
        playerId: userId,
        buildingId,
        action: buildingAction,
      }),
    onSuccess: async (result) => {
      const { error } = result;
      if (error) {
        console.log(error);
        setNotification(t(`_game:buildings.notifications.${error.status}`, {}, "error"));
      } else {
        await queryClient.invalidateQueries([ReactQueryKeys.Buildings, userId]);
        setNotification(t("_game:buildings.notifications.201"));
      }
    },
    onError: async (error) => {
      console.error(error);
    },
  });

  const [itemId, setItemId] = useState(null);

  const action = useCallback(
    (row, hidden) => {
      const isLoading = itemId === row.id && mutateFn.isPending;
      return {
        id: buildingAction,
        onClick: async () => {
          setItemId(row.id);
          mutateFn.mutate({ buildingId: row.id });
        },
        hidden,
        icon: (
          <FontAwesomeIcon className="text-xl text-light-primary" icon={isLoading ? faSpinner : icon} />
        ),
        tooltip,
        aria,
      };
    },
    [itemId, mutateFn, buildingAction, icon, tooltip, aria],
  );

  return { action };
};
