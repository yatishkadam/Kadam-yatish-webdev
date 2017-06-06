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
            .when('/user/:userId',{
                templateUrl:'views/users/profile.view.client.html',
                controller:'profileController',
                controllerAs:'model'
            })
            .when('/user/:userId/websites',{
                templateUrl:'views/websitePages/website-list.view.client.html',
                controller:'websiteListController',
                controllerAs:'model'
            })
            .when('/user/:userId/websites/new',{
                templateUrl:'views/websitePages/website-new.view.client.html',
                controller:'websiteNewController',
                controllerAs:'model'
            })
            .when('/user/:userId/websites/:websiteId',{
                templateUrl:'views/websitePages/website-edit.view.client.html',
                controller:'websiteEditController',
                controllerAs:'model'
            })
            .when('/user/:userId/websites/:websiteId/pages',{
                templateUrl:'views/pages/page-list.view.client.html',
                controller:'pageListController',
                controllerAs:'model'
            })
            .when('/user/:userId/websites/:websiteId/pages/new',{
                templateUrl:'views/pages/page-new.view.client.html',
                controller:'pageNewController',
                controllerAs:'model'
            })
            .when('/user/:userId/websites/:websiteId/pages/:pageId',{
                templateUrl:'views/pages/page-edit.view.client.html',
                controller:'pageEditController',
                controllerAs:'model'
            })
            .when('/user/:userId/websites/:websiteId/pages/:pageId/widget',{
                templateUrl:'views/widgets/widget-list.view.client.html',
                controller:'widgetListController',
                controllerAs:'model'
            })
            .when('/user/:userId/websites/:websiteId/pages/:pageId/widget/new',{
                templateUrl:'views/widgets/widget-chooser.view.client.html',
                controller:'widgetNewController',
                controllerAs:'model'
            })
            .when('/user/:userId/websites/:websiteId/pages/:pageId/widget/:widgetId',{
                templateUrl:'views/widgets/widget-edit.view.client.html',
                controller:'widgetEditController',
                controllerAs:'model'
            });
    }
})();