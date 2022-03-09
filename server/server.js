//set up the server

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const path = require('path')
const port = process.env.MY_PORT // || 8000

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'build')))

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname,'build','index.html'))
// })

require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/poll.routes")(app);
require("./routes/rating.routes")(app);

app.listen(port, () => console.log(`You are connected to port ${port}`))