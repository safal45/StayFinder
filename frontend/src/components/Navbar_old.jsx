import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import {Link,useLocation} from 'react-router-dom'

const drawerWidth = 240;

export default function Navbar1(props) {
  const { content } = props
  const location = useLocation()
  const path = location.pathname

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h" noWrap component="div">
            Flipshot
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            
              <ListItem key={1} disablePadding>
                <ListItemButton component={Link} to="/home" selected={"/home" === path}>
                  <ListItemIcon>
                   <HomeIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
            </ListItem>
            <ListItem key={1} disablePadding>
            <ListItemButton component={Link} to="/about" selected={"/about" === path}>

                  <ListItemIcon>
                   <InfoIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"About"} />
                </ListItemButton>
            </ListItem>
            <ListItem key={1} disablePadding>
<ListItemButton component={Link} to="/contactus" selected={"/contactus" === path}>

                  <ListItemIcon>
                  <ContactSupportIcon/> 
                  </ListItemIcon>
                  <ListItemText primary={"Contact"} />
                </ListItemButton>
              </ListItem>
          
          </List>
         
          
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
