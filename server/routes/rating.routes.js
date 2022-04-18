const RatingController = require(`../controllers/rating.controller`);
const { authenticate } = require("../config/jwt.config");


module.exports = (app) => {
    app.post("/api/ratings/create", authenticate, RatingController.createRating);
    app.get("/api/allratings", RatingController.findAllRatings);
    app.get("/api/ratings/:ratingid", RatingController.findOneRating);
    app.get("/api/ratings/allratingsbycreator/:sjsuid", authenticate, RatingController.findAllRatingsByCreator);
    app.get("/api/ratings/allratingsbykeyword/:keyword", RatingController.findAllRatingsByKeyword);
    app.delete("/api/ratings/:ratingid", authenticate, RatingController.deleteRating);
    app.post("/api/ratings/vote/:ratingid", authenticate, RatingController.voteRating)
    app.post("/api/ratings/like/:ratingid", authenticate, RatingController.likeRating)
};