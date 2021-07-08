const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// can set commands
yargs.version('1.1.0');

// create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    console.log('Title : ' + argv.title);
    console.log('Body : ' + argv.body);
    notes.addNote(argv.title, argv.body);
  }
});

// create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    console.log('Title : ' + argv.title);
    notes.removeNote(argv.title);
  }
});

// create list command
yargs.command({
  command: 'list',
  describe: 'Listing all notes',
  handler() {
    console.log('Listing all notes');
    notes.listNotes();
  }
});

// create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    console.log('Title : ' + argv.title);
    notes.getNote(argv.title);
  }
});

//console.log(yargs.argv);
yargs.parse();

////////////////////////////////

//const validator = require('validator');
//const chalk = require('chalk');

// console.log(validator.isEmail('thrush@gmail.com'));
// console.log(validator.isURL('thrush@gmail'));

//console.log(chalk.red(notes.getNotes()));
//console.log(chalk.green.bold('Success'));
// console.log(chalk.blue.bgRed.bold('Hello world!'));
// console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
