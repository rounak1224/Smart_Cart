import axios from 'axios';

// API endpoints
const GET_CART_API = 'https://5ak85sx806.execute-api.ap-south-1.amazonaws.com/prod/getproduct';
const CHECKOUT_API = 'https://ufki6yxl7d.execute-api.ap-south-1.amazonaws.com/prod/checkout';

// Hardcoded user ID
const USER_ID = 'user123';

// Fetch items currently in cart for user
export const fetchCartItems = async () => {
  try {
    const response = await axios.get(`${GET_CART_API}?user_id=${USER_ID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};

// Perform checkout for user
export const checkoutCart = async () => {
  try {
    const response = await axios.post(`${CHECKOUT_API}?user_id=${USER_ID}`);
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    return null;
  }
};
