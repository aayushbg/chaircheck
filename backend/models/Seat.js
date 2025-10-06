const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    room_number: {
        type: String,
        required: true
    },
    seat_number: {
        type: Number,
        required: true
    },
    is_vacant: {
        type: Boolean,
        default: true
    }
});

// Compound index to ensure unique combination of room_number and seat_number
seatSchema.index({ room_number: 1, seat_number: 1 }, { unique: true });

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;