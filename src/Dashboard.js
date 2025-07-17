import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stack,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { fetchCartItems } from './api_temp';
import { QRCodeCanvas } from 'qrcode.react';

function Dashboard({ onLogout }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDebug, setShowDebug] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [billInfo, setBillInfo] = useState('');

  const loadCart = async () => {
    setLoading(true);
    try {
      const response = await fetchCartItems();
      if (Array.isArray(response.cart)) setCartItems(response.cart);
      else if (Array.isArray(response.items)) setCartItems(response.items);
      else if (Array.isArray(response)) setCartItems(response);
      else setCartItems([]);
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
    const interval = setInterval(loadCart, 5000);
    return () => clearInterval(interval);
  }, []);

  const getTotal = () =>
    cartItems.reduce((sum, item) => {
      const qty = parseInt(item.quantity || 1);
      const price = parseFloat(item.price || 0);
      return sum + qty * price;
    }, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Cart is empty. Nothing to checkout.');
      return;
    }

    const bill = {
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: getTotal(),
      date: new Date().toLocaleString(),
    };

    const billString = JSON.stringify(bill, null, 2);
    setBillInfo(billString);
    setShowQR(true);
  };

  const handleDone = () => {
    setShowQR(false);
    setTimeout(() => {
      onLogout();
    }, 500);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to right, #f9f9f9, #eef1f8)', pt: 8, px: 2 }}>
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ borderRadius: 4, p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            <ShoppingCartIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Smart Trolley Cart
          </Typography>

          {loading ? (
            <Box textAlign="center" my={4}>
              <CircularProgress />
              <Typography mt={2}>Loading cart...</Typography>
            </Box>
          ) : cartItems.length === 0 ? (
            <Typography variant="h6" color="text.secondary">Your cart is empty.</Typography>
          ) : (
            <>
              <Stack spacing={2}>
                {cartItems.map((item, index) => (
                  <Paper key={index} elevation={2} sx={{ p: 2, borderRadius: 3 }}>
                    <Typography fontWeight="bold">{item.name || `Product ${index + 1}`}</Typography>
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        style={{ width: '100%', maxHeight: 160, objectFit: 'contain', margin: '10px 0' }}
                      />
                    )}
                    <Typography>Price: ₹{item.price || 0}</Typography>
                    <Typography>Qty: {item.quantity || 1}</Typography>
                    <Typography>
                      Subtotal: ₹{(item.quantity || 1) * (item.price || 0)}
                    </Typography>
                  </Paper>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" textAlign="right" sx={{ mb: 2 }}>
                Total: ₹{getTotal()}
              </Typography>

              <Box textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ px: 4, py: 1.5, borderRadius: 3 }}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </>
          )}

          <Box textAlign="center" mt={3}>
            <Button variant="text" color="error" onClick={onLogout}>
              Logout
            </Button>
            <Button variant="text" onClick={() => setShowDebug(prev => !prev)}>
              {showDebug ? 'Hide Raw JSON' : 'Show Raw JSON'}
            </Button>
          </Box>

          {showDebug && (
            <Box mt={3}>
              <Typography variant="body2" color="text.secondary">Raw API Data:</Typography>
              <pre style={{
                fontSize: 12,
                overflowX: 'auto',
                backgroundColor: '#f1f1f1',
                padding: 10,
                borderRadius: 5
              }}>
                {JSON.stringify(cartItems, null, 2)}
              </pre>
            </Box>
          )}
        </Paper>
      </Container>

      <Dialog open={showQR} onClose={handleDone} maxWidth="sm" fullWidth>
        <DialogTitle>Scan to Get Your Bill</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Total: ₹{getTotal()}</Typography>
          {billInfo ? (
            <>
              <QRCodeCanvas
                value={billInfo}
                size={256}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin
              />
              <Typography mt={2} variant="body2" color="text.secondary">
                Show this QR at counter or scan to view your bill.
              </Typography>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 3 }}
                onClick={handleDone}
              >
                Done
              </Button>
            </>
          ) : (
            <Typography variant="body1" color="error">
              No bill data to show. Please try again.
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Dashboard;
