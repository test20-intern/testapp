import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "./ResponsiveDrawerLeft";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import swal from "sweetalert";
import dayjs from "dayjs";
import { differenceInYears } from "date-fns";

// Custom Export Button for the Toolbar
const CustomExportButton = () => {
  return (
    <GridToolbarExport
      onClick={() => {
        // Add custom export logic here
        console.log("Custom export logic");
      }}
    />
  );
};

export default function DashBoardDetails() {
  const [employeeData, setEmployeeData] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    id: "",
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

  const columns = [
    { field: "dob", headerName: "DOB", flex: 1 },
    { field: "empNo", headerName: "Employee No", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      valueGetter: (params) => params.row.status || "",
      editable: true,
    },
    { field: "branchCode", headerName: "Branch Code", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <strong>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(params.row.id)}
          />
        </strong>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/v1/employees")
      .then((response) => {
        const dataWithIds = response.data.map((employee, index) => ({
          ...employee,
          id: index + 1,
          branchCode: employee.branch ? employee.branch.branchCode : "",
        }));
        setEmployeeData(dataWithIds);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  };

  const handleEdit = (id) => {
    const rowToEdit = employeeData.find((row) => row.id === id);
    setEditRow(rowToEdit);
    setEditedEmployee(rowToEdit);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));

    // Clear validation error when the user starts typing
    setValidationError({
      ...validationError,
      [name]: false,
    });
  };

  const handleDateChange = (date) => {
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      dob: date,
    }));
  };

  const onEditEmployeeNumberChange = (event) => {
    const newEmployeeNumber = event.target.value;
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      empNo: newEmployeeNumber,
    }));
  };

  const handleSave = () => {
    // Validate the form before saving
    if (!validateForm()) {
      return;
    }
  
    console.log("Updating employee with ID:", editedEmployee.id);
  
    axios
      .put(
        `http://localhost:8080/api/v1/employees/${editedEmployee.id}`,
        editedEmployee
      )
      .then((response) => {
        console.log("Employee updated successfully:", response.data);
        setEditRow(null);
        fetchData();
        // Add an alert for a successful update
        swal(
          "Employee updated successfully",
          "You clicked the button!",
          "success"
        );
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };
  
  

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate each required field
    for (const field in editedEmployee) {
      if (field === "dob" && !editedEmployee[field]) {
        errors[field] = true;
        isValid = false;
      } else if (
        field === "dob" &&
        differenceInYears(new Date(), new Date(editedEmployee[field])) < 18
      ) {
        errors[field] = true;
        isValid = false;
        swal(
          "Validation failed",
          "Please enter a valid birthdate. Age must be 18 or above.",
          "error"
        );
      } else if (
        typeof editedEmployee[field] === "string" &&
        editedEmployee[field].trim() === ""
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
          <Typography>Employee List</Typography>
          {editRow ? (
            <div>
              <TextField
                disabled
                error={validationError.empNo}
                helperText={validationError.empNo ? "Required field" : ""}
                label="Employee No"
                fullWidth
                margin="dense"
                name="empNo"
                value={editedEmployee.empNo}
                onChange={onEditEmployeeNumberChange}
              />
              <TextField
                required
                error={validationError.branchCode}
                helperText={validationError.branchCode ? "Required field" : ""}
                label="Branch Code"
                fullWidth
                margin="dense"
                name="branchCode"
                value={editedEmployee.branchCode}
                onChange={handleInputChange}
              />
              <TextField
                required
                error={validationError.name}
                helperText={validationError.name ? "Required field" : ""}
                label="Name"
                fullWidth
                margin="dense"
                name="name"
                value={editedEmployee.name}
                onChange={handleInputChange}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="DOB"
                  value={dayjs(
                    editedEmployee.dob ? new Date(editedEmployee.dob) : null
                  )}
                  onChange={(date) => handleDateChange(date)}
                  renderInput={(params) => (
                    <TextField {...params} margin="dense" />
                  )}
                />
              </LocalizationProvider>

              <TextField
                required
                error={validationError.status}
                helperText={validationError.status ? "Required field" : ""}
                label="Status"
                fullWidth
                margin="dense"
                name="status"
                value={editedEmployee.status}
                onChange={handleInputChange}
                select
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#760616",
                  "&:hover": {
                    backgroundColor: "#760616",
                  },
                  width: "90px",
                  maxWidth: "100%",
                  marginTop: "10px",
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          ) : (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={employeeData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div>
          )}
        </Paper>
      </Box>
    </div>
  );
}

const GridToolbar = () => {
  return (
    <GridToolbarContainer>
      <CustomExportButton />
    </GridToolbarContainer>
  );
};
