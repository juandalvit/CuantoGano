angular.module('starter.controllers', ['ngResource'])

    .controller('AppCtrl', function ($scope, $ionicModal, $cordovaSQLite) {

        //alert('Exec code when open');





    })

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


            //var insertTest = "INSERT INTO PositionsRel (posareaRelId, hierarchyId, areaId, seniorityId, positionId, countryId) VALUES(1, 11, 13, 5, 1, 1);";
            //$cordovaSQLite.execute(db, insertTest);

            //var query = "SELECT Positions.positionId, Positions.name FROM Positions INNER JOIN PositionsRel ON Positions.positionId = PositionsRel.positionId WHERE Positions.positionId = 553 GROUP BY Positions.positionId";
            //var query = "SELECT Hierarchies.hierarchyId, Hierarchies.name, Hierarchies.description FROM Hierarchies INNER JOIN Positions ON Hierarchies.hierarchyId = Positions.hierarchyId WHERE Hierarchies.status = 'ACTIVE' AND Positions.sectorId = 4";
            var query = "SELECT * FROM Profiles WHERE Profiles.profileId = '1'";
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



    .controller('c1_areasCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.areas = [];


        //var query = "SELECT Areas.areaId, Areas.name FROM Areas INNER JOIN PositionsRel ON Areas.areaId = PositionsRel.areaId WHERE Areas.status = 'ACTIVE' AND PositionsRel.hierarchyId = ? GROUP BY Areas.areaId";
        var query = "SELECT Areas.areaId, Areas.name, Areas.description FROM Areas WHERE Areas.status = 'ACTIVE'";
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


    .controller('c1_sectorsCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.consultData = JSON.parse(localStorage.getItem("consultData"));
        $scope.consultData.areaId = $stateParams.areaId;
        $scope.consultData.areaName = $stateParams.areaName;
        localStorage.setItem("consultData", JSON.stringify($scope.consultData));


         $scope.sectors = [];

        var query = "SELECT Sectors.sectorId, Sectors.name, Sectors.description FROM Sectors WHERE Sectors.status = 'ACTIVE' AND Sectors.areaId = ?  GROUP BY Sectors.orden";
        $cordovaSQLite.execute(db, query, [$stateParams.areaId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.sectors.push({name: res.rows.item(i).name, sectorId: res.rows.item(i).sectorId, description: res.rows.item(i).description});
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

    .controller('c1_hierarchiesCtrl', function ($scope, $stateParams, $cordovaSQLite) {



        $scope.consultData = JSON.parse(localStorage.getItem("consultData"));
        $scope.consultData.sectorId = $stateParams.sectorId;
        $scope.consultData.sectorName = $stateParams.sectorName;
        localStorage.setItem("consultData", JSON.stringify($scope.consultData));

        //$scope.profileData = JSON.parse(localStorage.getItem("profileData"));

        //alert('Hiarar - amount : ' + $stateParams.amount);



        $scope.hierarchies = [];


        var query = "SELECT Hierarchies.hierarchyId, Hierarchies.name, Hierarchies.description FROM Hierarchies INNER JOIN Positions ON Hierarchies.hierarchyId = Positions.hierarchyId WHERE Hierarchies.status = 'ACTIVE' AND Positions.sectorId = ?";
        $cordovaSQLite.execute(db, query, [$stateParams.sectorId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.hierarchies.push({name: res.rows.item(i).name, hierarchyId: res.rows.item(i).hierarchyId, description: res.rows.item(i).description});
                }

                //alert("SELECTED 0-> ID: "+ res.rows.item(0).hierarchyId +" -> "+ res.rows.item(0).name);
                //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");

            }
            //alert("CANT result: "+res.rows.length);


        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));
        });

    })

    .controller('c1_consultResultCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.consultData = JSON.parse(localStorage.getItem("consultData"));
        $scope.consultData.hierarchyId = $stateParams.hierarchyId;
        $scope.consultData.hierarchyName = $stateParams.hierarchyName;
        localStorage.setItem("consultData", JSON.stringify($scope.consultData));



        var query = "SELECT Positions.positionId, Positions.name, Positions.average, Positions.junior, Positions.semisenior, Positions.senior FROM Positions WHERE Positions.status = 'ACTIVE' AND Positions.sectorId = ? AND Positions.hierarchyId = ? ";
        $cordovaSQLite.execute(db, query, [$scope.consultData.sectorId, $stateParams.hierarchyId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.positionData = res.rows.item(i);
                }

                //alert("SELECTED position average: "+ $scope.positionData.average +" junir: "+ $scope.positionData.junior);
                //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");
                alert("No results found: " + query + "1?: " + $scope.consultData.sectorId + "2?: "+$stateParams.hierarchyId);
            }


        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));
        });




        $scope.goToC2Seniority = function () {

            //$scope.profileData = JSON.parse(localStorage.getItem("profileData"));
            //$scope.consultData = JSON.parse(localStorage.getItem("consultData"));

            localStorage.setItem("profileData", JSON.stringify($scope.consultData));

            window.location = "#/app/c2_seniorities/"+$stateParams.hierarchyId+"/"+$stateParams.hierarchyName;

        }

    })

    .controller('c2_areasCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.areas = [];


        //var query = "SELECT Areas.areaId, Areas.name FROM Areas INNER JOIN PositionsRel ON Areas.areaId = PositionsRel.areaId WHERE Areas.status = 'ACTIVE' AND PositionsRel.hierarchyId = ? GROUP BY Areas.areaId";
        var query = "SELECT Areas.areaId, Areas.name, Areas.description FROM Areas WHERE Areas.status = 'ACTIVE'";
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

    .controller('c2_sectorsCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        $scope.profileData.areaId = $stateParams.areaId;
        $scope.profileData.areaName = $stateParams.areaName;
        localStorage.setItem("profileData", JSON.stringify($scope.profileData));


        $scope.sectors = [];

        var query = "SELECT Sectors.sectorId, Sectors.name, Sectors.description FROM Sectors WHERE Sectors.status = 'ACTIVE' AND Sectors.areaId = ?  GROUP BY Sectors.orden";
        $cordovaSQLite.execute(db, query, [$stateParams.areaId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.sectors.push({name: res.rows.item(i).name, sectorId: res.rows.item(i).sectorId, description: res.rows.item(i).description});
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

    .controller('c2_hierarchiesCtrl', function ($scope, $stateParams, $cordovaSQLite) {



        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        $scope.profileData.sectorId = $stateParams.sectorId;
        $scope.profileData.sectorName = $stateParams.sectorName;
        localStorage.setItem("profileData", JSON.stringify($scope.profileData));

        //$scope.profileData = JSON.parse(localStorage.getItem("profileData"));

        //alert('Hiarar - amount : ' + $stateParams.amount);



        $scope.hierarchies = [];


        var query = "SELECT Hierarchies.hierarchyId, Hierarchies.name, Hierarchies.description FROM Hierarchies INNER JOIN Positions ON Hierarchies.hierarchyId = Positions.hierarchyId WHERE Hierarchies.status = 'ACTIVE' AND Positions.sectorId = ?";
        $cordovaSQLite.execute(db, query, [$stateParams.sectorId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.hierarchies.push({name: res.rows.item(i).name, hierarchyId: res.rows.item(i).hierarchyId, description: res.rows.item(i).description});
                }

                //alert("SELECTED 0-> ID: "+ res.rows.item(0).hierarchyId +" -> "+ res.rows.item(0).name);
                //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");

            }
            //alert("CANT result: "+res.rows.length);


        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));
        });

    })

    .controller('c2_senioritiesCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        $scope.profileData.hierarchyId = $stateParams.hierarchyId;
        $scope.profileData.hierarchyName = $stateParams.hierarchyName;
        localStorage.setItem("profileData", JSON.stringify($scope.profileData));


        $scope.seniorities = [];


        var query = "SELECT Seniorities.seniorityId, Seniorities.name, Seniorities.description FROM Seniorities WHERE Seniorities.status = 'ACTIVE'";
        $cordovaSQLite.execute(db, query, []).then(function (res) {
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

    .controller('c2_dataCtrl', function ($scope, $stateParams, $cordovaSQLite) {

        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        $scope.profileData.seniorityId = $stateParams.seniorityId;
        $scope.profileData.seniorityName = $stateParams.seniorityName;
        localStorage.setItem("profileData", JSON.stringify($scope.profileData));


        $scope.changeInput = function () {
            //alert('change input: '+$scope.amount);
            var profileData = JSON.parse(localStorage.getItem("profileData"));
            profileData.amount = $scope.amount;
            localStorage.setItem("profileData", JSON.stringify(profileData));

            //alert('test_var: '+JSON.stringify(profileData));
            //alert('countryId: '+profileData.countryId);
        };

    })

    .controller('c2_analysisCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        $scope.profileData.amount = $stateParams.amount;
        //localStorage.setItem("profileData", JSON.stringify($scope.profileData));


		$scope.analysis = [];


        var query = "SELECT Positions.positionId, Positions.name, Positions.average, Positions.junior, Positions.semisenior, Positions.senior FROM Positions WHERE Positions.status = 'ACTIVE' AND Positions.sectorId = ? AND Positions.hierarchyId = ? ";
        $cordovaSQLite.execute(db, query, [$scope.profileData.sectorId, $scope.profileData.hierarchyId]).then(function (res) {
            if (res.rows.length > 0) {

                $scope.analysis.average = res.rows.item(0).average;
                $scope.analysis.junior = res.rows.item(0).junior;
                $scope.analysis.semisenior = res.rows.item(0).semisenior;
                $scope.analysis.senior = res.rows.item(0).senior;
                $scope.analysis.positionId = res.rows.item(0).positionId;


                if($scope.profileData.seniorityId == 1) {
                    $scope.analysis.marketValue = res.rows.item(0).junior;
                }else if($scope.profileData.seniorityId == 2) {
                    $scope.analysis.marketValue = res.rows.item(0).semisenior;
                }else if($scope.profileData.seniorityId == 3){
                        $scope.analysis.marketValue = res.rows.item(0).senior;
                }

                if($scope.profileData.amount >= $scope.profileData.marketValue){
                    $scope.profileData.amountStatus = 'Good';
                }else{
                    $scope.profileData.amountStatus = 'Bad';
                }

                $scope.profileData.average = $scope.analysis.average;
                $scope.profileData.marketValue = $scope.analysis.marketValue;
                $scope.profileData.positionId = $scope.analysis.positionId;

                localStorage.setItem("profileData", JSON.stringify($scope.profileData));

                //alert("SELECTED 0-> average: "+ res.rows.item(0).average +" ->positionId: "+ res.rows.item(0).positionId);
                //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");
                alert("No results found: " + query + "With val: "+ $scope.profileData.sectorId + ", " +  $scope.profileData.hierarchyId);
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
            alert('Nuevo Perfil Guardado');
            $scope.profileData = JSON.parse(localStorage.getItem("profileData"));


            var query = "SELECT Profiles.date FROM Profiles WHERE Profiles.profileId = '1'";
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                if (res.rows.length == 0) {


                    var query = "INSERT INTO Profiles (profileId, name, date, areaId, sectorId, hierarchyId, seniorityId, amount, positionId, countryId, uploaded, status) VALUES ('1', '', datetime('now','localtime'), "+$scope.profileData.areaId+", "+$scope.profileData.sectorId+", "+$scope.profileData.hierarchyId+", "+$scope.profileData.seniorityId+", "+$scope.profileData.amount+", "+$scope.profileData.positionId+", 1, '', 'ACTIVE');";
                    $cordovaSQLite.execute(db, query, []);
                    //alert('insertProfile');
                } else {
                    var query = "UPDATE Profiles SET date = datetime('now','localtime'), hierarchyId= '"+$scope.profileData.hierarchyId+"', areaId='"+$scope.profileData.areaId+"', seniorityId='"+$scope.profileData.seniorityId+"', positionId='"+$scope.profileData.positionId+"', amount='"+$scope.profileData.amount+"', countryId='1' WHERE profileId='1';";
                    $cordovaSQLite.execute(db, query, []).then(function (res) {
                    }, function (err) {
                        alert(JSON.stringify(err));
                    });
                }

                window.location = "#/app/profile";
            }, function (err) {
                console.error(err);
                alert(JSON.stringify(err));
            });
        }

    })




    .controller('c3_areasCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.areas = [];


        //var query = "SELECT Areas.areaId, Areas.name FROM Areas INNER JOIN PositionsRel ON Areas.areaId = PositionsRel.areaId WHERE Areas.status = 'ACTIVE' AND PositionsRel.hierarchyId = ? GROUP BY Areas.areaId";
        var query = "SELECT Areas.areaId, Areas.name, Areas.description FROM Areas WHERE Areas.status = 'ACTIVE'";
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

    .controller('c3_sectorsCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileVsResultData = JSON.parse(localStorage.getItem("profileVsResultData"));
        $scope.profileVsResultData.areaId = $stateParams.areaId;
        $scope.profileVsResultData.areaName = $stateParams.areaName;
        localStorage.setItem("profileVsResultData", JSON.stringify($scope.profileVsResultData));


        $scope.sectors = [];

        var query = "SELECT Sectors.sectorId, Sectors.name, Sectors.description FROM Sectors WHERE Sectors.status = 'ACTIVE' AND Sectors.areaId = ? ORDER BY Sectors.orden";
        $cordovaSQLite.execute(db, query, [$stateParams.areaId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.sectors.push({name: res.rows.item(i).name, sectorId: res.rows.item(i).sectorId, description: res.rows.item(i).description});
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

    .controller('c3_hierarchiesCtrl', function ($scope, $stateParams, $cordovaSQLite) {



        $scope.profileVsResultData = JSON.parse(localStorage.getItem("profileVsResultData"));
        $scope.profileVsResultData.sectorId = $stateParams.sectorId;
        $scope.profileVsResultData.sectorName = $stateParams.sectorName;
        localStorage.setItem("profileVsResultData", JSON.stringify($scope.profileVsResultData));

        //$scope.profileData = JSON.parse(localStorage.getItem("profileData"));

        //alert('Hiarar - amount : ' + $stateParams.amount);



        $scope.hierarchies = [];


        var query = "SELECT Hierarchies.hierarchyId, Hierarchies.name, Hierarchies.description FROM Hierarchies INNER JOIN Positions ON Hierarchies.hierarchyId = Positions.hierarchyId WHERE Hierarchies.status = 'ACTIVE' AND Positions.sectorId = ?";
        $cordovaSQLite.execute(db, query, [$stateParams.sectorId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.hierarchies.push({name: res.rows.item(i).name, hierarchyId: res.rows.item(i).hierarchyId, description: res.rows.item(i).description});
                }

                //alert("SELECTED 0-> ID: "+ res.rows.item(0).hierarchyId +" -> "+ res.rows.item(0).name);
                //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");

            }
            //alert("CANT result: "+res.rows.length);


        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));
        });

    })

    .controller('c3_senioritiesCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileVsResultData = JSON.parse(localStorage.getItem("profileVsResultData"));
        $scope.profileVsResultData.hierarchyId = $stateParams.hierarchyId;
        $scope.profileVsResultData.hierarchyName = $stateParams.hierarchyName;
        localStorage.setItem("profileVsResultData", JSON.stringify($scope.profileVsResultData));


        $scope.seniorities = [];


        var query = "SELECT Seniorities.seniorityId, Seniorities.name, Seniorities.description FROM Seniorities WHERE Seniorities.status = 'ACTIVE'";
        $cordovaSQLite.execute(db, query, []).then(function (res) {
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

    .controller('c3_profileVsResultCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileVsResultData = JSON.parse(localStorage.getItem("profileVsResultData"));
        $scope.profileVsResultData.seniorityId = $stateParams.seniorityId;
        $scope.profileVsResultData.seniorityName = $stateParams.seniorityName;
        localStorage.setItem("profileVsResultData", JSON.stringify($scope.profileVsResultData));

        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));



        $scope.analysis = [];


        var query = "SELECT Positions.positionId, Positions.name, Positions.average, Positions.junior, Positions.semisenior, Positions.senior FROM Positions WHERE Positions.status = 'ACTIVE' AND Positions.sectorId = ? AND Positions.hierarchyId = ? ";
        $cordovaSQLite.execute(db, query, [$scope.profileVsResultData.sectorId, $scope.profileVsResultData.hierarchyId]).then(function (res) {
            if (res.rows.length > 0) {

                $scope.profileVsResultData.average = res.rows.item(0).average;

                //alert("SELECTED 0-> average: "+ res.rows.item(0).average +" ->positionId: "+ res.rows.item(0).positionId);
                //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");
                alert("No results found: " + query + " -- With val: "+$scope.profileData.sectorId + ", " + $scope.profileData.hierarchyId);
            }


        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));
        });





    })

    .controller('c4_profileVsPyramidCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));




        $scope.profileVsPyramids = [];


        var query = "SELECT Positions.positionId, Positions.name, Positions.description, Positions.average, Hierarchies.name AS hierarchyName FROM Positions INNER JOIN Hierarchies ON Hierarchies.hierarchyId = Positions.hierarchyId WHERE Positions.status = 'ACTIVE' AND Positions.sectorId = ?";
        $cordovaSQLite.execute(db, query, [$scope.profileData.sectorId]).then(function (res) {
            if (res.rows.length > 0) {
                //alert("Results found: " + query + " -- With val: "+$scope.profileData.sectorId + ", " + $scope.profileData.hierarchyId);

                for (var i = 0; i < res.rows.length; i++) {
                    $scope.profileVsPyramids.push({name: res.rows.item(i).name, description: res.rows.item(i).description, average: res.rows.item(i).average, hierarchyName: res.rows.item(i).hierarchyName});
                }



                //alert("SELECTED 0-> average: "+ res.rows.item(0).average +" ->positionId: "+ res.rows.item(0).positionId);
                //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
            } else {
                console.log("No results found");
                alert("No results found: " + query + " -- With val: "+$scope.profileData.sectorId + ", " + $scope.profileData.hierarchyId);
            }


        }, function (err) {
            console.error(err);
            alert(JSON.stringify(err));
        });




    })

    .controller('profileCtrl', function ($scope, $stateParams, $cordovaSQLite) {


        $scope.profileData = JSON.parse(localStorage.getItem("profileData"));
        //alert("profile controler");


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

