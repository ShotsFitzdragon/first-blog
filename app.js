const express = require('express');
const fetch = require("node-fetch");
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
// express app
const app = express();

// listen for requests
app.listen(5000, () => {
  console.log("listening on port 5000");
});

// register view engine
//we need to define a view engine,  we will use EJS
//using app.set()
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  /*
  fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(data => generatePosts(data))
        .catch(e => console.log(e))
  
  var posts = [
    {userId: 0, id:0, title: 'Yoshi finds eggs', body: 'Lorem ipsum dolor sit amet consectetur'},
    {userId: 1, id:1, title: 'Mario finds stars', body: 'Lorem ipsum dolor sit amet consectetur'},
    {userId: 2, id:2, title: 'How to defeat bowser', body: 'Lorem ipsum dolor sit amet consectetur'},
    {userId: 6, id:4, title: 'Yoshi finds nothing', body: 'Lorem ipsum dolor works'}
  ];*/
  fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => generatePosts(data))
      .catch(e => console.log(e))
  /*generatePosts(posts);
  function checkPosts(data){
    console.log("Check")
    console.log(data)
    posts.push(data)
  }*/
  function generatePosts(data){
        var blogs = [];
        $.each(data, function(key, value){
            console.log(key)
            console.log(value)
            blogs.push(value)
        })
        res.render('index', { title: 'Home', blogs });
    }
    
  /*const blogs = [
    {title: 'Yoshi finds eggs', body: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', body: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', body: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });*/
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
