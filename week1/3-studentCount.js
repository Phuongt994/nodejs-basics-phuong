const students = require('../commons/students');

// using forEach()
function countForEach() {
  let count = { male: 0, female: 0 };

  students.forEach(function(student) {
    student.gender === 'male' ? count.male++ : count.female++;
  });
  console.log(
    `Using forEach() there are ${count.male} male and ${
      count.female
    } female students.`
  );
}

// using reduce()
function countReduce() {
  const count = students.reduce(
    function(count, student) {
      count[student.gender] += 1;
      return count;
    },
    { male: 0, female: 0 }
  );
  console.log(
    `Using reduce() there are ${count.male} male and ${
      count.female
    } female students.`
  );
}

countForEach();
countReduce();
