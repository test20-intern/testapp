// import React from "react";
// import ResponsiveDrawer from "./ResponsiveDrawerLeft";
// import { Box, Paper, Typography } from "@mui/material";
// import DataGridChart from "./DataGridChart";

// export default function OverduePolicies() {
//   return (
//     <div>
//     <ResponsiveDrawer />
//     <Box
//       sx={{
//         display: "flex",
//         flexWrap: "wrap",
//         "& > :not(style)": {
//           m: 1,
//           width: 1,
//           height: 500,
//           marginLeft: 35,
//           marginRight: 5,
//         },
//         "@media (max-width: 600px)": {
//           "& > :not(style)": {
//             width: "100%", // Set width to 100% for all children when screen width is under 600px
//             marginLeft: 5, // Remove left margin for smaller screens
//             marginRight: 5, // Remove right margin for smaller screens
//           },
//         },
//       }}
//     >
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography>Search Policy</Typography>
//         <DataGridChart/>
//       </Paper>
//     </Box>
//   </div>
//   );
// }


import React from "react";
import ResponsiveDrawer from "./ResponsiveDrawerLeft";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import DataGridChart from "./DataGridChart";
import { Link } from "react-router-dom";

export default function OverduePolicies() {
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
            <Link to="/policyinquiry">
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
