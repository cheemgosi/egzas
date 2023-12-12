const express = require('express');
const serviceRouter = express.Router();
const servicesController = require('../controllers/services');
const { getAllServices, getServiceById, addService, updateService, deleteService } = servicesController;

const AccountModel = require('../models/user');

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

serviceRouter.get('/', getAllServices);
serviceRouter.get('/:id', getServiceById);
serviceRouter.post('/', checkAdmin, addService);
serviceRouter.put('/:id', checkAdmin, updateService);
serviceRouter.delete('/:id', checkAdmin, deleteService);

module.exports = serviceRouter;