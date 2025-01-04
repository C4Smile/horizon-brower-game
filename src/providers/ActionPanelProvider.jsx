/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const ActionPanelContext = createContext({});

const ActionPanelProvider = (props) => {
  const { children } = props;

  const [showPanel, setShowPanel] = useState(null);

  const closePanel = () => setShowPanel(null);

  return (
    <ActionPanelContext.Provider value={{ showPanel, setShowPanel, closePanel }}>
      {children}
    </ActionPanelContext.Provider>
  );
};

const useActionPanel = () => {
  const context = useContext(ActionPanelContext);
  if (context === undefined) {
    throw new Error("useAction must be used within a ActionPanel");
  }
  return context;
};

export { ActionPanelProvider, useActionPanel };
