class TrainingCollection {
  constructor(trainings) {
    this.trainings = trainings;
  }

  summary() {
    const totalExercises = this.trainings.reduce(this.countAllExercises, 0);

    return {
      totalExercises,
    };
  }

  countAllExercises(numExercises, training) {
    return numExercises + training.countExercises();
  }
}

module.exports = TrainingCollection;
