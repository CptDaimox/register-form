import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

interface FormSummaryProps {
  formData: any;
}

const FormSummary: React.FC<FormSummaryProps> = ({ formData }) => {
  return (
    <Stack gap={3}>
      <Typography variant="h6">Summary</Typography>
      <Typography>First Name: {formData.stepOne.firstName}</Typography>
      <Typography>Last Name: {formData.stepOne.lastName}</Typography>
      <Typography>Email: {formData.stepTwo.email}</Typography>
      <Typography>Phone Number: {formData.stepTwo.phoneNumber}</Typography>
      <Typography>Salary: {formData.stepThree.salary}</Typography>
    </Stack>
  );
};

export default FormSummary;
