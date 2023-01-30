import User from "../Models/User.js";

export const create = (body) => User.create(body)
export const findID = (id) => User.findById(id)
export const findAll = () => User.find()
export const loginFind = (email) => User.findOne({email: email}).select("+password")
export const updatePassword = (id, name, email, password) => User.findByIdAndUpdate({_id: id}, {name, password, email})