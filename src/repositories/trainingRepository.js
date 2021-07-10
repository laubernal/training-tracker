const fs = require('fs');

const TRAINING_JSON = require('../constants');

class TrainingRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename');
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
  }

  async writeAll(trainings) {
    await fs.promises.writeFile(this.filename, JSON.stringify(trainings, null, 2));
  }
}

module.exports = new TrainingRepository(TRAINING_JSON);
