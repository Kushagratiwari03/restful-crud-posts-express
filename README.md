#  REST API Learning Project (Express + EJS)

## 📌 Project Overview

This project is a **REST-style CRUD application** built using **Node.js, Express, EJS**, and supporting middleware. The main goal of this project is to understand **REST APIs**, **HTTP methods**, **routing**, and **server-side rendering** with practical hands-on experience.

I have created a simple **Posts application (similar to Quora posts)** where users can:

* View all posts
* Create a new post
* View a single post in detail
* Edit an existing post
* Delete a post

All data is currently stored **in-memory** using an array (no database)

---

## 🧠 Concepts & Learnings Covered

### 1️⃣ Express Server Setup

* Used `express` to create a server
* Configured server to listen on **port 8080**
* Used `express.urlencoded({ extended: true })` to parse form data

```js
const express = require("express");
const app = express();
const port = 8080;
```

---

### 2️⃣ View Engine (EJS)

* Configured **EJS** as the templating engine
* Used dynamic rendering for posts
* Passed data from backend to frontend

```js
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
```

📁 Views Used:

* `index.ejs` → Show all posts
* `show.ejs` → Show single post
* `new.ejs` → Create new post
* `edit.ejs` → Edit post

---

### 3️⃣ Static Files (CSS)

* Served static files using `express.static`

```js
app.use(express.static(path.join(__dirname, "public")));
```

📁 Folder: `public/style.css`

---

### 4️⃣ Posts Data Structure (In-Memory)

Posts are stored in an array of objects:

```js
let posts = [
  {
    id: uuidv4(),
    username: "kushagra",
    content: "Learning Web Development",
  },
];
```

⚠️ **Note:** Data resets when server restarts (no database used).

---

### 5️⃣ UUID for Unique IDs

* Used `uuid` package to generate **random unique IDs** for posts

```js
const { v4: uuidv4 } = require("uuid");
```

This avoids ID conflicts and simulates database-like behavior.

---

### 6️⃣ RESTful Routes Implemented

| HTTP Method | Route           | Description             |
| ----------- | --------------- | ----------------------- |
| GET         | /posts          | Show all posts          |
| GET         | /posts/new      | Form to create new post |
| POST        | /posts          | Create new post         |
| GET         | /posts/:id      | View post details       |
| GET         | /posts/:id/edit | Edit post form          |
| PATCH       | /posts/:id      | Update post             |
| DELETE      | /posts/:id      | Delete post             |

---

### 7️⃣ Method Override (PATCH & DELETE)

HTML forms support only **GET & POST**, so you used `method-override` to enable:

* PATCH
* DELETE

```js
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
```

Example usage in EJS:

```html
<form method="post" action="/posts/<%= post.id %>?_method=PATCH">
```

---

### 8️⃣ Update Post (PATCH)

* Extracted `id` from `req.params`
* Updated content using PATCH request

```js
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});
```

---

### 9️⃣ Delete Post (DELETE)

* Filtered out the post using its ID

```js
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
```

---

### 🔟 EJS Templating Concepts Used

* `<%= %>` → Output value
* `<% %>` → Logic (loops)

Example:

```ejs
<% for(post of posts) { %>
  <h3><%= post.username %></h3>
  <p><%= post.content %></p>
<% } %>
```

---

## ▶ How to Run Project

```bash
npm install
node index.js
```

Open browser:

```
http://localhost:8080/posts
```

---

## 📦 Packages Used

* express
* ejs
* uuid
* method-override

---

## 👨‍💻 Author
Kushagra Tiwari
<br>
CSE Student🚀
