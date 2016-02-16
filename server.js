var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Bear = require('./models/bears');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();


router.use(function(req, res, next){//adds middleware
	console.log('something is happening!');
	next();//making sure it keeps going and doesnt stop here
});

router.get('/', function(req, res){
	res.json({ message: 'Hoorayyayay! welcome to my API!' });
});

router.route('/bears')//.post()=>basically the same except now were chaining
	.post(function(req, res){

		var bear = new Bear();//create a new instance of a bear
		
		bear.name = req.body.name;//sets the name
		bear.age = req.body.age;//sets the age
		bear.gender = req.body.gender;//sets the gender

		bear.save(function(err, bear){
			if(err){
				console.log(ERROR);
			} else {
				res.json(bear);
			}
		})
	})
	.get(function(req, res){
		res.json({title:"blaaaaa"})
	});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' +port);

