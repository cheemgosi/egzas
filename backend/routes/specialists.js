const express = require('express');
const { 
  getAllSpecialists,
  getSpecialistById,
  addSpecialist,
  updateSpecialist,
  deleteSpecialist 
} = require('../controllers/specialists');

const specialistRouter = express.Router();

specialistRouter.get('/', getAllSpecialists);
specialistRouter.get('/:id', getSpecialistById);
specialistRouter.post('/', addSpecialist);
specialistRouter.put('/:id', updateSpecialist);
specialistRouter.delete('/:id', deleteSpecialist);

module.exports = specialistRouter;
