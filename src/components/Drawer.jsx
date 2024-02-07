import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppRouter } from '../router/App';
import ListMenu from './ListMenu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Container, Stack } from '@mui/material';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
  const {token} = props
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <ThemeProvider theme={darkTheme}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Consumo
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
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
          <ListMenu/>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 8, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <AppRouter/>
      </Box>
    </Box>
  );
  
}
ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
