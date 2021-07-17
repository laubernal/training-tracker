const layout = require('../../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div>
        <form method="POST">
            <input name="email" placeholder="Email" />
            ${getError(errors, 'email')}
            <input name="password" placeholder="Password" />
            ${getError(errors, 'password')}
            <input name="passwordConfirmation" placeholder="Password Confirmation" />
            ${getError(errors, 'passwordConfirmation')}
            <a href="">Have an account? Sign in</a>
            <button>Submit</button>
        </form>
    </div>
    `,
  });
};
