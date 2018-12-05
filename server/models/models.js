var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema ({
  username: {type: String, required: [true, "Enter a username"], minlength: [3, "Username must be at least 3 characters in length"]},
  password: {type: String, required: [true, "Enter a password"]},
  avatar: {type: String, default: "blankProfileWhite.png"},
  wpm: {type: Number, default: 0},
  accuracy: {type: Number, default: 0},
}, {timestamps: true})

mongoose.model("User", UserSchema);
