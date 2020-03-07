// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs');
var db = require("./db.json");
var id = 1;


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
//  (DATA)
// =============================================================


// Pages routes -----------------------------------

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./notes.html"));
});

// API routes -----------------------------

app.get("/api/notes", function (req, res) {
  res.json(db)
})

app.post("/api/notes", function (req, res) {
  req.body.id = id++;
  db.push(req.body);
  fs.writeFile("./db.json", JSON.stringify(db), function (err) {
    if (err) {
      console.log(err);
    }
  })
  res.json(db);
})

app.delete("/api/notes/:id", function (req, res) {
  var id = req.params.id;
  var myObject = { 'id': id };
  db.splice(db.indexOf(myObject), 1);
  fs.writeFile("./db.json", JSON.stringify(db), function (err) {
    if (err) {
      console.log(err);
    }
  })
  res.json(db)
})



  // Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });

 
  