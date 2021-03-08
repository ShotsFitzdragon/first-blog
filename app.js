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
  //Get posts from jsonplacholder and send them to index.ejs as blog array
  fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => generatePosts(data))
      .catch(e => console.log(e))
  
  function generatePosts(data){
        var blogs = [];
        $.each(data, function(key, value){
            console.log(key)
            console.log(value)
            blogs.push(value)
        })
        res.render('index', { title: 'Home', blogs });
    }
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
