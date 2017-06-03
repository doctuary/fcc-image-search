var express = require('express');
const GoogleImages = require('google-images');

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = process.env.MONGOLAB_URI;

const searchClient = new GoogleImages('013847059286481252061:qhhqalqaddm', 'AIzaSyD8xxoiT4DP4l9KYnO7RK4LUQHtUbn4KOA');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.send('This is an image search abstraction layer. Add your search string after the domain (ex. .../my search string).');
});

app.get('/:search', function(req, res) {
    let searchValue = req.params.search;
    let page = req.query.offset ? req.query.offset : 1;
    searchClient.search(searchValue, {page: page})
	.then(function(images) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                return console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                let imageSearches = db.collection('imageSearches');
                let result = {
                    searchValue: searchValue,
                    searchResult: images
                }
                imageSearches.insert(result, function(){
                    db.close();
                    res.send(images);
                })
            }
        });
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port ', app.get('port'));
});