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
    const { date, exerciseName, seriesNum, reps, weight } = req.body;

    let acc = 0;

    const exName = req.body.exercise.map(exercise => {
      if (exercise.exerciseName === 'Dominadas') {
        exercise.series.map(serie => {
          acc = acc + serie.reps;
        });
      }
    });

    console.log(acc);
    res.send({ total: acc });

    // const serie = await trainingRepo.create(new Serie(seriesNum, reps, weight));
    // const exercise = await trainingRepo.create(new Exercise(exerciseName, serie));
    // const training = await trainingRepo.create(new Training(trainingRepo.randomId), date, exercise);
  }
);

module.exports = router;
