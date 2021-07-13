const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {
  getUserNotes,
  addUserNote,
  getUserNoteById,
  updateUserNoteById,
  toggleUserNoteStateById,
  deleteUserNoteById,
} = require('../controllers/notesController');
const {
  offsetLimitQueryValidator,
  notePayloadValidator,
} = require('../middlewares/validation');

const notesRouter = new express.Router();

notesRouter.get('/', offsetLimitQueryValidator, asyncWrapper(getUserNotes));
notesRouter.post('/', notePayloadValidator, asyncWrapper(addUserNote));

notesRouter.get('/:id', asyncWrapper(getUserNoteById));
notesRouter.put('/:id', notePayloadValidator, asyncWrapper(updateUserNoteById));
notesRouter.patch('/:id', asyncWrapper(toggleUserNoteStateById));
notesRouter.delete('/:id', asyncWrapper(deleteUserNoteById));

module.exports = {
  notesRouter,
};
