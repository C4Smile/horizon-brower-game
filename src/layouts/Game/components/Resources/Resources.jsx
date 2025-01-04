/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sortBy } from "some-javascript-utils/Array";

// providers
import { useHorizonApiClient } from "../../../../providers/HorizonApiProvider.jsx";
import { useAccount } from "../../../../providers/AccountProvider.jsx";

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

  const myResourcesQuery = useQuery({
    queryFn: () => horizonApiClient.Resource.geyMyResources(account?.user?.id),
    queryKey: [ReactQueryKeys.Resources, account?.user?.id],
    enabled: !!account?.user?.id,
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
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [resources]);

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
