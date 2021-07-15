const express = require('express');

const trainingRepo = require('../../repositories/trainingsRepository');
const trainingTemplate = require('../../views/admin/trainingView');

const router = express.Router();

router.get('/admin/training/new', (req, res) => {
  res.send(trainingTemplate({}));
});

router.post('/admin/training/new', (req, res) => {});

module.exports = router;
