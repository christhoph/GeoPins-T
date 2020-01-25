import React from "react";

import { AuthContextProvider } from "./authContext";
import { MapContextProvider } from "./mapContext";

export * from "./authContext";
export * from "./mapContext";

const ContextProviders = ({ children }) => (
  <AuthContextProvider>
    <MapContextProvider>{children}</MapContextProvider>
  </AuthContextProvider>
);

export default ContextProviders;
