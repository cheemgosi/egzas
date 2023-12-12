const mongoose = require('mongoose');

const specialistSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    city: {
        type: String,
        required: true
    }
});

const SpecialistModel = mongoose.model('specialist', specialistSchema, 'specialists');

module.exports = SpecialistModel;