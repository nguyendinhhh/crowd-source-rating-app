const PollController = require(`../controllers/poll.controller`);
const { authenticate } = require("../config/jwt.config");


module.exports = (app) => {
    app.post("/api/polls/create", authenticate, PollController.createPoll);
    app.get("/api/allpolls", PollController.findAllPolls);
    app.get("/api/polls/:pollid", PollController.findOnePoll);
    app.get("/api/polls/allpollsbycreator/:sjsuid", authenticate, PollController.findAllPollByCreator)
    app.get("/api/polls/allpollsbyKeyword/:keyword", PollController.findAllPollsByKeyword)
    app.delete("/api/polls/:pollid", PollController.deletePoll);
    app.post("/api/polls/vote/:pollid", authenticate, PollController.votePoll)
};