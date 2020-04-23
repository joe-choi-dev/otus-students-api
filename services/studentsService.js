const _ = require('lodash');
const getJson = require('../restClient.js');

const OTUS_URL = 'https://gist.githubusercontent.com/edotus/bd63eefb9b4b1eacb641811f9a1a780d/raw/60e04520584f7a436917b0d5be2b6c18f039fadb/students_classes.json'

class StudentsService {
  constructor(data, memberService) {
    this.dataStore = data;
    this.memberService = memberService;
  }

  async searchByName(searchTerm) {
    const searchWords = _.words(searchTerm);
    try {
      let searchResultsToReturn = [];
      if (searchWords.length === 1) {
        const [searchResultsByFirstName, searchResultsByLastName] = await Promise.all([
          this.getStudentByFirstName(searchWords[0]),
          this.getStudentByLastName(searchWords[0])
        ]);
        searchResultsToReturn = searchResultsToReturn.concat(searchResultsByFirstName).concat(searchResultsByLastName);
        searchResultsToReturn = _.uniqWith(searchResultsToReturn, _.isEqual);
        return searchResultsToReturn;
      } else {
        searchResultsToReturn = await this.getStudentByFirstAndLastName(searchWords[0], searchWords[1]);
        return searchResultsToReturn;
      }
    } catch (error) {
      throw error;
    }
  }

  async getStudentByFirstAndLastName(firstName, lastName) {
    const result = await this.getAllStudents();
    return result.filter(student => {
      return student.firstName.toLowerCase() === firstName.toLowerCase() && student.lastName.toLowerCase() === lastName.toLowerCase();
    });
  }

  async getStudentByFirstName(searchTerm) {
    const result = await this.getAllStudents();
    return result.filter(student => {
      return student.firstName.toLowerCase() === searchTerm.toLowerCase();
    });
  }

  async getStudentByLastName(searchTerm) {
    const result = await this.getAllStudents();
    return result.filter(student => {
      return student.lastName.toLowerCase() === searchTerm.toLowerCase();
    });
  }

  async getAllStudents() {
    try {
      let result = await getJson(OTUS_URL);
      const students = result.students.map((student) => {
        return {
          firstName: student.first,
          lastName: student.last,
          gpa: this.calculateGPA(student.studentClasses)
        }
      });
      return students;
    } catch (error) {
      throw error;
    }
  }

  //calculate GPA to 2 decimals
  calculateGPA(studentClasses) {
    let total = 0;
    studentClasses.forEach(studentClass => {
      total += studentClass.grade;
    })
    return (total / studentClasses.length).toFixed(2);
  }

}

module.exports = StudentsService;
