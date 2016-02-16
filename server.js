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
				console.log(err);
			} else {
				res.json(bear);
			}
		})
	})

.get(function(req, res){
	Bear.find(function(err, bears){
		if(err){
			console.log(err);
		} else {
			res.json(bears)
		}
	})
});

router.route('/bears/:bear_id')
.get(function(req, res){
	Bear.findById(req.params.bear_id, function(err, bear){
		if(err){
			console.log(err)
		} else {
			res.json(bear);
		}
	})
})

.put(function(req, res){
	Bear.findById(req.params.bear_id, function(err, bear){
		if(err){
			console.log(err)
		} else {
			bear.name = req.body.name ? req.body.name : bear.name;//sets the name
			bear.age = req.body.age ? req.body.age : bear.age;//sets the age
			bear.gender = req.body.gender ? req.body.gender : bear.gender;//sets the gender

			bear.save(function(err){
				if (err){
					console.log(err)
				} else {
					res.json({title: 'bear updated'});
				}
			})
		}
	})
})

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' +port);

