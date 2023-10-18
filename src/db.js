import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const isOpen = () => {
  return console.log("쨔란 DB 연결이 성공하였습는둥 👍");
};

db.once("open", isOpen);

const errorHandler = (error) => {
  return console.log("DB Error", error);
};
db.on("error", errorHandler);
