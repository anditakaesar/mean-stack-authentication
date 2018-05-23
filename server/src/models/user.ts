import { Schema } from 'mongoose';
import { User } from '../interfaces/user';
import mongoose = require('mongoose');
import bcrypt = require('bcryptjs');

// UserSchema
const UserSchema: Schema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    index: { 
      unique: true
    }
  },
  username: {
    type: String,
    required: true,
    index: { 
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model('User', UserSchema);

// Model Function
function addUser(newUser: User, callback: any): void {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) {
        throw err;

      } else {
        newUser.password = hash;
        let user = new UserModel(newUser);
        user.save((err, user) => {
          if(err) {
            callback(err, null);
          } else {
            callback(null, newUser);
          }

        });

      }
    })
  });
}

function comparePassword(candidate: string, hash: string, callback) {
  bcrypt.compare(candidate, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

function getUserByUsername(username, callback) {
  const query = {username: username};
  UserModel.findOne(query, callback);
}

function getUserById(id, callback) {
  UserModel.findById(id, callback);
}

export { 
  UserModel, 
  addUser, 
  comparePassword, 
  getUserByUsername,
  getUserById
}