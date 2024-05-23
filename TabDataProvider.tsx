import React from "react";

const TabStateContext = React.createContext(undefined);

export interface TabStateProviderProps {
  children?: React.ReactElement;
}

export const TabStateProvider = ({ children }: TabStateProviderProps) => {
  return <TabStateContext.Provider>{children}</TabStateContext.Provider>;
};
