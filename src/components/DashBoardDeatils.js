import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "./ResponsiveDrawerLeft";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import swal from "sweetalert";
import axios from "axios";
import { differenceInYears } from "date-fns";

export default function DashBoardDetails() {
  const [employeeData, setEmployeeData] = useState({
    empNo: "",
    branchCode: "",
    name: "",
    dob: null,
    status: "",
  });

  const [branchNames, setBranchNames] = useState([]);
  const [validationError, setValidationError] = useState({
    empNo: false,
    branchCode: false,
    name: false,
    dob: false,
    status: false,
  });

  const [employeeDataList, setEmployeeDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/v1/employees")
      .then((response) => setEmployeeDataList(response.data))
      .catch((error) => console.error("Error fetching employee data:", error));

    axios
      .get("http://localhost:8080/api/v1/branches")
      .then((response) => setBranchNames(response.data))
      .catch((error) => console.error("Error fetching branch names:", error));
  };

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
      } else if (
        field === "dob" &&
        differenceInYears(new Date(), new Date(employeeData[field])) < 18
      ) {
        errors[field] = true;
        isValid = false;
        swal(
          "Validation failed",
          "Please enter a valid birthdate. Age must be 18 or above.",
          "error"
        );
      } else if (
        typeof employeeData[field] === "string" &&
        employeeData[field].trim() === ""
      ) {
        errors[field] = true;
        isValid = false;
      } else {
        errors[field] = false;
      }
    }
  
    setValidationError(errors);
  
    if (!isValid) {
      // Only display the generic error message if the issue is not related to the date of birth
      if (!errors.dob) {
        swal(
          "Validation failed",
          "Please fill in all required fields correctly.",
          "error"
        );
      }
    }
  
    return isValid;
  };
  
  
  const handleAddEmployee = () => {
    // Validate the form before making the request
    if (!validateForm()) {
      // Display an error message or take any other action
      console.log("Validation failed. Please fill in all required fields.");
      return;
    }

    // Find the selected branch based on branch name
    const selectedBranch = branchNames.find(
      (branch) => branch.branchCode === employeeData.branchCode
    );

    // Make an HTTP POST request using Axios
    axios
      .post("http://localhost:8080/api/v1/add", {
        ...employeeData,
        branchCode: selectedBranch?.branchCode,
      })
      .then((response) => {
        // Handle success, e.g., show a success message
        console.log("Employee added successfully with ID:", response.data);
        swal("Employee added successfully", "You clicked the button!", "success");

        // Fetch the updated employee list
        fetchData();
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error adding employee:", error);
        swal("Error adding employee", "You clicked the button!", "error");
      });
  };

  const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Not Active",
      label: "Not Active",
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
              width: "100%",
              marginLeft: 5,
              marginRight: 5,
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
            label="Branch Name"
            fullWidth
            margin="dense"
            sx={{ mb: 1 }}
            name="branchCode"
            value={employeeData.branchCode}
            onChange={handleInputChange}
            select
          >
            {branchNames.map((branch) => (
              <MenuItem key={branch.branchCode} value={branch.branchCode}>
                {branch.branchName}
              </MenuItem>
            ))}
          </TextField>

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

          <LocalizationProvider dateAdapter ={AdapterDayjs}>
            <DatePicker
              label="DOB"
              value={employeeData.dob}
              onChange={(newValue) =>
                setEmployeeData({ ...employeeData, dob: newValue })
              }
            />
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

          <Stack spacing={2} direction="row" justifyContent="center">
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
          </Stack>
        </Paper>
      </Box>
    </div>
  );
}
