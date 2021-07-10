const express = require('express');
const cookieSession = require('cookie-session');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieSession({ keys: ['skdjfnlsg'] }));

app.listen(3000, () => {
  console.log('listening');
});
