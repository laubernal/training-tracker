const { check } = require('express-validator');

const trainingRepo = require('../../repositories/trainingsRepository');

module.exports = {
  requireDate: check('date')
    .trim()
    .isDate({ format: 'DD/MM/YYYY', strictMode: true })
    .withMessage('Must be DD/MM/YYYY format'),
  requireExerciseName: check('exerciseName')
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage('Must be between 3 and 40 characters'),
  requireNumber: check(['series', 'reps', 'weight'])
    .trim()
    .toInt()
    .isInt({ min: 1 })
    .withMessage('Must be greater than 0'),
};
