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

            if(window.AdMob) {

                // Detect platform
                var adMobId = "";
                if ( /(android)/i.test(navigator.userAgent ) ) { // for android
                    adMobId = "ca-app-pub-8185646918327384/6127887751";
                } else if( /(ipod|iphone|ipad)/i.test(navigator.userAgent) ) { // for ios
                    adMobId = "ca-app-pub-8185646918327384/9081354156";
                }


                //banner Options
             /*   window.AdMob.setOptions({
                    // adSize: 'SMART_BANNER',
                    // width: integer, // valid when set adSize 'CUSTOM'
                    // height: integer, // valid when set adSize 'CUSTOM'
                    position: AdMob.AD_POSITION.BOTTOM_CENTER,
                    // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
                    bgColor: 'black', // color name, or '#RRGGBB'
                    // x: integer,		// valid when set position to 0 / POS_XY
                    // y: integer,		// valid when set position to 0 / POS_XY
                    //isTesting: true, // set to true, to receiving test ad for testing purpose
                    autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show

                });*/

                // Create banner
                window.AdMob.createBanner({
                    adId: adMobId,
                    position: AdMob.AD_POSITION.BOTTOM_CENTER,
                    adSize: AdMob.AD_SIZE.SMART_BANNER,
                    autoShow: true
                    },
                    function(){
                        //alert("Success Ad");
                        AdMob.requestAd(
                            { 'isTesting': false },
                            function() {
                                AdMob.showAd(true);
                            },
                            function() { alert('failed to request ad'); }
                        );
                    },
                    function(error){
                        alert("Error ad: "+error);
                    }

                );
            }

            /*
            if(window.AdMob) {
                var admob_key = device.platform == "Android" ? "ca-app-pub-8185646918327384/6127887751" : "ca-app-pub-8185646918327384/9081354156";
                var admob = window.AdMob;
                admob.createBannerView(
                    {
                        'publisherId': admob_key,
                        'adSize': admob.AD_SIZE.SMART_BANNER,
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
            }*/

            if(typeof analytics !== undefined) {
                analytics.startTrackerWithId("UA-63703895-1");
            } else {
                alert("Google Analytics Unavailable");
            }


            if (window.cordova) {

                //Clean DB
                $cordovaSQLite.deleteDB("CuantoGanoDBv2.2");

                db = $cordovaSQLite.openDB("CuantoGanoDBv2.2");

                //alert("Cordoba DB");

            }else{


                db = window.openDatabase("CuantoGanoDBv2.2", '1', 'my', 1024 * 1024 * 100); // browser


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
                "coef_peq real, " +
                "coef_med real, " +
                "coef_grand real, " +
                "coef_min real, " +
                "coef_max real, " +
                "coef_junior real, " +
                "coef_pleno real, " +
                "coef_senior real, " +
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
                "orden integer, " +
                "countryId integer, " +
                "internalCode text, " +
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



                    var insertAreas = "INSERT INTO Areas (areaId, name, description, orden, status) VALUES(1, 'Administracion de proyectos', 'desc: Administracion de proyectos', 1, 'ACTIVE'),(2, 'Arquitectura', 'desc: Arquitectura', 2, 'ACTIVE'),(3, 'Asunt Reg y Rel Gubernamentales', 'desc: Asunt Reg y Rel Gubernamentales', 3, 'ACTIVE'),(4, 'Atencion al cliente', 'desc: Atencion al cliente', 4, 'ACTIVE'),(5, 'Comercial & Ventas', 'desc: Comercial & Ventas', 5, 'ACTIVE'),(6, 'Comercio Exterior', 'desc: Comercio Exterior', 6, 'ACTIVE'),(7, 'Compras y Abastecimiento', 'desc: Compras y Abastecimiento', 7, 'ACTIVE'),(8, 'Diseño', 'desc: Diseño', 8, 'ACTIVE'),(9, 'Educación y Psicopedagogía', 'desc: Educación y Psicopedagogía', 9, 'ACTIVE'),(10, 'Estética y Cuidado Personal', 'desc: Estética y Cuidado Personal', 10, 'ACTIVE'),(11, 'Finanzas', 'desc: Finanzas', 11, 'ACTIVE'),(12, 'Gastronomía', 'desc: Gastronomía', 12, 'ACTIVE'),(13, 'Gerencia General & Dirección', 'desc: Gerencia General & Dirección', 13, 'ACTIVE'),(14, 'Legales', 'desc: Legales', 14, 'ACTIVE'),(15, 'Logística y Almacenamiento', 'desc: Logística y Almacenamiento', 15, 'ACTIVE'),(16, 'Marketing y Publicidad', 'desc: Marketing y Publicidad', 16, 'ACTIVE'),(17, 'Medios y Comunicación', 'desc: Medios y Comunicación', 17, 'ACTIVE'),(18, 'Música & Arte & Cultura', 'desc: Música & Arte & Cultura', 18, 'ACTIVE'),(19, 'Pasantías', 'desc: Pasantías', 19, 'ACTIVE'),(20, 'Producción', 'desc: Producción', 20, 'ACTIVE'),(21, 'Puestos Operativos & Otros', 'desc: Puestos Operativos & Otros', 21, 'ACTIVE'),(22, 'Recepción & Secretaria', 'desc: Recepción & Secretaria', 22, 'ACTIVE'),(23, 'Recursos Humanos', 'desc: Recursos Humanos', 23, 'ACTIVE'),(24, 'Salud', 'desc: Salud', 24, 'ACTIVE'),(25, 'Sistemas IT IS', 'desc: Sistemas IT IS', 25, 'ACTIVE')";

                    var insertSectors = "INSERT INTO Sectors (sectorId, areaId, name, description, orden, status) VALUES(1, 15, 'Abastecimiento', 'desc: Abastecimiento', 1, 'ACTIVE'),(2, 11, 'Administración', 'desc: Administración', 2, 'ACTIVE'),(3, 25, 'Administración de Base de Datos', 'desc: Administración de Base de Datos', 3, 'ACTIVE'),(4, 23, 'Administración de Personal', 'desc: Administración de Personal', 4, 'ACTIVE'),(5, 11, 'Administración de Ventas', 'desc: Administración de Ventas', 5, 'ACTIVE'),(6, 6, 'Aduana & Despachante de Aduana', 'desc: Aduana & Despachante de Aduana', 6, 'ACTIVE'),(7, 15, 'Almacen', 'desc: Almacen', 7, 'ACTIVE'),(8, 15, 'Almacén & Depósito & Expedición', 'desc: Almacén & Depósito & Expedición', 8, 'ACTIVE'),(9, 13, 'Alta dirección', 'desc: Alta dirección', 9, 'ACTIVE'),(10, 11, 'Análisis de Riesgos', 'desc: Análisis de Riesgos', 10, 'ACTIVE'),(11, 25, 'Análisis Funcional & Proyect Leader', 'desc: Análisis Funcional & Proyect Leader', 11, 'ACTIVE'),(12, 2, 'Arquitectura', 'desc: Arquitectura', 12, 'ACTIVE'),(13, 3, 'Asuntos regulatorios', 'desc: Asuntos regulatorios', 13, 'ACTIVE'),(14, 22, 'Atención al cliente', 'desc: Atención al cliente', 14, 'ACTIVE'),(15, 4, 'Atención Al Consumidor (B2C)', 'desc: Atención Al Consumidor (B2C)', 15, 'ACTIVE'),(16, 11, 'Auditoría', 'desc: Auditoría', 16, 'ACTIVE'),(17, 21, 'Back Office', 'desc: Back Office', 17, 'ACTIVE'),(18, 11, 'Banca Inversora', 'desc: Banca Inversora', 18, 'ACTIVE'),(19, 16, 'Business Intelligence', 'desc: Business Intelligence', 19, 'ACTIVE'),(20, 21, 'Caja', 'desc: Caja', 20, 'ACTIVE'),(21, 20, 'Calidad', 'desc: Calidad', 21, 'ACTIVE'),(22, 12, 'Camareros', 'desc: Camareros', 22, 'ACTIVE'),(23, 23, 'Capacitación y Desarrollo', 'desc: Capacitación y Desarrollo', 23, 'ACTIVE'),(24, 5, 'Comercial & Ventas', 'desc: Comercial & Ventas', 24, 'ACTIVE'),(25, 6, 'Comercio Exterior', 'desc: Comercio Exterior', 25, 'ACTIVE'),(26, 15, 'Compras', 'desc: Compras', 26, 'ACTIVE'),(27, 7, 'Compras y Abastecimiento', 'desc: Compras y Abastecimiento', 27, 'ACTIVE'),(28, 23, 'Comunicaciones internas', 'desc: Comunicaciones internas', 28, 'ACTIVE'),(29, 11, 'Contabilidad', 'desc: Contabilidad', 29, 'ACTIVE'),(30, 20, 'Control de Calidad', 'desc: Control de Calidad', 30, 'ACTIVE'),(31, 11, 'Control de gestión y Presupuesto', 'desc: Control de gestión y Presupuesto', 31, 'ACTIVE'),(32, 15, 'Control de inventario', 'desc: Control de inventario', 32, 'ACTIVE'),(33, 11, 'Control Financiero - Contralor', 'desc: Control Financiero - Contralor', 33, 'ACTIVE'),(34, 13, 'Corporate & Finanzas', 'desc: Corporate & Finanzas', 34, 'ACTIVE'),(35, 11, 'Costos', 'desc: Costos', 35, 'ACTIVE'),(36, 11, 'Créditos y Cobranzas', 'desc: Créditos y Cobranzas', 36, 'ACTIVE'),(37, 11, 'Cuentas Corrientes', 'desc: Cuentas Corrientes', 37, 'ACTIVE'),(38, 21, 'Data Entry', 'desc: Data Entry', 38, 'ACTIVE'),(39, 25, 'Data Warehousing', 'desc: Data Warehousing', 39, 'ACTIVE'),(40, 5, 'Desarrollo de Negocios', 'desc: Desarrollo de Negocios', 40, 'ACTIVE'),(41, 2, 'Dirección de Obra', 'desc: Dirección de Obra', 41, 'ACTIVE'),(42, 8, 'Diseño Gráfico', 'desc: Diseño Gráfico', 42, 'ACTIVE'),(43, 8, 'Diseño Multimedia', 'desc: Diseño Multimedia', 43, 'ACTIVE'),(44, 8, 'Diseño Web', 'desc: Diseño Web', 44, 'ACTIVE'),(45, 5, 'E-Commerce', 'desc: E-Commerce', 45, 'ACTIVE'),(46, 9, 'Educación', 'desc: Educación', 46, 'ACTIVE'),(47, 24, 'Enfermera', 'desc: Enfermera', 47, 'ACTIVE'),(48, 5, 'Entrenamiento De Ventas', 'desc: Entrenamiento De Ventas', 48, 'ACTIVE'),(49, 10, 'Estética y Cuidado Personal', 'desc: Estética y Cuidado Personal', 49, 'ACTIVE'),(50, 11, 'Evaluación Económica', 'desc: Evaluación Económica', 50, 'ACTIVE'),(51, 11, 'Facturación', 'desc: Facturación', 51, 'ACTIVE'),(52, 11, 'Finanzas', 'desc: Finanzas', 52, 'ACTIVE'),(53, 12, 'Gastronomía', 'desc: Gastronomía', 53, 'ACTIVE'),(54, 13, 'Gerencia General', 'desc: Gerencia General', 54, 'ACTIVE'),(55, 1, 'Gestion proyectos', 'desc: Gestion proyectos', 55, 'ACTIVE'),(56, 11, 'Impuestos', 'desc: Impuestos', 56, 'ACTIVE'),(57, 16, 'Investigación de Mercado', 'desc: Investigación de Mercado', 57, 'ACTIVE'),(58, 20, 'Investigación y Desarrollo', 'desc: Investigación y Desarrollo', 58, 'ACTIVE'),(59, 19, 'Jóvenes Profesionales', 'desc: Jóvenes Profesionales', 59, 'ACTIVE'),(60, 14, 'Legales', 'desc: Legales', 60, 'ACTIVE'),(61, 15, 'Logistica', 'desc: Logistica', 61, 'ACTIVE'),(62, 15, 'Logística y Distribución', 'desc: Logística y Distribución', 62, 'ACTIVE'),(63, 20, 'Mantenimiento de planta', 'desc: Mantenimiento de planta', 63, 'ACTIVE'),(64, 21, 'Mantenimiento y Limpieza', 'desc: Mantenimiento y Limpieza', 64, 'ACTIVE'),(65, 16, 'Marketing', 'desc: Marketing', 65, 'ACTIVE'),(66, 16, 'Marketing Online & Digital', 'desc: Marketing Online & Digital', 66, 'ACTIVE'),(67, 24, 'Medico', 'desc: Medico', 67, 'ACTIVE'),(68, 18, 'Música & Arte & Cultura', 'desc: Música & Arte & Cultura', 68, 'ACTIVE'),(69, 20, 'Operaciones', 'desc: Operaciones', 69, 'ACTIVE'),(70, 13, 'Operaciones & Logística', 'desc: Operaciones & Logística', 70, 'ACTIVE'),(71, 3, 'Organización de Eventos', 'desc: Organización de Eventos', 71, 'ACTIVE'),(72, 23, 'Organización y Métodos', 'desc: Organización y Métodos', 72, 'ACTIVE'),(73, 19, 'Pasantía & Trainee', 'desc: Pasantía & Trainee', 73, 'ACTIVE'),(74, 17, 'Periodismo', 'desc: Periodismo', 74, 'ACTIVE'),(75, 5, 'Planeamiento comercial', 'desc: Planeamiento comercial', 75, 'ACTIVE'),(76, 11, 'Planeamiento económico-financiero', 'desc: Planeamiento económico-financiero', 76, 'ACTIVE'),(77, 13, 'Planificación Estratégica', 'desc: Planificación Estratégica', 77, 'ACTIVE'),(78, 20, 'Producción', 'desc: Producción', 78, 'ACTIVE'),(79, 17, 'Producción Audiovisual', 'desc: Producción Audiovisual', 79, 'ACTIVE'),(80, 16, 'Producto', 'desc: Producto', 80, 'ACTIVE'),(81, 25, 'Programación', 'desc: Programación', 81, 'ACTIVE'),(82, 20, 'Programación de producción', 'desc: Programación de producción', 82, 'ACTIVE'),(83, 21, 'Promotoras&es', 'desc: Promotoras&es', 83, 'ACTIVE'),(84, 9, 'Psicopedagogía', 'desc: Psicopedagogía', 84, 'ACTIVE'),(85, 16, 'Publicidad', 'desc: Publicidad', 85, 'ACTIVE'),(86, 22, 'Recepción', 'desc: Recepción', 86, 'ACTIVE'),(87, 23, 'Recursos Humanos', 'desc: Recursos Humanos', 87, 'ACTIVE'),(88, 25, 'Redes', 'desc: Redes', 88, 'ACTIVE'),(89, 3, 'Relaciones Institucionales & Públicas', 'desc: Relaciones Institucionales & Públicas', 89, 'ACTIVE'),(90, 11, 'Relaciones Inversionistas', 'desc: Relaciones Inversionistas', 90, 'ACTIVE'),(91, 23, 'Relaciones Laborales', 'desc: Relaciones Laborales', 91, 'ACTIVE'),(92, 3, 'Relaciones publicas', 'desc: Relaciones publicas', 92, 'ACTIVE'),(93, 23, 'Remuneraciones & Compen. y Beneficios', 'desc: Remuneraciones & Compen. y Beneficios', 93, 'ACTIVE'),(94, 24, 'Salud', 'desc: Salud', 94, 'ACTIVE'),(95, 22, 'Secretaria & Asistente', 'desc: Secretaria & Asistente', 95, 'ACTIVE'),(96, 21, 'Seguridad', 'desc: Seguridad', 96, 'ACTIVE'),(97, 20, 'Seguridad Industrial & Higiene & Medio Ambiente', 'desc: Seguridad Industrial & Higiene & Medio Ambiente', 97, 'ACTIVE'),(98, 25, 'Seguridad Informática', 'desc: Seguridad Informática', 98, 'ACTIVE'),(99, 11, 'Seguros & Análisis de Siniestros', 'desc: Seguros & Análisis de Siniestros', 99, 'ACTIVE'),(100, 23, 'Selección y Empleos', 'desc: Selección y Empleos', 100, 'ACTIVE'),(101, 4, 'Servicio Al Cliente', 'desc: Servicio Al Cliente', 101, 'ACTIVE'),(102, 4, 'Servicios Al Cliente - (B2B)', 'desc: Servicios Al Cliente - (B2B)', 102, 'ACTIVE'),(103, 4, 'Servicios Al Cliente (B2B)', 'desc: Servicios Al Cliente (B2B)', 103, 'ACTIVE'),(104, 25, 'Sistemas', 'desc: Sistemas', 104, 'ACTIVE'),(105, 25, 'Soporte Técnico & Mesa de Ayuda', 'desc: Soporte Técnico & Mesa de Ayuda', 105, 'ACTIVE'),(106, 25, 'Tecnología & Infraestructura', 'desc: Tecnología & Infraestructura', 106, 'ACTIVE'),(107, 22, 'Telefonista', 'desc: Telefonista', 107, 'ACTIVE'),(108, 5, 'Telemarketing', 'desc: Telemarketing', 108, 'ACTIVE'),(109, 11, 'Tesorería', 'desc: Tesorería', 109, 'ACTIVE'),(110, 25, 'Testing & QA & QC', 'desc: Testing & QA & QC', 110, 'ACTIVE'),(111, 17, 'Traducción', 'desc: Traducción', 111, 'ACTIVE'),(112, 21, 'Transporte', 'desc: Transporte', 112, 'ACTIVE'),(113, 13, 'Unidad & División Negocios', 'desc: Unidad & División Negocios', 113, 'ACTIVE'),(114, 24, 'Veterinaria', 'desc: Veterinaria', 114, 'ACTIVE')";

                    var insertHierarchies = "INSERT INTO Hierarchies (hierarchyId, name, description, coef_peq, coef_med, coef_grand, coef_min, coef_max, coef_junior, coef_pleno, coef_senior, orden, status) VALUES(1, 'Analista', 'desc: Analista', 0.85, 1.16, 1.38, 0.75, 1.34, 0.79, 1.06, 1.37, 7, 'ACTIVE'),(2, 'Asistente', 'desc: Asistente', 0.76, 1.3, 1.5, 0.62, 1.63, 0.63, 1.04, 1.24, 5, 'ACTIVE'),(3, 'Auxiliar', 'desc: Auxiliar', 0.77, 1.28, 1.48, 0.64, 1.59, 0.86, 1.03, 1.1, 2, 'ACTIVE'),(4, 'Consultor & Asesor', 'desc: Consultor & Asesor', 0.8, 1.23, 1.41, 0.68, 1.5, 0.52, 1.21, 2.72, 10, 'ACTIVE'),(5, 'Director', 'desc: Director', 0.8, 1.23, 1.47, 0.68, 1.49, 0.87, 1.05, 1.11, 13, 'ACTIVE'),(6, 'Ejecutivo de ventas', 'desc: Ejecutivo de ventas', 0.82, 1.2, 1.55, 0.71, 1.43, 0.65, 1.04, 1.27, 8, 'ACTIVE'),(7, 'Gerente', 'desc: Gerente', 0.84, 1.17, 1.41, 0.74, 1.36, 0.82, 1.03, 1.37, 12, 'ACTIVE'),(8, 'Jefe & Supervisor', 'desc: Jefe & Supervisor', 0.85, 1.15, 1.39, 0.76, 1.33, 0.84, 1.07, 1.23, 11, 'ACTIVE'),(9, 'Oficio', 'desc: Oficio', 0.54, 1.83, 2.04, 0.37, 2.72, 0.72, 1.06, 1.39, 3, 'ACTIVE'),(10, 'Operario', 'desc: Operario', 0.76, 1.29, 1.64, 0.63, 1.61, 0.45, 1.06, 1.08, 1, 'ACTIVE'),(11, 'Profesional', 'desc: Profesional', 0.8, 1.23, 1.48, 0.68, 1.49, 0.75, 1.11, 1.37, 9, 'ACTIVE'),(12, 'Secretaria', 'desc: Secretaria', 0.88, 1.12, 1.31, 0.8, 1.26, 0.91, 1.06, 1.55, 4, 'ACTIVE'),(13, 'Tecnico', 'desc: Tecnico', 0.83, 1.19, 1.41, 0.72, 1.4, 0.72, 1.07, 1.35, 6, 'ACTIVE')";

                    var insertSeniorities = "INSERT INTO Seniorities (seniorityId, name, description, orden, status) VALUES(1, 'Junior', 'Junior Junior Junior Junior Junior Junior Junior ', NULL, 'ACTIVE'),(2, 'Semi senior', 'Semi senior Semi senior Semi senior Semi senior Se', NULL, 'ACTIVE'),(3, 'Senior', 'Senior Senior Senior Senior Senior Senior Senior ', NULL, 'ACTIVE')";

                    var insertCountries = "INSERT INTO Countries (countryId, countryName, countryCurrency, exchangeRateDolar, status) VALUES (1, 'Argentina', 'Pesos', 8.9, 'ACTIVE');";






                    var insertPositions1 = "INSERT INTO Positions (positionId, name, description, areaId, sectorId, hierarchyId, average, orden, countryId, internalCode, status) VALUES(1, '', '', 11, 2, 1, 13800, 1, 1, 'N23', 'ACTIVE'),(2, '', '', 11, 2, 2, 12400, 2, 1, 'N178', 'ACTIVE'),(3, '', '', 11, 2, 3, 11600, 3, 1, 'N197', 'ACTIVE'),(4, '', '', 11, 2, 4, 19100, 4, 1, 'N190', 'ACTIVE'),(5, '', '', 11, 2, 5, 100900, 5, 1, 'N244', 'ACTIVE'),(6, '', '', 11, 2, 7, 46900, 6, 1, 'N297', 'ACTIVE'),(7, '', '', 11, 2, 8, 27900, 7, 1, 'N562', 'ACTIVE'),(8, '', '', 11, 2, 11, 16600, 8, 1, 'N234', 'ACTIVE'),(9, '', '', 11, 5, 1, 19800, 9, 1, 'N28', 'ACTIVE'),(10, '', '', 11, 5, 2, 12400, 10, 1, 'N178', 'ACTIVE'),(11, '', '', 11, 5, 3, 11600, 11, 1, 'N197', 'ACTIVE'),(12, '', '', 11, 5, 4, 19100, 12, 1, 'N190', 'ACTIVE'),(13, '', '', 11, 5, 7, 45800, 13, 1, 'N300', 'ACTIVE'),(14, '', '', 11, 5, 8, 28400, 14, 1, 'N567', 'ACTIVE'),(15, '', '', 11, 16, 1, 13800, 15, 1, 'N23', 'ACTIVE'),(16, '', '', 11, 16, 2, 12400, 16, 1, 'N178', 'ACTIVE'),(17, '', '', 11, 16, 3, 11600, 17, 1, 'N197', 'ACTIVE'),(18, '', '', 11, 16, 4, 19100, 18, 1, 'N190', 'ACTIVE'),(19, '', '', 11, 16, 7, 68800, 19, 1, 'N314', 'ACTIVE'),(20, '', '', 11, 16, 8, 35500, 20, 1, 'N572', 'ACTIVE'),(21, '', '', 11, 29, 1, 15800, 21, 1, 'N80', 'ACTIVE'),(22, '', '', 11, 29, 2, 12400, 22, 1, 'N178', 'ACTIVE'),(23, '', '', 11, 29, 3, 11600, 23, 1, 'N197', 'ACTIVE'),(24, '', '', 11, 29, 4, 19100, 24, 1, 'N190', 'ACTIVE'),(25, '', '', 11, 29, 7, 46200, 25, 1, 'N327', 'ACTIVE'),(26, '', '', 11, 29, 8, 30600, 26, 1, 'N582', 'ACTIVE'),(27, '', '', 11, 31, 1, 16400, 27, 1, 'N119', 'ACTIVE'),(28, '', '', 11, 31, 7, 45900, 28, 1, 'N330', 'ACTIVE'),(29, '', '', 11, 31, 8, 30600, 29, 1, 'N584', 'ACTIVE'),(30, '', '', 11, 51, 1, 14100, 30, 1, 'N77', 'ACTIVE'),(31, '', '', 11, 51, 2, 12400, 31, 1, 'N178', 'ACTIVE'),(32, '', '', 11, 51, 3, 11600, 32, 1, 'N197', 'ACTIVE'),(33, '', '', 11, 51, 7, 45800, 33, 1, 'N300', 'ACTIVE'),(34, '', '', 11, 51, 8, 25200, 34, 1, 'N601', 'ACTIVE'),(35, '', '', 11, 56, 1, 17400, 35, 1, 'N86', 'ACTIVE'),(36, '', '', 11, 56, 2, 12400, 36, 1, 'N178', 'ACTIVE'),(37, '', '', 11, 56, 3, 11600, 37, 1, 'N197', 'ACTIVE'),(38, '', '', 11, 56, 4, 19100, 38, 1, 'N190', 'ACTIVE'),(39, '', '', 11, 56, 8, 32500, 39, 1, 'N605', 'ACTIVE'),(40, '', '', 11, 56, 7, 50600, 40, 1, 'N368', 'ACTIVE'),(41, '', '', 11, 99, 1, 16400, 41, 1, 'N119', 'ACTIVE'),(42, '', '', 11, 99, 2, 12400, 42, 1, 'N178', 'ACTIVE'),(43, '', '', 11, 99, 3, 11600, 43, 1, 'N197', 'ACTIVE'),(44, '', '', 11, 99, 8, 37500, 44, 1, 'N638', 'ACTIVE'),(45, '', '', 8, 42, 1, 16000, 45, 1, 'N51', 'ACTIVE'),(46, '', '', 8, 42, 2, 11800, 46, 1, 'N50', 'ACTIVE'),(47, '', '', 8, 42, 3, 11800, 47, 1, 'N50', 'ACTIVE'),(48, '', '', 8, 42, 4, 16000, 48, 1, 'N51', 'ACTIVE'),(49, '', '', 8, 42, 8, 17000, 49, 1, '0', 'ACTIVE'),(50, '', '', 8, 42, 11, 26700, 50, 1, 'N580', 'ACTIVE'),(51, '', '', 8, 42, 13, 16000, 51, 1, 'N51', 'ACTIVE'),(52, '', '', 8, 43, 1, 16000, 52, 1, 'N51', 'ACTIVE'),(53, '', '', 8, 43, 2, 11800, 53, 1, 'N50', 'ACTIVE'),(54, '', '', 8, 43, 3, 11800, 54, 1, 'N50', 'ACTIVE'),(55, '', '', 8, 43, 4, 16000, 55, 1, 'N51', 'ACTIVE'),(56, '', '', 8, 43, 8, 18000, 56, 1, '0', 'ACTIVE'),(57, '', '', 8, 43, 11, 26700, 57, 1, 'N580', 'ACTIVE'),(58, '', '', 8, 43, 13, 16000, 58, 1, 'N51', 'ACTIVE'),(59, '', '', 8, 44, 1, 16000, 59, 1, 'N51', 'ACTIVE'),(60, '', '', 8, 44, 2, 11800, 60, 1, 'N50', 'ACTIVE'),(61, '', '', 8, 44, 3, 11800, 61, 1, 'N50', 'ACTIVE'),(62, '', '', 8, 44, 4, 16000, 62, 1, 'N51', 'ACTIVE'),(63, '', '', 8, 44, 8, 14000, 63, 1, '0', 'ACTIVE'),(64, '', '', 8, 44, 11, 26700, 64, 1, 'N580', 'ACTIVE'),(65, '', '', 8, 44, 13, 16000, 65, 1, 'N51', 'ACTIVE'),(66, '', '', 13, 9, 5, 205100, 66, 1, 'N254', 'ACTIVE'),(67, '', '', 13, 9, 7, 152700, 67, 1, 'N361', 'ACTIVE'),(68, '', '', 13, 54, 5, 205100, 68, 1, 'N254', 'ACTIVE'),(69, '', '', 13, 54, 7, 152700, 69, 1, 'N361', 'ACTIVE'),(70, '', '', 22, 14, 1, 16000, 70, 1, 'N150', 'ACTIVE'),(71, '', '', 22, 14, 2, 11600, 71, 1, 'N185', 'ACTIVE'),(72, '', '', 22, 14, 3, 11600, 72, 1, 'N185', 'ACTIVE'),(73, '', '', 22, 14, 4, 28100, 73, 1, 'N639', 'ACTIVE'),(74, '', '', 22, 14, 7, 39200, 74, 1, 'N432', 'ACTIVE'),(75, '', '', 22, 14, 8, 28100, 75, 1, 'N639', 'ACTIVE'),(76, '', '', 22, 14, 11, 28100, 76, 1, 'N639', 'ACTIVE'),(77, '', '', 22, 14, 12, 15700, 77, 1, 'N556', 'ACTIVE'),(78, '', '', 22, 14, 13, 16000, 78, 1, 'N150', 'ACTIVE'),(79, '', '', 22, 86, 1, 11000, 79, 1, 'N540', 'ACTIVE'),(80, '', '', 22, 86, 2, 11000, 80, 1, 'N540', 'ACTIVE'),(81, '', '', 22, 86, 3, 11000, 81, 1, 'N540', 'ACTIVE'),(82, '', '', 22, 86, 12, 15700, 82, 1, 'N556', 'ACTIVE'),(83, '', '', 22, 95, 1, 15700, 83, 1, 'N556', 'ACTIVE'),(84, '', '', 22, 95, 2, 15700, 84, 1, 'N556', 'ACTIVE'),(85, '', '', 22, 95, 8, 22200, 85, 1, 'N554', 'ACTIVE'),(86, '', '', 22, 95, 11, 22200, 86, 1, 'N554', 'ACTIVE'),(87, '', '', 22, 95, 12, 15700, 87, 1, 'N556', 'ACTIVE'),(88, '', '', 22, 107, 1, 11000, 88, 1, 'N540', 'ACTIVE'),(89, '', '', 22, 107, 2, 11000, 89, 1, 'N540', 'ACTIVE'),(90, '', '', 22, 107, 3, 11000, 90, 1, 'N540', 'ACTIVE'),(91, '', '', 22, 107, 8, 22200, 91, 1, 'N554', 'ACTIVE'),(92, '', '', 24, 47, 2, 16700, 92, 1, 'N293', 'ACTIVE'),(93, '', '', 24, 47, 3, 16700, 93, 1, 'N293', 'ACTIVE'),(94, '', '', 24, 47, 11, 16700, 94, 1, 'N293', 'ACTIVE'),(95, '', '', 24, 47, 13, 16700, 95, 1, 'N293', 'ACTIVE'),(96, '', '', 25, 3, 1, 18400, 96, 1, 'N17', 'ACTIVE'),(97, '', '', 25, 3, 2, 17200, 97, 1, 'N106', 'ACTIVE'),(98, '', '', 25, 3, 3, 17200, 98, 1, 'N106', 'ACTIVE'),(99, '', '', 25, 3, 4, 18400, 99, 1, 'N17', 'ACTIVE'),(100, '', '', 25, 3, 7, 49400, 100, 1, 'N442', 'ACTIVE'),(101, '', '', 25, 3, 8, 28400, 101, 1, 'N567', 'ACTIVE'),(102, '', '', 25, 3, 11, 20100, 102, 1, 'N102', 'ACTIVE'),(103, '', '', 25, 3, 13, 14700, 103, 1, 'N658', 'ACTIVE'),(104, '', '', 25, 11, 1, 19300, 104, 1, 'N163', 'ACTIVE'),(105, '', '', 25, 11, 2, 17200, 105, 1, 'N106', 'ACTIVE'),(106, '', '', 25, 11, 3, 17200, 106, 1, 'N106', 'ACTIVE'),(107, '', '', 25, 11, 4, 19700, 107, 1, 'N536', 'ACTIVE'),(108, '', '', 25, 11, 7, 48200, 108, 1, 'N304', 'ACTIVE'),(109, '', '', 25, 11, 11, 19700, 109, 1, 'N536', 'ACTIVE'),(110, '', '', 25, 11, 13, 14700, 110, 1, 'N658', 'ACTIVE'),(111, '', '', 25, 39, 1, 19300, 111, 1, 'N163', 'ACTIVE'),(112, '', '', 25, 39, 2, 17200, 112, 1, 'N106', 'ACTIVE'),(113, '', '', 25, 39, 3, 17200, 113, 1, 'N106', 'ACTIVE'),(114, '', '', 25, 39, 4, 19700, 114, 1, 'N536', 'ACTIVE'),(115, '', '', 25, 39, 7, 47200, 115, 1, 'N343', 'ACTIVE'),(116, '', '', 25, 39, 8, 32200, 116, 1, 'N563', 'ACTIVE'),(117, '', '', 25, 39, 11, 16700, 117, 1, 'N239', 'ACTIVE'),(118, '', '', 25, 39, 13, 14700, 118, 1, 'N658', 'ACTIVE'),(119, '', '', 25, 81, 1, 19500, 119, 1, 'N128', 'ACTIVE'),(120, '', '', 25, 81, 2, 17200, 120, 1, 'N106', 'ACTIVE'),(121, '', '', 25, 81, 3, 17200, 121, 1, 'N106', 'ACTIVE'),(122, '', '', 25, 81, 4, 19700, 122, 1, 'N536', 'ACTIVE'),(123, '', '', 25, 81, 7, 39900, 123, 1, 'N349', 'ACTIVE'),(124, '', '', 25, 81, 8, 33800, 124, 1, 'N594', 'ACTIVE'),(125, '', '', 25, 81, 11, 16700, 125, 1, 'N239', 'ACTIVE'),(126, '', '', 25, 81, 13, 14700, 126, 1, 'N658', 'ACTIVE'),(127, '', '', 25, 88, 1, 20700, 127, 1, 'N496', 'ACTIVE'),(128, '', '', 25, 88, 2, 17200, 128, 1, 'N106', 'ACTIVE'),(129, '', '', 25, 88, 3, 17200, 129, 1, 'N106', 'ACTIVE'),(130, '', '', 25, 88, 4, 19700, 130, 1, 'N536', 'ACTIVE'),(131, '', '', 25, 88, 7, 49400, 131, 1, 'N442', 'ACTIVE'),(132, '', '', 25, 88, 8, 32800, 132, 1, 'N618', 'ACTIVE'),(133, '', '', 25, 88, 11, 16700, 133, 1, 'N239', 'ACTIVE'),(134, '', '', 25, 88, 13, 14700, 134, 1, 'N658', 'ACTIVE'),(135, '', '', 25, 98, 1, 19500, 135, 1, 'N144', 'ACTIVE'),(136, '', '', 25, 98, 2, 17200, 136, 1, 'N106', 'ACTIVE'),(137, '', '', 25, 98, 3, 17200, 137, 1, 'N106', 'ACTIVE'),(138, '', '', 25, 98, 4, 19700, 138, 1, 'N536', 'ACTIVE'),(139, '', '', 25, 98, 7, 52400, 139, 1, 'N424', 'ACTIVE'),(140, '', '', 25, 98, 8, 34000, 140, 1, 'N635', 'ACTIVE'),(141, '', '', 25, 98, 11, 16700, 141, 1, 'N239', 'ACTIVE'),(142, '', '', 25, 98, 13, 14700, 142, 1, 'N658', 'ACTIVE'),(143, '', '', 25, 104, 1, 19500, 143, 1, 'N128', 'ACTIVE'),(144, '', '', 25, 104, 2, 17200, 144, 1, 'N106', 'ACTIVE'),(145, '', '', 25, 104, 3, 17200, 145, 1, 'N106', 'ACTIVE'),(146, '', '', 25, 104, 4, 19700, 146, 1, 'N536', 'ACTIVE'),(147, '', '', 25, 104, 5, 117100, 147, 1, 'N277', 'ACTIVE'),(148, '', '', 25, 104, 7, 42700, 148, 1, 'N392', 'ACTIVE'),(149, '', '', 25, 104, 8, 34900, 149, 1, 'N644', 'ACTIVE'),(150, '', '', 25, 104, 11, 16700, 150, 1, 'N239', 'ACTIVE'),(151, '', '', 25, 104, 13, 14700, 151, 1, 'N658', 'ACTIVE'),(152, '', '', 25, 105, 1, 14700, 152, 1, 'N658', 'ACTIVE'),(153, '', '', 25, 105, 2, 17200, 153, 1, 'N106', 'ACTIVE'),(154, '', '', 25, 105, 3, 17200, 154, 1, 'N106', 'ACTIVE'),(155, '', '', 25, 105, 4, 19700, 155, 1, 'N536', 'ACTIVE'),(156, '', '', 25, 105, 7, 48900, 156, 1, 'N366', 'ACTIVE'),(157, '', '', 25, 105, 8, 32300, 157, 1, 'N643', 'ACTIVE'),(158, '', '', 25, 105, 11, 16700, 158, 1, 'N239', 'ACTIVE'),(159, '', '', 25, 105, 13, 14700, 159, 1, 'N658', 'ACTIVE'),(160, '', '', 25, 106, 1, 19300, 160, 1, 'N163', 'ACTIVE'),(161, '', '', 25, 106, 2, 17200, 161, 1, 'N106', 'ACTIVE'),(162, '', '', 25, 106, 3, 17200, 162, 1, 'N106', 'ACTIVE'),(163, '', '', 25, 106, 4, 19700, 163, 1, 'N536', 'ACTIVE'),(164, '', '', 25, 106, 5, 117100, 164, 1, 'N277', 'ACTIVE'),(165, '', '', 25, 106, 7, 47200, 165, 1, 'N343', 'ACTIVE'),(166, '', '', 25, 106, 8, 32300, 166, 1, 'N643', 'ACTIVE'),(167, '', '', 25, 106, 11, 16700, 167, 1, 'N239', 'ACTIVE'),(168, '', '', 25, 106, 13, 14700, 168, 1, 'N658', 'ACTIVE'),(169, '', '', 25, 110, 1, 19500, 169, 1, 'N128', 'ACTIVE'),(170, '', '', 25, 110, 2, 17200, 170, 1, 'N106', 'ACTIVE'),(171, '', '', 25, 110, 3, 17200, 171, 1, 'N106', 'ACTIVE'),(172, '', '', 25, 110, 4, 19700, 172, 1, 'N536', 'ACTIVE'),(173, '', '', 25, 110, 7, 45600, 173, 1, 'N329', 'ACTIVE'),(174, '', '', 25, 110, 8, 32800, 174, 1, 'N618', 'ACTIVE'),(175, '', '', 25, 110, 11, 16700, 175, 1, 'N239', 'ACTIVE'),(176, '', '', 25, 110, 13, 14700, 176, 1, 'N658', 'ACTIVE'),(177, '', '', 15, 8, 1, 15100, 177, 1, 'N70', 'ACTIVE'),(178, '', '', 15, 8, 2, 15100, 178, 1, 'N70', 'ACTIVE'),(179, '', '', 15, 8, 3, 12500, 179, 1, 'N201', 'ACTIVE'),(180, '', '', 15, 8, 4, 27200, 180, 1, 'N597', 'ACTIVE'),(181, '', '', 15, 8, 7, 50600, 181, 1, 'N353', 'ACTIVE'),(182, '', '', 15, 8, 8, 23900, 182, 1, 'N568', 'ACTIVE'),(183, '', '', 15, 8, 12, 15700, 183, 1, 'N556', 'ACTIVE'),(184, '', '', 15, 62, 1, 15100, 184, 1, 'N70', 'ACTIVE'),(185, '', '', 15, 62, 2, 15100, 185, 1, 'N70', 'ACTIVE'),(186, '', '', 15, 62, 3, 12500, 186, 1, 'N201', 'ACTIVE'),(187, '', '', 15, 62, 4, 27200, 187, 1, 'N597', 'ACTIVE'),(188, '', '', 15, 62, 5, 107300, 188, 1, 'N256', 'ACTIVE'),(189, '', '', 15, 62, 7, 50600, 189, 1, 'N353', 'ACTIVE'),(190, '', '', 15, 62, 8, 27200, 190, 1, 'N597', 'ACTIVE'),(191, '', '', 15, 62, 12, 15700, 191, 1, 'N556', 'ACTIVE'),(192, '', '', 15, 1, 1, 16300, 192, 1, 'N14', 'ACTIVE'),(193, '', '', 15, 1, 2, 16300, 193, 1, 'N14', 'ACTIVE'),(194, '', '', 15, 1, 4, 29100, 194, 1, 'N561', 'ACTIVE'),(195, '', '', 15, 1, 7, 49000, 195, 1, 'N379', 'ACTIVE'),(196, '', '', 15, 1, 8, 29100, 196, 1, 'N561', 'ACTIVE'),(197, '', '', 15, 1, 11, 16300, 197, 1, 'N14', 'ACTIVE'),(198, '', '', 15, 1, 13, 16300, 198, 1, 'N14', 'ACTIVE'),(199, '', '', 5, 24, 1, 15900, 199, 1, 'N30', 'ACTIVE');";
                    var insertPositions2 = "INSERT INTO Positions (positionId, name, description, areaId, sectorId, hierarchyId, average, orden, countryId, internalCode, status) VALUES(400, '', '', 7, 27, 11, 30100, 400, 0, 'N577', 'ACTIVE'),(401, '', '', 7, 27, 12, 15700, 401, 0, 'N556', 'ACTIVE'),(402, '', '', 7, 27, 13, 30100, 402, 0, 'N577', 'ACTIVE'),(403, '', '', 10, 49, 12, 15700, 403, 0, 'N556', 'ACTIVE'),(404, '', '', 19, 59, 8, 31800, 404, 0, 'N600', 'ACTIVE'),(405, '', '', 19, 73, 8, 31800, 405, 0, 'N600', 'ACTIVE'),(406, '', '', 16, 19, 1, 15700, 406, 0, 'N89', 'ACTIVE'),(407, '', '', 16, 19, 2, 15400, 407, 0, 'N285', 'ACTIVE'),(408, '', '', 16, 19, 4, 18500, 408, 0, 'N382', 'ACTIVE'),(409, '', '', 16, 19, 7, 71300, 409, 0, 'N376', 'ACTIVE'),(410, '', '', 16, 19, 8, 30200, 410, 0, 'N608', 'ACTIVE'),(411, '', '', 16, 57, 1, 15700, 411, 0, 'N89', 'ACTIVE'),(412, '', '', 16, 57, 2, 15400, 412, 0, 'N285', 'ACTIVE'),(413, '', '', 16, 57, 4, 18500, 413, 0, 'N382', 'ACTIVE'),(414, '', '', 16, 57, 7, 43000, 414, 0, 'N374', 'ACTIVE'),(415, '', '', 16, 57, 8, 30200, 415, 0, 'N608', 'ACTIVE'),(416, '', '', 16, 65, 1, 16300, 416, 0, 'N95', 'ACTIVE'),(417, '', '', 16, 65, 2, 15400, 417, 0, 'N285', 'ACTIVE'),(418, '', '', 16, 65, 4, 18500, 418, 0, 'N382', 'ACTIVE'),(419, '', '', 16, 65, 5, 127400, 419, 0, 'N264', 'ACTIVE'),(420, '', '', 16, 65, 7, 48600, 420, 0, 'N386', 'ACTIVE'),(421, '', '', 16, 65, 8, 31600, 421, 0, 'N613', 'ACTIVE'),(422, '', '', 16, 65, 12, 15700, 422, 0, 'N556', 'ACTIVE'),(423, '', '', 16, 66, 1, 16300, 423, 0, 'N95', 'ACTIVE'),(424, '', '', 16, 66, 2, 15400, 424, 0, 'N285', 'ACTIVE'),(425, '', '', 16, 66, 4, 18500, 425, 0, 'N382', 'ACTIVE'),(426, '', '', 16, 66, 7, 45400, 426, 0, 'N447', 'ACTIVE'),(427, '', '', 16, 66, 8, 27700, 427, 0, 'N647', 'ACTIVE'),(428, '', '', 16, 80, 1, 15700, 428, 0, 'N41', 'ACTIVE'),(429, '', '', 16, 80, 2, 15400, 429, 0, 'N285', 'ACTIVE'),(430, '', '', 16, 80, 4, 18500, 430, 0, 'N382', 'ACTIVE'),(431, '', '', 16, 80, 7, 65500, 431, 0, 'N365', 'ACTIVE'),(432, '', '', 16, 80, 8, 33300, 432, 0, 'N384', 'ACTIVE'),(433, '', '', 16, 85, 1, 16300, 433, 0, 'N95', 'ACTIVE'),(434, '', '', 16, 85, 2, 15400, 434, 0, 'N285', 'ACTIVE'),(435, '', '', 16, 85, 4, 18500, 435, 0, 'N382', 'ACTIVE'),(436, '', '', 16, 85, 5, 127400, 436, 0, 'N264', 'ACTIVE'),(437, '', '', 16, 85, 7, 53100, 437, 0, 'N325', 'ACTIVE'),(438, '', '', 16, 85, 8, 26700, 438, 0, 'N580', 'ACTIVE'),(439, '', '', 20, 21, 7, 45000, 439, 0, 'N313', 'ACTIVE'),(440, '', '', 20, 21, 8, 28700, 440, 0, 'N569', 'ACTIVE'),(441, '', '', 20, 30, 7, 45000, 441, 0, 'N313', 'ACTIVE'),(442, '', '', 20, 30, 8, 28100, 442, 0, 'N583', 'ACTIVE'),(443, '', '', 20, 58, 7, 72800, 443, 0, 'N375', 'ACTIVE'),(444, '', '', 20, 58, 8, 33900, 444, 0, 'N467', 'ACTIVE'),(445, '', '', 20, 63, 7, 54900, 445, 0, 'N372', 'ACTIVE'),(446, '', '', 20, 63, 8, 24400, 446, 0, 'N611', 'ACTIVE'),(447, '', '', 20, 69, 7, 49600, 447, 0, 'N391', 'ACTIVE'),(448, '', '', 20, 69, 8, 27100, 448, 0, 'N617', 'ACTIVE'),(449, '', '', 20, 69, 12, 15700, 449, 0, 'N556', 'ACTIVE'),(450, '', '', 20, 78, 5, 109100, 450, 0, 'N271', 'ACTIVE'),(451, '', '', 20, 78, 7, 54700, 451, 0, 'N405', 'ACTIVE'),(452, '', '', 20, 78, 8, 22100, 452, 0, 'N625', 'ACTIVE'),(453, '', '', 20, 78, 12, 15700, 453, 0, 'N556', 'ACTIVE'),(454, '', '', 20, 82, 7, 47500, 454, 0, 'N401', 'ACTIVE'),(455, '', '', 20, 82, 8, 31400, 455, 0, 'N623', 'ACTIVE'),(456, '', '', 20, 97, 5, 90500, 456, 0, 'N270', 'ACTIVE'),(457, '', '', 20, 97, 7, 68800, 457, 0, 'N314', 'ACTIVE'),(458, '', '', 20, 97, 8, 31500, 458, 0, 'N637', 'ACTIVE'),(459, '', '', 23, 4, 1, 15800, 459, 0, 'N25', 'ACTIVE'),(460, '', '', 23, 4, 2, 11000, 460, 0, 'N540', 'ACTIVE'),(461, '', '', 23, 4, 4, 20800, 461, 0, 'N499', 'ACTIVE'),(462, '', '', 23, 4, 7, 49000, 462, 0, 'N301', 'ACTIVE'),(463, '', '', 23, 4, 8, 28700, 463, 0, 'N565', 'ACTIVE'),(464, '', '', 23, 4, 13, 14700, 464, 0, 'N675', 'ACTIVE'),(465, '', '', 23, 23, 1, 16100, 465, 0, 'N74', 'ACTIVE'),(466, '', '', 23, 23, 2, 11000, 466, 0, 'N540', 'ACTIVE'),(467, '', '', 23, 23, 4, 20800, 467, 0, 'N499', 'ACTIVE'),(468, '', '', 23, 23, 7, 49100, 468, 0, 'N355', 'ACTIVE'),(469, '', '', 23, 23, 8, 31800, 469, 0, 'N600', 'ACTIVE'),(470, '', '', 23, 23, 13, 14700, 470, 0, 'N675', 'ACTIVE'),(471, '', '', 23, 28, 1, 17300, 471, 0, 'N48', 'ACTIVE'),(472, '', '', 23, 28, 2, 11000, 472, 0, 'N540', 'ACTIVE'),(473, '', '', 23, 28, 4, 20800, 473, 0, 'N499', 'ACTIVE'),(474, '', '', 23, 28, 7, 53400, 474, 0, 'N324', 'ACTIVE'),(475, '', '', 23, 28, 8, 29100, 475, 0, 'N579', 'ACTIVE'),(476, '', '', 23, 28, 13, 14700, 476, 0, 'N675', 'ACTIVE'),(477, '', '', 23, 72, 1, 15300, 477, 0, 'N109', 'ACTIVE'),(478, '', '', 23, 72, 2, 11000, 478, 0, 'N540', 'ACTIVE'),(479, '', '', 23, 72, 4, 20800, 479, 0, 'N499', 'ACTIVE'),(480, '', '', 23, 72, 7, 49000, 480, 0, 'N301', 'ACTIVE'),(481, '', '', 23, 72, 13, 14700, 481, 0, 'N675', 'ACTIVE'),(482, '', '', 23, 87, 1, 16000, 482, 0, 'N135', 'ACTIVE'),(483, '', '', 23, 87, 2, 11000, 483, 0, 'N540', 'ACTIVE'),(484, '', '', 23, 87, 4, 20800, 484, 0, 'N499', 'ACTIVE'),(485, '', '', 23, 87, 5, 117600, 485, 0, 'N272', 'ACTIVE'),(486, '', '', 23, 87, 7, 47900, 486, 0, 'N410', 'ACTIVE'),(487, '', '', 23, 87, 8, 24600, 487, 0, 'N629', 'ACTIVE'),(488, '', '', 23, 87, 12, 15700, 488, 0, 'N556', 'ACTIVE'),(489, '', '', 23, 87, 13, 14700, 489, 0, 'N675', 'ACTIVE'),(490, '', '', 23, 91, 2, 11000, 490, 0, 'N540', 'ACTIVE'),(491, '', '', 23, 91, 4, 20800, 491, 0, 'N499', 'ACTIVE'),(492, '', '', 23, 91, 7, 57700, 492, 0, 'N419', 'ACTIVE'),(493, '', '', 23, 91, 8, 35600, 493, 0, 'N631', 'ACTIVE'),(494, '', '', 23, 91, 12, 15700, 494, 0, 'N556', 'ACTIVE'),(495, '', '', 23, 91, 13, 14700, 495, 0, 'N675', 'ACTIVE'),(496, '', '', 23, 93, 1, 17300, 496, 0, 'N45', 'ACTIVE'),(497, '', '', 23, 93, 2, 11000, 497, 0, 'N540', 'ACTIVE'),(498, '', '', 23, 93, 4, 20800, 498, 0, 'N499', 'ACTIVE'),(499, '', '', 23, 93, 7, 49200, 499, 0, 'N319', 'ACTIVE'),(500, '', '', 23, 93, 8, 33100, 500, 0, 'N576', 'ACTIVE'),(501, '', '', 23, 93, 13, 14700, 501, 0, 'N675', 'ACTIVE'),(502, '', '', 23, 100, 1, 15600, 502, 0, 'N131', 'ACTIVE'),(503, '', '', 23, 100, 2, 11000, 503, 0, 'N540', 'ACTIVE'),(504, '', '', 23, 100, 4, 20800, 504, 0, 'N499', 'ACTIVE'),(505, '', '', 23, 100, 7, 45200, 505, 0, 'N408', 'ACTIVE'),(506, '', '', 23, 100, 8, 30200, 506, 0, 'N628', 'ACTIVE'),(507, '', '', 23, 100, 13, 14700, 507, 0, 'N675', 'ACTIVE'),(508, '', '', 1, 55, 1, 20100, 508, 0, 'N236', 'ACTIVE'),(509, '', '', 1, 55, 5, 121900, 509, 0, 'N258', 'ACTIVE'),(510, '', '', 1, 55, 7, 46100, 510, 0, 'N363', 'ACTIVE'),(511, '', '', 1, 55, 4, 21500, 511, 0, 'N481', 'ACTIVE'),(512, '', '', 1, 55, 4, 12900, 512, 0, 'N530', 'ACTIVE'),(513, '', '', 1, 55, 8, 36500, 513, 0, 'N603', 'ACTIVE'),(514, '', '', 11, 90, 7, 53900, 514, 0, 'N417', 'ACTIVE'),(515, '', '', 13, 77, 5, 161900, 515, 0, 'N268', 'ACTIVE'),(516, '', '', 3, 13, 1, 17800, 516, 0, 'N32', 'ACTIVE'),(517, '', '', 3, 13, 4, 43100, 517, 0, 'N174', 'ACTIVE'),(518, '', '', 3, 13, 5, 115600, 518, 0, 'N246', 'ACTIVE'),(519, '', '', 3, 13, 7, 51500, 519, 0, 'N307', 'ACTIVE'),(520, '', '', 3, 92, 7, 52700, 520, 0, 'N421', 'ACTIVE'),(521, '', '', 3, 13, 8, 31900, 521, 0, 'N570', 'ACTIVE'),(522, '', '', 4, 15, 2, 11900, 522, 0, 'N9', 'ACTIVE'),(523, '', '', 4, 15, 1, 12000, 523, 0, 'N35', 'ACTIVE'),(524, '', '', 4, 103, 1, 13900, 524, 0, 'N153', 'ACTIVE'),(525, '', '', 4, 101, 5, 105700, 525, 0, 'N274', 'ACTIVE'),(526, '', '', 4, 15, 7, 36800, 526, 0, 'N309', 'ACTIVE'),(527, '', '', 4, 102, 7, 42000, 527, 0, 'N434', 'ACTIVE'),(528, '', '', 4, 15, 8, 15500, 528, 0, 'N571', 'ACTIVE'),(529, '', '', 4, 103, 8, 17900, 529, 0, 'N640', 'ACTIVE'),(530, '', '', 11, 16, 5, 119700, 530, 0, 'N247', 'ACTIVE'),(531, '', '', 11, 33, 5, 119600, 531, 0, 'N253', 'ACTIVE'),(532, '', '', 13, 34, 5, 127800, 532, 0, 'N257', 'ACTIVE'),(533, '', '', 13, 70, 5, 107500, 533, 0, 'N267', 'ACTIVE'),(534, '', '', 13, 113, 5, 130200, 534, 0, 'N280', 'ACTIVE'),(535, '', '', 15, 26, 1, 19400, 535, 0, 'N220', 'ACTIVE'),(536, '', '', 15, 26, 7, 52400, 536, 0, 'N322', 'ACTIVE'),(537, '', '', 15, 26, 8, 31500, 537, 0, 'N578', 'ACTIVE'),(538, '', '', 15, 61, 1, 17600, 538, 0, 'N122', 'ACTIVE'),(539, '', '', 15, 61, 7, 47000, 539, 0, 'N399', 'ACTIVE'),(540, '', '', 15, 61, 8, 29000, 540, 0, 'N622', 'ACTIVE'),(541, '', '', 15, 61, 13, 16200, 541, 0, 'N664', 'ACTIVE'),(542, '', '', 15, 7, 9, 13500, 542, 0, 'N12', 'ACTIVE'),(543, '', '', 15, 7, 1, 18200, 543, 0, 'N98', 'ACTIVE'),(544, '', '', 15, 7, 3, 12900, 544, 0, 'N202', 'ACTIVE'),(545, '', '', 15, 7, 5, 150800, 545, 0, 'N266', 'ACTIVE'),(546, '', '', 15, 7, 8, 18900, 546, 0, 'N509', 'ACTIVE'),(547, '', '', 15, 32, 8, 23800, 547, 0, 'N585', 'ACTIVE')";
                    var insertPositions3 = "INSERT INTO Positions (positionId, name, description, areaId, sectorId, hierarchyId, average, orden, countryId, internalCode, status) VALUES(200, '', '', 5, 24, 2, 13200, 200, 1, 'N176', 'ACTIVE'),(201, '', '', 5, 24, 4, 19200, 201, 1, 'N230', 'ACTIVE'),(202, '', '', 5, 24, 5, 124000, 202, 1, 'N281', 'ACTIVE'),(203, '', '', 5, 24, 7, 46700, 203, 1, 'N453', 'ACTIVE'),(204, '', '', 5, 24, 8, 31700, 204, 1, 'N575', 'ACTIVE'),(205, '', '', 5, 24, 11, 15000, 205, 1, 'N547', 'ACTIVE'),(206, '', '', 5, 24, 12, 15700, 206, 1, 'N556', 'ACTIVE'),(207, '', '', 5, 24, 13, 20200, 207, 1, 'N551', 'ACTIVE'),(208, '', '', 5, 40, 1, 18300, 208, 1, 'N116', 'ACTIVE'),(209, '', '', 5, 40, 2, 13200, 209, 1, 'N176', 'ACTIVE'),(210, '', '', 5, 40, 4, 19200, 210, 1, 'N230', 'ACTIVE'),(211, '', '', 5, 40, 5, 119200, 211, 1, 'N255', 'ACTIVE'),(212, '', '', 5, 40, 7, 54000, 212, 1, 'N341', 'ACTIVE'),(213, '', '', 5, 40, 8, 20200, 213, 1, 'N551', 'ACTIVE'),(214, '', '', 5, 40, 11, 15000, 214, 1, 'N547', 'ACTIVE'),(215, '', '', 5, 40, 12, 15700, 215, 1, 'N556', 'ACTIVE'),(216, '', '', 5, 40, 13, 20200, 216, 1, 'N551', 'ACTIVE'),(217, '', '', 5, 45, 1, 16600, 217, 1, 'N169', 'ACTIVE'),(218, '', '', 5, 45, 2, 13200, 218, 1, 'N176', 'ACTIVE'),(219, '', '', 5, 45, 4, 19200, 219, 1, 'N230', 'ACTIVE'),(220, '', '', 5, 45, 7, 51400, 220, 1, 'N451', 'ACTIVE'),(221, '', '', 5, 45, 8, 27700, 221, 1, 'N647', 'ACTIVE'),(222, '', '', 5, 45, 11, 15000, 222, 1, 'N547', 'ACTIVE'),(223, '', '', 5, 45, 13, 20200, 223, 1, 'N551', 'ACTIVE'),(224, '', '', 5, 75, 1, 18300, 224, 1, 'N116', 'ACTIVE'),(225, '', '', 5, 75, 2, 13200, 225, 1, 'N176', 'ACTIVE'),(226, '', '', 5, 75, 4, 19200, 226, 1, 'N230', 'ACTIVE'),(227, '', '', 5, 75, 7, 54000, 227, 1, 'N397', 'ACTIVE'),(228, '', '', 5, 75, 8, 31300, 228, 1, 'N621', 'ACTIVE'),(229, '', '', 5, 75, 11, 15000, 229, 1, 'N547', 'ACTIVE'),(230, '', '', 5, 75, 13, 20200, 230, 1, 'N551', 'ACTIVE'),(231, '', '', 5, 108, 1, 10200, 231, 1, 'N187', 'ACTIVE'),(232, '', '', 5, 108, 2, 13200, 232, 1, 'N176', 'ACTIVE'),(233, '', '', 5, 108, 4, 19200, 233, 1, 'N230', 'ACTIVE'),(234, '', '', 5, 108, 7, 44400, 234, 1, 'N444', 'ACTIVE'),(235, '', '', 5, 108, 8, 22800, 235, 1, 'N645', 'ACTIVE'),(236, '', '', 5, 108, 11, 15000, 236, 1, 'N547', 'ACTIVE'),(237, '', '', 5, 108, 12, 15700, 237, 1, 'N556', 'ACTIVE'),(238, '', '', 5, 108, 13, 20200, 238, 1, 'N551', 'ACTIVE'),(239, '', '', 5, 48, 7, 46200, 239, 1, 'N354', 'ACTIVE'),(240, '', '', 9, 46, 12, 15700, 240, 1, 'N556', 'ACTIVE'),(241, '', '', 9, 84, 12, 15700, 241, 1, 'N556', 'ACTIVE'),(242, '', '', 11, 10, 1, 16400, 242, 1, 'N119', 'ACTIVE'),(243, '', '', 11, 10, 2, 12400, 243, 1, 'N178', 'ACTIVE'),(244, '', '', 11, 10, 3, 11600, 244, 1, 'N197', 'ACTIVE'),(245, '', '', 11, 10, 4, 19100, 245, 1, 'N190', 'ACTIVE'),(246, '', '', 11, 10, 7, 48200, 246, 1, 'N304', 'ACTIVE'),(247, '', '', 11, 10, 8, 33500, 247, 1, 'N620', 'ACTIVE'),(248, '', '', 11, 10, 11, 16600, 248, 1, 'N234', 'ACTIVE'),(249, '', '', 11, 18, 1, 16400, 249, 1, 'N119', 'ACTIVE'),(250, '', '', 11, 18, 2, 12400, 250, 1, 'N178', 'ACTIVE'),(251, '', '', 11, 18, 3, 11600, 251, 1, 'N197', 'ACTIVE'),(252, '', '', 11, 18, 4, 19100, 252, 1, 'N190', 'ACTIVE'),(253, '', '', 11, 18, 7, 53900, 253, 1, 'N417', 'ACTIVE'),(254, '', '', 11, 18, 8, 29300, 254, 1, 'N630', 'ACTIVE'),(255, '', '', 11, 18, 11, 16600, 255, 1, 'N234', 'ACTIVE'),(256, '', '', 11, 18, 12, 15700, 256, 1, 'N556', 'ACTIVE'),(257, '', '', 11, 36, 1, 16000, 257, 1, 'N60', 'ACTIVE'),(258, '', '', 11, 36, 2, 12400, 258, 1, 'N178', 'ACTIVE'),(259, '', '', 11, 36, 3, 11600, 259, 1, 'N197', 'ACTIVE'),(260, '', '', 11, 36, 4, 19100, 260, 1, 'N190', 'ACTIVE'),(261, '', '', 11, 36, 7, 45800, 261, 1, 'N334', 'ACTIVE'),(262, '', '', 11, 36, 8, 29100, 262, 1, 'N587', 'ACTIVE'),(263, '', '', 11, 36, 11, 16600, 263, 1, 'N234', 'ACTIVE'),(264, '', '', 11, 37, 1, 14800, 264, 1, 'N63', 'ACTIVE'),(265, '', '', 11, 37, 2, 12400, 265, 1, 'N178', 'ACTIVE'),(266, '', '', 11, 37, 3, 11600, 266, 1, 'N197', 'ACTIVE'),(267, '', '', 11, 37, 4, 19100, 267, 1, 'N190', 'ACTIVE'),(268, '', '', 11, 37, 7, 49900, 268, 1, 'N339', 'ACTIVE'),(269, '', '', 11, 37, 8, 27700, 269, 1, 'N588', 'ACTIVE'),(270, '', '', 11, 37, 11, 16600, 270, 1, 'N234', 'ACTIVE'),(271, '', '', 11, 50, 1, 16400, 271, 1, 'N119', 'ACTIVE'),(272, '', '', 11, 50, 2, 12400, 272, 1, 'N178', 'ACTIVE'),(273, '', '', 11, 50, 3, 11600, 273, 1, 'N197', 'ACTIVE'),(274, '', '', 11, 50, 4, 19100, 274, 1, 'N190', 'ACTIVE'),(275, '', '', 11, 50, 7, 46400, 275, 1, 'N395', 'ACTIVE'),(276, '', '', 11, 50, 8, 33500, 276, 1, 'N620', 'ACTIVE'),(277, '', '', 11, 50, 11, 16600, 277, 1, 'N234', 'ACTIVE'),(278, '', '', 11, 52, 1, 15800, 278, 1, 'N80', 'ACTIVE'),(279, '', '', 11, 52, 2, 12400, 279, 1, 'N178', 'ACTIVE'),(280, '', '', 11, 52, 3, 11600, 280, 1, 'N197', 'ACTIVE'),(281, '', '', 11, 52, 4, 19100, 281, 1, 'N190', 'ACTIVE'),(282, '', '', 11, 52, 5, 100900, 282, 1, 'N244', 'ACTIVE'),(283, '', '', 11, 52, 7, 50100, 283, 1, 'N359', 'ACTIVE'),(284, '', '', 11, 52, 8, 32300, 284, 1, 'N602', 'ACTIVE'),(285, '', '', 11, 52, 11, 16600, 285, 1, 'N234', 'ACTIVE'),(286, '', '', 11, 52, 12, 15700, 286, 1, 'N556', 'ACTIVE'),(287, '', '', 11, 76, 1, 16400, 287, 1, 'N119', 'ACTIVE'),(288, '', '', 11, 76, 2, 12400, 288, 1, 'N178', 'ACTIVE'),(289, '', '', 11, 76, 3, 11600, 289, 1, 'N197', 'ACTIVE'),(290, '', '', 11, 76, 4, 19100, 290, 1, 'N190', 'ACTIVE'),(291, '', '', 11, 76, 7, 46400, 291, 1, 'N395', 'ACTIVE'),(292, '', '', 11, 76, 8, 33500, 292, 1, 'N620', 'ACTIVE'),(293, '', '', 11, 76, 11, 16600, 293, 1, 'N234', 'ACTIVE'),(294, '', '', 11, 109, 1, 15300, 294, 1, 'N166', 'ACTIVE'),(295, '', '', 11, 109, 2, 12400, 295, 1, 'N178', 'ACTIVE'),(296, '', '', 11, 109, 3, 11600, 296, 1, 'N197', 'ACTIVE'),(297, '', '', 11, 109, 4, 19100, 297, 1, 'N190', 'ACTIVE'),(298, '', '', 11, 109, 7, 49100, 298, 1, 'N445', 'ACTIVE'),(299, '', '', 11, 109, 8, 28600, 299, 1, 'N646', 'ACTIVE'),(300, '', '', 11, 109, 11, 16600, 300, 1, 'N234', 'ACTIVE'),(301, '', '', 11, 35, 1, 17800, 301, 1, 'N57', 'ACTIVE'),(302, '', '', 11, 35, 2, 12400, 302, 1, 'N178', 'ACTIVE'),(303, '', '', 11, 35, 3, 11600, 303, 1, 'N197', 'ACTIVE'),(304, '', '', 11, 35, 4, 19100, 304, 1, 'N190', 'ACTIVE'),(305, '', '', 11, 35, 7, 45700, 305, 1, 'N332', 'ACTIVE'),(306, '', '', 11, 35, 8, 26700, 306, 1, 'N586', 'ACTIVE'),(307, '', '', 11, 35, 11, 16600, 307, 1, 'N234', 'ACTIVE'),(308, '', '', 14, 60, 1, 16100, 308, 1, 'N1', 'ACTIVE'),(309, '', '', 14, 60, 2, 16100, 309, 1, 'N1', 'ACTIVE'),(310, '', '', 14, 60, 3, 16100, 310, 1, 'N1', 'ACTIVE'),(311, '', '', 14, 60, 4, 20300, 311, 1, 'N2', 'ACTIVE'),(312, '', '', 14, 60, 5, 134700, 312, 1, 'N263', 'ACTIVE'),(313, '', '', 14, 60, 7, 54700, 313, 1, 'N377', 'ACTIVE'),(314, '', '', 14, 60, 8, 37400, 314, 1, 'N609', 'ACTIVE'),(315, '', '', 14, 60, 11, 20300, 315, 1, 'N2', 'ACTIVE'),(316, '', '', 14, 60, 12, 15700, 316, 1, 'N556', 'ACTIVE'),(317, '', '', 14, 60, 13, 16100, 317, 1, 'N1', 'ACTIVE'),(318, '', '', 17, 74, 1, 19300, 318, 1, 'N163', 'ACTIVE'),(319, '', '', 17, 74, 2, 17200, 319, 1, 'N106', 'ACTIVE'),(320, '', '', 17, 74, 3, 17200, 320, 1, 'N106', 'ACTIVE'),(321, '', '', 17, 74, 4, 19700, 321, 1, 'N536', 'ACTIVE'),(322, '', '', 17, 74, 5, 48200, 322, 1, 'N304', 'ACTIVE'),(323, '', '', 17, 74, 7, 19700, 323, 1, 'N536', 'ACTIVE'),(324, '', '', 17, 74, 8, 14700, 324, 1, 'N658', 'ACTIVE'),(325, '', '', 17, 79, 1, 19300, 325, 1, 'N163', 'ACTIVE'),(326, '', '', 17, 79, 2, 17200, 326, 1, 'N106', 'ACTIVE'),(327, '', '', 17, 79, 3, 17200, 327, 1, 'N106', 'ACTIVE'),(328, '', '', 17, 79, 4, 19700, 328, 1, 'N536', 'ACTIVE'),(329, '', '', 17, 79, 5, 48200, 329, 1, 'N304', 'ACTIVE'),(330, '', '', 17, 79, 7, 19700, 330, 1, 'N536', 'ACTIVE'),(331, '', '', 17, 79, 8, 14700, 331, 1, 'N658', 'ACTIVE'),(332, '', '', 18, 68, 1, 19300, 332, 1, 'N163', 'ACTIVE'),(333, '', '', 18, 68, 2, 17200, 333, 1, 'N106', 'ACTIVE'),(334, '', '', 18, 68, 3, 17200, 334, 1, 'N106', 'ACTIVE'),(335, '', '', 18, 68, 4, 19700, 335, 1, 'N536', 'ACTIVE'),(336, '', '', 18, 68, 7, 48200, 336, 1, 'N304', 'ACTIVE'),(337, '', '', 18, 68, 8, 19700, 337, 1, 'N536', 'ACTIVE'),(338, '', '', 18, 68, 11, 14700, 338, 1, 'N658', 'ACTIVE'),(339, '', '', 21, 17, 7, 48900, 339, 1, 'N366', 'ACTIVE'),(340, '', '', 21, 17, 8, 27900, 340, 1, 'N562', 'ACTIVE'),(341, '', '', 21, 20, 11, 15200, 341, 1, 'N207', 'ACTIVE'),(342, '', '', 21, 38, 8, 27900, 342, 1, 'N562', 'ACTIVE'),(343, '', '', 21, 64, 2, 9600, 343, 1, 'N203', 'ACTIVE'),(344, '', '', 21, 64, 3, 9600, 344, 1, 'N203', 'ACTIVE'),(345, '', '', 21, 64, 4, 34800, 345, 1, 'N511', 'ACTIVE'),(346, '', '', 21, 64, 7, 54900, 346, 1, 'N372', 'ACTIVE'),(347, '', '', 21, 64, 8, 24400, 347, 1, 'N611', 'ACTIVE'),(348, '', '', 21, 64, 11, 30900, 348, 1, 'N510', 'ACTIVE'),(349, '', '', 21, 64, 13, 14000, 349, 1, 'N667', 'ACTIVE'),(350, '', '', 21, 83, 2, 13500, 350, 1, 'N538', 'ACTIVE'),(351, '', '', 21, 83, 3, 13500, 351, 1, 'N538', 'ACTIVE'),(352, '', '', 21, 83, 8, 15600, 352, 1, 'N627', 'ACTIVE'),(353, '', '', 21, 96, 4, 18800, 353, 1, 'N513', 'ACTIVE'),(354, '', '', 21, 96, 7, 12900, 354, 1, 'N457', 'ACTIVE'),(355, '', '', 21, 96, 8, 22900, 355, 1, 'N634', 'ACTIVE'),(356, '', '', 21, 96, 11, 18800, 356, 1, 'N513', 'ACTIVE'),(357, '', '', 21, 112, 1, 14900, 357, 1, 'N172', 'ACTIVE'),(358, '', '', 21, 112, 4, 27200, 358, 1, 'N597', 'ACTIVE'),(359, '', '', 21, 112, 7, 50600, 359, 1, 'N353', 'ACTIVE'),(360, '', '', 21, 112, 8, 31900, 360, 1, 'N636', 'ACTIVE'),(361, '', '', 21, 112, 11, 27200, 361, 1, 'N597', 'ACTIVE'),(362, '', '', 3, 71, 4, 25100, 362, 1, 'N581', 'ACTIVE'),(363, '', '', 3, 71, 7, 42600, 363, 1, 'N326', 'ACTIVE'),(364, '', '', 3, 71, 8, 25100, 364, 1, 'N581', 'ACTIVE'),(365, '', '', 3, 71, 11, 25100, 365, 1, 'N581', 'ACTIVE'),(366, '', '', 3, 89, 1, 16900, 366, 1, 'N141', 'ACTIVE'),(367, '', '', 3, 89, 4, 23800, 367, 1, 'N142', 'ACTIVE'),(368, '', '', 3, 89, 5, 118300, 368, 1, 'N245', 'ACTIVE'),(369, '', '', 3, 89, 7, 51800, 369, 1, 'N416', 'ACTIVE'),(370, '', '', 3, 89, 8, 35800, 370, 1, 'N632', 'ACTIVE'),(371, '', '', 3, 89, 11, 23800, 371, 1, 'N142', 'ACTIVE'),(372, '', '', 3, 89, 12, 15700, 372, 1, 'N556', 'ACTIVE'),(373, '', '', 2, 12, 1, 19300, 373, 1, 'N163', 'ACTIVE'),(374, '', '', 2, 12, 2, 17200, 374, 1, 'N106', 'ACTIVE'),(375, '', '', 2, 12, 3, 17200, 375, 1, 'N106', 'ACTIVE'),(376, '', '', 2, 12, 4, 19700, 376, 1, 'N536', 'ACTIVE'),(377, '', '', 2, 12, 7, 48200, 377, 1, 'N304', 'ACTIVE'),(378, '', '', 2, 12, 8, 19700, 378, 1, 'N536', 'ACTIVE'),(379, '', '', 2, 12, 11, 14700, 379, 1, 'N658', 'ACTIVE'),(380, '', '', 2, 12, 12, 15700, 380, 1, 'N556', 'ACTIVE'),(381, '', '', 2, 41, 1, 19300, 381, 1, 'N163', 'ACTIVE'),(382, '', '', 2, 41, 2, 17200, 382, 1, 'N106', 'ACTIVE'),(383, '', '', 2, 41, 3, 17200, 383, 1, 'N106', 'ACTIVE'),(384, '', '', 2, 41, 4, 19700, 384, 1, 'N536', 'ACTIVE'),(385, '', '', 2, 41, 7, 48200, 385, 1, 'N304', 'ACTIVE'),(386, '', '', 2, 41, 8, 19700, 386, 1, 'N536', 'ACTIVE'),(387, '', '', 2, 41, 11, 14700, 387, 1, 'N658', 'ACTIVE'),(388, '', '', 6, 6, 7, 51400, 388, 1, 'N451', 'ACTIVE'),(389, '', '', 6, 6, 8, 27900, 389, 0, 'N562', 'ACTIVE'),(390, '', '', 6, 25, 5, 124000, 390, 0, 'N281', 'ACTIVE'),(391, '', '', 6, 25, 7, 51400, 391, 0, 'N451', 'ACTIVE'),(392, '', '', 6, 25, 8, 27900, 392, 0, 'N562', 'ACTIVE'),(393, '', '', 6, 25, 12, 15700, 393, 0, 'N556', 'ACTIVE'),(394, '', '', 7, 27, 2, 11900, 394, 0, 'N205', 'ACTIVE'),(395, '', '', 7, 27, 3, 11900, 395, 0, 'N205', 'ACTIVE'),(396, '', '', 7, 27, 4, 30100, 396, 0, 'N577', 'ACTIVE'),(397, '', '', 7, 27, 5, 115100, 397, 0, 'N252', 'ACTIVE'),(398, '', '', 7, 27, 7, 49100, 398, 0, 'N295', 'ACTIVE'),(399, '', '', 7, 27, 8, 29100, 399, 0, 'N561', 'ACTIVE');";
                    var insertPositions4 = "INSERT INTO Positions (positionId, name, description, areaId, sectorId, hierarchyId, average, junior, semisenior, senior, orden, countryId, status) VALUES()";




                    $cordovaSQLite.execute(db, insertSync);
                    $cordovaSQLite.execute(db, insertAreas);
                    $cordovaSQLite.execute(db, insertSectors);
                    $cordovaSQLite.execute(db, insertHierarchies);
                    $cordovaSQLite.execute(db, insertSeniorities);
                    $cordovaSQLite.execute(db, insertCountries);

                    $cordovaSQLite.execute(db, insertPositions1).then(function (res) {
                    } , function (err) {
                            console.error(err);
                            alert(JSON.stringify(err));
                    });
                    $cordovaSQLite.execute(db, insertPositions2);
                    $cordovaSQLite.execute(db, insertPositions3);
                    //$cordovaSQLite.execute(db, insertPositions4);

                    //alert("inserted on db");
                } else {
                    var date = res.rows.item(0).date;
                    //alert("Data Allready on db date: "+date);




                    if(profileData.positionId > 0){
                        alert('profile already loaded');
                    }else{
                        //alert('Load profile from DB');
                        var query = "SELECT * FROM Profiles WHERE Profiles.profileId = '1'";
                        $cordovaSQLite.execute(db, query, []).then(function (res) {


                            if (res.rows.length > 0) {

                                var query1 = "SELECT name FROM Hierarchies WHERE Hierarchies.hierarchyId = "+res.rows.item(0).hierarchyId;
                                $cordovaSQLite.execute(db, query1, []).then(function (res1) {
                                    var profileData = JSON.parse(localStorage.getItem("profileData"));
                                    profileData.hierarchyName = res1.rows.item(0).name;
                                    //alert("Hierarcy inside name: " + profileData.hierarchyName);
                                    localStorage.setItem("profileData", JSON.stringify(profileData));
                                });

                                var query1 = "SELECT name FROM Areas WHERE Areas.areaId = "+res.rows.item(0).areaId;
                                $cordovaSQLite.execute(db, query1, []).then(function (res1) {
                                    var profileData = JSON.parse(localStorage.getItem("profileData"));
                                    profileData.areaName = res1.rows.item(0).name;
                                    localStorage.setItem("profileData", JSON.stringify(profileData));
                                });

                                var query1 = "SELECT name FROM Sectors WHERE Sectors.sectorId = "+res.rows.item(0).sectorId;
                                $cordovaSQLite.execute(db, query1, []).then(function (res1) {
                                    var profileData = JSON.parse(localStorage.getItem("profileData"));
                                    profileData.sectorName = res1.rows.item(0).name;
                                    localStorage.setItem("profileData", JSON.stringify(profileData));
                                });

                                var query1 = "SELECT name FROM Seniorities WHERE Seniorities.seniorityId = "+res.rows.item(0).seniorityId;
                                $cordovaSQLite.execute(db, query1, []).then(function (res1) {
                                    var profileData = JSON.parse(localStorage.getItem("profileData"));
                                    profileData.seniorityName = res1.rows.item(0).name;
                                    localStorage.setItem("profileData", JSON.stringify(profileData));
                                });
                                //alert(JSON.stringify(res.rows.item));
                                //alert("COUNT positions: " + res.rows.item(0));
                                //alert("String result 0" + JSON.stringify(res.rows.item(0)))
                                //alert("SELECTED 1-> ID: "+ res.rows.item(1).hierarchyId +" -> "+ res.rows.item(1).name);
                                var profileData = JSON.parse(localStorage.getItem("profileData"));
                                profileData.positionId = res.rows.item(0).positionId;
                                profileData.amount = res.rows.item(0).amount;
                                profileData.hierarchyId = res.rows.item(0).hierarchyId;
                                profileData.areaId = res.rows.item(0).areaId;
                                profileData.sectorId = res.rows.item(0).sectorId;
                                profileData.seniorityId = res.rows.item(0).seniorityId;
                                localStorage.setItem("profileData", JSON.stringify(profileData));

                                //alert("Hierarcy outside name: " + profileData.hierarchyName);



                                //alert('profile loaded form db');


                            } else {
                                console.log("No results found");
                                //alert("No results found: " + query);
                            }



                        }, function (err) {
                            //console.error(err);
                            //alert(JSON.stringify(err));
                        });

                    }
                }


            }, function (err) {
                console.error(err);
                alert(JSON.stringify(err));
            });

            //syncServer.getUpdates();
            //syncServer.sendJson();

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

            .state('app.c5_inflation', {
                url: "/c5_inflation",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c5_inflation.html"
                    }
                }
            })

            .state('app.c6_salaryIncrease', {
                url: "/c6_salaryIncrease",
                views: {
                    'menuContent': {
                        templateUrl: "templates/c6_salaryIncrease.html"
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