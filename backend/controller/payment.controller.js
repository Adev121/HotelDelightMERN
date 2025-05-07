import dotenv from 'dotenv';
import Razorpay from 'razorpay';

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const payment = async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // amount in the smallest currency unit
    currency: 'INR',
    receipt: 'receipt#1',
    // notes : ["Booking for Hotel",]
  };


  try {
    const response = await razorpayInstance.orders.create(options);
    res.status(200).json({response});
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
}