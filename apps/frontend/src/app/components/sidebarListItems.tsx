import Favorite from '@mui/icons-material/Favorite';
import List from '@mui/icons-material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const sidebarListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <List />
      </ListItemIcon>
      <ListItemText primary="Asteroids Feed List" />
    </ListItemButton>
    <ListItemButton component={Link} to="/favorites">
      <ListItemIcon>
        <Favorite />
      </ListItemIcon>
      <ListItemText primary="Favorites" />
    </ListItemButton>
  </React.Fragment>
);
