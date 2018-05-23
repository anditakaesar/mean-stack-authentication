import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../interfaces/user';
import { addUser } from '../models/user';

const router: Router = Router();

// register user
function registerUser(req: Request, res: Response, next: NextFunction): void {

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

// authenticate username and password
function authenticateUser(req: Request, res: Response, next: NextFunction): void {
  const username = req.body.username;
  const password = req.body.password;

  res.json({
    success: true,
    msg: 'User Authenticated',
    user: {
      username: username,
      password: password
    }
  });
}

function getProfileUser(req: Request, res: Response, next: NextFunction): void {
  // if (true) throw Error('Error Invoked manually');
  res.json({
    success: true,
    msg: 'User Retreived',
    user: {
      username: 'username',
      name: 'name',
      passwrod: 'password'
    }
  });
}

// setup routers
router.post('/register', registerUser);
router.post('/authenticate', authenticateUser);
router.get('/profile', getProfileUser);

// export as router
export { router as UserRouter }
