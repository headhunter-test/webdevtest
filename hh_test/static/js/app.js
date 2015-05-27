app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ui.router']);

app.config(function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
});

app.config(function($stateProvider, $urlRouterProvider){


    //$urlRouterProvider.otherwise("/");

    $stateProvider
        .state('task', {
            url: "/",
            templateUrl: "/static/partials/task.html"
        })

        .state('user', {
            url: '/user',
            templateUrl: "static/partials/users.html",
            controller: ['$scope', '$http',
                function( $scope,   $http) {
                    $scope.users = [];
                    $http.get('/api/v1/user/').success(function(data) {
                        $scope.users = data.objects;
                    }).error(function(data, status, headers, config) {
                        if(status=401){
                            window.location = '/admin'
                        }
                    })
                }
            ]
        })

        .state('user.view', {
            url: '/:userId',
            views: {
                '': {
                    templateUrl: "static/partials/users.view.html",
                    controller: ['$scope', '$http', '$stateParams',
                        function( $scope,   $http,   $stateParams) {

//                    $scope.users = [];
//                    $http.get('/api/v1/user/').success(function(data) {
//                        $scope.users = data.objects;
//                    })

                            $scope.selectedUser = {};
                            $http.get('/api/v1/user/'+$stateParams.userId+'/').success(function(data) {
                                $scope.selectedUser = data;
                            }).error(function(data, status, headers, config) {
                            if(status=401){
                                window.location = '/admin'
                            }
                    })
                        }
                    ]
                }
            }
        })


        .state('auto_model', {
            url: '/auto_model',
            templateUrl: "static/partials/auto_models.html",
            controller: ['$scope', '$http',
                function( $scope,   $http) {
                    $scope.auto_models = [];
                    $http.get('/api/v1/auto_model/').success(function(data) {
                        $scope.auto_models = data.objects;
                    }).error(function(data, status, headers, config) {
                        if(status=401){
                            window.location = '/admin'
                        }
                    })
                }
            ]
        })


        .state('auto_model.add', {
            url: '/auto_model_add',
            templateUrl: "static/partials/auto_models.add.html",
            controller: ['$scope', '$http', '$stateParams',
            function( $scope,   $http,   $stateParams) {
                $scope.model = {};
                $scope.submit = function() {
                    $http.post('/api/v1/auto_model/', $scope.model)
                    .success(function (data) {
                        console.log('data:', data);
                    })
                    .error(function (data) {
                        console.log('Error:', data);
                    });
                };
            }]
        })

        .state('auto_model.view', {
            url: '/:car_modelId',
            templateUrl: "static/partials/auto_models.edit.html",
            controller: ['$scope', '$http', '$stateParams',
                function( $scope,   $http,   $stateParams) {

                    $scope.selectedModel = {};
                    $http.get('/api/v1/auto_model/'+$stateParams.car_modelId+'/').success(function(data) {
                        $scope.selected_model = data;
                        $scope.old_model_name = data.name
                    }).error(function(data, status, headers, config) {
                        if(status=401){
                            window.location = '/admin'
                        }
                    })

                    $scope.edit = function() {
                      $http.post('/api/v1/auto_model/', $scope.selected_model)
                        .success(function (data) {
                          console.log('data:', data);
                        })
                        .error(function (data) {
                          console.log('Error:', data);
                        });
                    };

                    $scope.delete = function() {
                      $http.delete('/api/v1/auto_model/' + $scope.selected_model.id + '/')
                        .success(function (data) {
                          console.log('data:', data);
                        })
                        .error(function (data) {
                          console.log('Error:', data);
                        });
                    };
                }
            ]
        })
});


app.run(['$rootScope', function($rootScope) {

}]);
