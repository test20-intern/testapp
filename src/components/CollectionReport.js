// React imports
import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "./ResponsiveDrawerLeft";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { MobileDatePicker } from "@mui/lab";
import axios from "axios";
import swal from 'sweetalert';

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
    empNo: "",
    branchCode: "",
    name: "",
    dob: null, // Initialize dob as null
    status: "",
  });

  const columns = [
    // { field: 'Id', headerName: 'Id', flex: 1 },
    { field: 'dob', headerName: 'DOB', flex: 1 },
    { field: 'empNo', headerName: 'Employee No', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'branchCode', headerName: 'Branch Code', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <strong>
          <EditIcon
            style={{ cursor: 'pointer' }}
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
    axios.get("http://localhost:8080/api/v1/employees")
      .then(response => {
        const dataWithIds = response.data.map((employee, index) => ({ ...employee, id: index + 1 }));
        setEmployeeData(dataWithIds);
      })
      .catch(error => {
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
  };

  const handleDateChange = (date) => {
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      dob: date,
    }));
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8080/api/v1/employees/${editedEmployee.id}`, editedEmployee)
      .then((response) => {
        console.log("Employee updated successfully:", response.data);
        setEditRow(null);
        fetchData();
        // Add an alert for successful update
        swal("Employee updated successfully", "You clicked the button!", "success");
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

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
          <Typography>Employee List</Typography>
          {editRow ? (
            <div>
            
              <TextField
                label="Employee No"
                fullWidth
                margin="dense"
                name="empNo"
                value={editedEmployee.empNo}
                onChange={handleInputChange}
              />
              <TextField
                label="Branch Code"
                fullWidth
                margin="dense"
                name="branchCode"
                value={editedEmployee.branchCode}
                onChange={handleInputChange}
              />
              <TextField
                label="Name"
                fullWidth
                margin="dense"
                name="name"
                value={editedEmployee.name}
                onChange={handleInputChange}
              />
              {/* Use the MobileDatePicker component for the date */}
              <MobileDatePicker
                label="DOB"
                value={editedEmployee.dob}
                onChange={(date) => handleDateChange(date)}
                renderInput={(params) => <TextField {...params} margin="dense" />}
              />
              <TextField
                label="Status"
                fullWidth
                margin="dense"
                name="status"
                value={editedEmployee.status}
                onChange={handleInputChange}
              />
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
            <div style={{ height: 400, width: '100%' }}>
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
