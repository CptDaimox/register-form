"use client";

import ThemeButton from "@/components/theme-button/theme-button";
import { Stack } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ py: 1, px: 2}}
      >
        <ThemeButton />
      </Stack>
      {children}
    </>
  );
}
