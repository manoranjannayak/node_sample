import userModel from '../models/user.model';
import JWT from 'jsonwebtoken';
import encryption from '../../utils/encrypt';
import request from 'request';

class user {
    constructor(data) {
        //Attributes
        this.email = data.email != undefined ? data.email : null;
        this.username = data.username != undefined ? data.username : null;
        this.password = data.password != undefined ? data.password : null;

        this.key_array = ["email", "username", "password"];

    }
    
    insertdata(key_array) {
        var data = {};
        for (let i = 0; i < key_array.length; i++) {
            if (this[key_array[i]] == null) {
                delete key_array[i];
            } else {
                data[key_array[i]] = this[key_array[i]];
            }
        }
        return data;
    };
    
    removenull(data) {
        return JSON.parse(JSON.stringify(data, function (key, value) {
            return (value === null) ? "" : value
        }));
    };
    
    async register(success, error) {
        try {
            let instance = this;
            console.log("instance",instance);
            // return
            userModel.findOne({
                    "email": {
                        $regex: new RegExp(instance.email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i")
                    }
                },'-password').then(async user => {
                    if (user) {
                        return error(Response.sendResponse(status_codes.ALREADY_EXIST, custom_message.errorMessage.userAlreadyExists, user, []))
                    } else {
                        let user = userModel(this.insertdata(instance.key_array));
                        user.save((error,user) => {
                            if(error){
                                return error(Response.sendResponse(status_codes.ALREADY_EXIST, custom_message.errorMessage.userAlreadyExists, user, []))
                            }else{
                                success(Response.sendResponse(status_codes.CREATED, custom_message.infoMessage.userRegister, user, []))
                            }
                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                    error(Response.sendResponse(status_codes.BAD_REQUEST, custom_message.errorMessage.genericError, [], err))
                });
        } catch (err) {
            console.log("err:-", err)
            error(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
        }
    };

    async login(success, error) {
        try {
            let instance = this;
            let email = instance.email;
            let condition = {
                "email": {
                    $regex: new RegExp(email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i")
                }
            };
            userModel.findOne(condition).then( async user => {
                // console.log('user :>> ', user.email,);
                // return
                const token = JWT.sign({
                    email: user.email,
                    _id: user._id,
                }, config.JWTSecret, {
                    expiresIn: config.JWTExpireTime
                });
                let response = {
                    _id: user._id,
                    email: user.email,
                    mobile: user.mobile_number,
                    // username: user.username,
                }
                user.comparePassword(instance.password, (err, match) => {
                    if (match === true) {
                        success(Response.sendResponse(status_codes.OK, custom_message.infoMessage.login, instance.removenull({
                            token: 'JWT ' + token,
                            user: response
                        }), []));
                    } else {
                        error(Response.sendResponse(status_codes.UNAUTHORISED, custom_message.errorMessage.Wrongpassword, [], []));
                    }
                })
            }).catch(err => {
                console.log("err 11:--------", err)
                error(Response.sendResponse(status_codes.BAD_REQUEST, custom_message.errorMessage.genericError, [], err));
            })
        } catch (err) {
            console.log("err:-", err)
            error(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
        }
    };
    
}

module.exports = user;