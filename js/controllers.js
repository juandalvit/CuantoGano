angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HierarchiesCtrl', function($scope, $cordovaSQLite) {

		
		$scope.hierarchies = [];


        var query = "SELECT Hierarchies.hierarchyId, Hierarchies.name FROM Hierarchies WHERE Hierarchies.status = 'ACTIVE'";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
				for(var i=0;i<res.rows.length;i++){
					$scope.hierarchies.push({name: res.rows.item(i).name, hierarchyId: res.rows.item(i).hierarchyId});
				}                 
               
                //alert("SELECTED 0-> ID: "+ res.rows.item(0).hierarchyId +" -> "+ res.rows.item(0).name);
				//alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");
				alert("No results found");         
            }
            
            
        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));            
        });

})




.controller('AreasCtrl', function($scope, $stateParams, $cordovaSQLite) {


		$scope.areas = [];


        var query = "SELECT Areas.areaId, Areas.name FROM Areas INNER JOIN PositionsRel ON Areas.areaId = PositionsRel.areaId WHERE Areas.status = 'ACTIVE' AND PositionsRel.hierarchyId = ? GROUP BY Areas.areaId";
        $cordovaSQLite.execute(db, query, [$stateParams.hierarchyId]).then(function(res) {
            if(res.rows.length > 0) {
				for(var i=0;i<res.rows.length;i++){
					$scope.areas.push({name: res.rows.item(i).name, areaId: res.rows.item(i).areaId});
				}                 
               
                //alert("SELECTED 0-> ID: "+ res.rows.item(0).hierarchyId +" -> "+ res.rows.item(0).name);
				//alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");
				alert("No results found");         
            }
            
            
        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));            
        });


})

.controller('SenioritiesCtrl', function($scope, $stateParams, $cordovaSQLite) {


		$scope.seniorities = [];


        var query = "SELECT Areas.areaId, Areas.name FROM Areas INNER JOIN PositionsRel ON Areas.areaId = PositionsRel.areaId WHERE Areas.status = 'ACTIVE' AND PositionsRel.hierarchyId = ? GROUP BY Areas.areaId";
        $cordovaSQLite.execute(db, query, [$stateParams.hierarchyId]).then(function(res) {
            if(res.rows.length > 0) {
				for(var i=0;i<res.rows.length;i++){
					$scope.areas.push({name: res.rows.item(i).name, areaId: res.rows.item(i).areaId});
				}                 
               
                //alert("SELECTED 0-> ID: "+ res.rows.item(0).hierarchyId +" -> "+ res.rows.item(0).name);
				//alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");
				alert("No results found");         
            }
            
            
        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));            
        });


})


.controller('DataCtrl', function($scope, $cordovaSQLite) {

		//alert('inside controller');


		$scope.changeInput = function() {
			alert('change input: '+$scope.amount);
			var profileData=JSON.parse(localStorage.getItem("profileData"));
			profileData.amount = $scope.amount;
			localStorage.setItem("profileData",JSON.stringify(profileData));
			
			//alert('test_var: '+JSON.stringify(profileData));			
			//alert('countryId: '+profileData.countryId);	
      };

})


.controller("ExampleController", function($scope, $cordovaSQLite) {
 
    $scope.insert = function(positionId, amount) {
        var query = "INSERT INTO Cash (positionId, amount) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [positionId, amount]).then(function(res) {
            //console.log("INSERT ID -> " + res.insertId);
            alert("INSERT Query: "+query+" - ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));            
        });
    }
 
 
    $scope.select = function(areaId) {
        var query = "SELECT Positions.positionId, Positions.name, Positions.average FROM Positions INNER JOIN PositionsRel ON Positions.positionId = PositionsRel.positionId WHERE areaId = ?";
        $cordovaSQLite.execute(db, query, [areaId]).then(function(res) {
            if(res.rows.length > 0) {
                //console.log("SELECTED -> "+ res.rows.item(0).name + " " + res.rows.item(0).status);
                alert("SELECTED 0-> ID: "+ res.rows.item(0).positionId +" -> "+ res.rows.item(0).name + " " + res.rows.item(0).average);
				alert("SELECTED 1-> ID: "+ res.rows.item(1).positionId +" -> "+ res.rows.item(1).name + " " + res.rows.item(1).average);
            } else {
                console.log("No results found");
				alert("No results found");         
            }
        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));            
        });
    }
    
 
});

