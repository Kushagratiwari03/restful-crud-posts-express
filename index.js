// Setting express 
const express = require("express");
const app = express();
const port = 8080;
// Using UUID Package
const { v4: uuidv4} = require("uuid");
// Using methodOverride package
const methodOverride = require("method-override");

// Import required modules
const path = require("path");

// Middleware setup
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride("_method"));

// View engine and template configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static file serving
app.use(express.static(path.join(__dirname, "public")));

// Posts data
let posts = [
    {
        id: uuidv4(),
        username: "kushagra",
        content: "Learning Web Development",
    },
    {
        id: uuidv4(),
        username: "nikhil",
        content: "Learning Python",
    },
    {
        id: uuidv4(),
        username: "vivek",
        content: "Learning Communication Skill",
    },
    {
        id: uuidv4(), 
        username: "umashankar",
        content: "Learning JavaScript",
    },
]

// Routes
app.get("/posts", (req, res) => {
   res.render("index.ejs", { posts });
})

// To get new data for posts
app.get("/posts/new", (req, res) => {
   res.render("new.ejs");
})

// To post the new data into posts
app.post("/posts", (req, res) => {
   let { username, content } = req.body;
   let id = uuidv4();
   posts.push({ id, username, content });
   res.redirect("/posts");
})

// To get the ids of post
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
})

// Integrating update feature using patch request
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

// Integrating Edit feature in the posts
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})

// Integrating Delete feature to delete any post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("Listening to port : 8080");
})
