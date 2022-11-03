import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import { config } from "dotenv";
config();

//ROUTES
import db from './db/db-connection.js';


const app = express();
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('This is the backend.');
})

app.listen(PORT, () => console.log(`Hola! Server id running on port ${PORT}.`));