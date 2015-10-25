// add models into controller, need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var Doodle = mongoose.model('Doodle');
var Messages = mongoose.model('Messages');

var doodlesController = {};

doodlesController.show_all = function(req, res) {
	Doodle.find({}, function(err, results) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.json(results);
			// res.redirect('/partials/doodle');
		}
	})
}

doodlesController.save_message = function(data) 
{
	var new_msg = new Messages({
		user_name: data.name,
		msg: data.msg,
		created_at: data.created_at
	});
	new_msg.save({}, function(err,data)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log("Successfully save a message!!!");
		}
	});
}
doodlesController.show_msg = function(req, res)
{
	Messages.find({}, function(err, res_data)
	{
		// console.log(res_data);
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.json(res_data);
		}
	})
}



module.exports = doodlesController;