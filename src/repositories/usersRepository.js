const fs = require('fs');
const crypto = require('crypto');

const USER_JSON = require('../constants');

class UsersRepository {
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
    return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf-8' }));
  }

  async writeAll(users) {
    await fs.promises.writeFile(this.filename, JSON.stringify(users, null, 2));
  }

  async create(user) {
    const users = await this.getAll();

    users.push(user);

    await this.writeAll(users);
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id) {
    const users = await this.getAll();
    return users.find(user => user.id === id);
  }

  //   async update() {}

  async delete(id) {
    const users = await this.getAll();
    const filteredUsers = users.filter(user => user.id != id);

    await this.writeAll(filteredUsers);
  }
}

module.exports = new UsersRepository(USER_JSON);
