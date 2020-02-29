// Dependencies
// =============================================================
var express = require("express");

var path = require("path");

var fs = require('fs');



// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//  (DATA)
// =============================================================


// Pages routes -----------------------------------

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// API routes -----------------------------

// Displays all characters
app.get("/api/notes", function(req, res) {
    fs.readFile("./db.json", function(err, notetext){
        var notes = JSON.parse(notetext);
        return res.json(notes);
    })
    
  });

  app.post("/api/notes", function(req, res) {
    notes.push(req.body);
    res.json(notes);
  });
  

  // Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });

 
  