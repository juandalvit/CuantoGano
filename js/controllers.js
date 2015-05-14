angular.module('starter.controllers', ['ngResource'])



    .controller("JsonCtrl", function ($scope, $http, $cordovaSQLite) {

        $scope.getJson = function () {

            alert('Run Json');

            //hacemos uso de $http para obtener los datos del json

            var query = "SELECT Sync.date FROM Sync WHERE Sync.syncId = '1'";
            $cordovaSQLite.execute(db, query, []).then(function (res) {


                $scope.date = res.rows.item(0).date;


                $scope.jsonURL = 'http://bits0.com/CuantoGano/Json/dbsync.php?lastDate='+$scope.date;

                //alert('jsonURL: '+$scope.jsonURL);

                $http.get($scope.jsonURL).success(function (data) {
                    //Convert data to array.
                    //datos lo tenemos disponible en la vista gracias a $scope
                    $scope.datos = data;
                    //alert(JSON.stringify(data));
                    if(JSON.stringify(data) != '"null"'){


                        //alert('datos length: '+ data.length);


                        for (var i = 0; i < data.length; i++) {

                            $scope.lastDateUpdate = data[i].date;

                            if(data[i].operation == 'UPDATE'){
                                /*1) Table
                                 2) Field
                                 3) Value
                                 4) fieldID
                                 5) valueID*/


                                var query = "UPDATE "+data[i].table+" SET "+data[i].field+" = '"+data[i].value+"' WHERE "+data[i].fieldId+" = "+data[i].valueId;


                                $cordovaSQLite.execute(db, query, []).then(function (res) {

                                    //alert('Update query: '+query);

                                 }, function (err) {
                                     console.error(err);
                                     alert(JSON.stringify(err));
                                 });

                            }else if(data[i].operation == 'INSERT'){
                                /*1) Table
                                 2) Field
                                 3) Value
                                 4) fieldID
                                 5) valueID*/

                                var query = "INSERT INTO "+data[i].table+" ("+data[i].field+")  ("+data[i].value+")";

                                $cordovaSQLite.execute(db, query, []).then(function (res) {


                                    //alert('Insert query: '+query);

                                 }, function (err) {
                                 console.error(err);
                                 alert(JSON.stringify(err));
                                 });
                            }



                        }

                        var query = "UPDATE Sync SET date = '"+$scope.lastDateUpdate+"' WHERE syncId = 1";

                        //alert('Update DB: ' + query);
                        $cordovaSQLite.execute(db, query, []).then(function (res) {

                            //alert('Update DONE DB: ' + query);

                        }, function (err) {
                            console.error(err);
                            alert(JSON.stringify(err));
                        });

                        alert('DB UPDATED!');

                    }else{
                        alert('NO Update');
                    }
                });

            }, function (err) {
                console.error(err);
                alert(JSON.stringify(err));
            });



            //datosResource lo tenemos disponible en la vista gracias a $scope
            //$scope.datosResource = dataResource.get();





        }


        $scope.sendJson = function () {

            alert('Run send Json');

            //hacemos uso de $http para obtener los datos del json

            var query = "SELECT Sync.date FROM Sync WHERE Sync.syncId = '1'";
            $cordovaSQLite.execute(db, query, []).then(function (res) {


                $scope.date = res.rows.item(0).date;


                /*$scope.postData = [];
                $scope.postData.push({name: 1, value: 1});
                $scope.postData.push({name: 2, value: 2});
                $scope.postData.push({name: 3, value: 3});*/

                $scope.post = {'storyMessage': 'Hello', postToFB: true, postToTwitter: true, postToTeam: false};

                $scope.posts = JSON.stringify($scope.post);



                $scope.jsonSendURL = 'http://bits0.com/CuantoGano/Json/dbpush.php';


                //alert('jsonURL: '+$scope.jsonURL);

                $http.post($scope.jsonSendURL, $scope.post).success(function (data) {


                    alert('Data: '+JSON.stringify(data));

                }).error(function(error) {
                    alert(JSON.stringify(error));
                });


            }, function (err) {
                console.error(err);
                alert(JSON.stringify(err));
            });



            //datosResource lo tenemos disponible en la vista gracias a $scope
            //$scope.datosResource = dataResource.get();

        }

    })

    .controller("TestSQLCtrl", function ($scope, $cordovaSQLite) {



        $scope.countDB = function () {

            alert('Cuont DB');

            //var query = "SELECT Positions.positionId, Positions.name FROM Positions INNER JOIN PositionsRel ON Positions.positionId = PositionsRel.positionId WHERE Positions.positionId = 553 GROUP BY Positions.positionId";
            var query = "SELECT COUNT(Positions.positionId) AS count FROM Positions";
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                if (res.rows.length > 0) {

                    //alert(JSON.stringify(res.rows.item));
                    alert("COUNT positions: " + res.rows.item(0).count);
                    //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
                } else {
                    console.log("No results found");
                    alert("No results found: " + query);
                }


            }, function (err) {
                console.error(err);
                alert(JSON.stringify(err));
            });

            var query = "SELECT Positions.positionId FROM Positions ORDER BY Positions.positionId DESC";
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                if (res.rows.length > 0) {

                    //alert(JSON.stringify(res.rows.item));
                    alert("MAX positions ID: " + res.rows.item(0).positionId);
                    //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
                } else {
                    console.log("No results found");
                    alert("No results found: " + query);
                }


            }, function (err) {
                console.error(err);
                alert(JSON.stringify(err));
            });

            var query = "SELECT COUNT(PositionsRel.posareaRelId) AS count FROM PositionsRel";
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                if (res.rows.length > 0) {

                    //alert(JSON.stringify(res.rows.item));
                    alert("COUNT PositionsRel: " + res.rows.item(0).count);
                    //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
                } else {
                    console.log("No results found");
                    alert("No results found: " + query);
                }


            }, function (err) {
                console.error(err);
                alert(JSON.stringify(err));
            });
        }

        $scope.execQueryDB = function () {

            alert('Exec Query DB');


            var insertTest = "INSERT INTO PositionsRel (posareaRelId, hierarchyId, areaId, seniorityId, positionId, countryId) VALUES(1, 11, 13, 5, 1, 1);";
            $cordovaSQLite.execute(db, insertTest);

            //var query = "SELECT Positions.positionId, Positions.name FROM Positions INNER JOIN PositionsRel ON Positions.positionId = PositionsRel.positionId WHERE Positions.positionId = 553 GROUP BY Positions.positionId";
            var query = "SELECT * FROM PositionsRel";
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                if (res.rows.length > 0) {

                    //alert(JSON.stringify(res.rows.item));
                    //alert("COUNT positions: " + res.rows.item(0));
                    alert("String result 0" + JSON.stringify(res.rows.item(0)))
                    //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
                } else {
                    console.log("No results found");
                    alert("No results found: " + query);
                }


            }, function (err) {
                console.error(err);
                alert(JSON.stringify(err));
            });


        }

    })

    /*
    //de esta forma tan sencilla consumimos con $resource en AngularJS
    .factory("dataResource", function ($resource) {
        return $resource("js/data.json", //la url donde queremos consumir
            {}, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            //ponemos isArray en true
            { get: { method: "GET", isArray: true }
            })
    })
    */


    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/*login.html', {
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

    .controller('DataCtrl', function ($scope) {

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


        var query = "SELECT Hierarchies.hierarchyId, Hierarchies.name, Hierarchies.description FROM Hierarchies INNER JOIN PositionsRel ON Hierarchies.hierarchyId = PositionsRel.hierarchyId WHERE Hierarchies.status = 'ACTIVE' AND PositionsRel.areaId = ?  GROUP BY Hierarchies.hierarchyId";
        $cordovaSQLite.execute(db, query, [$scope.profileData.areaId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.hierarchies.push({name: res.rows.item(i).name, hierarchyId: res.rows.item(i).hierarchyId, description: res.rows.item(i).description});
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
        var query = "SELECT Areas.areaId, Areas.name, Areas.description FROM Areas  WHERE Areas.status = 'ACTIVE'";
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.areas.push({name: res.rows.item(i).name, areaId: res.rows.item(i).areaId, description: res.rows.item(i).description});
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


        var query = "SELECT Seniorities.seniorityId, Seniorities.name, Seniorities.description FROM Seniorities INNER JOIN PositionsRel ON Seniorities.seniorityId = PositionsRel.seniorityId WHERE Seniorities.status = 'ACTIVE' AND PositionsRel.areaId = ? AND PositionsRel.hierarchyId = ? GROUP BY Seniorities.seniorityId";
        $cordovaSQLite.execute(db, query, [$scope.profileData.areaId, $scope.profileData.hierarchyId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.seniorities.push({name: res.rows.item(i).name, seniorityId: res.rows.item(i).seniorityId, description: res.rows.item(i).description});
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


        var query = "SELECT Positions.positionId, Positions.name, Positions.description FROM Positions INNER JOIN PositionsRel ON Positions.positionId = PositionsRel.positionId WHERE Positions.status = 'ACTIVE' AND PositionsRel.seniorityId = ? AND PositionsRel.areaId = ? AND PositionsRel.hierarchyId = ? GROUP BY Positions.positionId";
        //var query = "SELECT Positions.positionId, Positions.name FROM Positions INNER JOIN PositionsRel ON Positions.positionId = PositionsRel.positionId WHERE Positions.positionId = 553 GROUP BY Positions.positionId";

        $cordovaSQLite.execute(db, query, [$stateParams.seniorityId, $scope.profileData.areaId, $scope.profileData.hierarchyId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.positions.push({name: res.rows.item(i).name, positionId: res.rows.item(i).positionId, description: res.rows.item(i).description});
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

    .controller('ProfileCtrl', function ($scope, $stateParams, $cordovaSQLite) {

            alert('update profile data');
            $scope.profileData = JSON.parse(localStorage.getItem("profileData"));

    })

    .controller('ProfileVsPyramidCtrl', function ($scope, $cordovaSQLite) {



        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));

        $scope.pyramidPositions = [];


        var query = "SELECT Positions.positionId, Positions.name, Positions.description, Positions.average FROM Positions INNER JOIN PositionsRel ON Positions.positionId = PositionsRel.positionId WHERE Positions.status = 'ACTIVE' AND PositionsRel.seniorityId = ? AND PositionsRel.areaId = ? GROUP BY Positions.positionId ORDER BY PositionsRel.hierarchyId";
        //var query = "SELECT Positions.positionId, Positions.name FROM Positions INNER JOIN PositionsRel ON Positions.positionId = PositionsRel.positionId WHERE Positions.positionId = 553 GROUP BY Positions.positionId";

        //alert("Query: " + query + " and Data seniorityId: " + $scope.profileData.seniorityId + " - areaId: " + $scope.profileData.areaId + " - ");

        $cordovaSQLite.execute(db, query, [$scope.profileData.seniorityId, $scope.profileData.areaId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.pyramidPositions.push({name: res.rows.item(i).name, positionId: res.rows.item(i).positionId, description: res.rows.item(i).description, average: res.rows.item(i).average});
                }

            } else {
                console.log("No results found");
                alert("No results found: " + query + " and Data seniorityId: " + $stateParams.seniorityId + " - areaId: " + $scope.profileData.areaId + " - hierarchyId: " + $scope.profileData.hierarchyId + " - ");
            }


        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));
        });

    })

    .controller('ProfileVsResultCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        //alert('update profile data');
        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));





    })

    .controller('ProfileVsSearchCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        alert('update profile data');
        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));





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
            $scope.profileData = JSON.parse(localStorage.getItem("profileData"));


            var query = "SELECT Profiles.date FROM Profiles WHERE Profiles.profileId = '1'";
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                if (res.rows.length == 0) {
                    var query = "INSERT INTO Profiles (profileId, date, hierarchyId, areaId, seniorityId, positionId, amount, countryId, status) VALUES ('1', datetime('now','localtime'), '?', '?', '?', '?', '?', '?', 'ACTIVE');";
                    $cordovaSQLite.execute(db, query, [$scope.profileData.hierarchyId, $scope.profileData.areaId, $scope.profileData.seniorityId, $scope.profileData.positionId, $scope.profileData.amount, $scope.profileData.countryId]);
                } else {
                    var query = "UPDATE Profiles SET date = datetime('now','localtime', hierarchyId= '?', areaId='?', seniorityId='?', positionId='2?, amount='?', countryId='?' WHERE profileId='1';";
                    $cordovaSQLite.execute(db, query, [$scope.profileData.hierarchyId, $scope.profileData.areaId, $scope.profileData.seniorityId, $scope.profileData.positionId, $scope.profileData.amount, $scope.profileData.countryId]);
                }

                window.location = "#/app/profile";
            }, function (err) {
                console.error(err);
                alert(JSON.stringify(err));
            });
        }

    })


    .controller('SearchCtrl', function ($scope, $stateParams, $cordovaSQLite) {



        $scope.positions = [];


        var query = "SELECT Positions.positionId, Positions.name, Positions.description  FROM Positions WHERE Positions.status = 'ACTIVE'";


        $cordovaSQLite.execute(db, query, []).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.positions.push({name: res.rows.item(i).name, positionId: res.rows.item(i).positionId, description: res.rows.item(i).description});
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


        $scope.customFilter = function (item) {
            /*if (!$scope.search.$) {// your input field is empty or no checkbox checked
                return true;
            }*/

            var searchVal = $scope.search.$;
            searchVal = searchVal.replace(/([()[{*+.$^\\|?])/g, '\\$1'); //special char

            var regex = new RegExp('' + searchVal, 'i');

            var matchOnDescription = false, matchOnName= false;


            //matchOnDescription = regex.test(item.description);
            matchOnName = regex.test(item.name);


            return matchOnName;
        }


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

