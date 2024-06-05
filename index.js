import express from 'express'  
import cors from "cors"
import bodyParser from "body-parser";

import connectDB from './database.js';
import UserRouter from './Routers/UsersRouter.js';
import LinkRouter from './Routers/LinksRouter.js';
const port = 5000

connectDB()
const app = express()
app.use(cors());
app.use(bodyParser.json());

app.use('/links',LinkRouter)
app.use('/users',UserRouter)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
