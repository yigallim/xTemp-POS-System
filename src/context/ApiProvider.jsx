import React, { createContext, useContext } from "react";

const ApiContext = createContext();

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children, api }) => {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
