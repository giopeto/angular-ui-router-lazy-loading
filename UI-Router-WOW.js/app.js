// app.js
var ngApp = angular.module('ngApp', ['ui.router']);

ngApp.config(function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
    

	ngApp.lazy = {
		controller: $controllerProvider.register,
		directive: $compileProvider.directive,
		filter: $filterProvider.register,
		factory: $provide.factory,
		service: $provide.service
	};




    $urlRouterProvider.otherwise('/home');

    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
           
            views: {
            	'': { templateUrl: 'partial-home.html', },

            	'columnOne@home': { template: 'XXXXXXXXXXXXXXXXXXXXX' },
            	'columnTwo@home': { template: 'XXXXXXXXXXXXXXXXXXXXX' },

            }
        })
        
        // nested list with custom controller
	    .state('home.list', {
	        url: '/list',
	        templateUrl: 'partial-home-list.html',
	        controller: function($scope) {
	            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
	        }
	    })

	    // nested list with just some random string data
	    .state('home.paragraph', {
	        url: '/paragraph',
	        template: 'I could sure use a drink right now.'
	    })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
	        url: '/about',
	        views: {

	            // the main template will be placed here (relatively named)
	            '': { templateUrl: 'partial-about.html' },

	            // the child views will be defined here (absolutely named)
	            'columnOne@about': { template: 'Look I am a column!' },

	            // for column two, we'll define a separate controller 
	            'columnTwo@about': { 
	                templateUrl: 'table-data.html',
	                controller: 'scotchController',
	                //Lazy load controller
					resolve: {
						deps: function ($q, $rootScope) {
							var deferred = $q.defer();

							var dependencies = [
								'scotchController',
							];

							require(dependencies, function() {
								$rootScope.$apply(function() {
									deferred.resolve();
								});
							});

							return deferred.promise;
						}
					}
					//Lazy load controller END
	            }
        }
        
        });
        
});






