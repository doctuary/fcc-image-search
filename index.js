var express = require('express');
const GoogleImages = require('google-images');

const searchClient = new GoogleImages('013847059286481252061:qhhqalqaddm', 'AIzaSyD8xxoiT4DP4l9KYnO7RK4LUQHtUbn4KOA');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.send('This is an image search abstraction layer. Add your search string after the domain (ex. .../my search string).');
});

app.get('/:search', function(req, res) {
    searchClient.search(req.params.search)
	.then(function(images) {res.send(images)});
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port ', app.get('port'));
});