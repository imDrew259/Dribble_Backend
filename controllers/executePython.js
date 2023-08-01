const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const executeJava = (req, res) => {
  console.log(req.body);
  const lang = req.body.lang;
  const input = req.body.input;
  let id = "";

  fs.writeFile("index.txt", input, (err) => {
    if (err) res.json({ err });
    exec("docker run -d -it python:v1 /bin/bash").then((containerRes) => {
      id = containerRes.stdout.substring(0, 12);

      exec(
        `docker cp index.py ${id}:/usr/src/app/test.py && docker cp index.txt ${id}:/usr/src/app/input.txt && docker exec ${id} bash -c "python3 test.py<input.txt"`,
        { timeout: 20000, maxBuffer: 50000 }
      )
        .then((resp) => {
          res.status(200).json({ output: resp });
          exec(`del index.py && del index.txt`).then((resp) =>
            console.log("Files removed")
          );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
        })
        .catch((err) => {
          exec(`del index.py && del index.txt`).then((resp) =>
            console.log("Files removed")
          );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
          res.status(500).json({ output: err });
        });
    });
  });
};

module.exports = executeJava;
