var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.listen(4567, function() {
	console.log('server running on port 4567');
} )

app.get('/',function(req, res)
{
	res.render('index');
});
