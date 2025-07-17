import React, { useEffect, useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { fetchCartItems } from './api_temp';
import { CircularProgress, Box, Button, Typography } from '@mui/material';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const items = await fetchCartItems();
      setCartItems(items);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userType === 'user') {
      fetchCart();
      const interval = setInterval(fetchCart, 5000);
      return () => clearInterval(interval);
    }
  }, [userType]);

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setCartItems([]);
    setLoading(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (userType === 'staff') {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h5" gutterBottom>
          Staff Dashboard Coming Soon
        </Typography>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    );
  }

  return loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress />
    </Box>
  ) : (
    <Dashboard items={cartItems} onLogout={handleLogout} />
  );
}

export default App;
