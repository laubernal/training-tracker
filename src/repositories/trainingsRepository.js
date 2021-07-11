const fs = require('fs');
const crypto = require('crypto');

const TRAINING_JSON = require('../constants');

class TrainingsRepository {
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

  async create(training) {
    const trainings = await this.getAll();

    trainings.push(training);

    await this.writeAll(trainings);
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }
}

module.exports = new TrainingsRepository(TRAINING_JSON);
