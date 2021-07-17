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
            <a href="">Need an account? Sign up</a>
            <button>Submit</button>
        </form>
    </div>
    `,
  });
};
