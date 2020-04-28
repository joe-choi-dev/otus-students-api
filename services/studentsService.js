const _ = require('lodash');
const getJson = require('../restClient.js');
const Student = require('../models/student');

const OTUS_URL = 'https://gist.githubusercontent.com/edotus/bd63eefb9b4b1eacb641811f9a1a780d/raw/60e04520584f7a436917b0d5be2b6c18f039fadb/students_classes.json'

class StudentsService {
  constructor(data, memberService) {
    this.dataStore = data;
    this.memberService = memberService;
  }

  //ideally would be id-based
  async getStudentWithDetails(name) {
    try {
      const result = await getJson(OTUS_URL);
      const students = this.filterStudentByFullNameExactMatch(result.students, name);
      if (students.length) { 
        const student = new Student(students[0]);
        return student.toDetailsModel(students[0], result.classes);
      }
      return {};
    } catch (error) {
      throw error;
    }
  }

  async getAllStudents() {
    try {
      let result = await getJson(OTUS_URL);
      const students = result.students.map((student) => {
        return new Student(student);
      });
      return students;
    } catch (error) {
      throw error;
    }
  }

  //partial search enabled
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
      return ((student.first.concat(student.last)).toLowerCase() === name.toLowerCase());
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
