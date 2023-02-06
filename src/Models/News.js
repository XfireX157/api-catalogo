import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema

const NewsSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },

    path: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    discount: {
        type: String
    },

    category: {
        type: String,
        required: true
    },

    user: {
        type: ObjectId,
        ref: 'users',
        required: true
    }
}, {collection: 'news'})

const News = mongoose.model('news', NewsSchema) 

export default News