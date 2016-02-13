myApp.factory('MessagesFactory', function($http)
{
	factory = {};
	factory.get_history = function(callback)
	{
		$http.get("/show_msg").success(function(output)
		{
			callback(output);
		});
	};
	return factory;
});
