var express = require('express');
var router = express.Router();

var Bear = require('../models/bears');


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
			
			bear.name = req.body.name ? req.body.name : bear.name;//ternary conditional
			bear.age = req.body.age ? req.body.age : bear.age;//ternary conditional
			bear.gender = req.body.gender ? req.body.gender : bear.gender;//ternary conditional
			//bear.name = req.body.name || bear.name; is the same thing, shorter syntax
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

.delete(function(req, res){
	Bear.remove({_id: req.params.bear_id}, function(err, bear){
		if (err){
			console.log(err)
		} else {
			res.json({title:"bear deleted successfully"})
		}
	})
});

module.exports = router;
