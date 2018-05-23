import passportjwt = require('passport-jwt');
import { getUserById } from '../models/user';
import { SECRET } from '../configs/default';

const JwtStrategy = passportjwt.Strategy;
const ExtractJwt = passportjwt.ExtractJwt;

function ConfigPassport(passport: any): void {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: SECRET
  }

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    getUserById(jwt_payload._id, (err, user) => {
      if(err) {
        return done(err, false);
      }

      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}

export { ConfigPassport }

