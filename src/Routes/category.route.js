import { Router } from "express";
import { categoryAll, createCategory, deleteCategory, updateCategory, categoryID } from "../Controller/category.controller.js";
import tokenLogin from "../Middlewares/tokenLogin.js";

const category = Router()

category
    .get('/CategoryGetAll', categoryAll)
    .get('/CategoryGet/:id', categoryID)
    .post('/CategoryCreate', tokenLogin, createCategory)
    .delete('/CategoryDelete/:id', tokenLogin, deleteCategory)
    .patch('/CategoryUpdate/:id', tokenLogin, updateCategory)

export default category