import React from "react";
import { Card, Container, CssBaseline, Typography } from "@mui/material";
import FormStepper from "./form-stepper";

export default function ApplicationForm() {
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        mt: 10,
        mb: 15,
        gap: 5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" align="center">
        Tenant Application Form
      </Typography>

      <FormStepper />
    </Container>
  );
}
