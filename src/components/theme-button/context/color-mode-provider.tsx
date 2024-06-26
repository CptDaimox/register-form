"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { ReactNode, useMemo } from "react";
import { ColorModeContext } from "./color-mode-context";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const STORAGE_KEY = "settings";

export default function ColorModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { state, update } = useLocalStorage(STORAGE_KEY, {
    themeMode: "light",
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        update("themeMode", state.themeMode === "light" ? "dark" : "light");
      },
    }),
    [state.themeMode, update]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.themeMode,
        },
        typography: {
          fontFamily: roboto.style.fontFamily,
        },
      }),
    [state.themeMode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
