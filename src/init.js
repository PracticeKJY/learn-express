import app from "./index";
import "./db";
import "./models/video";

const port = 4000;

const handleListening = () => {
  return console.log(`running http://localhost:${port}`);
};

app.listen(port, handleListening);
