'use strict';

/**
 * @ngdoc function
 * @name ngmaterialApp.controller:OtherCtrl
 * @description
 * # OtherCtrl
 * Controller of the ngmaterialApp
 */
angular.module('ngmaterialApp')
.controller('QuizCtrl', function($scope, $http) {
  var responseCode;
  var messageDisplay;
  var correct = 0;

  function returnSearch() {
  $http.get("https://opentdb.com/api.php?amount=10&category=" + $scope.category + "&difficulty=&type=").then(function(p) {
    var i = 0;
    console.log(p.data);

    responseCode = p.data.response_code
    let array = p.data.results;
    array.forEach(function(item) {
      item.question = item.question.replace(/\&.{4}\;/g, "'");
      item.question = item.question.replace(/\&.{5}\;/g, '"');
      item.question = item.question.replace(`&#039;/g`, '');
    });
    $scope.trivias = array;
    if (responseCode === 0){
        messageDisplay = "Ready?"
         $scope.start = true
      $scope.hidePlayBtn = true
      }else if (responseCode ===2 || responseCode === 1){
        messageDisplay = "No Questions available."
     $scope.noResponse = true
      }
  });

}

  $scope.rightAnswer = function(){
    correct++;
    console.log(correct)
  }
  $scope.endGame = function(){
    alert(correct)
    $scope.open = false
    $scope.hidePlayBtn = false
    correct = 0
    console.log(correct)
  }
  $scope.checkQuestion = function(){
    returnSearch()
  }
  $scope.showQuestion = function(){
    $scope.open = true
  $scope.start = false
  }
// $scope.answered = function(){
//   $scope.whenClick = true
// }
  // $scope.page = 'Other Page';
  // $scope.content = 'This is the content of the other page.'
});
