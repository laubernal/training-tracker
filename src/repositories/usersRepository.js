const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

const { USERS_JSON } = require('../constants');

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

  async comparePasswords(saved, supplied) {
    // saved -> password saved in our DB 'hashed.salt'
    // supplied -> password supplied by the user when signin
    const [hashed, salt] = saved.split('.');

    const suppliedHashedBuf = await scrypt(supplied, salt, 64);

    return hashed === suppliedHashedBuf.toString('hex');
  }

  async create(user) {
    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(user.password, salt, 64);

    const users = await this.getAll();

    const userNew = {
      ...user,
      password: `${buf.toString('hex')}.${salt}`,
    };

    users.push(userNew);

    await this.writeAll(users);

    return users;
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id) {
    const users = await this.getAll();
    return users.find(user => user.id === id);
  }

  async update(id, attrs) {
    const users = await this.getAll();
    const user = users.find(user => user.id === id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    Object.assign(user, attrs);
    await this.writeAll(users);
  }

  async delete(id) {
    const users = await this.getAll();
    const filteredUsers = users.filter(user => user.id != id);

    await this.writeAll(filteredUsers);
  }

  async getOneBy(filters) {
    const users = await this.getAll();

    for (let user of users) {
      let found = true;

      for (let key in filters) {
        if (user[key] != filters[key]) {
          found = false;
        }
      }

      if (found) {
        return user;
      }
    }
  }
}

module.exports = new UsersRepository(USERS_JSON);
