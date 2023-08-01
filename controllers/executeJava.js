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
    exec("docker run -d -it java:v1 /bin/bash").then((containerRes) => {
      id = containerRes.stdout.substring(0, 12);

      exec(
        `docker cp index.java ${id}:/usr/src/app/test.java && docker cp index.txt ${id}:/usr/src/app/input.txt && docker exec ${id} bash -c "javac test.java && java test<input.txt"`,
        { timeout: 15000, maxBuffer: 50000 }
      )
        .then((resp) => {
          res.status(200).json({ output: resp });
          exec(`del index.java && del index.txt`).then((resp) =>
            console.log("Files removed")
          );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
        })
        .catch((err) => {
          exec(`del index.java && del index.txt`).then((resp) =>
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
