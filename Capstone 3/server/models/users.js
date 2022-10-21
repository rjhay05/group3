const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },

})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY, { expiresIn: '1d'})
    return token
}

const User = mongoose.model('user', userSchema);

const validate = (data)=>{
    const schema = Joi.object({
        userName: Joi.string().required().label('Username'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
        confirm_password: Joi.any().equal(Joi.ref('password'))
        .required()
        .label('Password')
        .options({ messages: { 'any.only': '{{#label}} does not match'} })
    })
    return schema.validate(data)
}

module.exports = { User, validate}  