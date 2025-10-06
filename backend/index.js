const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Import Seat Model
const Seat = require('./models/Seat');

// Routes

// Occupy a seat
app.post('/occupy', async (req, res) => {
    try {
        const { room_number, seat_number } = req.body;
        
        const result = await Seat.findOneAndUpdate(
            { room_number, seat_number },
            { is_vacant: false },
            { new: true, upsert: true }
        );

        res.json({ success: true, seat: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Vacate a seat
app.post('/vacate', async (req, res) => {
    try {
        const { room_number, seat_number } = req.body;
        
        const result = await Seat.findOneAndUpdate(
            { room_number, seat_number },
            { is_vacant: true },
            { new: true, upsert: true }
        );

        res.json({ success: true, seat: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Fetch seat status
app.post('/fetch', async (req, res) => {
    try {
        const { room_number, seat_number } = req.body;
        
        const seat = await Seat.findOne({ room_number, seat_number });
        
        if (!seat) {
            // If seat doesn't exist, consider it vacant
            return res.json({ is_vacant: true });
        }

        res.json({ is_vacant: seat.is_vacant });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});