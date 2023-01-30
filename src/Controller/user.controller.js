import { create, findAll, findID, loginFind, updatePassword } from '../Services/userService.js';

export const getAll = async (__, res) => {
    try {
        const user = await findAll()

        if (user.length === 0) return res.status(404).send({ messagem: "Not users registers" })

        return res.status(200).json({
            messagem: "Sucessful!",
            users: user
        })
    } catch (error) {
        return res.status(400).send({ msg: error.messagem })
    }
};

export const getID = async (req, res) => {
    try {
        const user = await findID(req.params.id)
        if (!user) return res.status(400).send({ messagem: "Not find user searching" })

        return res.status(200).json({
            messagem: "sucess fetch id",
            user: user
        })
    } catch (error) {
        return res.status(400).json({ messagem: error.messagem })
    }
}

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body
        const user = await create(req.body)

        if (!user) return res.status(400).json({ messagem: "Fields cannot be empty" })

        return res.status(201).json({
            messagem: "User created sucess",
            sucess: {
                user: user._id,
                name,
                email,
                password
            }
        })
    } catch (error) {
        return res.status(400).send({ messagem: error.messagem })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, name } = req.body
        const user = await loginFind(email)
        if (!user) return res.status(404).send({ messagem: "Not Found" })

        const passwordIsCorrect = await user.checkPassword(password)
        if (!passwordIsCorrect) return res.status(401).send({ msg: "Not Found" })

        const token = await user.generateToken(user._id, email, name)
        return res.status(200).json({ user: passwordIsCorrect, token: token })
    } catch (err) {
        return res.status(400).send({ messagem: err.messagem })
    }
}

export const update = async (req, res) => {
    try {
        const { name, password, email} = req.body
        const { id } = req.params

        await updatePassword(
            id,
            name,
            password,
            email
        )

        res.status(200).send({sucess: true, messagem: "sucesso em atualiza senha"})
    } catch (err) {
        return res.status(400).send({ messagem: err.messagem })
    }
}