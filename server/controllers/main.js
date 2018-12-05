require("../models/models.js");
var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var User = mongoose.model("User");

module.exports = {

  index: function(req, res) {
    res.json("Default");
  },

  getAll: function(req, res) {
    User.find({}, function(err, users) {
      if(err) {
        console.log("Find all error " + err);
        res.json({message: "Find all error", error: err});
      }else {
        res.json({users: users});
      }
    });
  },

  getOne: function(req, res) {
    console.log(req.body);
    User.findOne({username: req.body.username}, function(err, user) {
      if(err) {
        console.log("Login Error " + err);
        res.json({error: "Invalid Login"});
      }else if (user == null) {
        res.json({error: "Invalid Login"});
      }else {
        console.log(user);
        bcrypt.compare(req.body.password, user.password, function (err, check) {
          if(check) {
            res.json({message: "Login Successful", user: user});
          }else {
            res.json({error: "Invalid Login"});
          }
        });
      }
    });
  },

  new: function(req, res) {
    var user = new User();
    console.log(req.body);
    if(req.body.password.length < 8) {
      res.json({message: "New Input error", errorPass: "Password must be at least 8 characters in length"});
    }else if (req.body.password != req.body.passwordConfirm) {
      res.json({message: "New Input error" , errorConfirm: "Password does not match confirmation"});
    }else {
      bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
          ({message: "New Input error", errorPass: "Unable to hash password"});
        }else {
          user.username = req.body.username;
          user.password = hashedPass;
          user.save(function(err) {
            if(err) {
              console.log("New input error " + err);
              res.json({message: "New input error", error: err});
              console.log(user);
            }else {
              res.json({message: "New input success", user: user});
            }
          });
        }
      });
    }
  },

  update: function(req, res) {
    console.log(req.body);
    User.findByIdAndUpdate(req.body._id,
      {name: req.body.username,
        password: req.body.password,
        avatar: req.body.avatar, wpm: req.body.wpm,
        accuracy: req.body.accuracy}, {runValidators: true, new: true}, function(err) {
      if(err) {
        console.log("Update error " + err);
        res.json({message: "Update error", error: err});
      }else {
        res.json({message:"Update success"});
      }
    });
  },

  delete: function(req, res) {
    User.findByIdAndDelete(req.params.id, function(err) {
      if(err) {
        console.log("Delete error " + err);
        res.json({message: "Delete error", error: err});
      }else {
        res.json({message: "Delete success"});
      }
    });
  },

}
