require('dotenv').config(); //to set process.env variables in local environment
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");


const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser({extended: true}));


//Database config
const DATABASE = "crudapp";
const DATABASE_URL = process.env.DATABASE_URL

//Seed database with a few documents
const seedDB = function (callback) {
    MongoClient.connect(DATABASE_URL, function(err, client){
        assert.equal(err, null);

        const db = client.db(DATABASE);

        db.dropDatabase(function(err, result){
            assert.equal(null, err);
        })
        console.log("Seed Database Operation started")

        insertDocuments(db, function() {
            client.close();
            callback();
        })
    })
}

//insertMany documents into Database
const insertDocuments = function(db, callback) {
    const collection = db.collection('movies');

    collection.insertMany([
        {title: "Pulp Fiction", year: 1994, imdb: "tt0110912", poster:"https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR1,0,182,268_AL_.jpg"},
        {title: "The Lord of the Rings: The Return of the king", year: 2003, imdb: "tt0167260", poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg" },
        {title: "Fight Club", year: 1999, imdb: "tt0137523", poster: "https://m.media-amazon.com/images/M/MV5BNGM2NjQxZTAtMmU5My00YTk5LWFmOWMtYjZlYzk4YzMwNjFlXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg"},
        {title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, imdb: "tt0120737", poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX182_CR0,0,182,268_AL_.jpg"},
        {title: "The Matrix", year: 1999, imdb: "tt0133093", poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg"},
        {title: "Star Wars: Episode IV - A New Hope", year: 1977, imdb: "tt0076759", poster: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"},
        {title: "Interstellar", year: 2014, imdb: "tt0816692", poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"},
        {title: "Gladiator ", year: 2000, imdb: "tt0172495", poster: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg"},
        {title: "Braveheart ", year: 1995, imdb: "tt0112573", poster: "https://m.media-amazon.com/images/M/MV5BMzkzMmU0YTYtOWM3My00YzBmLWI0YzctOGYyNTkwMWE5MTJkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"},
        {title: "Star Wars: Episode VI - Return of the Jedi", year: 1983, imdb: "tt0086190", poster: "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"},
        {title: "Monty Python and the Holy Grail", year: 1975, imdb: "tt0071853", poster: "https://m.media-amazon.com/images/M/MV5BN2IyNTE4YzUtZWU0Mi00MGIwLTgyMmQtMzQ4YzQxYWNlYWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg"},
    ], function(err, result){
        assert.equal(err, null);
        console.log("Inserted " + result.ops.length + " documents into the collection")
        callback(result);
    });
}

//CREATE - Insert a document into the Database
const insertDoc = function (doc, callback) {
    MongoClient.connect(DATABASE_URL, function(err, client){
        assert.equal(err, null);

        const db = client.db(DATABASE);
        console.log("Insert Operation")

        const collection = db.collection('movies');

        collection.insert(doc, function(err, result){
            assert.equal(err, null);
            console.log("Inserted " + doc.title + " into database")
            client.close();
            callback();
        });
    })
}

//READ Database
const readDB = function (callback) {
    MongoClient.connect(DATABASE_URL, function(err, client){
        assert.equal(err, null);

        const db = client.db(DATABASE);
        console.log("Read Operation")

        const collection = db.collection('movies');
        collection.find({}).toArray(function(err, docs){
            assert.equal(err, null);
            console.log("Found " + docs.length + " documents")
            client.close();
            callback(docs)
        })
    })
}

//UPDATE DATABASE
const updateDB = function (data, callback) {
    MongoClient.connect(DATABASE_URL, function(err, client) {
        assert.equal(err, null);

        const db = client.db(DATABASE);
        console.log("Update Operation")

        const collection = db.collection('movies');
        collection.update(
            { _id: data.movieID },
            {
                title: data.title,
                year: data.year,
                imdb: data.imdb,
                poster: data.poster
            }
        );
        console.log(data);
        callback();
    })
}



//ROUTES
//=================

//GET ROUTES
app.get("/", function(req, res){
    res.render("home");
})

app.get("/create", function(req, res){
    res.render("create");
})

app.get("/read", function(req, res){
    readDB(function(docs) {
        res.render("read", {docs: docs});
    });
})

app.get("/update", function(req, res){
    res.render("update");
})

app.get("/delete", function(req, res){
    res.render("delete");
})

app.get("/reseed", function(req, res){
    seedDB(function(){
        res.render("reseed-success")
    });
})

//POST ROUTES
app.post("/create", function(req, res){
    var doc = {
        title : req.body.title,
        year : req.body.year,
        poster : req.body.poster
    }
    insertDoc(doc, function() {
        readDB(function(docs) {
            res.render("read", {docs: docs});
        });
    })
})


app.post("/update/:movieID", function(req, res) {
    var data = req.body
    updateDB(data, function() {
        res.render("update");
    })

})

//Start CRUDapp
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("App started on port " + process.env.PORT)
    console.log("Connected to database: " + process.env.DATABASE_URL)
})
