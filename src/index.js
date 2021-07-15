const express = require('express');
const cookieSession = require('cookie-session');

const authRouter = require('./routes/admin/auth');
const trainingRouter = require('./routes/admin/training');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    keys: ['skdjfnlsg'],
  })
);
app.use(authRouter);
app.use(trainingRouter);

app.listen(3000, () => {
  console.log('listening');
});
