const logger = require('../../support/logger').withIdentifier('Student');

class Student {
  constructor(dbModel) {
    this.id = dbModel.id;
    this.first = dbModel.first;
    this.last = dbModel.last;
    this.email = dbModel.email;
    this.studentClasses = dbModel.studentClasses;
  }
}

module.exports = Student;
