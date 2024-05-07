import { createContext, useContext, useState } from "react";
import { useStorageState } from "../lib/useStorageState";
import { socialLogout } from "../lib/action";

const GlobalContext = createContext();
export const useGlobalContext = () => {
  const value = useContext(GlobalContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
  }
  return value
};

export const GlobalProvider = ({ children }) => {
  const { session, setSession, isLoading } = useStorageState("session");
  const [loadingGlobal, setLoadingGlobal] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        session,
        isLoading,
        setSession,
        loadingGlobal,
        setLoadingGlobal,
        signOut: async () => {
          setLoadingGlobal(true);
          try{
            setSession(null);
            socialLogout();
          } catch (error) {
            console.log(error);
          } finally {
            setLoadingGlobal(false);
          }
        }
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
