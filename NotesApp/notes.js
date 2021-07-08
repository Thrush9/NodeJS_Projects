const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicates = notes.filter((note) => note.title === title);
  const duplicate = notes.find((note) => note.title === title);
  //duplicates.length === 0
  if (!duplicate) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green('New Note Added!'));
  } else {
    console.log(chalk.red('Note Title Taken!'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const remaining = notes.filter((note) => note.title !== title);
  saveNotes(remaining);
  if (notes.length > remaining.length) {
    console.log(chalk.green('Note Removed!'));
  } else {
    console.log(chalk.red('No Note Found!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow('List of Your Notes: '));
  notes.forEach((note) => console.log(note));
};

const getNote = (title) => {
  const notes = loadNotes();
  const target = notes.find((note) => note.title === title);
  if (target) {
    console.log(chalk.green('Note Founded!'));
    console.log(target);
  } else {
    console.log(chalk.red('No Note Found!'));
  }
};

module.exports = {
  getNote: getNote,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
};
