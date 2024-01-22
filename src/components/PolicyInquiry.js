import React from "react";
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

export default function PolicyInquiry() {
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
          <Typography>Search Policy</Typography>
          <TextField
            label="Policy No"
            fullWidth
            margin="dense"
            sx={{ mb: 2 }}
          />

          <TextField label="NIC No" fullWidth margin="dense" sx={{ mb: 2 }} />

          <TextField label="Name" fullWidth margin="dense" sx={{ mb: 2 }} />

          <TextField
            label="Client ID"
            fullWidth
            margin="dense"
            sx={{ mb: 2 }}
          />

          <TextField label="SO Code" fullWidth margin="dense" sx={{ mb: 2 }} />

          <Stack spacing={10} direction="row" justifyContent="center">
          <Link to="/Dashboard">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#760616",
                "&:hover": {
                  backgroundColor: "#760616" ,
                },
                width: "90px",
                maxWidth: "100%",
              }}
            >
              Back
            </Button>
            </Link>
            
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#760616",
                "&:hover": {
                  backgroundColor: "#760616" ,
                },
                width: "90px",
                maxWidth: "100%",
              }}
            >
              Search
            </Button>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
}
