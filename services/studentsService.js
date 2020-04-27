const _ = require('lodash');
const getJson = require('../restClient.js');

const OTUS_URL = 'https://gist.githubusercontent.com/edotus/bd63eefb9b4b1eacb641811f9a1a780d/raw/60e04520584f7a436917b0d5be2b6c18f039fadb/students_classes.json'

class StudentsService {
  constructor(data, memberService) {
    this.dataStore = data;
    this.memberService = memberService;
  }

  //ideally would be id based
  async getDetails(name) {
    try {
      let result = await this.getAllStudentsWithDetails(name);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllStudentsWithDetails(name) {
    try {
      let result = await getJson(OTUS_URL);

      let students = result.students.map((student) => {
        return {
          firstName: student.first,
          lastName: student.last,
          email: student.email,
          gpa: this.calculateGPA(student.studentClasses),
          studentClasses: student.studentClasses
        }
      });

      students = this.filterStudentByFullNameExactMatch(students, name);

      students.length && students[0].studentClasses.forEach(studentClass => {
        studentClass.className = result.classes[studentClass.id];
      })

      return students.length ? students[0] : {};
    } catch (error) {
      throw error;
    }
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

  //partial search as well -- "anthony joel"
  async searchByName(searchTerm) {
    try {
      const result = await this.getAllStudents();
      let searchResultsToReturn = [];
      searchResultsToReturn = [...this.filterStudentByFirstName(result, searchTerm), 
        ...this.filterStudentByLastName(result, searchTerm), 
        ...this.filterStudentByFullName(result, searchTerm)]
      searchResultsToReturn = _.uniqWith(searchResultsToReturn, _.isEqual);
      return searchResultsToReturn;
    } catch (error) {
      throw error;
    }
  }

  filterStudentByFullName(result, searchTerm) {
    return result.filter(student => {
      return (student.firstName.toLowerCase().concat(" ").concat(student.lastName).toLowerCase()).indexOf(searchTerm.toLowerCase()) >= 0;
    });
  }

  filterStudentByFirstName(result, searchTerm) {
    return result.filter(student => {
      return student.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
    });
  }

  filterStudentByLastName(result, searchTerm) {
    return result.filter(student => {
      return student.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
    });
  }

  filterStudentByFullNameExactMatch(result, name) {
    return result.filter(student => {
      return ((student.firstName.concat(student.lastName)).toLowerCase() === name.toLowerCase());
    });
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
