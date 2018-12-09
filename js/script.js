var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider,$locationProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'view/login.html',
	})
	.when('/home',{
		templateUrl: 'view/home.html',
		controller: 'homeCtrl'
	})
	.when('/aboutme',{
		templateUrl: 'view/aboutme.html',
		controller: 'aboutmeCtrl'
	})

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	})
})

app.controller('homeCtrl', ['$scope', function($scope){
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=0ef9f010abd55b80f8d07f2cf200ea9a",
		"method": "GET",
		"headers": {},
		"data": "{}"
	}
	
	$.ajax(settings).done(function (response) {
		console.log(response);
		resp = JSON.stringify(response);
		console.log(JSON.parse(resp).results)
	});


	// MAKE ELEMENT OF MOVIES
	let singleRow = $('#home').children('div');
		
	singleRow.append(data);
	
}])

app.controller('aboutmeCtrl', ['$scope', function($scope){
	
}])

app.controller('myController', function($scope,$location,$rootScope){
	$scope.user={'username':'','password':''};
	//----- Users json
	
	$scope.showError = false; // set Error flag
	$scope.showSuccess = false; // set Success Flag

	var validUsers= {'username':'user', 'password':'userpti'};
	localStorage.setItem('UserID', JSON.stringify(validUsers));

	//------------ini untuk mengambil item UserID-----------------//
	// var retrievedUser = JSON.parse(localStorage.getItem('UserID'));
	// console.log(retrievedUser);
	

	// ------- Authenticate function
	$scope.authenticate = function (){
		var flag= false;
		localStorage.setItem('flagLocal',JSON.stringify(flag));
		
		for(var i in validUsers){ // loop on users array
			if($scope.user.username == JSON.parse(localStorage.getItem('UserID')).username && $scope.user.password == JSON.parse(localStorage.getItem('UserID')).password){
				$location.path('/home')
				flag = true;
				localStorage.setItem('flagLocal',JSON.stringify(flag));
				$rootScope.loggedIn = true;
				console.log('loggedIn');
				break;
			}
			else{
				console.log('loggedOut');
				flag = false;
				localStorage.setItem('flagLocal',JSON.stringify(flag));
				break;
			}				
		}

		//-------- set error or success flags
		if(JSON.parse(localStorage.getItem('flagLocal'))){
			$scope.showError = false;
			$scope.showSuccess = true;
		}
		else{
			$scope.showError = true;
			$scope.showSuccess = false;
		}
	}

	$scope.logout = function(){
		$rootScope.loggedIn= false
		alert('Log Out Success')
		$location.path('/')		
	}

});