import { create, findAll, deleteIDCategory, updateID, getIDCategory } from "../Services/categoryService.js";
import News from '../Models/News.js'

export const categoryAll = async (__, res) => {
    try {
        const category = await findAll()
        if (category.length === 0) return res.status(404).send({ messagem: "Not categorys registers" })

        return res.status(200).json({
            results: category
        })

    } catch (err) {
        return res.status(400).send({ messagem: err.messagem })
    }
}

export const categoryID = async (req, res) => {
    try{
        const category = await getIDCategory(req.params.id)
        if(!category) return res.status(404).send({messagem: "Not fetch ids"})

        return res.status(200).json({
            messagem: "Sucess id",
            results: category
        })
    }catch(err) {
        return res.status(400).send({messagem: err.messagem})
    }
}

export const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body

        const category = await create({
            categoryName,
            user: req.userId
        })
        
        if (!category) return res.status(400).send({ messagem: "This field cannot be empty" })
        return res.status(200).json({
            messagem: "Sucess!",
            results: category
        })
    } catch (err) {
        return res.status(404).send({ messagem: err.messagem })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await deleteIDCategory(categoryId)
        const news = await News.deleteMany({category: category.categoryName})
        return res.status(200).json({
            messagem: "Item delete sucess",
            results: {
                category,
                news
            }
        })
    } catch (err) {
        return res.status(400).send({ messagem: err.messagem })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        const { id } = req.params

        await updateID(
            id,
            categoryName
        )
        
        return res.status(200).json({
            messagem: "Update Sucess",
            results: categoryName
        })

    } catch (err) {
        return res.status(400).send({ messagem: err.messagem })
    }
}