const layout = require('../layout');

module.exports = ({ trainingCollection }) => {
  const renderedTrainings = trainingCollection.trainings
    .map(training => {
      return `
        <div>
        <p>${training.date}</p>
        <ul>${training.exercises.map(exercise => {
          return `
            <li>
            <p>${exercise.name}</p>
            <ul>${exercise.series.map(serie => {
              return `
                    <li>
                    <p>Series num ${serie.seriesNum}</p>
                    <p>Reps ${serie.reps}</p>
                    <p>Weight ${serie.weight} Kg</p>
                    </li>
                `;
            })}</ul>
            </li>
            `;
        })}</ul>
        </div>
    `;
    })
    .join('');

  return layout({
    content: `
        <div>
        ${renderedTrainings}
        </div>
        `,
  });
};
