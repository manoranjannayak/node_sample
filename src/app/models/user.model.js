import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import mongooseTimestamp from 'mongoose-timestamp';
import { required } from 'joi';
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
}, {
    collection: 'Users'
});


UserSchema.plugin(mongooseTimestamp);


UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

const UserModel = mongoose.model('Users', UserSchema);

UserModel.saveUser = (saveToUser) => {
    return saveToUser.save();
}

UserModel.filter = (filterParam) => {
    return UserModel.find(filterParam);
}
export default UserModel;