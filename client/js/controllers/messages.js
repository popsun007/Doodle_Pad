myApp.controller('MessageController', function($scope, MessagesFactory){
	$scope.addCustomer = function(){
		var customer_repack = { 
							name: $scope.new_customer.name,
							created_at: new Date() 
						  };
		CustomersFactory.create_customer(customer_repack, function(data){
			$scope.customers = data;
		})
	}

	
	$scope.limit = 4;
	MessagesFactory.get_history(function(data)
	{
		// console.log(data);
		$scope.messages = data;
	});


	$scope.showMore = function()
	{
		$scope.limit += 4;
		if($scope.messages.length < $scope.limit)
		{
			$scope.limit = $scope.messages.length;
		}
	}
});