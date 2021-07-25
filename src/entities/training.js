class Training {
  constructor(id, date, exercises) {
    this.id = id;
    this.date = date;
    this.exercises = exercises;
  }

  countSeries() {
    let acc = 0;
    this.exercises.map(exercise => {
      acc = exercise.series.length + acc;
    });

    return acc;
  }
}

module.exports = Training;
