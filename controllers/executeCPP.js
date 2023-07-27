const { log } = require("console");
const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const executeCPP = (req, res) => {
  console.log(req.body);
  const lang = req.body.lang;
  const input = req.body.input;

  fs.writeFile("index.txt", input, (err) => {
    if (err) res.json({ err });
    exec("docker run -d -it cpp:v1 /bin/bash")
      .then((containerRes) => {
        const id = containerRes.stdout.substring(0, 12);
        const dockerCommands = `
        docker cp index.cpp ${id}:/usr/src/app/test.cpp &&
        docker cp index.txt ${id}:/usr/src/app/input.txt &&
        docker exec ${id} bash -c "g++ test.cpp && ./a.out<input.txt"
        `;

        exec(
          `docker cp index.cpp ${id}:/usr/src/app/test.cpp && docker cp index.txt ${id}:/usr/src/app/input.txt && docker exec ${id} bash -c "g++ test.cpp && ./a.out<input.txt"`,
          { timeout: 10000, maxBuffer: 50000 }
        ).then((resp) => {
          console.log(resp);
          // exec(`del index.cpp && del $index.txt`).then((resp) =>
          //   console.log("Files removed")
          // );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
        });
      })
      .catch((err) => {
        res.json(err);
        exec(`rm index.cpp && rm index.txt`).then((resp) =>
          console.log("Files removed")
        );
        exec(`docker kill ${id}`).then((resp) =>
          console.log("Container Stopped")
        );
      });
  });
};

module.exports = executeCPP;
