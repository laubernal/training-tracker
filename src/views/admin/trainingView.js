const layout = require('./layout');
const { getError } = require('../helpers');

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div>
        <button>Log out</button>
        <input name="date" placeholder="Date" />
        ${getError(errors, 'date')}
        <input name="exerciseName" placeholder="Exercise name" />
        ${getError(errors, 'exerciseName')}
        <input name="seriesNum" placeholder="Number of series" />
        ${getError(errors, 'seriesNum')}
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
