import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    categoryName:{
        type: String,
        required: true,
        unique: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {collection: 'category'})

const Category = mongoose.model('category', CategorySchema)

export default Category