// import React from 'react'
// import ResponsiveDrawer from './ResponsiveDrawerLeft'
// import { Box, Grid, Typography } from '@mui/material'
// import DataGridChart from './DataGridChart'


// export default function DuePolicies() {
//   return (
//     <div>
//     <ResponsiveDrawer/>
//     <Box sx={{
//       height: 500,
//       width: "70%",
//       marginLeft: 35,
//       "& .actions": {
//         color: "text.secondary",
//       },
//       "& .textPrimary": {
//         color: "text.primary",
//       },
//       '@media (max-width: 600px)': {
//         width: '100%', // Set width to 100% when screen width is under 600px
//         marginLeft: 0,  // Optional: remove left margin for smaller screens
//       },
//     }}>
//       <DataGridChart/>
//     </Box>
    
//     </div>
//   )
// }


import React from "react";
import ResponsiveDrawer from "./ResponsiveDrawerLeft";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import DataGridChart from "./DataGridChart";
import { Link } from "react-router-dom";

export default function DuePolicies() {
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

          <DataGridChart />

          <Stack spacing={10} direction="row" justifyContent="center">
            <Link to="/overduepolicies">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#760616",
                  "&:hover": {
                    backgroundColor: "#760616",
                  },
                  width: "90px",
                  maxWidth: "100%",
                  marginTop:"10px",
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
