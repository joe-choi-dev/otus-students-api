class Student {

  constructor(student) {
    this.firstName = student.first;
    this.lastName = student.last;
    this.gpa = this.calculateGPA(student.studentClasses);
  }

  addDetails(student, classes) {
    this.email = student.email;
    this.studentClasses = this.mapClasses(student.studentClasses, classes)
  }

  //calculate GPA to 2 decimals
  calculateGPA(studentClasses) {
    let total = 0;
    studentClasses.forEach(studentClass => {
      total += studentClass.grade;
    })
    return (total / studentClasses.length).toFixed(2);
  }
  
  mapClasses(studentClasses, classes) {
    studentClasses.forEach(studentClass => {
      studentClass.className = classes[studentClass.id];
    })
    return studentClasses;
  }
}

module.exports = Student;
