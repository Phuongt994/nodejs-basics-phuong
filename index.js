const inquirer = require('inquirer');
const chalk = require('chalk');

var questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?",
    validate: val => {
      if (val.match(/^[a-zA-Z]/)) {
        return true;
      }
      return 'Please enter valid name string';
    }
  },
  {
    type: 'number',
    name: 'age',
    message: "What's your year of birth?",
    filter: val => {
      return 2019 - parseInt(val);
    }
  },
  {
    type: 'input',
    name: 'homeTown',
    message: "What's your home town?"
  }
];

inquirer.prompt(questions).then(answers => {
  console.log(
    `Thank you. Hello ${chalk.blue(answers.name)}, so you are ${chalk.red(
      answers.age
    )} year old and from ${chalk.green(answers.homeTown)}.`
  );
});
