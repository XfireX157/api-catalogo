import { Router } from "express";
import { getNewsAll, createNews, getNewsID, deleteNews, updateID, searchNews } from "../Controller/news.controller.js";
import tokenLogin from "../Middlewares/tokenLogin.js";
import { upload } from "../Middlewares/uploadImagens.js";

const news = Router()

news
    .get('/GetNewsAll', getNewsAll)
    .get('/GetNewsId/:id', getNewsID)
    .get('/search', searchNews)
    .post('/Create', tokenLogin, upload.single('image'), createNews)
    .delete('/Delete/:id', tokenLogin, deleteNews)
    .patch('/Update/:id', tokenLogin, upload.single('image'), updateID)

export default news