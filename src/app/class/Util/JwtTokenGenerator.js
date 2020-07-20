var jwt = require('jsonwebtoken');

class JwtTokenGenerator {
    static createToken(id, email, uid) {
        var secreteKey = config.JWTSecret;
        return "JWT " + jwt.sign({
            id: id,
            email: email,
            uid: uid
        }, secreteKey, {
            expiresIn: config.JWTExpireTime
        });
    }
}

module.exports = JwtTokenGenerator;