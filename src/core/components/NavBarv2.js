import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { isAdmin } from '../../auth/helper/index';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import {signout, isAuthenticated} from "../../auth/helper/index"
import AccountCircle from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState([
    {name:"All Trips", url:"/user/userdashboard" },
    {name:" My Bookings", url:"/user/mybookings" },
    {name:" My Cancellations", url:"/user/mycancellations" },
    {name:" User request Solved", url:"/user/requestsolved" },
  ])

  const [admin, setAdmin] = React.useState([
    {name: "All Trips" , url: "/admin/admindashboard"},
    {name:"Create Categories", url:"/admin/create/category" },
    {name:"Manage Categories", url:"/admin/categories/:categoryId"},
    {name:"Create Trips", url:"/admin/create/trips"},
    {name:"Manage Trips", url:"/admin/trips/update/:productId"},
    {name:"User Cancellation Request", url:"/admin/cancellation/update"},
    {name:"Solved Cancellation Record", url:"/admin/cancellation/adminsolved"},
  ])

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    if (isAuthenticated()) {
      signout(() => {
        localStorage.removeItem("token");
        navigate("/signin");
      })
    } else {
      alert("You are not logged in!");
    }
  }

   const navigationItems = isAdmin() ? admin : user;

   const handleSubmit = (url) => {
    navigate(url)
   }

  //  const getuserName = localStorage.getItem('user')
  //  console.log(getuserName, "121")
  //  const username = JSON.parse(getuserName)
  //  console.log(username, "123")
  //  const name = username.name
  //  console.log(name, "125")

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            
            <MenuIcon />
            
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          { isAdmin() ? 'Admin Dashboard' : 'User DashBoard' }
          </Typography>
          <Button variant="outlined" color="inherit" style={{ position: 'absolute', right: 20, top: 20 }} onClick={handleLogout}>Logout</Button>
        </Toolbar>
        
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        
          <div style={{ marginTop: '20px' }}>
            {/* <p>Welcome, {name}</p> */}
          <AccountCircle  sx={{
            fontSize: 24,
            
          }}
          />
          </div>
        
        
        
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigationItems.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleSubmit(text.url)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        {/* <DrawerHeader /> */}
    
      </Main>
    </Box>
  );
}