import { Database } from "./database.mjs";
import path from "path";
import express from "express";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";
import multer from "multer";

const mongo = "mongodb://127.0.0.1:27017/";
const nameDb = "MongoPlumberDB";

const db = new Database(mongo, nameDb);
await db.connect();
await db.init();

const port = 20123;
const app = express();
const parser = express.json();

const file = fileURLToPath(import.meta.url);
const dirrectory = path.dirname(file);

app.use("/files", express.static(path.join(dirrectory, "../files")));

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".")[1];
    cb(null, randomUUID() + "." + extension);
  }
});
app.use(multer({storage: storageConfig}).single("file"));

app.post("/api/upload", (request, response) => {
  if (!request.file) {
    return response.status(400).send("Не загружен.");
  }
  response.json(request.file.filename);
});

app.get("/api/blogs", async function(_, response){
  const blogs = await db.blogs();

  response.json(blogs);
});

app.get("/api/blogs/:id", async function(request, response){
  const id = request.params["id"];
  const blog = await db.blog(id) || {};

  response.json(blog);
});

app.post("/api/blogs/:id", parser, async function(request, response) {
  const id = request.params["id"];
  const comment = request.body;

  if(!comment || !comment.comment || !id) return response.sendStatus(400);

  await db.createBlogComment(id, comment.comment);
  response.sendStatus(200);
});

app.get("/api/:collection", async function(request, response){
  const collect = request.params["collection"];
  const collection = await db.allEntity(collect);

  response.json(collection);
});

app.post("/api/:collection", parser, async function(request, response) {
  const collect = request.params["collection"];
  const entity = request.body;

  if(!entity) return response.sendStatus(400);

  await db.createEntity(collect, entity);
  response.sendStatus(200);
});

app.listen(port);