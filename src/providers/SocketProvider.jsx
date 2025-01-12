/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { io } from "socket.io-client";
import { createContext, useCallback, useContext, useMemo } from "react";

// providers
import { useAccount } from "./AccountProvider";

// config
import config from "../config";

const SocketContext = createContext({});

const SocketProvider = (props) => {
  const { children } = props;

  const { account } = useAccount();

  const socket = useMemo(() => {
    if (account?.horizonUser?.id) {
      const socket = io(config.apiUrl, {
        reconnectionDelayMax: 10000,
      });

      socket.on("connect", function () {
        console.log("Connected");

        socket.emit("identity", account?.horizonUser?.id, (response) =>
          console.log("Identity:", response),
        );
      });

      socket.on("exception", function (data) {
        console.log("event", data);
      });

      socket.on("disconnect", function () {
        console.log("Disconnected");
      });

      return socket;
    }
    return null;
  }, [account?.horizonUser?.id]);

  const addEvent = useCallback(
    (eventName, callback) => {
      if (socket) {
        socket.off(eventName);
        socket.on(eventName, callback);
      }
    },
    [socket],
  );

  return <SocketContext.Provider value={{ socket, addEvent }}>{children}</SocketContext.Provider>;
};

const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export { SocketProvider, useSocket };
