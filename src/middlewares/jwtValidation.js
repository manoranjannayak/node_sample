import JWT from 'jsonwebtoken';
import Message from '../config/message';
import config from '../config/config'
exports.jwtValidation = (req, res, next) => {
    const exe = req.headers.authorization.split(' ');
    if (!exe) {
        res.send({
            code: 403,
            message: Message.errorMessage.tokenNotFoundOrExpire,
            data: [],
            err: []
        });
    }
    else {
        JWT.verify(exe[1], config.JWTSecret, (err, result) => {
            if (err) {
                res.send({
                    code: 401,
                    message: Message.errorMessage.tokenNotFoundOrExpire,
                    data: [],
                    err: []
                });
            } else {
                next();
            }
        });
    }
}