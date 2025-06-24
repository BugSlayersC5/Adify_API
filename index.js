import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import 'dotenv/config'
import { userRouter } from "./routes/user_routes.js"
import { advertRouter } from "./routes/advert_routes.js"


const app = express()

const PORT = process.env.PORT || 9191
app.use(cors())
app.use(express.json({ limit: '10mb' }));

app.use('/api/v1/users', userRouter)
app.use('/api/v1/adverts', advertRouter);

const mongoURI = process.env.MONGO_URI;

await mongoose.connect(mongoURI);

app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`)
})