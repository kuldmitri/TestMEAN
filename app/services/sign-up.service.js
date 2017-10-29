angular
  .module("myApp")
  .factory("signUpService", signUpService);

signUpService.$inject = ['$http'];

function signUpService($http) {

  const service = {
    signup: signup
  };

  return service;

  function signup(data) {
    return $http.post("/api/v1/auth/signup", data);
  }

}