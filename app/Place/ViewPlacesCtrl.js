'use strict';

angular
  .module('myApp')
  .controller('ViewPlacesCtrl', function ($scope, $location, $timeout, placeService) {

    $scope.places = "";
    placeService.getAllPlaces()
      .then(function (response) {
        $scope.places = response.data;
      });

    $scope.edit = function (id) {
      placeService.setId(id);
      placeService.setPlaces($scope.places);
    };

    $scope.add = function () {
      placeService.setPlaces($scope.places);
    };

    $scope.delete = function (id) {
      placeService.delete(id).then(function (response) {
        swal({
          title: "Тип успешно удален",
          text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
          confirmButtonText: "ОК",
          html: true
        }), function (isConfirm) {
          if (isConfirm) {
            $location.path('/places');
          }
        }
      });
    };

  });