const express = require("express");
const cors = require("cors");
const passport = require("passport");
const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtStrategy = require("./jwt-strategy")(knex);
const fileUpload = require("express-fileupload");
const fs = require("fs");
const bearerToken = require("express-bearer-token");
require("dotenv").config;

const port = 8080;

const app = express();
app.use(fileUpload());
app.use(
  cors({
    origin: process.env.frontend,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
jwtStrategy.initialize();

app.post("/auth/signup", async (req, res) => {
  const { email, password, name } = req.body;
  console.log(req.body);
  let query = await knex("users").where({ email }).first();
  console.log(query);
  if (query === undefined) {
    const hashed = await bcrypt.hash(password, 10);
    await knex("users").insert({ email, password: hashed, name });
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  let query = await knex("users").where({ email }).first();

  if (query) {
    let result = await bcrypt.compare(password, query.password);

    if (result) {
      const payload = {
        id: query.id,
        email: query.email,
      };
      const token = jwt.sign(payload, process.env.jwt_secret);
      console.log(token);
      console.log(payload);
      if (typeof window !== "undefined") {
        localStorage.setItem({ token });
      }
      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  }
});

// Posts Handling
app.get("/image/:name", (req, res) => {
  res.sendFile(__dirname + "/images/" + req.params.name);
});

// Getting all posts from the user
app.get("/api/posts", jwtStrategy.authenticate(), async (req, res) => {
  console.log("get user", req.user);
  let postList = await knex("users")
    .join("posts", "users.id", "=", "posts.user_id")
    .where("users.id", req.user.id)
    .select("users.name", "posts.id", "posts.img", "posts.caption");
  console.log("postList", postList);
  res.json(postList);
});

// Getting all posts from all users
app.get("/api/posts/home", async (req, res) => {
  let postList = await knex("users")
    .join("posts", "users.id", "=", "posts.user_id")
    .select("users.name", "posts.id", "posts.img", "posts.caption");
  console.log("postList", postList);
  res.json(postList);
});

// Posting a new post from the user to the database and saving the image to the server
app.post("/api/post", jwtStrategy.authenticate(), async (req, res) => {
  let query = await knex("posts")
    .insert({
      user_id: req.user.id,
      img: req.body.img_name,
      caption: req.body.caption,
    })
    .returning("img");
  res.json({ img: query[0].img });
});

app.post("/api/upload/:name", jwtStrategy.authenticate(), async (req, res) => {
  console.log("user", req.user);
  console.log("img name", req.params.name);
  fs.writeFileSync(
    __dirname + "/images/" + req.params.name,
    req.files.file.data
  );
  res.send("upload succeful");
});

//Delete a post from the database and the server
app.delete("/api/post/:id", jwtStrategy.authenticate(), async (req, res) => {
  const id = req.params.id;
  await knex("posts").del().where({ id });
  res.json("post deleted");
});

//Saving posts into the DB
app.post("/api/save/:id", jwtStrategy.authenticate(), async (req, res) => {
  const id = req.params.id;
  const user_id = req.user.id;
  await knex("saved").insert({ post_id: id, user_id });
  res.json("saved");
});

//Getting all saved posts from the user
app.get("/api/saved", jwtStrategy.authenticate(), async (req, res) => {
  const user_id = req.user.id;
  let savedList = await knex("saved")
    .join("posts", "saved.post_id", "=", "posts.id")
    .join("users", "posts.user_id", "=", "users.id")
    .where("saved.user_id", user_id)
    .select("users.name", "posts.id", "posts.img", "posts.caption");
  res.json(savedList);
});

//Deleting a saved post from the DB
app.delete("/api/saved/:id", jwtStrategy.authenticate(), async (req, res) => {
  const id = req.params.id;
  const user_id = req.user.id;
  await knex("saved").del().where({ post_id: id, user_id });
  res.json("saved post deleted");
});

app.listen(port, () => console.log(`Listening to port ${port}`));
