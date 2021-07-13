const mongoose = require('mongoose');

const Note = mongoose.model('Note', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = {Note};
