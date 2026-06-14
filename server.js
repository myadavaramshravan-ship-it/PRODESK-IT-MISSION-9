const express = require("express");

const app = express();

app.use(express.json());

let Posts = [];

app.get("/", (req, res) => {
  res.send("Data Hub API Running...");
});

app.get("/posts", (req, res) => {
  res.json(Posts);
});

app.get("/posts/:id", (req, res) => {
  const post = Posts.find(
    (post) => post.id == req.params.id
  );

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.json(post);
});

app.post("/posts", (req, res) => {
  const newPost = {
    id: Date.now(),
    ...req.body,
  };

  Posts.push(newPost);

  res.status(201).json({
    message: "Post created",
    post: newPost,
  });
});

app.put("/posts/:id", (req, res) => {
  const index = Posts.findIndex(
    (post) => post.id == req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  Posts[index] = {
    ...Posts[index],
    ...req.body,
  };

  res.json({
    message: "Post updated",
    post: Posts[index],
  });
});

app.delete("/posts/:id", (req, res) => {
  Posts = Posts.filter(
    (post) => post.id != req.params.id
  );

  res.json({
    message: "Post deleted",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});