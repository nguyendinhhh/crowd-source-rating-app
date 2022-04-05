const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({

    sjsuid: {
        type: String,
        unique: [true, "This ID has been registered"],
        required: [true, "SJSU ID is required"],
        //there might be a more elegent way for doing this
        //but I don't know
        minLength: [9, "Please enter a 9-digit SJSU ID"],
        maxLength: [9, "Please enter a 9-digit SJSU ID"]
    },

    password: { 
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Passwords must be at least 8 characters"]
    },

    securityQuestion: {
        type: String,
        required: [true, "Please select a security question"],
        enum: [
            "Which is your favorite class?",
            "In which city were you born?",
            "What's the name of your first pet?",
            "What's your childhood best friend's name?"
        ]
    },

    securityAnswer: {
        type: String,
        required: [true, "Please enter an answer for the security question"],
        minLength: [3, "Answer must be longer than 3 characters"]
    }

}, { timestamps: true })

//before hash, validate confirmPassword matah password
UserSchema.virtual("confirmPassword")
    .get(()=>this._confirmPassword)
    .set((value)=>this._confirmPassword = value)

UserSchema.pre("validate", function(next){

    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords don't match")
        console.log("Passwords don't match")
    }
    next()
})
//before save, hash the password
UserSchema.pre("save", function(next){
    console.log("in pre save");
        bcrypt.hash(this.password, 10)
            .then((hashedPassword)=>{
            this.password = hashedPassword;
            next()
            })
})

const User = mongoose.model("User", UserSchema);

module.exports = User;