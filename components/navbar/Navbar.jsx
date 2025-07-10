"use client";

import React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NavbarIcon from './NavbarIcon';
import Link from 'next/link';
import NavbarFooter from './NavbarFooter';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import RestoreIcon from '@mui/icons-material/Restore';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import TopicIcon from '@mui/icons-material/Topic';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { usePathname } from 'next/navigation';
import './Navbar.scss';


const menuItems = [
  { text: 'Request', icon: <AddToPhotosIcon />, path: '/request' },
  { text: 'History', icon: <RestoreIcon />, path: '/history' },
  { text: 'Stream', icon: <SettingsInputAntennaIcon />, path: '/stream' },
  { text: 'Topic', icon: <TopicIcon />, path: '/topic' },
  { text: 'Status', icon: <MoreHorizIcon />, path: '/status' },
];
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `60px`,
  [theme.breakpoints.up('sm')]: {
    width: `60px`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <Drawer variant="permanent" open={open}>
      <NavbarIcon open={open} setOpen={setOpen} />
      <Divider sx={{ backgroundColor: '#4B2D74', margin: '0 0 20px 0' }} />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: pathname === item.path ? '#4B2D74' : 'transparent',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <NavbarFooter open={open} /> */}
    </Drawer>
  )
}

export default Navbar