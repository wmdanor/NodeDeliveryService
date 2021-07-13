const {Note} = require('../models/noteModel');

const getNotesByUserId = async (
    userId,
    options = {
      offset: 0,
      limit: 5,
    }) =>
  await Note.find({userId})
      .skip(options.offset)
      .limit(options.limit);

const addNoteForUser = async (userId, {text}) => {
  const note = new Note({text, userId});
  await note.save();
};

const getNoteByIdForUser = async (noteId, userId) =>
  await Note.findOne({_id: noteId, userId});

const updateNoteByIdForUser = async (noteId, userId, {text}) => {
  await Note.findOneAndUpdate({_id: noteId, userId}, {
    $set: {text},
  });
};

const toggleNoteStateByIdForUser = async (noteId, userId) => {
  const note = await Note.findOne({_id: noteId, userId});
  note.completed = !note.completed;
  await note.save();
};

const deleteNoteByIdForUser = async (noteId, userId) => {
  await Note.findOneAndRemove({_id: noteId, userId});
};

const countUserNotes = async (userId) => await Note.count({userId});

module.exports = {
  getNotesByUserId,
  getNoteByIdForUser,
  addNoteForUser,
  updateNoteByIdForUser,
  toggleNoteStateByIdForUser,
  deleteNoteByIdForUser,
  countUserNotes,
};
