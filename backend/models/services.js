const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

const ServiceModel = mongoose.model('service', serviceSchema, 'services');

module.exports = ServiceModel;