import { useLocalStorage } from "@/hooks/use-local-storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z as zod } from "zod";
import Iconify from "../iconify";
import { CustomStepper } from "../stepper";
import FormSummary from "./form-summary";
import { StepOne, StepThree, StepTwo } from "./step-content";

// ---------------------------------- Form Validation ------------------------------------
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

// ---------------------------------- Constants ------------------------------------
const steps = ["Personal Data", "Contact Data", "Salary Indication"];

const defaultValues = {
  stepOne: { firstName: "", lastName: "" },
  stepTwo: { email: "", phoneNumber: "" },
  stepThree: { salary: "" },
};

const STORAGE_KEY = "application";

// ---------------------------------- Main Component ------------------------------------
export default function FormStepper() {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, {
    completed: false,
    values: defaultValues,
  });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (state.completed) setActiveStep(steps.length);
  }, [state.completed]);

  const methods = useForm<WizardSchemaType>({
    mode: "onChange",
    resolver: zodResolver(WizardSchema),
    defaultValues,
  });

  const {
    trigger,
    handleSubmit,
    formState: { isSubmitting },
    reset: resetForm,
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

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setActiveStep(0);
    resetForm();
  }, [reset, resetForm]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      handleNext();
      update("values", data);
      update("completed", true);
    } catch (error) {
      console.error(error);
    }
  });

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
            {activeStep === steps.length && (
              <FormSummary formData={state.values} />
            )}
          </Box>

          <Box display="flex">
            {activeStep !== 0 && activeStep !== steps.length && (
              <Button onClick={handleBack}>Back</Button>
            )}

            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep < 2 && (
              <Button
                variant="contained"
                onClick={() =>
                  handleNext(activeStep === 0 ? "stepOne" : "stepTwo")
                }
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
            {activeStep === steps.length && (
              <Button
                variant="outlined"
                onClick={handleReset}
                startIcon={<Iconify icon="solar:restart-bold" />}
              >
                Reset
              </Button>
            )}
          </Box>
        </form>
      </FormProvider>
    </Card>
  );
}
