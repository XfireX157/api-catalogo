import { create, findAll, getID, deleteID, update, search, findDocuments } from '../Services/newsService.js'

export const getNewsAll = async (__, res) => {
    try {
        const news = await findAll()
        const newsDocuments = await findDocuments()

        if (news.length === 0) return res.status(404).send({ messagem: "Not news registers" })

        res.status(200).json({
            messagem: "Sucessful!",
            newsDocuments,
            results: news.map((item) => ({
                id: item._id,
                filename: process.env.URL + item.filename || "http://localhost:3333/images/" + item.filename,
                title: item.title,
                description: item.description,
                discount: item.discount,
                price: item.price,
                category: item.category,
                user: item.user,
            })),
        })
    } catch (error) {
        return res.status(400).send({ messagem: error.messagem })
    }
}

export const getNewsID = async (req, res) => {
    try {
        const news = await getID(req.params.id)
        if (!news) return res.status(404).send({ messagem: "Not found id" })

        return res.status(200).json({
            url: process.env.URL || "http://localhost:3333/images/",
            results: news
        })
    } catch (err) {
        return res.status(401).send({ messagem: err.messagem })
    }
}

export const createNews = async (req, res) => {
    const { title, description, discount, price, category } = req.body
    const { filename, path } = req.file
    try {
        const news = await create({
            filename,
            path,
            title,
            description,
            discount,
            price,
            category,
            user: req.userId
        })

        return res.status(201).json({
            sucess: true,
            results: {
                ...news._doc,
                filename: process.env.URL + filename || "http://localhost:3333/images/" + filename
            }
            
        })

    } catch (err) {
        return res.status(400).send({ messagem: err.messagem })
    }
}

export const deleteNews = async (req, res) => {
    try {
        const news = await deleteID(req.params.id)
        if (!news) return res.status(404).send({ messagem: "Not found ID" })

        return res.status(200).json({
            messagem: "Sucess delete object",
            results: news
        })
    } catch (err) {
        return res.status(400).send({ messagem: err.messagem })
    }
}

export const updateID = async (req, res) => {
    try {
        const { title, description, price, discount } = req.body
        const { filename, path } = req.file
        const { id } = req.params

        const obj = {
            filename,
            title,
            path,
            description,
            price,
            discount
        }
      
        const objToUpdate = {}
                                  //title = Teste2
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value !== 'undefined') {
              objToUpdate[key] = value
            }
        })

        await update(
            id,
            objToUpdate
        )

        res.status(200).json({
            messagem: "Update sucess",
            results: {
                id, filename, path ,title, description, price, discount
            }
        })
    } catch (err) {
        return res.status(400).send({ messagem: err.message })
    }
}

export const searchNews = async (req, res) => {
    try {
        const { searchTerm } = req.query
        const news = await search(searchTerm)

        return res.status(200).json({
            url: process.env.URL || "http://localhost:3333/images/",
            results: news
        })
    } catch (err) {
        return res.status(400).send({ messagem: err.messagem })
    }
}