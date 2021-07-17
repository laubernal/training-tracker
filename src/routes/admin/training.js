const express = require('express');

const Training = require('../../entities/training');
const Serie = require('../../entities/serie');
const Exercise = require('../../entities/exercise');
const trainingRepo = require('../../repositories/trainingsRepository');
const trainingTemplate = require('../../views/admin/trainingView');
const { requireDate, requireExerciseName, requireNumber } = require('./trainingValidators');

const router = express.Router();

router.get('/admin/training/new', (req, res) => {
  res.send(trainingTemplate({}));
});

router.post(
  '/admin/training/new',
  [requireDate, requireExerciseName, requireNumber],
  async (req, res) => {
    const { date, exerciseName, series, reps, weight } = req.body;

    const serie = await trainingRepo.create(new Serie(series, reps, weight));
    const exercise = await trainingRepo.create(new Exercise(exerciseName, serie));
    const training = await trainingRepo.create(new Training(trainingRepo.randomId), date, exercise);
  }
);

module.exports = router;
