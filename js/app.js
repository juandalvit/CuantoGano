// Ionic Starter App

var db = null;


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



//json
/*
var URL='http://bits0.com/CuantoGano/Json/dbsync.php?lastDate=2015-04-26%2000:00:00'

$http.get(URL).success(function(data) {
    $scope.debtrow = data;
    alert('Data: '+data);
});


var URL = "http://bits0.com/CuantoGano/Json/dbsync.php?lastDate=2015-04-26%2000:00:00"

$http.get(URL).success(function(data) {
    $scope.debtrow = data;
});

$http({
    method: 'GET',
    url: ''+URL,
    data: ''
})

.success(function (data, status, headers, config) {
    alert('Data: '+data);
})
.error(function (data, status, headers, config) {

});
*/

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

    .run(function ($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            if(window.plugins && window.plugins.AdMob) {
                var admob_key = device.platform == "Android" ? "ca-app-pub-8185646918327384/6127887751" : "ca-app-pub-8185646918327384/9081354156";
                var admob = window.plugins.AdMob;
                admob.createBannerView(
                    {
                        'publisherId': admob_key,
                        'adSize': admob.AD_SIZE.BANNER,
                        'bannerAtTop': false
                    },
                    function() {
                        admob.requestAd(
                            { 'isTesting': false },
                            function() {
                                admob.showAd(true);
                            },
                            function() { console.log('failed to request ad'); }
                        );
                    },
                    function() { console.log('failed to create banner view'); }
                );
            }

            if (window.cordova) {

                //Clean DB
                //$cordovaSQLite.deleteDB("CuantoGanoDB");

                db = $cordovaSQLite.openDB("CuantoGanoDB");

            }else{


                db = window.openDatabase("CuantoGanoDB", '1', 'my', 1024 * 1024 * 100); // browser


                /*alert('Detele all DB');
                var deleteTable1QuertText = "DROP TABLE Areas;";
                var deleteTable2QuertText = "DROP TABLE Cash;";
                var deleteTable3QuertText = "DROP TABLE Countries;";
                var deleteTable4QuertText = "DROP TABLE Hierarchies;";
                var deleteTable5QuertText = "DROP TABLE Positions;";
                var deleteTable6QuertText = "DROP TABLE PositionsRel;";
                var deleteTable7QuertText = "DROP TABLE Profiles;";
                var deleteTable8QuertText = "DROP TABLE Seniorities;";
                var deleteTable9QuertText = "DROP TABLE Sync;";

                $cordovaSQLite.execute(db, deleteTable1QuertText);
                $cordovaSQLite.execute(db, deleteTable2QuertText);
                $cordovaSQLite.execute(db, deleteTable3QuertText);
                $cordovaSQLite.execute(db, deleteTable4QuertText);
                $cordovaSQLite.execute(db, deleteTable5QuertText);
                $cordovaSQLite.execute(db, deleteTable6QuertText);
                $cordovaSQLite.execute(db, deleteTable7QuertText);
                $cordovaSQLite.execute(db, deleteTable8QuertText);
                $cordovaSQLite.execute(db, deleteTable9QuertText);*/

            }






            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Areas " +
                "(areaId integer primary key, " +
                "name text, " +
                "description text, " +
                "order integer, " +
                "coef_peq real, " +
                "coef_med real, " +
                "coef_grand real, " +
                "coef_min real, " +
                "coef_max real, " +
                "status text);");


            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Countries (" +
                "countryId integer primary key, " +
                "countryName text, " +
                "countryCurrency text, " +
                "exchangeRateDolar real, " +
                "status text);");


            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Hierarchies (" +
                "hierarchyId integer primary key, " +
                "name text, " +
                "description text, " +
                "order integer, " +
                "status text);");


            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Positions (" +
                "positionId integer primary key, " +
                "name text, " +
                "description text, " +
                "areaId integer, " +
                "sectorId integer, " +
                "heriarchyId integer, " +
                "average integer, " +
                "junior integer, " +
                "semisenior integer, " +
                "senior integer, " +
                "order integer, " +
                "countryId integer, " +
                "status text);");


            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Profiles (" +
                "profileId integer primary key, " +
                "name text, " +
                "date text, " +
                "areaId integer, " +
                "sectorId integer, " +
                "hierarchyId integer, " +
                "seniorityId integer, " +
                "amount integer, " +
                "positionId integer, " +
                "countryId integer, " +
                "uploaded integer, " +
                "status text);");


            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Sectors (" +
                "sectorId integer primary key, " +
                "areaId integer, " +
                "name text, " +
                "description text, " +
                "order integer, " +
                "status text);");


            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Seniorities (" +
                "seniorityId integer primary key, " +
                "name text, " +
                "description text, " +
                "order integer, " +
                "status text);");

            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Sync (" +
                "syncId integer primary key, " +
                "date text, " +
                "status text);");



            var query = "SELECT Sync.date FROM Sync WHERE Sync.syncId = '1'";
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                if (res.rows.length == 0) {

                    var insertSync = "INSERT INTO Sync (syncId, date, status) VALUES(1, '2015-05-15 00:00:00', 'ACTIVE')";
                    //var insertSync = "INSERT INTO Sync (syncId, date, status) VALUES(1, datetime('now','localtime'), 'ACTIVE')";



                    var insertAreas = "INSERT INTO Areas (areaId, name, description, order, coef_peq, coef_med, coef_grand, coef_min, coef_max, status) VALUES();";

                    var insertSectors = "INSERT INTO Sectors (seniorityId, name, description, order, status) VALUES();";

                    var insertHierarchies = "INSERT INTO Hierarchies (hierarchyId, name, description, order, status) VALUES();";

                    var insertSeniorities = "INSERT INTO Seniorities (seniorityId, name, description, order, status) VALUES()";

                    var insertCountries = "INSERT INTO Countries (countryId, countryName, countryCurrency, exchangeRateDolar, status) VALUES (1, 'Argentina', 'Pesos', 8.9, 'ACTIVE');";



                    var insertPositions1 = "INSERT INTO Positions (positionId, name, description, average, max, min, small, medium, large, status) VALUES()";
                    var insertPositions2 = "INSERT INTO Positions (positionId, name, description, average, max, min, small, medium, large, status) VALUES()";
                    var insertPositions3 = "INSERT INTO Positions (positionId, name, description, average, max, min, small, medium, large, status) VALUES()";
                    var insertPositions4 = "INSERT INTO Positions (positionId, name, description, average, max, min, small, medium, large, status) VALUES()";




                    $cordovaSQLite.execute(db, insertSync);
                    $cordovaSQLite.execute(db, insertAreas);
                    $cordovaSQLite.execute(db, insertSectors);
                    $cordovaSQLite.execute(db, insertHierarchies);
                    $cordovaSQLite.execute(db, insertSeniorities);
                    $cordovaSQLite.execute(db, insertCountries);

                    $cordovaSQLite.execute(db, insertPositions1);
                    $cordovaSQLite.execute(db, insertPositions2);
                    $cordovaSQLite.execute(db, insertPositions3);
                    $cordovaSQLite.execute(db, insertPositions4);

                    alert("inserted on db");
                } else {
                    var date = res.rows.item(0).date;
                    alert("Data Allready on db date: "+date);
                }


            }, function (err) {
                console.error(err);
                alert(JSON.stringify(err));
            });



        });
    })


    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.areas', {
                url: "/areas/:amount",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c1_areas.html",
                        controller: 'AreasCtrl'
                    }
                }
            })

            .state('app.hierarchies', {
                url: "/hierarchies/:areaId/:areaName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c1_hierarchies.html",
                        controller: 'HierarchiesCtrl'
                    }
                }
            })

            .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/*browse.html"
                    }
                }
            })

            .state('app.data', {
                url: "/data",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c2_data.html",
                        controller: 'DataCtrl'
                    }
                }
            })



            .state('app.intro', {
                url: "/intro",
                views: {
                    'menuContent': {
                        templateUrl: "templates/intro.html"
                    }
                }
            })


            .state('app.main', {
                url: "/main",
                views: {
                    'menuContent': {
                        templateUrl: "templates/main.html"
                    }
                }
            })


            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/*search.html",
                        controller: 'SearchCtrl'
                    }
                }
            })

            .state('app.devtest', {
                url: "/devtest",
                views: {
                    'menuContent': {
                        templateUrl: "templates/devtest.html",
                        controller: 'TestSQLCtrl'
                    }
                }
            })


            .state('app.seniorities', {
                url: "/seniorities/:hierarchyId/:hierarchyName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c2_seniorities.html",
                        controller: 'SenioritiesCtrl'
                    }
                }
            })

            .state('app.positions', {
                url: "/positions/:seniorityId/:seniorityName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/*positions.html",
                        controller: 'PositionsCtrl'
                    }
                }
            })

            .state('app.analysis', {
                url: "/analysis/:positionId/:positionName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c2_analysis.html",
                        controller: 'AnalysisCtrl'
                    }
                }
            })


            .state('app.profileVsSearch', {
                url: "/profileVsSearch",
                views: {
                    'menuContent': {
                        templateUrl: "templates/*profileVsSearch.html",
                        controller: 'ProfileVsSearchCtrl'
                    }
                }
            })

            .state('app.profileVsResult', {
                url: "/profileVsResult",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c3_profileVsResult.html",
                        controller: 'ProfileVsResultCtrl'
                    }
                }
            })

            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile.html",
                        controller: 'ProfileCtrl'
                    }
                }
            })


            .state('app.profileVsPyramid', {
                url: "/profileVsPyramid",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c4_profileVsPyramid.html",
                        controller: 'ProfileVsPyramidCtrl'
                    }
                }
            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/data');
    });