import React, { useState } from "react";
import ResponsiveDrawer from "./ResponsiveDrawerLeft";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DashBoardDeatils() {
  const [employeeData, setEmployeeData] = useState({
    empNo: "",
    branchCode: "",
    name: "",
    dob: null,
    status: "",
  });

  const [validationError, setValidationError] = useState({
    empNo: false,
    branchCode: false,
    name: false,
    dob: false,
    status: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });

    // Clear validation error when the user starts typing
    setValidationError({
      ...validationError,
      [name]: false,
    });
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate each required field
    for (const field in employeeData) {
      if (field === "dob" && !employeeData[field]) {
        errors[field] = true;
        isValid = false;
      } else if (typeof employeeData[field] === 'string' && employeeData[field].trim() === "") {
        errors[field] = true;
        isValid = false;
      } else {
        errors[field] = false;
      }
    }

    setValidationError(errors);
    return isValid;
  };

  const handleAddEmployee = () => {
    // Validate the form before making the request
    if (!validateForm()) {
      // Display an error message or take any other action
      console.log("Validation failed. Please fill in all required fields.");
      return;
    }

    // Make an HTTP POST request using Axios
    axios
      .post("http://localhost:8080/api/v1/add", employeeData)
      .then((response) => {
        // Handle success, e.g., show a success message
        console.log("Employee added successfully:", response.data);
        alert("Employee added successfully!");
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error adding employee:", error);
        alert("Error adding employee. Please try again.");
      });
  };

  const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Deactive",
      label: "Deactive",
    },
  ];

  return (
    <div>
      <ResponsiveDrawer />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 1,
            height: 500,
            marginLeft: 35,
            marginRight: 5,
          },
          "@media (max-width: 600px)": {
            "& > :not(style)": {
              width: "100%", // Set width to 100% for all children when screen width is under 600px
              marginLeft: 5, // Remove left margin for smaller screens
              marginRight: 5, // Remove right margin for smaller screens
            },
          },
        }}
      >
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography>Add Employee</Typography>
          <TextField
            required
            error={validationError.empNo}
            helperText={validationError.empNo ? "Required field" : ""}
            label="Employee No"
            fullWidth
            margin="dense"
            sx={{ mb: 1 }}
            name="empNo"
            value={employeeData.empNo}
            onChange={handleInputChange}
          />

          <TextField
            required
            error={validationError.branchCode}
            helperText={validationError.branchCode ? "Required field" : ""}
            label="Branch Code"
            fullWidth
            margin="dense"
            sx={{ mb: 1 }}
            name="branchCode"
            value={employeeData.branchCode}
            onChange={handleInputChange}
          />

          <TextField
            required
            error={validationError.name}
            helperText={validationError.name ? "Required field" : ""}
            label="Name"
            fullWidth
            margin="dense"
            sx={{ mb: 1 }}
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} >
              <DatePicker
                label="DOB"
                value={employeeData.dob}
                onChange={(newValue) => setEmployeeData({ ...employeeData, dob: newValue })}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            required
            error={validationError.status}
            helperText={validationError.status ? "Required field" : ""}
            label="Status"
            defaultValue={""}
            fullWidth
            margin="dense"
            sx={{ mb: 1 }}
            name="status"
            value={employeeData.status}
            onChange={handleInputChange}
            select
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Stack spacing={10} direction="row" justifyContent="center">
            <Link to="/Dashboard">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#760616",
                  "&:hover": {
                    backgroundColor: "#760616",
                  },
                  width: "90px",
                  maxWidth: "100%",
                  marginTop: 2,
                }}
                onClick={handleAddEmployee}
              >
                ADD
              </Button>
            </Link>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
}
