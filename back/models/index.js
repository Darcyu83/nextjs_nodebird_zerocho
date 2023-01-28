"use strict";

const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";

const config = require("../config/config")[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Comment = require("./comment")(sequelize, Sequelize);
db.Comment = require("./comment");
// 클래스 문법으로 바꿔봄

// 클래스 모델이 여러개일 경우
// Object.keys(db).forEach((modelName) => {
//   db[modelName].init(sequelize);
// });
// db.Comment.init(sequelize);

db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
