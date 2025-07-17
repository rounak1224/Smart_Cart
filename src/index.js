// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7b68ee' },
    secondary: { main: '#ffc107' },
    background: { default: '#f9f9f9', paper: '#ffffff' },
    text: { primary: '#2c2c2c' },
  },
  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif',
    button: { textTransform: 'none', fontWeight: 500 },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
