import { z as zod } from "zod";
import React, { useCallback, useState } from "react";
import { Button, Box, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FormSummary from "./form-summary";
import { CustomStepper } from "../stepper";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepOne, StepTwo, StepThree } from "./step-content";
import Iconify from "../iconify";

const PersonalDataSchema = zod.object({
  firstName: zod.string().min(1, { message: "Full name is required!" }),
  lastName: zod.string().min(1, { message: "Last name is required!" }),
});

const ContactDataSchema = zod.object({
  phoneNumber: zod.string().min(1, { message: "Phone number is required!" }),
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
});

const SalarySchema = zod.object({
  salary: zod.string().min(1, { message: "Salary is required!" }),
});

const WizardSchema = zod.object({
  stepOne: PersonalDataSchema,
  stepTwo: ContactDataSchema,
  stepThree: SalarySchema,
});

type WizardSchemaType = zod.infer<typeof WizardSchema>;

const steps = ["Personal Data", "Contact Data", "Salary Indication"];

const defaultValues = {
  stepOne: { firstName: "", lastName: "" },
  stepTwo: { email: "", phoneNumber: "" },
  stepThree: { salary: "" },
};

export default function FormStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<WizardSchemaType>(defaultValues);

  const methods = useForm<WizardSchemaType>({
    mode: "onChange",
    resolver: zodResolver(WizardSchema),
    defaultValues,
  });

  const {
    reset,
    trigger,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  const handleNext = useCallback(
    async (step?: "stepOne" | "stepTwo") => {
      console.info("step", step);

      if (step) {
        const isValid = await trigger(step);
        if (isValid) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    },
    [trigger]
  );
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = useCallback(() => {
    reset();
    setActiveStep(0);
  }, [reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      console.info("DATA", data);
      handleNext();
      setFormData(data);
    } catch (error) {
      console.error(error);
    }
  });
  const completedStep = activeStep === steps.length;

  return (
    <Card
      sx={{
        p: 5,
        mx: "auto",
        width: 1,
        maxWidth: 750,
        borderRadius: 8,
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          <CustomStepper activeStep={activeStep} steps={steps} />

          <Box
            gap={3}
            display="flex"
            flexDirection="column"
            sx={{
              p: 3,
              mb: 3,
              minHeight: 180,
              borderRadius: 1.5,
            }}
          >
            {activeStep === 0 && <StepOne />}
            {activeStep === 1 && <StepTwo />}
            {activeStep === 2 && <StepThree />}
            {completedStep && <FormSummary formData={formData} />}
          </Box>
          {
            <Box display="flex">
              {activeStep !== 0 && !completedStep && (
                <Button onClick={handleBack}>Back</Button>
              )}

              <Box sx={{ flex: "1 1 auto" }} />

              {activeStep === 0 && (
                <Button
                  variant="contained"
                  onClick={() => handleNext("stepOne")}
                >
                  Next
                </Button>
              )}
              {activeStep === 1 && (
                <Button
                  variant="contained"
                  onClick={() => handleNext("stepTwo")}
                >
                  Next
                </Button>
              )}
              {activeStep === 2 && (
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save changes
                </LoadingButton>
              )}
              {completedStep && (
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  startIcon={<Iconify icon="solar:restart-bold" />}
                >
                  Reset
                </Button>
              )}
            </Box>
          }
        </form>
      </FormProvider>
    </Card>
  );
}
