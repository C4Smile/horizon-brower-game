import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// providers
import { useHorizonApiClient } from "../../../providers/HorizonApiProvider";
import { useAccount } from "../../../providers/AccountProvider";

// utils
import { ReactQueryKeys } from "../../../utils/queryKeys.js";

// components
import Resource from "./Resource.jsx";

export const ResourcesEnum = {
  Materials: 1,
  Supplies: 2,
  Coins: 3,
  People: 4
};

function Resources() {
  const { account } = useAccount();
  const horizonApiClient = useHorizonApiClient();

  const [resources, setResources] = useState([]);

  const myResourcesQuery = useQuery(({
    queryFn: () => horizonApiClient.Resource.geyMyResources(account?.user?.id),
    queryKey: [ReactQueryKeys.Resources, account?.user?.id],
    enabled: !!account?.user?.id

  }));

  useEffect(() => {
    if (myResourcesQuery?.data)
      setResources([...myResourcesQuery.data]);
  }, [myResourcesQuery?.data]);

  useEffect(() => {
    if (resources.length) {
      const interval = setInterval(() => {
        setResources(resources?.map((res) => ({
          ...res,
          inStock: res.inStock + res.currentFactor
        })));
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [resources]);

  console.log(resources);

  return <ul className="flex gap-3 bg-dark py-2 rounded-2xl px-4">
    {!myResourcesQuery.isPending ? resources?.map((resource) => (
      <li key={resource.id}>
        <Resource {...resource} />
      </li>
    )) : null}
  </ul>;
}

export default Resources;
