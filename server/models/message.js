var mongoose = require('mongoose');
//create our friendSchema
var MsgSchema = new mongoose.Schema({
	user_name: String,
	msg: String,
	created_at: Date
});
mongoose.model('Messages', MsgSchema);