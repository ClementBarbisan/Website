var express = require('express');
var app = express();
var fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.listen(4567, function() {
	console.log('server running on port 4567');
} )

app.get('/mobile', function(req, res)
{
    //res.send("On construction for mobile!")
    res.render('mobile');
});

app.get('/files', function(req, res)
{
    var files = fs.readdirSync('./public');
    res.send(files);
});

app.get('/',function(req, res)
{
	res.render('index');
});
