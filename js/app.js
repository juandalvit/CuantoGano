// Ionic Starter App

var db = null;


var profileData = {};
var consultData = {};
var profileVsResultData = {};

localStorage.setItem("profileData", JSON.stringify(profileData));
localStorage.setItem("consultData", JSON.stringify(consultData));
localStorage.setItem("profileVsResultData", JSON.stringify(profileVsResultData));

/*var profileData = {
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




localStorage.setItem("profileData", JSON.stringify(profileData));*/

/*var consultData = {
    areaId: 0,
    areaName: '',
    sectorId: 0,
    sectorName: '',
    hierarchyId: 0,
    hierarchyName: 0,
};

localStorage.setItem("consultData", JSON.stringify(consultData));*/



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
                $cordovaSQLite.deleteDB("CuantoGanoDBv1.3");

                db = $cordovaSQLite.openDB("CuantoGanoDBv1.3");

            }else{


                db = window.openDatabase("CuantoGanoDBv1.37", '1', 'my', 1024 * 1024 * 100); // browser


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
                "orden integer, " +
                "coef_peq real, " +
                "coef_med real, " +
                "coef_grand real, " +
                "coef_min real, " +
                "coef_max real, " +
                "status text)");
                




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
                "orden integer, " +
                "status text);");



            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Positions (" +
                "positionId integer primary key, " +
                "name text, " +
                "description text, " +
                "areaId integer, " +
                "sectorId integer, " +
                "hierarchyId integer, " +
                "average integer, " +
                "junior integer, " +
                "semisenior integer, " +
                "senior integer, " +
                "orden integer, " +
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
                "orden integer, " +
                "status text);");


            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Seniorities (" +
                "seniorityId integer primary key, " +
                "name text, " +
                "description text, " +
                "orden integer, " +
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



                    var insertAreas = "INSERT INTO Areas (areaId, name, description, orden, coef_peq, coef_med, coef_grand, coef_min, coef_max, status) VALUES(1, 'Administracion de proyectos', 'Administracion de proyectos Administracion de proy', 1, 0.8, 1, 1.1, 0.8, 1.2, 'ACTIVE'),(2, 'Asuntos regulatorios y relaciones gubernamentales', 'Asuntos regulatorios y relaciones gubernamentales ', 2, 0.8, 1, 1.1, 0.8, 1.2, 'ACTIVE');";

                    var insertSectors = "INSERT INTO Sectors (sectorId, areaId, name, description, orden, status) VALUES(1, 1, 'adm proy sect 1', 'desc adm proy sect 1', 1, 'ACTIVE'),(2, 1, 'adm proy sect 2', 'desc adm proy sect 2', 2, 'ACTIVE'), (3, 2, 'Asunt reg sec 1', 'desc Asunt reg sec 1', 2, 'ACTIVE'), (4, 2, 'Asunt reg sec 2', 'desc Asunt reg sec 2', 1, 'ACTIVE');";

                    var insertHierarchies = "INSERT INTO Hierarchies (hierarchyId, name, description, orden, status) VALUES(1, 'Analista', 'Analista Analista Analista Analista Analista Anali', NULL, 'ACTIVE'),(2, 'Asistente', 'Asistente Asistente Asistente Asistente Asistente ', NULL, 'ACTIVE');";

                    var insertSeniorities = "INSERT INTO Seniorities (seniorityId, name, description, orden, status) VALUES(1, 'Junior', 'Junior Junior Junior Junior Junior Junior Junior ', NULL, 'ACTIVE'),(2, 'Semi senior', 'Semi senior Semi senior Semi senior Semi senior Se', NULL, 'ACTIVE'),(3, 'Senior', 'Senior Senior Senior Senior Senior Senior Senior ', NULL, 'ACTIVE')";

                    var insertCountries = "INSERT INTO Countries (countryId, countryName, countryCurrency, exchangeRateDolar, status) VALUES (1, 'Argentina', 'Pesos', 8.9, 'ACTIVE');";






                    var insertPositions1 = "INSERT INTO Positions (positionId, name, description, areaId, sectorId, hierarchyId, average, junior, semisenior, senior, orden, countryId, status) VALUES" +
                        "(1, NULL, NULL, 1, 1, 1, 10000, 8000, 9500, 11200, 1, 1, 'ACTIVE')," +
                        "(2, NULL, NULL, 1, 1, 2, 15000, 13000, 15000, 15500, 2, 1, 'ACTIVE')," +
                        "(3, NULL, NULL, 2, 3, 1, 20000, 19000, 20000, 22000, 1, 1, 'ACTIVE')," +
                        "(4, NULL, NULL, 2, 3, 2, 25000, 22000, 25500, 27000, 2, 1, 'ACTIVE')," +
                        "(5, NULL, NULL, 1, 2, 1, 10000, 8000, 9500, 11200, 1, 1, 'ACTIVE')," +
                        "(6, NULL, NULL, 1, 2, 2, 15000, 13000, 15000, 15500, 2, 1, 'ACTIVE')," +
                        "(7, NULL, NULL, 2, 4, 1, 20000, 19000, 20000, 22000, 1, 1, 'ACTIVE')," +
                        "(8, NULL, NULL, 2, 4, 2, 25000, 22000, 25500, 27000, 2, 1, 'ACTIVE');";
                    var insertPositions2 = "INSERT INTO Positions (positionId, name, description, areaId, sectorId, hierarchyId, average, junior, semisenior, senior, orden, countryId, status) VALUES()";
                    var insertPositions3 = "INSERT INTO Positions (positionId, name, description, areaId, sectorId, hierarchyId, average, junior, semisenior, senior, orden, countryId, status) VALUES()";
                    var insertPositions4 = "INSERT INTO Positions (positionId, name, description, areaId, sectorId, hierarchyId, average, junior, semisenior, senior, orden, countryId, status) VALUES()";




                    $cordovaSQLite.execute(db, insertSync);
                    $cordovaSQLite.execute(db, insertAreas);
                    $cordovaSQLite.execute(db, insertSectors);
                    $cordovaSQLite.execute(db, insertHierarchies);
                    $cordovaSQLite.execute(db, insertSeniorities);
                    $cordovaSQLite.execute(db, insertCountries);

                    $cordovaSQLite.execute(db, insertPositions1);
                    //$cordovaSQLite.execute(db, insertPositions2);
                    //$cordovaSQLite.execute(db, insertPositions3);
                    //$cordovaSQLite.execute(db, insertPositions4);

                    //alert("inserted on db");
                } else {
                    var date = res.rows.item(0).date;
                    //alert("Data Allready on db date: "+date);
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

            .state('app.main', {
                url: "/main",
                views: {
                    'menuContent': {
                        templateUrl: "templates/main.html"
                    }
                }
            })

            .state('app.c1_areas', {
                url: "/c1_areas",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c1_areas.html",
                        controller: 'c1_areasCtrl'
                    }
                }

            })


            .state('app.c1_sectors', {
                url: "/c1_sectors/:areaId/:areaName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c1_sectors.html",
                        controller: 'c1_sectorsCtrl'
                    }
                }

            })


            .state('app.c1_hierarchies', {
                url: "/c1_hierarchies/:sectorId/:sectorName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c1_hierarchies.html",
                        controller: 'c1_hierarchiesCtrl'
                    }
                }
            })

            .state('app.c1_consultResult', {
                url: "/c1_consultResult/:hierarchyId/:hierarchyName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c1_consultResult.html",
                        controller: 'c1_consultResultCtrl'
                    }
                }
            })

            .state('app.c2_areas', {
                url: "/c2_areas",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c2_areas.html",
                        controller: 'c2_areasCtrl'
                    }
                }
            })


            .state('app.c2_sectors', {
                url: "/c2_sectors/:areaId/:areaName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c2_sectors.html",
                        controller: 'c2_sectorsCtrl'
                    }
                }
            })


            .state('app.c2_hierarchies', {
                url: "/c2_hierarchies/:sectorId/:sectorName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c2_hierarchies.html",
                        controller: 'c2_hierarchiesCtrl'
                    }
                }
            })

            .state('app.c2_seniorities', {
                url: "/c2_seniorities/:hierarchyId/:hierarchyName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c2_seniorities.html",
                        controller: 'c2_senioritiesCtrl'
                    }
                }
            })

            .state('app.c2_data', {
                url: "/c2_data/:seniorityId/:seniorityName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c2_data.html",
                        controller: 'c2_dataCtrl'
                    }
                }
            })

            .state('app.c2_analysis', {
                url: "/c2_analysis/:amount",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c2_analysis.html",
                        controller: 'c2_analysisCtrl'
                    }
                }
            })

            .state('app.c3_areas', {
                url: "/c3_areas",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c3_areas.html",
                        controller: 'c3_areasCtrl'
                    }
                }
            })


            .state('app.c3_sectors', {
                url: "/c3_sectors/:areaId/:areaName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c3_sectors.html",
                        controller: 'c3_sectorsCtrl'
                    }
                }
            })


            .state('app.c3_hierarchies', {
                url: "/c3_hierarchies/:sectorId/:sectorName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c3_hierarchies.html",
                        controller: 'c3_hierarchiesCtrl'
                    }
                }
            })

            .state('app.c3_seniorities', {
                url: "/c3_seniorities/:hierarchyId/:hierarchyName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c3_seniorities.html",
                        controller: 'c3_senioritiesCtrl'
                    }
                }
            })

            .state('app.c3_profileVsResult', {
                url: "/c3_profileVsResult/:seniorityId/:seniorityName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c3_profileVsResult.html",
                        controller: 'c3_profileVsResultCtrl'
                    }
                }
            })


            .state('app.c4_profileVsPyramid', {
                url: "/c4_profileVsPyramid",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c4_profileVsPyramid.html",
                        controller: 'c4_profileVsPyramidCtrl'
                    }
                }
            })



            .state('app.help', {
                url: "/help",
                views: {
                    'menuContent': {
                        templateUrl: "templates/help.html"
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

            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile.html",
                        controller: 'profileCtrl'
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
            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/main');
    });