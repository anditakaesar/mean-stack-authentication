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
          if (err) {
            callback(err, null);
          } else {
            callback(null, newUser);
          }

        });

      }
    })
  });
}

export { UserModel, addUser }