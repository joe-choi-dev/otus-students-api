const _ = require('lodash');


class StudentsValidator {

    static isValidGetStudentsRequest(request) {
      let { searchTerm } = req.query;

      !(typeof searchTerm === 'string' || searchTerm instanceof String)
        return false;

      return true;
    }

}

module.exports = StudentsValidator;
