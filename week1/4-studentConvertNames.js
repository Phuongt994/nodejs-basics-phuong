const students = require("../common/students");

const names = students.map(function(student) {
  return student.name;
});
console.log(names);
