const User = require("../models/user.model");
const Rating = require("../models/rating.model")
const jwt = require("jsonwebtoken");

module.exports = {

    createRating: (req, res) => {
        
        const newRatingObject = new Rating(req.body);

        //get logged in userid from cookie
        //assign the current logged user's id to this new rating
        newRatingObject.createdBy = req.jwtpayload.userid;

        newRatingObject.scores = [
            {"score": "1"}, {"score": "2"}, {"score": "3"}, {"score": "4"}, {"score": "5"}
        ]

        newRatingObject.save()
            .then((newRating)=>{
                console.log(newRating);
                res.json(newRating)
            })
            .catch((err)=>{
                console.log("Error in createRating");
                res.status(400).json(err);
            })
    },

    findAllRatings: (req, res) =>{
        Rating.find()
            .populate("createdBy", "sjsuid")
            .then((allRating)=>{
                res.json(allRating);
            })
            .catch((err)=>{
                console.log("Find All Ratings failed");
                res.json({message: "Error in findAllRatings", error: err})
            })
    },

    findOneRating: (req, res) => {
        Rating.findById({_id: req.params.ratingid})
            .then((oneRating)=>{
                console.log(oneRating);
                res.json(oneRating)
            })
            .catch((err)=>{
                console.log("Find One Rating failed");
                res.json({message: "Error in findOneRating", error: err})
            })
    },

    findAllRatingsByCreator: (req, res) => {
        //check if the sjsuid in the cookie matach the sjsuid passed in from the url
        //only the logged in user himself is allowed to view his ratings
        if(req.jwtpayload.sjsuid !== req.params.sjsuid){
            console.log("not authenticated user")
            res.status(401).json({message: "not authenticated user"});
        }
        else{
            console.log("authenticated user")
            console.log("req.jwtpayload.sjsuid:", req.jwtpayload.sjsuid);
            Rating.find({createdBy: req.jwtpayload.userid})
                .populate("createdBy", "sjsuid")
                .then((allRatingsFromLoggedInUser)=>{
                    console.log(allRatingsFromLoggedInUser);
                    res.json(allRatingsFromLoggedInUser);
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
    },

    findAllRatingsByKeyword: (req, res) =>{
        const keyword = req.params.keyword;
        console.log(keyword);
        //find all ratings which their question/title contains keyword, option i is for ingnoring cases
        Rating.find({"ratingQuestion" : {$regex: keyword, $options: "i" }})
            .then((allRatingsByKeyword)=>{
                console.log(allRatingsByKeyword);
                res.json(allRatingsByKeyword);
            })
            .catch((err)=>{
                console.log("Find Ratings By Keyword Failed")
                res.json({message: "Error in findAllRatingsByKeyword", error: err})
            });
    },

    deleteRating: (req, res) => {
        Rating.deleteOne({_id: req.params.ratingid})
        .then((deleteConfirm) => {
            console.log(deleteConfirm);
            res.json(deleteConfirm);
        })
        .catch((err) => {
            console.log("Delete Rating failed");
            res.json({message: "Error in deleteRating", error: err});
        })
    },

    voteRating: async(req, res, next) => {

        const ratingid  = req.params.ratingid;
        const userid = req.jwtpayload.userid;
        const { votedScore } = req.body; 

        //find the rating question
        try {
            console.log(`backend received voted score:${votedScore}`)
          if (votedScore != "") {
            const rating = await Rating.findById(ratingid);
            if (!rating) throw new Error('No rating found');

            //loop thourgh all the options, if the option is found, the votes of the option +1
            const vote = rating.scores.map(
              score =>
                score.score === votedScore
                  ? {
                        score: score.score,
                        _id: score._id,
                        votes: score.votes + 1,
                    }
                  : score,
            );
            
            //check if the user who's trying to vote is already in the voted list
            //prevent duplicated voting
            if (rating.voted.filter(user => user.toString() === userid).length <= 0) {
                rating.voted.push(userid);
                rating.scores = vote;
              await rating.save();
      
              return res.status(202).json(rating);
            } else {
                res.status(400).json({ message: "You already voted" });
            }
          } else {
            res.status(400).json({ message: "Please select a score" });
          }
        } catch (err) {
          return next({
            status: 400,
            message: err.message,
          });
        }
    },

    likeRating: async(req, res) => {
        const ratingid  = req.params.ratingid;
        const userid = req.jwtpayload.userid;
        const rating = await Rating.findById(ratingid);

        // check whether this user already liked
        if (rating.liked.filter(user => user.toString() === userid).length <= 0) {
            rating.likes = rating.likes + 1
            rating.liked.push(userid);
            await rating.save();
          return res.status(202).json(rating);
        } else {
          res.json({message:"You already liked"})
        }
    }


}