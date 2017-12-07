var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
var fs = require('fs');

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views', 'views');




app.get('/main',function(req,res){
	res.render('main');
});


app.listen(4100,function(){
	console.log('page is open');
});
