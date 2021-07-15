const { check } = require('express-validator');

const usersRepo = require('../../repositories/usersRepository');

module.exports = {
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async email => {
      const existingUser = await usersRepo.getOneBy({ email });

      if (existingUser) {
        throw new Error('Email in use');
      }
      return true;
    }),
  requirePassword: check('password')
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage('Must be between 8 and 20 characters'),
  requirePasswordConfirmation: check('passwordConfirmation')
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage('Must be between 8 and 20 characters')
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation != req.body.password) {
        throw new Error('Must be between 8 and 20 characters');
      }
      return true;
    }),
  requireEmailExists: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async email => {
      const user = await usersRepo.getOneBy({ email });

      if (!user) {
        throw new Error('Email not found');
      }

      return true;
    }),
  requireValidPasswordForUser: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });

      if (!user) {
        throw new Error('Invalid password');
      }
      const validPassword = await usersRepo.comparePasswords(user.password, password);

      if (!validPassword) {
        throw new Error('Invalid password');
      }

      return true;
    }),
};
