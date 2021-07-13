const express = require('express');

const usersRepo = require('../../repositories/usersRepository');
const signupTemplate = require('../../views/admin/auth/signupView');
const signinTemplate = require('../../views/admin/auth/signinView');
const User = require('../../entities/user');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({}));
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  await usersRepo.create(new User(usersRepo.randomId(), email, password));

  req.session.userId = user.id;

  res.send('Account created');
});

module.exports = router;
