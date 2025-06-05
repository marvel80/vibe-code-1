import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ItemList } from './components/ItemList';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '2rem' }}>
        <ItemList />
      </div>
    </ThemeProvider>
  );
}

export default App; 