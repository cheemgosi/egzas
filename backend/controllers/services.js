const ServiceModel = require('../models/services');

exports.getAllServices = async (req, res) => {
    try {
        const services = await ServiceModel.find();
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await ServiceModel.findById(req.params.id);
        if (!service)
            return res.status(404).json({ message: 'Service not found' });

        res.status(200).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.addService = async (req, res) => {
    try {
        const { name, city } = req.body;
        if (!name || !city)
            return res.status(400).json({ message: 'Missing required fields' });

        const service = await ServiceModel.create({ name, city });
        const savedService = await service.save();

        res.status(201).json({ message: 'Service added successfully', service: savedService });

        res.status(201).json({ message: 'Service added successfully', service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.updateService = async (req, res) => {
    try {
        const updateFields = {};
        const { name, city } = req.body;
        if (name)
            updateFields.name = name;

        if (city)
            updateFields.city = city;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'At least one field to update is required' });
        }

        const service = await ServiceModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        if (!service)
            return res.status(404).json({ message: 'Service not found' });


        res.status(200).json({ message: 'Service updated successfully', service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};


exports.deleteService = async (req, res) => {
    try {
        const service = await ServiceModel.findByIdAndDelete(req.params.id);
        if (!service)
            return res.status(404).json({ message: 'Service not found' });

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};
