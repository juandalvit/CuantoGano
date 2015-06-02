angular.module('starter.services', [])

    .factory('syncServer', function ($http, $cordovaSQLite) {
        return {


        }
    /*
        // Might use a resource here that returns a JSON array

        alert('Run Json');

        //hacemos uso de $http para obtener los datos del json

        return {
            getUpdates: function () {
                var query = "SELECT Sync.date FROM Sync WHERE Sync.syncId = '1'";
                $cordovaSQLite.execute(db, query, []).then(function (res) {


                    $scope.date = res.rows.item(0).date;


                    $scope.jsonURL = 'http://bits0.com/CuantoGano/Json/dbsync.php?lastDate=' + $scope.date;

                    alert('jsonURL: ' + $scope.jsonURL);

                    $http.get($scope.jsonURL).success(function (data) {
                        //Convert data to array.
                        //datos lo tenemos disponible en la vista gracias a $scope
                        $scope.datos = data;
                        //alert(JSON.stringify(data));
                        if (JSON.stringify(data) != '"null"') {


                            //alert('datos length: '+ data.length);


                            for (var i = 0; i < data.length; i++) {

                                $scope.lastDateUpdate = data[i].date;

                                if (data[i].operation == 'UPDATE') {
                                    /!*1) Table
                                     2) Field
                                     3) Value
                                     4) fieldID
                                     5) valueID*!/


                                    var query = "UPDATE " + data[i].table + " SET " + data[i].field + " = '" + data[i].value + "' WHERE " + data[i].fieldId + " = " + data[i].valueId;


                                    $cordovaSQLite.execute(db, query, []).then(function (res) {

                                        //alert('Update query: '+query);

                                    }, function (err) {
                                        console.error(err);
                                        alert(JSON.stringify(err));
                                    });

                                } else if (data[i].operation == 'INSERT') {
                                    /!*1) Table
                                     2) Field
                                     3) Value
                                     4) fieldID
                                     5) valueID*!/

                                    var query = "INSERT INTO " + data[i].table + " (" + data[i].field + ")  (" + data[i].value + ")";

                                    $cordovaSQLite.execute(db, query, []).then(function (res) {


                                        //alert('Insert query: '+query);

                                    }, function (err) {
                                        console.error(err);
                                        alert(JSON.stringify(err));
                                    });
                                }


                            }

                            var query = "UPDATE Sync SET date = '" + $scope.lastDateUpdate + "' WHERE syncId = 1";

                            //alert('Update DB: ' + query);
                            $cordovaSQLite.execute(db, query, []).then(function (res) {

                                //alert('Update DONE DB: ' + query);

                            }, function (err) {
                                console.error(err);
                                alert(JSON.stringify(err));
                            });

                            alert('DB UPDATED!');

                        } else {
                            alert('NO Update');
                        }
                    });

                }, function (err) {
                    console.error(err);
                    alert(JSON.stringify(err));
                });


            },

            sendJson: function () {
                alert('Run send Json');

                //hacemos uso de $http para obtener los datos del json

                var query = "SELECT Sync.date FROM Sync WHERE Sync.syncId = '1'";
                $cordovaSQLite.execute(db, query, []).then(function (res) {


                    $scope.date = res.rows.item(0).date;


                    /!*$scope.postData = [];
                     $scope.postData.push({name: 1, value: 1});
                     $scope.postData.push({name: 2, value: 2});
                     $scope.postData.push({name: 3, value: 3});*!/

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

            }
        }*/


    });
