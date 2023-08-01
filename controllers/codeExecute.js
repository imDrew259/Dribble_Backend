const fs = require("fs");
const executeCPP = require("./executeCPP");
const executeJava = require("./executeJava");
const executePython = require("./executePython");

const codeExecute = (req, res, next) => {
  console.log("codeExecute", req.body);
  const code = req.body.code;
  let lang = req.body.lang;
  const input = req.body.input;
  if (lang === "Python") lang = "Py";

  fs.writeFile("index." + lang.toLowerCase(), code, (err) => {
    if (err) res.status(500).json({ err });
    if (lang == "CPP") {
      executeCPP(req, res);
    } else if (lang === "Java") {
      executeJava(req, res);
    } else if (lang === "Py") {
      executePython(req, res);
    }
  });
};

module.exports.codeExecute = codeExecute;
