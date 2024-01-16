import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';

const items = [
    { text: "Log Out", icon: <LogoutIcon /> },
    // Add other items with their respective icons
  ];

export default function Logout() {
  return (
    <div>
    <List>
    {items.map((item) => (
      <ListItem key={item.text} disablePadding>
        <ListItemButton sx={{border:1,borderRadius:2, margin:1}}>
          <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
    </div>
  )
}
