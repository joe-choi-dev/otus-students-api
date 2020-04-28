class Student {

  constructor(student) {
    this.firstName = student.first;
    this.lastName = student.last;
    this.gpa = this.calculateGPA(student.studentClasses);
  }

  toDetailsModel(student, classes) {
    return {
        ...this,
        email: student.email,
        studentClasses: this.mapClasses(student.studentClasses, classes)
    };
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
