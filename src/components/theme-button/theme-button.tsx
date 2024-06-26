import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import Iconify from "../iconify";
import { ColorModeContext } from "./context/color-mode-context";

export default function ThemeButton() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <IconButton
      sx={{ m: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Iconify icon="solar:moon-sleep-bold" width={24}/>
      ) : (
        <Iconify icon="solar:sun-line-duotone" width={24}/>
      )}
    </IconButton>
  );
}
