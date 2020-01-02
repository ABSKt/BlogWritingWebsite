//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "There are many reasons to start a blog for personal use and only a handful of strong ones for business blogging. Blogging for business, projects, or anything else that might bring you money has a very straightforward purpose – to rank your website higher in Google SERPs, a.k.a. increase your visibility.As a business, you rely on consumers to keep buying your products and services. As a new business, you rely on blogging to help you get to these consumers and grab their attention. Without blogging, your website would remain invisible, whereas running a blog makes you searchable and competitive.";
const aboutContent = "The more frequent and better your blog posts are, the higher the chances for your website to get discovered and visited by your target audience. Which means, a blog is an effective lead generation tool. Add a great call to action (CTA), and it will convert your website traffic into high-quality leads. But a blog also allows you to showcase your authority and build a brand.";
const contactContent="When you use your niche knowledge for creating informative and engaging posts, it builds trust with your audience. Great blogging makes your business looks more credible, which is especially important if your brand is still young and fairly unknown. It ensures presence and authority at the same time.";
const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts= [];

app.get("/",function(req,res){
  res.render("home", {startingContent:homeStartingContent , startingContacs:contactContent , startingAbout:aboutContent ,posts:posts});
});
app.get("/about",function(req,res){
  res.render("about", {startingContent:homeStartingContent , startingContacs:contactContent , startingAbout:aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact", {startingContent:homeStartingContent , startingContacs:contactContent , startingAbout:aboutContent});
});
app.get("/compose",function(req,res){
  res.render("compose", {});
});
app.get("/posts/:postName",function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName) ;
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if(storedTitle===requestedTitle){
      res.render("post",{title:post.title ,content:post.content})
    }
  });
});

app.post("/compose",function(req,res){
  const post = {
    title:req.body.postTitle,
    content:req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
