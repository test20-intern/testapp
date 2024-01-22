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
import DataGridChart from "./DataGridChart";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LapsedPolicies() {
  const [editEmployee, setEditEmployee] = useState(null);

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleSave = () => {
    // Make an HTTP PUT request to update the employee data
    axios
      .put(`http://localhost:8080/api/v1/employees/${editEmployee.empNo}`, editEmployee)
      .then((response) => {
        console.log("Employee updated successfully:", response.data);
        // Reset editEmployee state after successful update
        setEditEmployee(null);
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
          height: 500,
          width: "70%",
          marginLeft: 35,
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
          '@media (max-width: 600px)': {
            width: '100%', // Set width to 100% when screen width is under 600px
            marginLeft: 0,  // Optional: remove left margin for smaller screens
          },
        }}
      >
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography>Search Policy</Typography>
          {/* Your search input fields go here */}

          <DataGridChart onEdit={handleEdit} />

          {editEmployee && (
            <Stack spacing={10} direction="row" justifyContent="center">
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
            </Stack>
          )}

          <Stack spacing={10} direction="row" justifyContent="center">
            <Link to="/lapsedpolicies">
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
              >
                Back
              </Button>
            </Link>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
}
