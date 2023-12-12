const SpecialistModel = require('../models/specialists');

exports.getAllSpecialists = async (req, res) => {
    try {
        const specialists = await SpecialistModel.find();
        res.status(200).json(specialists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.getSpecialistById = async (req, res) => {
    try {
        const specialist = await SpecialistModel.findById(req.params.id);
        if (!specialist) 
            return res.status(404).json({ message: 'Specialist not found' });
        
        res.status(200).json(specialist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.addSpecialist = async (req, res) => {
    try {
        if (!req.body.firstName || !req.body.lastName || !req.body.specialization || !req.body.photo || !req.body.service || !req.body.city) 
            return res.status(400).json({ message: 'Missing required fields' });
        
        const specialist = await SpecialistModel.create(req.body);
        res.status(201).json({ message: 'Specialist added successfully', specialist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.updateSpecialist = async (req, res) => {
    try {
        if (!req.body.firstName || !req.body.lastName || !req.body.specialization || !req.body.photo || !req.body.service || !req.body.city) 
            return res.status(400).json({ message: 'Missing required fields' });
        
        const specialist = await SpecialistModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!specialist) 
            return res.status(404).json({ message: 'Specialist not found' });
        
        res.status(200).json({ message: 'Specialist updated successfully', specialist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.deleteSpecialist = async (req, res) => {
    try {
        const specialist = await SpecialistModel.findByIdAndDelete(req.params.id);
        if (!specialist) 
            return res.status(404).json({ message: 'Specialist not found' });
        
        res.status(200).json({ message: 'Specialist deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};
