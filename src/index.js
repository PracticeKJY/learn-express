import "dotenv/config";
import "./db";
import "./models/video";

import express from "express";
import morgan from "morgan";
import rootRouter from "./router/global";
import userRouter from "./router/user";
import videoRouter from "./router/video";
import MongoStore from "connect-mongo";
import session from "express-session";
import { localsMiddleware } from "./middlewares";

const app = express();
export default app;

app.set("view engine", "pug");

// views의 디렉토리 관리를 src 안에 하고 싶다면 아래와 같은 세팅을 해주면 됨.
app.set("views", process.cwd() + "/src/views");

// morgan 으로 인해 req의 method, params 등을 볼 수 있음.
app.use(morgan("dev"));

//바디 파싱 미들웨어, 사용하면 undifined 였던 req.body가 기가막히게 파씡대서 나옴
app.use(express.urlencoded({ extended: true }));

// 세션 관련 미들웨어
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(localsMiddleware);

//use router
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
