const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
 fs.readdir("./files", (err, files) => {
  res.render("index", { files: files });
 });
});
app.get("/file/:name", (req, res) => {
 fs.readFile(`./files/${req.params.name}`, "utf8", (err, data) => {
  res.render("show", { name: req.params.name, data: data });
 });
});
app.get("/edit/:name", (req, res) => {
 fs.readFile(`./files/${req.params.name}`, "utf8", (err, data) => {
  res.render("edit", { name: req.params.name, data: data });
 });
});

// fs.rename("./files/task1.txt", "./files/kart1.txt", (err) => {});

app.post("/edit", (req, res) => {
 fs.rename(`./files/${req.body.old}`, `./files/${req.body.new}.txt`, (err) => {
  console.log(req.body.new);
  console.log(req.body.old);
  res.redirect("/");
 });
});

app.post("/create", (req, res) => {
 fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err) => {});
});

app.listen(3000);
