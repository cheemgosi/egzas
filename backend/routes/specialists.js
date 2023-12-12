const express = require('express');
const jwt = require('jsonwebtoken');
const {
    getAllSpecialists,
    getSpecialistById,
    addSpecialist,
    updateSpecialist,
    deleteSpecialist
} = require('../controllers/specialists');
const AccountModel = require('../models/user');

const specialistRouter = express.Router();

const checkAdmin = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    try {
        const decoded = jwt.verify(token, process.env.Secret);
        if (!decoded || !decoded.username) 
            return res.status(401).json({ message: 'Invalid token' });
        
        const user = await AccountModel.findOne({ username: decoded.username });
        if (!user || !user.admin) 
            return res.status(401).json({ message: 'Unauthorized user' });
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Server error occurred" });
    }
};


specialistRouter.get('/', getAllSpecialists);
specialistRouter.get('/:id', getSpecialistById);
specialistRouter.post('/', checkAdmin, addSpecialist);
specialistRouter.put('/:id', checkAdmin, updateSpecialist);
specialistRouter.delete('/:id', checkAdmin, deleteSpecialist);

module.exports = specialistRouter;
