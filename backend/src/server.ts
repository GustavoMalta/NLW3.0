import express, { json, request, response } from 'express';
import './database/connection'
import path from "path";
import "express-async-errors";
import errorHandler from "./errors/handler";
import cors from "cors";

import routes from "./routes";

const app = express()

app.use(express.json())

app.use(cors())

app.use(routes)
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')))

app.use(errorHandler)

app.listen(3334)
