const mongoose = require('mongoose');
const User = require('./user.model');

//a poll question will contain options
//this is the schema for options
const optionSchema = new mongoose.Schema({

  option: {
    type: String,
    minlength: [1, "An option must not be empty"]
  },

  votes: {
    type: Number,
    default: 0,
  }

});

//poll question schema
const pollSchema = new mongoose.Schema({

  //the question/title of this poll
  pollQuestion: {
    type: String,
    minlength: [3, "A poll question must be longer than 3 characters"]
  },

  //the list of all options for this poll
  options: [optionSchema],

  //who have voted on this poll question
  //for prevent duplicted voting
  voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  //who created this poll
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}

}, { timestamps: true });


module.exports = mongoose.model('Poll', pollSchema);
