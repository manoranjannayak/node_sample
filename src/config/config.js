import environment from '../../environment';
const envConfig = environment[process.env.NODE_ENV];

module.exports = {
    JWTSecret: 'singh',
    JWTExpireTime: "1 Hours",
    resetPasswordTokenExpireTime: Date.now() + 3600000,
    emailVerifyTokenExpireTime: Date.now() + 3600000,
};