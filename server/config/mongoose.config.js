//connect to our databse

const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log(`Successfully connected to the database: ${process.env.DB_NAME}`)
    })
    .catch((err)=>{
        console.log(`Failed to connect to databse: ${process.env.DB_NAME}. Error:`, err)
    })
