angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('DataCtrl', function ($scope, $cordovaSQLite) {

        //alert('inside controller');
        //$scope.amount = 12;


        $scope.changeInput = function () {
            //alert('change input: '+$scope.amount);
            var profileData = JSON.parse(localStorage.getItem("profileData"));
            profileData.amount = $scope.amount;
            localStorage.setItem("profileData", JSON.stringify(profileData));

            //alert('test_var: '+JSON.stringify(profileData));
            //alert('countryId: '+profileData.countryId);
        };

    })

    .controller('HierarchiesCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        $scope.profileData.areaId = $stateParams.areaId;
        $scope.profileData.areaName = $stateParams.areaName;
        localStorage.setItem("profileData", JSON.stringify($scope.profileData));

        //$scope.profileData = JSON.parse(localStorage.getItem("profileData"));

        //alert('Hiarar - amount : ' + $stateParams.amount);


        $scope.hierarchies = [];


        var query = "SELECT Hierarchies.hierarchyId, Hierarchies.name FROM Hierarchies INNER JOIN PositionsRel ON Hierarchies.hierarchyId = PositionsRel.hierarchyId WHERE Hierarchies.status = 'ACTIVE' AND PositionsRel.areaId = ?  GROUP BY Hierarchies.hierarchyId";
        $cordovaSQLite.execute(db, query, [$scope.profileData.areaId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
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


    .controller('AreasCtrl', function ($scope, $stateParams, $cordovaSQLite) {

        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        $scope.profileData.amount = $stateParams.amount;
        localStorage.setItem("profileData", JSON.stringify($scope.profileData));





        //alert('Hiarar - amount : '+$scope.profileData.amount);


        $scope.areas = [];


        //var query = "SELECT Areas.areaId, Areas.name FROM Areas INNER JOIN PositionsRel ON Areas.areaId = PositionsRel.areaId WHERE Areas.status = 'ACTIVE' AND PositionsRel.hierarchyId = ? GROUP BY Areas.areaId";
        var query = "SELECT Areas.areaId, Areas.name FROM Areas  WHERE Areas.status = 'ACTIVE'";
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.areas.push({name: res.rows.item(i).name, areaId: res.rows.item(i).areaId});
                }

                //alert("SELECTED 0-> ID: "+ res.rows.item(0).hierarchyId +" -> "+ res.rows.item(0).name);
                //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");
                alert("No results found - query: " + query + " -- AND hierarchyId: "+$stateParams.hierarchyId);
            }


        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));
        });


    })

    .controller('SenioritiesCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        $scope.profileData.hierarchyId = $stateParams.hierarchyId;
        $scope.profileData.hierarchyName = $stateParams.hierarchyName;
        localStorage.setItem("profileData", JSON.stringify($scope.profileData));


        $scope.seniorities = [];


        var query = "SELECT Seniorities.seniorityId, Seniorities.name FROM Seniorities INNER JOIN PositionsRel ON Seniorities.seniorityId = PositionsRel.seniorityId WHERE Seniorities.status = 'ACTIVE' AND PositionsRel.areaId = ? AND PositionsRel.hierarchyId = ? GROUP BY Seniorities.seniorityId";
        $cordovaSQLite.execute(db, query, [$scope.profileData.areaId, $scope.profileData.hierarchyId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.seniorities.push({name: res.rows.item(i).name, seniorityId: res.rows.item(i).seniorityId});
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

    .controller('PositionsCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        $scope.profileData.seniorityId = $stateParams.seniorityId;
        $scope.profileData.seniorityName = $stateParams.seniorityName;
        localStorage.setItem("profileData", JSON.stringify($scope.profileData));


        $scope.positions = [];


        var query = "SELECT Positions.positionId, Positions.name FROM Positions INNER JOIN PositionsRel ON Positions.positionId = PositionsRel.positionId WHERE Positions.status = 'ACTIVE' AND PositionsRel.seniorityId = ? AND PositionsRel.areaId = ? AND PositionsRel.hierarchyId = ? GROUP BY Positions.positionId";
        $cordovaSQLite.execute(db, query, [$stateParams.seniorityId, $scope.profileData.areaId, $scope.profileData.hierarchyId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.positions.push({name: res.rows.item(i).name, positionId: res.rows.item(i).positionId});
                }

                //alert("SELECTED 0-> ID: "+ res.rows.item(0).hierarchyId +" -> "+ res.rows.item(0).name);
                //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");
                alert("No results found: " + query + " and Data seniorityId: " + $stateParams.seniorityId + " - areaId: " + $scope.profileData.areaId + " - hierarchyId: " + $scope.profileData.hierarchyId + " - ");
            }


        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));
        });


    })

    .controller('AnalysisCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        $scope.profileData.positionId = $stateParams.positionId;
        $scope.profileData.positionName = $stateParams.positionName;
        localStorage.setItem("profileData", JSON.stringify($scope.profileData));


//		$scope.positions = [];


        var query = "SELECT Positions.positionId, Positions.name, Positions.average, Positions.max, Positions.min, Positions.small, Positions.medium, Positions.large FROM Positions WHERE Positions.status = 'ACTIVE' AND Positions.positionId = ? ";
        $cordovaSQLite.execute(db, query, [$stateParams.positionId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.positionData = res.rows.item(i);
                }

                //alert("SELECTED 0-> ID: "+ res.rows.item(0).hierarchyId +" -> "+ res.rows.item(0).name);
                //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");
                alert("No results found: " + query);
            }


        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));
        });


        $scope.clean = function () {

            var profileData = {
                profileId: 1,
                name: '',
                date: '',
                hierarchyId: 0,
                areaId: 0,
                seniorityId: 0,
                positionId: 0,
                countryId: 1,
                amount: 10,
                hierarchyName: '',
                areaName: '',
                seniorityName: '',
                positionName: '',
                countryName: 'Argentina',
                amount: 0
            };


            localStorage.setItem("profileData", JSON.stringify(profileData));

            window.location = "#/app/data";

        }

        $scope.save = function () {
            alert('save');
        }

    })


    .controller('DBSyncCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        var hash = "";

            var dbsyncURL = 'http://bits0.com/CuantoGano/Json/dbsync.php?lastDate=2015-04-26 00:00:00';

        $http.get(dbsyncURL).success(function(data) {
            $scope.debtrow = data;
            $scope.debtdata =  angular.fromJson($scope.debtrow);



            $cordovaSQLite.execute(db, "drop table debtor");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS debtor (id integer primary key, debtordata text)");
            debtorquery = "INSERT INTO debtor (debtordata) VALUES (?)";

            $cordovaSQLite.execute(db, debtorquery, [$scope.debtdata]).then(function(res) {
                console.log($scope.debtdata)
                //alert($scope.debtdata.DebtorSynchronizationResult.AccNo);
            });
        })


        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        $scope.profileData.areaId = $stateParams.areaId;
        $scope.profileData.areaName = $stateParams.areaName;
        localStorage.setItem("profileData", JSON.stringify($scope.profileData));

        //$scope.profileData = JSON.parse(localStorage.getItem("profileData"));

        //alert('Hiarar - amount : ' + $stateParams.amount);


        $scope.hierarchies = [];


        var query = "SELECT Hierarchies.hierarchyId, Hierarchies.name FROM Hierarchies INNER JOIN PositionsRel ON Hierarchies.hierarchyId = PositionsRel.hierarchyId WHERE Hierarchies.status = 'ACTIVE' AND PositionsRel.areaId = ?  GROUP BY Hierarchies.hierarchyId";
        $cordovaSQLite.execute(db, query, [$scope.profileData.areaId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
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

    .controller("ExampleController", function ($scope, $cordovaSQLite) {

        $scope.insert = function (positionId, amount) {
            var query = "INSERT INTO Cash (positionId, amount) VALUES (?,?)";
            $cordovaSQLite.execute(db, query, [positionId, amount]).then(function (res) {
                //console.log("INSERT ID -> " + res.insertId);
                alert("INSERT Query: " + query + " - ID -> " + res.insertId);
            }, function (err) {
                console.error(err);
                alert(JSON.stringify(err));
            });
        }


        $scope.select = function (areaId) {
            var query = "SELECT Positions.positionId, Positions.name, Positions.average FROM Positions INNER JOIN PositionsRel ON Positions.positionId = PositionsRel.positionId WHERE areaId = ?";
            $cordovaSQLite.execute(db, query, [areaId]).then(function (res) {
                if (res.rows.length > 0) {
                    //console.log("SELECTED -> "+ res.rows.item(0).name + " " + res.rows.item(0).status);
                    alert("SELECTED 0-> ID: " + res.rows.item(0).positionId + " -> " + res.rows.item(0).name + " " + res.rows.item(0).average);
                    alert("SELECTED 1-> ID: " + res.rows.item(1).positionId + " -> " + res.rows.item(1).name + " " + res.rows.item(1).average);
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

