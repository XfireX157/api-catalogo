import jwt from 'jsonwebtoken'
import { findID } from '../Services/userService.js'

const tokenLogin = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT, async (err, decode) => {
            if(err) return res.status(401).send({messagem: 'Token Invalid'})
            const user = await findID(decode.id)
            if(!user || !user._id) return res.status(401).send({messagem: "Invalid"})
            req.userId = user._id
            next()
        })  
    }catch(err){
        return res.status(401).send({messagem: err.messagem})
    }
}   

export default tokenLogin