const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const carSchema = new mongoose.Schema({
    owner:{
        type: ObjectId,
        ref: 'User',
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    seating_capacity:{
        type: Number,
        required: true
    },
    fuel_type:{
        type: String,
        required: true
    },
    transmission:{
        type: String,
        required: true
    },
    pricePerDay:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    isAvailable:{
        type: Boolean,
        default: true
    }
},{ timestamps: true })

module.exports = mongoose.model('Car',carSchema);
