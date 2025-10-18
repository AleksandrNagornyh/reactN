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
      name: "Кофе",
      description: "Эспрессо, капучино, авторские напитки",
      price: 350,
      mesur: "чашку",
      img: "/files/qds83.jpg"
    },{
      name: "Десерты",
      description: "Торты, пирожные, веганские опции",
      price: 750,
      mesur: "шт",
      img: "/files/fdsf1-4ffae.jpg"
    },{
      name: "Завтраки",
      description: "Яишница, блинчики, каша",
      price: 600,
      mesur: "порцию",
      img: "/files/jfd3h.jpg"
    }]);
  
    collection = this._db.collection("examples");
    await collection.insertMany([{
      name: "Кофе в зернах",
      img: "/files/123q.jpg"
    },{
      name: "Книги",
      img: "/files/books2.jpg"
    },{
      name: "Мерч",
      img: "/files/802625.jpg"
    }]);
  
    collection = this._db.collection("blogs");
    await collection.insertMany([
    {
      uuid: randomUUID(),
      name: "Марина",
      preview: "Бариста встретила с улыбкой",
      text: "Зашла сюда спонтанно, проходя мимо, и не пожалела! Атмосфера очень уютная, играет приятная музыка, нет навязчивого шума. Бариста встретила с улыбкой, помогла определиться с выбором — я взяла раф с карамелью. Кофе приготовили буквально за 5 минут, напиток получился просто божественный — насыщенный, с приятным ароматом и идеальным балансом сладости. Обязательно вернусь ещё!",
      comments: [
        "спасибо, было полезно"
      ]
    },
    {
      uuid: randomUUID(),
      name: "Ольга",
      preview: "Посещаю эту кофейню уже второй месяц подряд",
      text: "Посещаю эту кофейню уже второй месяц подряд, практически каждый день. Здесь работает замечательный бариста, который всегда помнит мои предпочтения и готовит идеальный эспрессо. Особенно радует, что в кофейне чисто и аккуратно, есть удобные столики, где можно спокойно поработать с ноутбуком. Ценник более чем адекватный, а качество напитков на высоте. Рекомендую всем!",
      comments: []
    },
    {
      uuid: randomUUID(),
      name: "Сергей",
      preview: "Персонал был внимателен и дружелюбен",
      text: "Отмечали с подругами день рождения, выбрали эту кофейню из-за хороших отзывов. Не прогадали! Персонал был внимателен и дружелюбен, быстро обслужили всю нашу компанию. Брали разные напитки — от классического капучино до экзотического бамбла, все оказались превосходными. Десерты тоже не подвели, особенно впечатлил шоколадный торт. Атмосфера располагала к общению, музыка не мешала разговаривать. Однозначно будем приходить ещё!",
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