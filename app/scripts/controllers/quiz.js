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
  var difficultyLevel = 1

  function returnSearch() {
    $scope.hideThisBtn = true
    if (difficultyLevel === 1){
      $scope.loadingQuestions = true
    $http.get("https://opentdb.com/api.php?amount=10&category=" + $scope.category + "&difficulty=easy&type=").then(function(p) {
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
            $scope.loadingQuestions = false
           $scope.start = true
             $scope.showLevel = "Are you ready for level 1?"
        $scope.hidePlayBtn = true
        }else if (responseCode ===2 || responseCode === 1){
          messageDisplay = "No Questions available."
            $scope.loadingQuestions = false
       $scope.noResponse = true
        }
    });
  } else if (difficultyLevel === 2){
    $scope.loadingQuestions = true
    $http.get("https://opentdb.com/api.php?amount=10&category=" + $scope.category + "&difficulty=medium&type=").then(function(p) {
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
            $scope.loadingQuestions = false
           $scope.start = true
             $scope.showLevel = "Are you ready for level 2?"
        $scope.hidePlayBtn = true
        }else if (responseCode ===2 || responseCode === 1){
          messageDisplay = "No Questions available."
            $scope.loadingQuestions = false
       $scope.noResponse = true
        }
    });
  }else if (difficultyLevel === 3){
    $scope.loadingQuestions = true
    $http.get("https://opentdb.com/api.php?amount=10&category=" + $scope.category + "&difficulty=hard&type=").then(function(p) {
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
            $scope.loadingQuestions = false
           $scope.start = true
             $scope.showLevel = "Are you ready for the final level?"
        $scope.hidePlayBtn = true
        }else if (responseCode ===2 || responseCode === 1){
          messageDisplay = "No Questions available."
            $scope.loadingQuestions = false
       $scope.noResponse = true
        }
    });
  }

  }

  $scope.rightAnswer = function(){
    correct++;
    console.log(correct)
  }
  $scope.endGame = function(){
    if (correct > 2){
      if (difficultyLevel != 3){
        alert("Your score is " + correct + ". Get ready for the next level.")
        difficultyLevel++;
        returnSearch()
        $scope.open = false
        console.log("c = "+ correct + " dif = " + difficultyLevel)
           }else {
             alert("Congratulation you finished the game!.")
                    difficultyLevel = 1
                    correct = 0
                    $scope.hidePlayBtn = false
                    $scope.open = false
                    $scope.hideThisBtn = false
                    console.log("End the Game")
                    }
        correct = 0
      }else if (correct < 3){
        alert("Game over! \n Your score is " + correct)
        difficultyLevel = 1
        correct = 0
        $scope.hidePlayBtn = false
        $scope.open = false
        $scope.hideThisBtn = false
      }
    // alert(correct)
    // $scope.open = false
    // $scope.hidePlayBtn = false
    // correct = 0
    // console.log(correct)
  }
  $scope.checkQuestion = function(){
    returnSearch()
  }
  $scope.showQuestion = function(){
    $scope.open = true
  $scope.start = false
  }
  $scope.backToPlay = function(){
      $scope.hideThisBtn = false
      $scope.noResponse = false
  }
// $scope.answered = function(){
//   $scope.whenClick = true
// }
  // $scope.page = 'Other Page';
  // $scope.content = 'This is the content of the other page.'
});
