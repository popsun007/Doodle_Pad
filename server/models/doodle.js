// This is the friend.js file located at /server/models/friend.js
// We want to create a file that has the schema for our friends 
// and creates a model that we can then call upon in our controller

var mongoose = require('mongoose');
//create our friendSchema
var DoodleSchema = new mongoose.Schema({
	offsetX: Number,
	offsetY: Number,
	color: String
});

// FriendSchema.path('name').required(true, 'User name cannot be blank');

// use the schema to create the model
// Note that creating a model CREATES the collection in the database 
// (makes the collection plural)
mongoose.model('Doodle', DoodleSchema);
// notice that we aren't expporting anything -- this is because this file will be run
// when we require it using our config file and then since the model is defined,
// we'll be able to access if rom our controller