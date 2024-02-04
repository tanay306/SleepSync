const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();
const connectDB = require("./config/db.js");
const cors = require("cors");
app.use(express.json());

dotenv.config();

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ credentials: true }));
app.use(cors());


let server = require("http").Server(app);
let path = require("path");
let favicon = require("serve-favicon");

app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});



const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

module.exports = {
  server,
};
