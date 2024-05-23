import React, { useMemo, useState } from "react";

export interface TabProviderData {
  setPosition: ({ top }: { top: number }) => void;
  position: { top: number };
}

const TabStateContext = React.createContext<TabProviderData | undefined>(
  undefined
);

export interface TabStateProviderProps {
  children?: React.ReactElement;
}

export const TabStateProvider = ({ children }: TabStateProviderProps) => {
  const [position, setPosition] = useState({ top: 100 });

  const value = useMemo(() => {
    return {
      setPosition,
      position,
    };
  }, [position]);

  return (
    <TabStateContext.Provider value={value}>
      {children}
    </TabStateContext.Provider>
  );
};

export const useTabPosition = () => {
  const context = React.useContext(TabStateContext);
  if (!context) {
    throw new Error("useIndexScreen must be used within a IndexScreenProvider");
  }
  return context;
};
