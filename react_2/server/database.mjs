import { MongoClient } from "mongodb";
import { randomUUID } from "crypto";

class Database {
  constructor(mongoString, db) {
    this._mongoString = mongoString;
    this._nameDb = db;
  }

  async connect() {
    this._mongoClient = new MongoClient(this._mongoString);
    this._db = this._mongoClient.db(this._nameDb);
  }
  
  async close() {
    await _mongoClient.close();
  }

  async init() {
    let collection = this._db.collection("services");
    if (await collection.countDocuments() > 0)
      return;

    await collection.insertMany([{
      name: "Выравнивание пола222",
      description: "Выравняем пол перед укладкой плитки222",
      price: 350,
      mesur: "м²222",
      img: "/files/qds83.jpg"
    },{
      name: "Укладка плитки",
      description: "Положим клитку на клей. Выравнивание и затирка швов не входит в стоимость",
      price: 750,
      mesur: "м²",
      img: "/files/fdsf1-4ffae.jpg"
    },{
      name: "Затирка швов",
      description: "Заполним швы под цвет плитки",
      price: 100,
      mesur: "м²",
      img: "/files/jfd3h.jpg"      
      }  
  ]);
  
    collection = this._db.collection("examples");
    await collection.insertMany([{
      name: "Выравнивание пола",
      img: "/files/qds83.jpg"
    },{
      name: "Укладка плитки",
      img: "/files/fdsf1-4ffae.jpg"
    },{
      name: "Затирка швов",
      img: "/files/jfd3h.jpg"
    }]);
  
    collection = this._db.collection("blogs");
    await collection.insertMany([
    {
      uuid: randomUUID(),
      name: "Новости за май",
      preview: "Что у нас появилось нового в мае",
      text: "В мае к нам пришел новый укладчик плитки. Так же мы добавили услугу выравнивания пола. Теперь если нужно просто скажите нам!",
      comments: [
        "спасибо, было полезно"
      ]
    },
    {
      uuid: randomUUID(),
      name: "Новости за апрель",
      preview: "Поздравьте нас с открытием",
      text: "Мы открылись! Теперь мы с радостью будем работать над вашими ванными. Просто напишите нам.",
      comments: []
    },
    ]);
  }

  async allEntity(collection) {
    const collect = this._db.collection(collection);
    return await collect.find().toArray();
  }

  async createEntity(collection, entity) {
    const collect = this._db.collection(collection);
    await collect.insertOne(entity);
  }

  async blogs() {
    const blogsC = this._db.collection("blogs");
    const blogs = await blogsC.find({}).project({_id:0, id:"$uuid", title: 1, preview: 1}).toArray();

    return blogs;
  }
  
  async blog(uuid) {
    const blogs = this._db.collection("blogs");
    return await blogs.findOne({uuid: uuid});
  }
  
  async createBlogComment(uuid, comment) {
    const blogs = this._db.collection("blogs");
    await blogs.updateOne({uuid: uuid}, { $push: { comments: comment}});
  }
}

export { Database }