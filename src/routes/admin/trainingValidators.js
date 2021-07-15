const { check } = require('express-validator');

const trainingRepo = require('../../repositories/trainingsRepository');

module.exports = {
  requireDate: check('date')
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage('Must be dd/mm/yyyy'),
};
