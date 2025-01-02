import { useQuery } from "@tanstack/react-query";

// providers
import { useHorizonApiClient } from "../../../providers/HorizonApiProvider";
import { useAccount } from "../../../providers/AccountProvider";

function Resources() {
  const { account } = useAccount();
  const horizonApiClient = useHorizonApiClient();

  return <ul></ul>;
}

export default Resources;
