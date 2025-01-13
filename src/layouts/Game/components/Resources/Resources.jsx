/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sortBy } from "some-javascript-utils/Array";

// providers
import { useHorizonApiClient } from "../../../../providers/HorizonApiProvider.jsx";
import { useNotification } from "../../../../providers/NotificationProvider.jsx";
import { useAccount } from "../../../../providers/AccountProvider.jsx";
import { useSocket } from "../../../../providers/SocketProvider.jsx";

// utils
import { ReactQueryKeys } from "../../../../utils/queryKeys.js";

// components
import Resource from "./Resource.jsx";

export const ResourcesEnum = {
  Materials: 1,
  Supplies: 2,
  Coins: 3,
  People: 4,
};

function Resources() {
  const { account } = useAccount();
  const horizonApiClient = useHorizonApiClient();

  const [resources, setResources] = useState([]);

  const { setNotification } = useNotification();

  const { socket, addEvent } = useSocket();

  const myResourcesQuery = useQuery({
    queryFn: () => horizonApiClient.Resource.getMyResources(account?.horizonUser?.id),
    queryKey: [ReactQueryKeys.Resources, account?.horizonUser?.id],
    enabled: !!account?.horizonUser?.id,
  });

  useEffect(() => {
    if (myResourcesQuery?.data) setResources([...myResourcesQuery.data]);
  }, [myResourcesQuery?.data]);

  useEffect(() => {
    if (resources.length) {
      const interval = setInterval(() => {
        setResources(
          resources?.map((res) => ({
            ...res,
            inStock: res.inStock < res.maxCapacity ? res.inStock + res.currentFactor : res.inStock,
          })),
        );
      }, 4000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [resources]);

  useEffect(() => {
    if (socket) {
      addEvent("not.resources", (payload) => {
        console.log(payload);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <ul className="flex gap-3 bg-dark pb-1 pt-2 px-4 rounded-lg">
      {!myResourcesQuery.isPending
        ? sortBy(resources, "resourceId", true)?.map((resource) => (
            <li key={resource.id}>
              <Resource {...resource} />
            </li>
          ))
        : null}
    </ul>
  );
}

export default Resources;
