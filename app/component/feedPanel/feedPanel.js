(function () {
    angular
        .module('app')
        .directive('feedPanel', feedPanel)

    function feedPanel() {
        return {
            restrict: 'EA',
            scope:    {
                feed: '='
            },
            replace:      true,
            templateUrl:  'feedPanel/feedPanel.html',
            controllerAs: 'vm',
            controller:   function navbarController($scope, $rootScope, Feed) {
                let vm = this

                // Function
                vm.feedit = feedit

                function feedit() {
                    $scope.feed.feeded = !$scope.feed.feeded
                    if ($scope.feed.feeded) {
                        Feed.save({
                            feedlink: $scope.feed.absurl
                        }, () => {
                            $rootScope.$broadcast('ADD_FEED', $scope.feed)
                            $scope.feed.feeded = true
                            $scope.feed.feedNum++
                        }, err => {
                            // TODO
                            console.log(err)
                        })
                    } else {
                        Feed.delete({
                            id: $scope.feed.feed_id
                        }, () => {
                            $rootScope.$broadcast('DELETE_FEED', $scope.feed)
                            $scope.feed.feeded = false
                            $scope.feed.feedNum--
                        }, err => {
                            // TODO
                            console.log(err)
                        })
                    }
                }
            }
        }
    }
}())
