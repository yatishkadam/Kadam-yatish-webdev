(function () {
    angular
        .module("WAM")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login',{
                templateUrl:'views/users/login.view.client.html',
                controller:'loginController',
                controllerAs:'model'
            })
            .when('/register',{
                templateUrl:'views/users/register.view.client.html',
                controller:'registerController',
                controllerAs:'model'
            })
            .when('/profile',{
                templateUrl:'views/users/profile.view.client.html',
                controller:'profileController',
                controllerAs:'model',
                resolve: {
                    currentUser:checkLoggedIn
                }
            })
            .when('/websites',{
                templateUrl:'views/websitePages/website-list.view.client.html',
                controller:'websiteListController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/websites/new',{
                templateUrl:'views/websitePages/website-new.view.client.html',
                controller:'websiteNewController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/websites/:websiteId',{
                templateUrl:'views/websitePages/website-edit.view.client.html',
                controller:'websiteEditController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/websites/:websiteId/pages',{
                templateUrl:'views/pages/page-list.view.client.html',
                controller:'pageListController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/websites/:websiteId/pages/new',{
                templateUrl:'views/pages/page-new.view.client.html',
                controller:'pageNewController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/websites/:websiteId/pages/:pageId',{
                templateUrl:'views/pages/page-edit.view.client.html',
                controller:'pageEditController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/websites/:websiteId/pages/:pageId/widget',{
                templateUrl:'views/widgets/widget-list.view.client.html',
                controller:'widgetListController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/websites/:websiteId/pages/:pageId/widget/new',{
                templateUrl:'views/widgets/widget-chooser.view.client.html',
                controller:'widgetNewController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/websites/:websiteId/pages/:pageId/widget/:widgetId',{
                templateUrl:'views/widgets/widget-edit.view.client.html',
                controller:'widgetEditController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/websites/:websiteId/pages/:pageId/widget/:widgetId/search',{
            templateUrl:'views/widgets/widget-flickr-search.view.client.html',
            controller:'flickrImageSearchController',
            controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            });
    }
    
    
    function checkLoggedIn(userService,$q,$location) {
        var deferred=$q.defer();
        userService
            .loggedin()
            .then(function (user) {
                if (user==='0') {
                    deferred.reject();
                    $location.url('/login');
                }
                else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();