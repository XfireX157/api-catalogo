import { Router } from "express";
import { register, getAll, getID, login, update } from '../Controller/user.controller.js'
import tokenLogin from "../Middlewares/tokenLogin.js";

const user = Router()

user
    .get('/getUserAll', getAll)
    .get('/getUserID/:id', getID)
    .post('/register', register)
    .post('/login', login)
    .patch('/editUser/:id', tokenLogin ,update)
 
export default user