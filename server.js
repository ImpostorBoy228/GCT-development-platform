
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/generate", (req, res) => {
  const prompt = req.body.prompt;
  const python = spawn("python3", ["generate.py", prompt]);
  let output = "";

  python.stdout.on("data", (data) => (output += data.toString()));
  python.stderr.on("data", (data) => console.error(data.toString()));
  python.on("close", () => res.json({ code: output }));
});

app.listen(5000, () => console.log("Сервер запущен на порту 5000"));
