import React from "react";
import { StyledProvider } from "@gluestack-style/react";
import { config } from "@gluestack-ui/config";

export function GluestackUIProvider({ children, mode = "light" }) {
  return (
    <StyledProvider config={config} colorMode={mode}>
      {children}
    </StyledProvider>
  );
}
