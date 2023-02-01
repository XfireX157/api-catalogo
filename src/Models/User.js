import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: true
    }
}, {collection: 'users'})

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.pre('findOneAndUpdate', async function (next){
    const userUpdate = await this.model.findOne(this.getQuery())
    userUpdate.password = await bcrypt.hash(userUpdate.password, 10)

    userUpdate.save()
    next()
})

UserSchema.methods.checkPassword = async function (password) {
    const passwordIsCorrect = await bcrypt.compare(password, this.password)
    return passwordIsCorrect
}

UserSchema.methods.generateToken = async function (id, email, name) {
    const token = jwt.sign({id: id, email: email, name: name}, process.env.JWT, {expiresIn: '1h'})
    return token
}

const User = mongoose.model('users', UserSchema)

export default User