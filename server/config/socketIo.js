var doodlesController = require('./../controllers/doodles.js');
module.exports = function(io)
{
    var users = [];
	io.on('connection', function(socket){
	  	console.log('a user connected');
	  	// If you don't know where this code is supposed to go reread the above info 
		socket.on("drawling_req", function (data){
		    // console.log(data);
		    socket.broadcast.emit("drawling_response", data);
		    // socket.emit('server_response', {response: "sockets are the best!"});
		})	


	//******************message board************************
		socket.on("send_msg", function(data)
		{
			doodlesController.save_message(data);
			io.emit("get_msg", data);
		});

		//user login;
	    socket.on('login', function(nickname) {
	        if (users.indexOf(nickname) > -1) {
	            socket.emit('nickExisted');
	        } else {
	            socket.userIndex = users.length;
	            socket.nickname = nickname;
	            users.push(nickname);
	            socket.emit('loginSuccess');
	            io.sockets.emit('system', nickname, users.length, 'login');
	        };
	    });

	    //user leaves
	    socket.on('disconnect', function() {
	        users.splice(socket.userIndex, 1);
	        socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
	    });

	    //new image get
	    socket.on('img', function(imgData, color) {
	        socket.broadcast.emit('newImg', socket.nickname, imgData, color);
	    });
	});

}