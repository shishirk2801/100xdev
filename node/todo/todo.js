const express = require("express");
const app = express();
const fs = require("fs");

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("My Todo Application");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  fs.readFile("tasks.json", (error, data) => {
    if (error) {
      console.error(error);
      throw err;
    }
    const tasks = JSON.parse(data);
    res.send(tasks);
  });
});

// Add and update task
app.post("/add-task", (req, res) => {
  console.log(req.body);
  let data = req.body;
  try {
    // reading the JSON file
    const tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
    tasks[data["id"]] = data["task"];

    // updating the JSON file
    fs.writeFileSync("tasks.json", JSON.stringify(tasks));
    res.send(tasks);
  } catch (error) {
    // logging the error
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// delete tasks
// Add and update task
app.post("/delete", (req, res) => {
  console.log(req.body);
  let data = req.body;
  try {
    // reading the JSON file
    const tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
    if (tasks == {}) {
      res.status(200).send("No data to return");
    }
    delete tasks[data["id"]];
    console.log(tasks);
    // updating the JSON file
    fs.writeFileSync("tasks.json", JSON.stringify(tasks));
    res.send(tasks);
  } catch (error) {
    // logging the error
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
