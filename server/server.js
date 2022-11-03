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
/**************************** GET Request  ******************************************/
//FAVORITES TABLE
//change the get path

app.get("/", async (req, res) => {
  try {
    const favorites =
      [
        { "id": 1, "user_id": "52-696-7892", "data": "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum." },
        { "id": 2, "user_id": "43-598-9065", "data": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus." },
        { "id": 3, "user_id": "01-019-2620", "data": "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros." },
        { "id": 4, "user_id": "68-703-3346", "data": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem." },
        { "id": 5, "user_id": "05-900-6787", "data": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis." },
        { "id": 6, "user_id": "83-232-5092", "data": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum." },
        { "id": 7, "user_id": "33-968-2826", "data": "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo." },
        { "id": 8, "user_id": "58-242-6985", "data": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet." },
        { "id": 9, "user_id": "75-359-5280", "data": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh." },
        { "id": 10, "user_id": "04-103-6467", "data": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem." }
      ];
    res.send(favorites);
  } catch (e) {
    console.log("This is printing from GET request - Favorites Table")
    return res.status(400).json({ e });
  }
});
//USERS TABLE
//change the get path

app.get("/", async (req, res) => {
  try {
    const users =
      [
        { "id": 1, "username": "sstenton0", "email": "sgotthardsf0@howstuffworks.com", "password": "2BmjFYlc" },
        { "id": 2, "username": "epenhalurick1", "email": "nenderle1@1688.com", "password": "jFKLXCUQPlr" },
        { "id": 3, "username": "ssirette2", "email": "orisdall2@whitehouse.gov", "password": "zVkI4bOqc9x" },
        { "id": 4, "username": "bmateev3", "email": "dlevens3@flavors.me", "password": "MuNBRHlE" },
        { "id": 5, "username": "bludovico4", "email": "alindsley4@walmart.com", "password": "TWuSI5gRt" },
        { "id": 6, "username": "mbisterfeld5", "email": "jmaypother5@51.la", "password": "AM3dy1" },
        { "id": 7, "username": "cderks6", "email": "amcadam6@oracle.com", "password": "B19fhTafx" },
        { "id": 8, "username": "rtulley7", "email": "sbrass7@360.cn", "password": "kUGETGaJ" },
        { "id": 9, "username": "gluna8", "email": "byosifov8@odnoklassniki.ru", "password": "8gpuxG" },
        { "id": 10, "username": "lhann9", "email": "ahanshawe9@illinois.edu", "password": "7micQ1" }
      ];
    res.send(users);
  } catch (e) {
    console.log("This is printing from GET request - Users Table")
    return res.status(400).json({ e });
  }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));