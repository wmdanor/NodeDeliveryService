const {BadRequestError} = require('../utils/errors');
const {
  getNotesByUserId,
  getNoteByIdForUser,
  addNoteForUser,
  updateNoteByIdForUser,
  toggleNoteStateByIdForUser,
  deleteNoteByIdForUser,
  countUserNotes,
} = require('../services/notesService');

const parseNaturalNumber = (value) => {
  const parsed = Number.parseInt(value);

  if (Number.isInteger(Number(value)) && value >= 0) {
    return parsed;
  }

  throw new Error('Not a natural number');
};

const parsePagination = (query) => {
  const parsed = {};
  const {offset, limit} = query;

  try {
    parsed.offset = parseNaturalNumber(offset);
  } catch {
    parsed.offset = 0;
  }

  try {
    parsed.limit = parseNaturalNumber(limit);
  } catch {
    parsed.limit = 5;
  }

  return parsed;
};

const getUserNotes = async (req, res) => {
  const {userId} = req.user;

  const options = parsePagination(req.query);

  const [count, notes] = await Promise.all([
    countUserNotes(userId),
    getNotesByUserId(userId, options),
  ]);

  res.json({
    ...options,
    count,
    notes,
  });
};

const addUserNote = async (req, res) => {
  const {userId} = req.user;

  await addNoteForUser(userId, req.body);

  res.json({message: 'Success'});
};

const getUserNoteById = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  const note = await getNoteByIdForUser(id, userId);

  if (!note) {
    throw new BadRequestError('Note with such id is not found.');
  }

  res.json({note});
};

const updateUserNoteById = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  await updateNoteByIdForUser(id, userId, req.body);

  res.json({message: 'Success'});
};

const toggleUserNoteStateById = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  await toggleNoteStateByIdForUser(id, userId);

  res.json({message: 'Success'});
};

const deleteUserNoteById = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  await deleteNoteByIdForUser(id, userId);

  res.json({message: 'Success'});
};

module.exports = {
  getUserNotes,
  addUserNote,
  getUserNoteById,
  updateUserNoteById,
  toggleUserNoteStateById,
  deleteUserNoteById,
};
