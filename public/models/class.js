const logger = require('../../support/logger').withIdentifier('Student');

class Class {
  constructor(dbModel) {
    this.id = dbModel.id;
    this.name = dbModel.name;
  }
}

module.exports = Class;
