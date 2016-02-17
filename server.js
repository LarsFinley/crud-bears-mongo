var express = require('express');//express is a JavaScript specific language
var app = express();
var bodyParser = require('body-parser');
var Bear = require('./models/bears');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');//has to be above the app.get

app.get('/', function(req, res){//homepage connection
	res.render('index',{title:"hello world"})
});

app.get('/about', function(req, res){//about page connection
	res.render('about',{title:"About"})
});


var port = process.env.PORT || 8080;

var router = express.Router();

var bearRouter = require('./routes/bears');//connects to bears.js

router.use(function(req, res, next){//adds middleware
	console.log('something is happening!');
	next();//making sure it keeps going and doesnt stop here
});

router.get('/', function(req, res){
	res.json({ message: 'Hooray! welcome to my API!' });
});




app.use('/api', bearRouter);

app.listen(port);
console.log('Magic happens on port ' +port);

