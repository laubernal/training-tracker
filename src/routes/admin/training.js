const express = require('express');

const Training = require('../../entities/training');
const Serie = require('../../entities/serie');
const Exercise = require('../../entities/exercise');
const trainingRepo = require('../../repositories/trainingsRepository');
const trainingTemplate = require('../../views/admin/trainingView');
const { requireDate, requireExerciseName, requireNumber } = require('./trainingValidators');
const { requireAuth, handleErrors } = require('./middlewares');

const router = express.Router();

router.get('/admin/training/new', (req, res) => {
  res.send(trainingTemplate({}));
});

router.post(
  '/admin/training/new',
  requireAuth,
  [requireDate, requireExerciseName, requireNumber],
  handleErrors(trainingTemplate),
  async (req, res) => {
    const { date, exercise } = req.body;

    const exercises = exercise.map(exercise => {
      const series = exercise.series.map(serie => {
        return new Serie(serie.seriesNum, serie.reps, serie.weight);
      });
      return new Exercise(exercise.exerciseName, series);
    });

    const training = new Training(trainingRepo.randomId, date, exercises);

    await trainingRepo.create(training);

    res.send('Training saved');
  }
);

router.get(
  '/admin/training/countSeries',
  requireAuth,
  handleErrors(trainingTemplate),
  async (req, res) => {}
);

module.exports = router;
