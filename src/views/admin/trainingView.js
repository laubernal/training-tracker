const layout = require('../layout');
const { getError } = require('../helpers');

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div>
        <button>Log out</button>
        <input name="date" placeholder="Date" />
        <input name="exerciseName" placeholder="Exercise name" />
        <input name="series" placeholder="Number of series" />
        ${getError(errors, 'series')}
        <input name="reps" placeholder="Reps" />
        ${getError(errors, 'reps')}
        <input name="weight" placeholder="Weight" />
        ${getError(errors, 'weight')}
        <button>Add series</button>
        <button>Submit</button>
        <button>Add exercise</button>                
    </div>
  `,
  });
};
