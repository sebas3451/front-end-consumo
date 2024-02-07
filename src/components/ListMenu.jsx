import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useLocation, useParams } from 'react-router-dom';


export default function ListMenu() {
    let location = useLocation();
    let locationName = location.pathname
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding >
            <ListItemButton 
              href='/addFile' 
              selected={locationName == '/addFile'} 
              disabled={locationName == '/addFile'}
            >
              <ListItemIcon>
                <NoteAddIcon/>
              </ListItemIcon>
              <ListItemText primary="Agregar archivo" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton 
              href='/xxxxxx' 
              selected={locationName == '/xxxxxx'} 
              disabled={locationName == '/xxxxxx'}
            >
              <ListItemIcon>
                <DisabledByDefaultIcon />
              </ListItemIcon>
              <ListItemText primary="xxxxxx" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}