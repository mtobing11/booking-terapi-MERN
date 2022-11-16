import mongoose from 'mongoose';

const book25Schema = mongoose.Schema({
    bookingdate: {
        type: Date,
        required: true
    },
    max: {
        type: Number,
        default: 25
    },
    available: {
        type: Boolean,
        default: true
    },
    shift1Available: {
        type: Boolean,
        default: true
    },
    shift2Available: {
        type: Boolean,
        default: true
    },
    shift3Available: {
        type: Boolean,
        default: true
    }, 
    shift1: [{
        name: String, 
        cellphone: Number,
        bookingcode: String,
        timestamp: Date
    }],
    shift2: [{
        name: String, 
        cellphone: Number,
        bookingcode: String,
        timestamp: Date
    }],
    shift3: [{
        name: String, 
        cellphone: Number,
        bookingcode: String,
        timestamp: Date
    }],
})

const BookForm25 = mongoose.model('BookForm25', book25Schema);

export default BookForm25;