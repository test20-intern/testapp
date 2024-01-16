import React from 'react'
import ResponsiveDrawer from './ResponsiveDrawerLeft'
import { Box } from '@mui/material'

export default function LapsedPolicies() {
  return (
    <div>
      <ResponsiveDrawer/>
      <Box sx={{
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
      }}>
        Lapsed Policies
      </Box>
      
    </div>
  )
}
