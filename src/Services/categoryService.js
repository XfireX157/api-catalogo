import Category from "../Models/Category.js";

export const create = (body) => Category.create(body)
export const getID = (id) => Category.findById({_id: id})
export const findAll = () => Category.find().sort({_id: -1}).populate('user')
export const deleteIDCategory = (id) => Category.findByIdAndDelete({_id: id})
export const updateID = (id, categoryName) => Category.findByIdAndUpdate({_id: id}, {categoryName})
