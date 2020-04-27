const _ = require('lodash');
const nameRegex = /^[a-zA-Z -]{1,50}$/;

class StudentsValidator {

  static isValidSearchStudentsRequest(req) {
    const { searchTerm } = req.query;

    if (searchTerm && !searchTerm.match(nameRegex)) {
      return false;
    }

    return true;
  }

  static isValidDetailsRequest(req) {
    const { name } = req.params;

    if (name && !name.match(nameRegex) && !name.contains(" ")) {
      return false;
    }

    return true;
  }

}

module.exports = StudentsValidator;
