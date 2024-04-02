const express = require("express");
const app = express();
const tinyurl = require('tinyurl');
const path = require("path"); // Require the path module

const PORT = process.env.PORT || 4000;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Serve static files from the 'public' directory
app.use(express.static('public'));

app.post('/', (req, res) => {
  const longUrl = req.body.url; // Assuming the POST request contains a JSON body with a 'url' field
  tinyurl.shorten(longUrl, function(shortUrl) {
    res.render("input", {msg: shortUrl})
  });
});

app.get('/',(req, res)=>{
  res.render("input", {msg: null})
})

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
