import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { RHFTextField } from "../hook-form/text-field";
import { RHFRadioGroup } from "../hook-form/radio-group";

interface StepContentProps {
  step: number;
}

export function StepOne() {
  return (
    <>
      <RHFTextField
        label="First Name"
        name="stepOne.firstName"
        InputLabelProps={{ shrink: true }}
      />
      <RHFTextField
        label="Last Name"
        name="stepOne.lastName"
        InputLabelProps={{ shrink: true }}
      />
    </>
  );
}

export function StepTwo() {
  return (
    <>
      <RHFTextField
        label="Phone Number"
        name="stepTwo.phoneNumber"
        InputLabelProps={{ shrink: true }}
      />
      <RHFTextField
        label="Email"
        name="stepTwo.email"
        InputLabelProps={{ shrink: true }}
      />
    </>
  );
}

export function StepThree() {
  return (
      <RHFRadioGroup
        name="stepThree.salary"
        options={[
          { value: "0 - 1.000", label: "0 - 1.000" },
          { value: "1.000 - 2.000", label: "1.000 - 2.000" },
          { value: "2.000 - 3.000", label: "2.000 - 3.000" },
          { value: "3.000 - 4.000", label: "3.000 - 4.000" },
          { value: "Over 4.000", label: "Over 4.000" },
        ]}
      />
  );
}
