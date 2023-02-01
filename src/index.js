import express from 'express'
import routes from './Routes/index.js'
import cors from 'cors'
import env from 'dotenv'
import db from './Database/db.js'

const app = express()
env.config()
db()

const port = (process.env.PORT) || 3333

app.use(cors());
app.use('/images', express.static('upload'))
app.use(cors());


routes(app)

app.listen(port, () => console.log(`server runing on port ${port}`))