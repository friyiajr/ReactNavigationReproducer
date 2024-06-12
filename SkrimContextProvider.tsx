// MyContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
} from "react";

// Define the shape of the context value
interface SkrimContextType {
  skrimId: string;
  setSkrimId: React.Dispatch<React.SetStateAction<string>>;
}

// Create a Context with a default value
export const SkrimContext = createContext<SkrimContextType | undefined>(
  undefined
);

// Create a Provider Component
export const SkrimProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [skrimId, setSkrimId] = useState<string>("");

  const value: SkrimContextType = {
    skrimId,
    setSkrimId,
  };

  return (
    <SkrimContext.Provider value={value}>{children}</SkrimContext.Provider>
  );
};

export const useSkrimId = () => {
  const context = useContext(SkrimContext);
  return context?.skrimId;
};

export const useSetSkrimState = () => {
  const context = useContext(SkrimContext);
  return context?.setSkrimId;
};
