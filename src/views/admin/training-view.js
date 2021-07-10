const layout = require('../layout');
const { getErrors } = require('../helpers');

module.exports = ({ req, errors }) => {
  return layout({
    content: `
    <div>
        <input name="date" placeholder="Date" />
        <input name="exName" placeholder="Exercise name" />
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
