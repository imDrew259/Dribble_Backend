const express = require("express");
const http = require("http");
const cors = require("cors");
const { codeExecute } = require("./controllers/codeExecute");

const app = express();

app.use(cors());

app.use(express.json());

app.post("/execute", codeExecute);
http.createServer(app).listen(8080);
