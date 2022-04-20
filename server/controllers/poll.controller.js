const User = require("../models/user.model");
const Poll = require("../models/poll.model")
const jwt = require("jsonwebtoken");

module.exports = {

    createPoll: (req, res) => {
        
        const newPollObject = new Poll(req.body);

        //get logged in userid from cookie
        //assign the current logged user's id to this new poll
        newPollObject.createdBy = req.jwtpayload.userid;

        newPollObject.save()
            .then((newPoll)=>{
                console.log(newPoll);
                res.json(newPoll)
            })
            .catch((err)=>{
                console.log("Error in createPoll");
                res.status(400).json(err);
            })
    },

    findAllPolls: (req, res) =>{
        Poll.find()
            .populate("createdBy", "sjsuid")
            .then((allPolls)=>{
                res.json(allPolls);
            })
            .catch((err)=>{
                console.log("Find All Polls failed");
                res.json({message: "Error in findAllPolls", error: err})
            })
    },

    findOnePoll: (req, res) => {
        Poll.findById({_id: req.params.pollid})
            .then((onePoll)=>{
                console.log(onePoll);
                res.json(onePoll)
            })
            .catch((err)=>{
                console.log("Find One Poll failed");
                res.json({message: "Error in findOnePoll", error: err})
            })
    },

    findAllPollByCreator: (req, res) => {
        //check if the sjsuid in the cookie matach the sjsu passed in from the url
        //only the logged in user himself is allowed to view his polls
        if(req.jwtpayload.sjsuid !== req.params.sjsuid){
            console.log("not authenticated user")
            res.status(401).json({message: "not authenticated user"});
        }
        else{
            console.log("authenticated user")
            console.log("req.jwtpayload.sjsuid:", req.jwtpayload.sjsuid);
            Poll.find({createdBy: req.jwtpayload.userid})
                .populate("createdBy", "sjsuid")
                .then((allPollsFromLoggedInUser)=>{
                    console.log(allPollsFromLoggedInUser);
                    res.json(allPollsFromLoggedInUser);
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
    },

    findAllPollsByKeyword: (req, res) =>{
      const keyword = req.params.keyword;
      console.log(keyword);
      //find all polls which their question/title contains keyword, option i is for ingnoring cases
      Poll.find({"pollQuestion" : {$regex: keyword, $options: "i" }})
          .then((allPollsByKeyword)=>{
              console.log(allPollsByKeyword);
              res.json(allPollsByKeyword);
          })
          .catch((err)=>{
              console.log("Find Polls By Keyword Failed")
              res.json({message: "Error in findAllPollsByKeyword", error: err})
          });
    },

    deletePoll: (req, res) => {
        Poll.deleteOne({_id: req.params.pollid})
        .then((deleteConfirm) => {
            console.log(deleteConfirm);
            res.json(deleteConfirm);
        })
        .catch((err) => {
            console.log("Delete Poll failed");
            res.json({message: "Error in deletePoll", error: err});
        })
    },

    votePoll: async(req, res, next) => {

        const pollid  = req.params.pollid;
        const userid = req.jwtpayload.userid;
        const { votedOption } = req.body; 

        //find the poll question
        try {
          if (votedOption) {
            const poll = await Poll.findById(pollid);
            if (!poll) throw new Error('No poll found');

            //loop thourgh all the options, if the option is found, the votes of the option +1
            const vote = poll.options.map(
              option =>
                option.option === votedOption
                  ? {
                      option: option.option,
                      _id: option._id,
                      votes: option.votes + 1,
                    }
                  : option,
            );
            
            //check if the user who's trying to vote is already in the voted list
            //prevent duplicated voting
            if (poll.voted.filter(user => user.toString() === userid).length <= 0) {
              poll.voted.push(userid);
              poll.options = vote;
              await poll.save();
      
              return res.status(202).json(poll);
            } else {
              //res.json({message:"This user already voted"})
              res.status(400).json({ message: "You already voted" });
            }
          } else {
            res.status(400).json({ message: "Please select an option" });
          }
        } catch (err) {
          return next({
            status: 400,
            message: err.message,
          });
        }
      }

    //there is no edit poll function as we don't allow users to edit poll question once its created

}