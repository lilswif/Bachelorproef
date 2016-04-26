import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

var Schema = mongoose.Schema;
const saltRounds = 15;

// User schema
var UserSchema = new Schema({
    local             : {
        email         : { 
            type: String, 
            lowercase: true 
        },
        firstname     : String,
        lastname       : String,
        hashedPassword: String,
        salt          : String,
        role          : {
            type: String,
            default: 'user'
        },
        dateJoined    : {
            type: Date,
            default: new Date().toISOString()
        }
    }
});

// Methods
UserSchema.methods = {
    makeSalt: function() {
        return bcrypt.genSaltSync(saltRounds);
    },
    hashPassword: function(plainTextPassword) {
        return bcrypt.hashSync(plaintextPassword, this.makeSalt());
    },
    authenticate: function(plainTextPassword) {
        return this.hashPassword(plainTextPassword) === this.hashedPassword;
    },
};

module.exports = mongoose.model('User', UserSchema);