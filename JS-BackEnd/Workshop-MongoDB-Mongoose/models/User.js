const { Schema, model } = require('mongoose');
const { comparePassword, hashPassword} = require('../services/util');

const userSchema = new Schema({
    username: {type: String, require: true},
    hashedPassword: {type: String, require: true, minlength: 3}
})
userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});
userSchema.methods.comparePassword = async function (password){
    return await comparePassword(password, this.hashedPassword);
}

userSchema.pre('save', async function(next){
    if (this.isModified('hashedPassword')) {
        this.hashedPassword = await hashPassword(this.hashedPassword);
    }
    next();
})
const User = model('User', userSchema);
module.exports = User;