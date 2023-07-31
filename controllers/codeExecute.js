const fs = require("fs");
const executeCPP = require("./executeCPP");

const codeExecute = (req, res, next) => {
  console.log("codeExecute", req.body);
  const code = req.body.code;
  const lang = req.body.lang;
  const input = req.body.input;

  fs.writeFile("index." + lang.toLowerCase(), code, (err) => {
    if (err) res.status(500).json({ err });
    if (lang == "CPP") {
      executeCPP(req, res);
    }
  });
};

module.exports.codeExecute = codeExecute;
