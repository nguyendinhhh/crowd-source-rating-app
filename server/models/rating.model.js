const mongoose = require('mongoose');
const User = require('./user.model');

//a rating question will contain scores
//this is the schema for scores
const scoreSchema = new mongoose.Schema({

    score: {
      type: String,
      enum:["1","2","3","4","5"]
    },
  
    votes: {
      type: Number,
      default: 0,
    },
  
  });

//Rating question schema
const ratingSchema = new mongoose.Schema({

    //the question/title of this rating
    ratingQuestion: {
        type: String,
        minlength: [3, "A rating question must be longer than 3 characters"]
    },

    scores: [scoreSchema],

    likes: {
      type: Number,
      default:0
    },

    lifespan: {
      type: Number,
      default: 0,
      required: [true, "Please select the life span of your post"],
    },

    permanent: {
      type: Number,
      default: 0,
    },

    //who have voted on this rating question
    //for prevent duplicted voting
    voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    //who created this rating
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

}, {timestamps: true});

module.exports = mongoose.model('Rating', ratingSchema);
