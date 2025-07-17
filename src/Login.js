import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert
} from '@mui/material';

function Login({ onLogin }) {
  const [userType, setUserType] = useState('user');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType === 'staff') {
      alert('Staff dashboard coming soon.');
      return;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    if (otp !== '123456') {
      setError('Invalid OTP. Use 123456');
      return;
    }

    setError('');
    onLogin('user'); // pass user type to App.js
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f0f2f5, #d9e4f5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Smart Trolley Login
          </Typography>

          <RadioGroup
            row
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            sx={{ justifyContent: 'center', mb: 2 }}
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="staff" control={<Radio />} label="Staff" />
          </RadioGroup>

          <form onSubmit={handleSubmit}>
            {userType === 'user' && (
              <>
                <TextField
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  inputProps={{ maxLength: 10 }}
                  required
                />
                <TextField
                  label="OTP"
                  fullWidth
                  margin="normal"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Box mt={3} textAlign="center">
              <Button type="submit" variant="contained" color="primary">
                {userType === 'staff' ? 'Login as Staff' : 'Login as User'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
