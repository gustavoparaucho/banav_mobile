angular.module('starter.controllers', [])

.controller('DashCtrl', ['$http', '$scope', '$window', '$cordovaDatePicker','$ionicLoading', '$ionicPopup',
  function($http,$scope, $window, $cordovaDatePicker,$ionicLoading, $ionicPopup) {


   $scope.init = function(){

   		$scope.datarel = new Date();

   		/*s$http.get('http://192.168.0.40:3000/navio').success(function(data) {
   			$scope.resumo2 = data;
  		});

  		$http.get('http://192.168.0.40:3000/classe').success(function(data) {
   			$scope.classes = data;
  		});
   		$http.get('http://192.168.0.40:3000/porto').success(function(data) {
   			$scope.portos = data;
  		}); 

  		$http.get('http://192.168.0.40:3000/navio_classe').success(function(data) {
   			$scope.navio_classe = data;
  		}); */

  		$scope.funcaorelatorio($scope.datarel, false);		


  		
  		//$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        //$scope.data = [300, 500, 100];
   };
   	$scope.funcaorelatorio = function(_dataRel, _mensal){
      
      $ionicLoading.show({
        template: 'Carregando...'
      });
   		$scope.datarel = _dataRel;
      var _url = 'http://173.230.137.47:3000/';
   		var _dataFormatada = $scope.datarel.getUTCFullYear() + '-' +
   		 ("0" + ($scope.datarel.getMonth() + 1)).slice(-2); 

      if(_mensal == true){
        
        _url = _url + 'relatoriomensal/';
      }
      else{
        _dataFormatada = _dataFormatada + '-' + ("0" + $scope.datarel.getDate()).slice(-2);
        _url = _url + 'relatorio/';
      } 


   		 
   	  	$http.get(_url + _dataFormatada).success(function(data) {
   			$scope.relatorio = data;
   			
   			$scope.data = [];
   			$scope.type = 'PolarArea';
        $scope.legenda = 'true';
        $scope.hide = false;
        if($scope.relatorio[0].sum !== null){
          $scope.labels = [];
     			for(var key in $scope.relatorio){
     				var obj = $scope.relatorio[key];
     				if(obj.nome !== 'Total' ){
  	   				$scope.labels.push(obj.nome);
  	   				$scope.data.push(obj.sum);
     				}
     			}
        }
        else{
        $scope.relatorio = [];
        $scope.labels = {};
        $scope.data = [{}];
        //$scope.type = '';
        $scope.hide = true;
        $scope.legenda = 'false';
        }
        $ionicLoading.hide();
  		}).
      error(function(data, status, headers, config) { 
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Erro no aplicativo',
          template: 'Entre em contato com o administrador do sistema'
        });
      });
   };


   $scope.testar = function(){
   		  var options = {
		    date: $scope.datarel,
		    mode: 'date'// or 'time'
		    //minDate: new Date() - 10000,
		    //allowOldDates: true,
		    //allowFutureDates: false,
		    //doneButtonLabel: 'DONE',
		    //doneButtonColor: '#F2F3F4',
		    //cancelButtonLabel: 'CANCEL',
		    //cancelButtonColor: '#000000'
  		};


  		//alert('teste');
	    $cordovaDatePicker.show(options).then(function(_date){
			$scope.funcaorelatorio(_date);
		});
   };



}])

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
