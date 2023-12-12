const express = require('express');
const jwt = require('jsonwebtoken');
const {
    getAllSpecialists,
    getSpecialistById,
    addSpecialist,
    updateSpecialist,
    deleteSpecialist
} = require('../controllers/specialists');

const specialistRouter = express.Router();

const checkAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not provided' });
    
    jwt.verify(token, process.env.Secret, (err, decoded) => {
        if (err || !decoded || !decoded.isAdmin) 
            return res.status(401).json({ message: 'Invalid or unauthorized token' });
        
        next();
    });
};

specialistRouter.get('/', getAllSpecialists);
specialistRouter.get('/:id', getSpecialistById);
specialistRouter.post('/', checkAdmin, addSpecialist);
specialistRouter.put('/:id', checkAdmin,  updateSpecialist);
specialistRouter.delete('/:id', checkAdmin, deleteSpecialist);

module.exports = specialistRouter;
