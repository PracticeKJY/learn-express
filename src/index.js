import "./db";
import "./models/video";

import express from "express";
import morgan from "morgan";
import globalRouter from "./router/global";
import userRouter from "./router/user";
import videoRouter from "./router/video";

const app = express();
export default app;

app.set("view engine", "pug");
// views의 디렉토리 관리를 src 안에 하고 싶다면 아래와 같은 세팅을 해주면 됨.
app.set("views", process.cwd() + "/src/views");
// morgan 으로 인해 req의 method, params 등을 볼 수 있음.
app.use(morgan("dev"));

// code spliting 으로 인한 주석처리, export import 화 완료.
//global router
// const globalRouter = express.Router();
// const handleHome = (req, res) => res.send("home");
// globalRouter.get("/", handleHome);

// const userRouter = express.Router();
// const handleEditUser = (req, res) => res.send("유저정보수정");
// const handleEditUserMain = (req, res) => res.send("유저정보수정메인페이지");
// userRouter.get("/", handleEditUserMain);
// userRouter.get("/edit", handleEditUser);

// const videoRouter = express.Router();
// const handleWatchVideo = (req, res) => res.send("팝콘각");
// videoRouter.get("/watch", handleWatchVideo);

//바디 파싱 미들웨어, 사용하면 undifined 였던 req.body가 기가막히게 파씡대서 나옴
app.use(express.urlencoded({ extended: true }));

//use router
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
