var app = angular.module('myApp', ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'view/login.html',
		})
		.when('/home', {
			templateUrl: 'view/home.html',
			controller: 'homeCtrl'
		})
		.when('/aboutme', {
			templateUrl: 'view/aboutme.html',
			controller: 'aboutmeCtrl'
		})
		.when('/details',{
			templateUrl: 'view/details.html',
			controller: 'detailsCtrl'
		})

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	})
})

//========================================================HOME CONTROLLER========================================================//
app.controller('homeCtrl', ['$scope', function ($scope) {
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
		data = JSON.parse(resp).results;
		localStorage.setItem('MovieDB', JSON.stringify(data));

		//========================================================MAKE ELEMENT OF MOVIES========================================================//
		for(let idx=0;idx<data.length;idx++){
			let singleRow = $('#home').children('div');

			let mid = document.createElement('div')
			$(mid).addClass('col-sm-6 bottom-30')
			$(singleRow).append(mid)
	
			let card = document.createElement('div')
			$(card).addClass('card')
			$(mid).append(card)
	
			let cardBody = document.createElement('div')
			$(cardBody).addClass('card-body')
			$(card).append(cardBody)
	
			let image = document.createElement('img')
			$(image).addClass('col-4 home-img')
			image.src = 'https://image.tmdb.org/t/p/w500/' + data[idx].poster_path
	
			let info = document.createElement('div')
			$(info).addClass('info col-8')
			$(cardBody).append(image)
			$(cardBody).append(info)
	
			let clears = document.createElement('div')
			$(clears).addClass('col-12 clear-pad')
			$(info).append(clears)
			
			let bottom30 = document.createElement('div')
			$(bottom30).addClass('bottom-30')
			$(clears).append(bottom30)

			let title = document.createElement('h4')
			title.innerHTML = data[idx].title
			let spans = document.createElement('span')
			release_date = moment(data[idx].release_date).format('MMMM D, YYYY')
			spans.innerHTML = release_date
			$(bottom30).append(title)
			$(bottom30).append(spans)
	
			let overview = document.createElement('div')
			let para = document.createElement('p')
			$(para).addClass('overview')
			para.innerHTML = data[idx].overview
			$(overview).append(para)
			$(clears).append(overview)

	
			let footerDetails = document.createElement('div')
			$(footerDetails).addClass('card-footer home-footer')
			$(clears).append(footerDetails)
	
			let parabtnDetail = document.createElement('p')
			$(parabtnDetail).addClass('bottom-0')
			$(footerDetails).append(parabtnDetail)
	
			let detailIcon = document.createElement('i')
			$(detailIcon).addClass('fa fa-film')
			let linkDetail = document.createElement('a')
			linkDetail.href = '/details'
			linkDetail.innerHTML = ' Details'
			$(linkDetail).addClass('hidden-sm')
			$(parabtnDetail).append(detailIcon)
			$(parabtnDetail).append(linkDetail)
		}
	});
}])

//========================================================ABOUT ME CONTROLLER========================================================//
app.controller('aboutmeCtrl', ['$scope', function ($scope) {

}])

//========================================================HOME CONTROLLER========================================================//
app.controller('myController', function ($scope, $location, $rootScope) {
	$scope.user = { 'username': '', 'password': '' };
	//----- Users json

	$scope.showError = false; // set Error flag
	$scope.showSuccess = false; // set Success Flag

	var validUsers = { 'username': 'user', 'password': 'userpti' };
	localStorage.setItem('UserID', JSON.stringify(validUsers));

	$scope.authenticate = function () {
		var flag = false;
		localStorage.setItem('flagLocal', JSON.stringify(flag));

		for (var i in validUsers) { // loop on users array
			if ($scope.user.username == JSON.parse(localStorage.getItem('UserID')).username && $scope.user.password == JSON.parse(localStorage.getItem('UserID')).password) {
				$location.path('/home')
				flag = true;
				localStorage.setItem('flagLocal', JSON.stringify(flag));
				$rootScope.loggedIn = true;
				break;
			}
			else {
				console.log('loggedOut');
				flag = false;
				localStorage.setItem('flagLocal', JSON.stringify(flag));
				break;
			}
		}

		//-------- set error or success flags
		if (JSON.parse(localStorage.getItem('flagLocal'))) {
			$scope.showError = false;
			$scope.showSuccess = true;
		}
		else {
			$scope.showError = true;
			$scope.showSuccess = false;
		}
	}

	$scope.logout = function () {
		$rootScope.loggedIn = false
		alert('Log Out Success')
		$location.path('/')
	}

});

//========================================================DETAIL CONTROLLER========================================================//
app.controller('detailsCtrl',function($scope){
	var movieDB = localStorage.getItem('MovieDB');
	console.log(JSON.parse(movieDB))
})