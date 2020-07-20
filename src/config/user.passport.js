import {
    Strategy,
    ExtractJwt
} from 'passport-jwt';
import Users from '../app/models/user.model';
import config from './config';

module.exports = (passport) => {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.JWTSecret;
    console.log("the user  passport called....");
    passport.use('User', new Strategy(opts, (jwt_payload, done) => {
        Users.findOne({
            _id: jwt_payload._id
        }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));
}