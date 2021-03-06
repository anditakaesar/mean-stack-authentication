import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../interfaces/user';
import { addUser, comparePassword, getUserByUsername } from '../models/user';
import jwt = require('jsonwebtoken');
import passport = require('passport');
import { SECRET } from '../configs/default';

const router: Router = Router();

// register user
function registerUser(req: Request, res: Response, next: NextFunction): void {

  // check if required body exists
  if ( !req.body.name || !req.body.username || !req.body.email || !req.body.password ) {
    res.json({
      success: false,
      msg: 'Register Failed',
      err: 'Request body error!'
    });
  } else {
    let user: User = {
      name : req.body.name,
      username : req.body.username,
      email : req.body.email,
      password : req.body.password
    }
  
    addUser(user, (err, user) => {
      if(err) {
        res.json({
          success: false,
          msg: 'Register Failed',
          err: err.message
        });
      } else {
        res.json({
          success: true,
          msg: 'Register Success',
          user: user
        });
      }
    });
  }

}

// authenticate username and password
function authenticateUser(req: Request, res: Response, next: NextFunction): void {
  if ( !req.body.username || !req.body.password ) {
    res.json({
      success: false,
      msg: 'Found an error!',
      err: 'Request body error!'
    });
  } else {
    const username = req.body.username;
    const password = req.body.password;
  
    getUserByUsername(username, (err, user) => {
      if(err) {
        res.json({
          success: false,
          msg: 'Found an error!',
          err: err
        });
      }
  
      if(!user) {
        res.json({
          success: false,
          msg: 'User not found!'
        });
      }
  
      if(!user.password) {
        res.json({
          success: false,
          msg: 'Password is empty!'
        });
      }
  
      comparePassword(password, user.password, (err, isMatch) => {
        if(err) {
          res.json({
            success: false,
            msg: 'Found an error!',
            err: err
          });
        }
  
        if(isMatch) {
          const token = jwt.sign(Object.assign({}, user), SECRET, {
            expiresIn: '7d' // 1 week
          });
  
          res.json({
            success: true,
            msg: 'User Authenticated',
            token: 'JWT ' + token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            }
          });
        } else {
          res.json({
            success: false,
            msg: 'Wrong password!'
          });
        }
  
      }); // comparePassword
    }); // getUserByUsername
  }
  
} // authenticateUser

function getProfileUser(req: Request, res: Response, next: NextFunction): void {

  res.json({
    success: true,
    msg: 'User Retreived',
    user: req.user
  });
}

// setup routers
router.post('/register', registerUser);
router.post('/authenticate', authenticateUser);
router.get('/profile', passport.authenticate('jwt', {session: false}), getProfileUser);

// export as router
export { router as UserRouter }
