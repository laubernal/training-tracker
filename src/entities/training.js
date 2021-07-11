class Training {
  constructor(id, date, exercises) {
    this.id = id;
    this.date = date;
    this.exercises = exercises;
  }
}

module.exports = Training;

// const training = await trainingRepo.create(new Training(randomID(), date, [new Exercise(name, [new Series(reps, weight)])]));
