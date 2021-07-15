const express = require('express');

const usersRepo = require('../../repositories/usersRepository');
const signupTemplate = require('../../views/admin/auth/signupView');
const signinTemplate = require('../../views/admin/auth/signinView');
const User = require('../../entities/user');
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser,
} = require('./authValidators');
const { handleErrors } = require('./middlewares');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({}));
});

router.post(
  '/signup',
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.create(new User(usersRepo.randomId(), email, password));

    req.session.userId = user.id;

    res.send('Account created');
    // res.redirect('/trainings/new');
  }
);

router.get('/signout', (req, res) => {
  res.session = null;
  res.send('Signed out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  '/signin',
  [requireEmailExists, requireValidPasswordForUser],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;
    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;

    res.send('Signed in');
  }
);

module.exports = router;
