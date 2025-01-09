import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer, faSpinner } from "@fortawesome/free-solid-svg-icons";

// providers
import { queryClient, useHorizonApiClient } from "../../../../providers/HorizonApiProvider";

// utils
import { ReactQueryKeys } from "../../../../utils/queryKeys";

export const useEnqueueAction = (props) => {

  const { userId, buildingAction, icon, aria, tooltip } = props;

  const horizonApiClient = useHorizonApiClient();

  const mutateFn = useMutation({
    mutationFn: ({ buildingId }) =>
      horizonApiClient.Building.enqueue({
        playerId: userId,
        buildingId,
        action: buildingAction
      }),
    onSuccess: async (result) => {
      const { error, status } = result;

      if (status !== 201) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries([ReactQueryKeys.Buildings, userId]);
        console.info(200);
      }
    },
    onError: async (error) => {
      console.error(error);
    }
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
          <FontAwesomeIcon
            className="text-xl text-light-primary"
            icon={isLoading ? faSpinner : icon}
          />
        ),
        tooltip,
        aria
      };
    },
    [itemId, mutateFn, buildingAction, icon, tooltip, aria]
  );

  return { action };
};
