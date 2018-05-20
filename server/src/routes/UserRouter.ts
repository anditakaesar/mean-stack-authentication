import { Router, Request, Response, NextFunction } from 'express';

const router: Router = Router();

// register user
function registerUser(req: Request, res: Response, next: NextFunction): void {
  res.json({
    success: true,
    msg: 'Register Success'
  });
}

// authenticate username and password
function authenticateUser(req: Request, res: Response, next: NextFunction): void {
  res.json({
    success: true,
    msg: 'User Authenticated'
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
router.get('/register', registerUser);
router.get('/authenticate', authenticateUser);
router.get('/profile', getProfileUser);

// export as router
export { router as UserRouter }
