import { createContext, useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

// providers
import { useHorizonApiClient } from "./HorizonApiProvider.jsx";
import { useAccount } from "./AccountProvider.jsx";

// utils
import { ReactQueryKeys } from "../utils/queryKeys.js";
import { fromLocal } from "../utils/local.js";

// config
import config from "../config.js";

const GameClientContext = createContext({});

/**
 * GameProvider
 * @param {object} props - Props
 * @returns {object} React component
 */
const GameProvider = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;

  const horizonApiClient = useHorizonApiClient();
  const { account } = useAccount();

  const gameDataQuery = useQuery({
    queryFn: () => horizonApiClient.GameBasics.gameData(account?.user?.id),
    queryKey: [ReactQueryKeys.GameData, account?.user?.id],
    enabled: !!account?.user?.id,
  });

  const gameData = useMemo(() => gameDataQuery.data ?? {}, [gameDataQuery.data]);

  useEffect(() => {
    if (gameData.resources) {
      horizonApiClient.Resource.gameResources = gameData.resources;
    }
  }, [gameData, horizonApiClient]);

  return <GameClientContext.Provider value={{ ...gameData }}>{children}</GameClientContext.Provider>;
};

const useGame = () => {
  const context = useContext(GameClientContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { GameProvider, useGame };
