import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube");

const db = mongoose.connection;

const isOpen = () => {
  return console.log("쨔란 DB 연결이 성공하였습는둥 👍");
};

db.once("open", isOpen);

const errorHandler = () => {
  return console.log("DB Error", error);
};
db.on("error", errorHandler);
