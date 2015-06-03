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
            }

            if(typeof analytics !== undefined) {
                analytics.startTrackerWithId("UA-63703895-1");
            } else {
                alert("Google Analytics Unavailable");
            }


            if (window.cordova) {

                //Clean DB
                //$cordovaSQLite.deleteDB("CuantoGanoDBv2.0");

                db = $cordovaSQLite.openDB("CuantoGanoDBv2.0");

            }else{


                db = window.openDatabase("CuantoGanoDBv2.0", '1', 'my', 1024 * 1024 * 100); // browser


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



                    var insertAreas = "INSERT INTO Areas (areaId, name, description, orden, status) VALUES(1, 'Administración y Contabilidad', 'desc: Administración y Contabilidad', 1, 'ACTIVE'),(2, 'Diseño', 'desc: Diseño', 2, 'ACTIVE'),(3, 'Gerencia General & Alta Dirección', 'desc: Gerencia General & Alta Dirección', 3, 'ACTIVE'),(4, 'Química & Bioquímica', 'desc: Química & Bioquímica', 4, 'ACTIVE'),(5, 'Recepción & Secretaria & Atención al cliente', 'desc: Recepción & Secretaria & Atención al cliente', 5, 'ACTIVE'),(6, 'Salud', 'desc: Salud', 6, 'ACTIVE'),(7, 'Sistemas & Tecnología & IT', 'desc: Sistemas & Tecnología & IT', 7, 'ACTIVE'),(8, 'Almacenamiento & Logística & Distribución', 'desc: Almacenamiento & Logística & Distribución', 8, 'ACTIVE'),(9, 'Comercial & Ventas', 'desc: Comercial & Ventas', 9, 'ACTIVE'),(10, 'Educación y Psicopedagogía', 'desc: Educación y Psicopedagogía', 10, 'ACTIVE'),(11, 'Finanzas y Economía', 'desc: Finanzas y Economía', 11, 'ACTIVE'),(12, 'Legales', 'desc: Legales', 12, 'ACTIVE'),(13, 'Medios y Comunicación', 'desc: Medios y Comunicación', 13, 'ACTIVE'),(14, 'Música & Arte & Cultura', 'desc: Música & Arte & Cultura', 14, 'ACTIVE'),(15, 'Puestos Operativos & Otros', 'desc: Puestos Operativos & Otros', 15, 'ACTIVE'),(16, 'Relaciones Institucionales & Públicas', 'desc: Relaciones Institucionales & Públicas', 16, 'ACTIVE'),(17, 'Arquitectura', 'desc: Arquitectura', 17, 'ACTIVE'),(18, 'Comercio Exterior', 'desc: Comercio Exterior', 18, 'ACTIVE'),(19, 'Compras y Abastecimiento', 'desc: Compras y Abastecimiento', 19, 'ACTIVE'),(20, 'Estética y Cuidado Personal', 'desc: Estética y Cuidado Personal', 20, 'ACTIVE'),(21, 'Gastronomía', 'desc: Gastronomía', 21, 'ACTIVE'),(22, 'Jóvenes Profesionales & Pasantías', 'desc: Jóvenes Profesionales & Pasantías', 22, 'ACTIVE'),(23, 'Marketing y Publicidad', 'desc: Marketing y Publicidad', 23, 'ACTIVE'),(24, 'Producción', 'desc: Producción', 24, 'ACTIVE'),(25, 'Recursos Humanos', 'desc: Recursos Humanos', 25, 'ACTIVE')";

                    var insertSectors = "INSERT INTO Sectors (sectorId, areaId, name, description, orden, status) VALUES(1, 1, 'Administración', 'desc: Administración', 1, 'ACTIVE'),(2, 7, 'Administración de Base de Datos', 'desc: Administración de Base de Datos', 2, 'ACTIVE'),(3, 25, 'Administración de Personal', 'desc: Administración de Personal', 3, 'ACTIVE'),(4, 1, 'Administración de Ventas', 'desc: Administración de Ventas', 4, 'ACTIVE'),(5, 18, 'Aduana & Despachante de Aduana', 'desc: Aduana & Despachante de Aduana', 5, 'ACTIVE'),(6, 8, 'Almacén & Depósito & Expedición', 'desc: Almacén & Depósito & Expedición', 6, 'ACTIVE'),(7, 3, 'Alta dirección', 'desc: Alta dirección', 7, 'ACTIVE'),(8, 11, 'Análisis de Riesgos', 'desc: Análisis de Riesgos', 8, 'ACTIVE'),(9, 7, 'Análisis Funcional & Liderazgo de Proyecto', 'desc: Análisis Funcional & Liderazgo de Proyecto', 9, 'ACTIVE'),(10, 17, 'Arquitectura', 'desc: Arquitectura', 10, 'ACTIVE'),(11, 5, 'Atención al cliente', 'desc: Atención al cliente', 11, 'ACTIVE'),(12, 1, 'Auditoría', 'desc: Auditoría', 12, 'ACTIVE'),(13, 15, 'Back Office', 'desc: Back Office', 13, 'ACTIVE'),(14, 4, 'Bioquímica', 'desc: Bioquímica', 14, 'ACTIVE'),(15, 23, 'Business Intelligence', 'desc: Business Intelligence', 15, 'ACTIVE'),(16, 15, 'Cadetería', 'desc: Cadetería', 16, 'ACTIVE'),(17, 15, 'Caja', 'desc: Caja', 17, 'ACTIVE'),(18, 24, 'Calidad', 'desc: Calidad', 18, 'ACTIVE'),(19, 21, 'Camareros', 'desc: Camareros', 19, 'ACTIVE'),(20, 25, 'Capacitación y Desarrollo', 'desc: Capacitación y Desarrollo', 20, 'ACTIVE'),(21, 9, 'Comercial & Ventas', 'desc: Comercial & Ventas', 21, 'ACTIVE'),(22, 18, 'Comercio Exterior', 'desc: Comercio Exterior', 22, 'ACTIVE'),(23, 19, 'Compras y Abastecimiento', 'desc: Compras y Abastecimiento', 23, 'ACTIVE'),(24, 25, 'Comunicaciones internas', 'desc: Comunicaciones internas', 24, 'ACTIVE'),(25, 1, 'Contabilidad', 'desc: Contabilidad', 25, 'ACTIVE'),(26, 24, 'Control de Calidad', 'desc: Control de Calidad', 26, 'ACTIVE'),(27, 1, 'Control de gestión y Presupuesto', 'desc: Control de gestión y Presupuesto', 27, 'ACTIVE'),(28, 11, 'Corporate Finance & Banca Inversión', 'desc: Corporate Finance & Banca Inversión', 28, 'ACTIVE'),(29, 11, 'Costos', 'desc: Costos', 29, 'ACTIVE'),(30, 11, 'Créditos y Cobranzas', 'desc: Créditos y Cobranzas', 30, 'ACTIVE'),(31, 11, 'Cuentas Corrientes', 'desc: Cuentas Corrientes', 31, 'ACTIVE'),(32, 15, 'Data Entry', 'desc: Data Entry', 32, 'ACTIVE'),(33, 7, 'Data Warehousing', 'desc: Data Warehousing', 33, 'ACTIVE'),(34, 9, 'Desarrollo de Negocios', 'desc: Desarrollo de Negocios', 34, 'ACTIVE'),(35, 17, 'Dirección de Obra', 'desc: Dirección de Obra', 35, 'ACTIVE'),(36, 2, 'Diseño de Interiores & Decoración', 'desc: Diseño de Interiores & Decoración', 36, 'ACTIVE'),(37, 2, 'Diseño Gráfico', 'desc: Diseño Gráfico', 37, 'ACTIVE'),(38, 2, 'Diseño Industrial', 'desc: Diseño Industrial', 38, 'ACTIVE'),(39, 2, 'Diseño Multimedia', 'desc: Diseño Multimedia', 39, 'ACTIVE'),(40, 2, 'Diseño Textil e Indumentaria', 'desc: Diseño Textil e Indumentaria', 40, 'ACTIVE'),(41, 2, 'Diseño Web', 'desc: Diseño Web', 41, 'ACTIVE'),(42, 9, 'E-Commerce', 'desc: E-Commerce', 42, 'ACTIVE'),(43, 10, 'Educación', 'desc: Educación', 43, 'ACTIVE'),(44, 6, 'Enfermera', 'desc: Enfermera', 44, 'ACTIVE'),(45, 9, 'Entrenamiento De Ventas', 'desc: Entrenamiento De Ventas', 45, 'ACTIVE'),(46, 20, 'Estética y Cuidado Personal', 'desc: Estética y Cuidado Personal', 46, 'ACTIVE'),(47, 11, 'Evaluación Económica', 'desc: Evaluación Económica', 47, 'ACTIVE'),(48, 1, 'Facturación', 'desc: Facturación', 48, 'ACTIVE'),(49, 4, 'Farmacia', 'desc: Farmacia', 49, 'ACTIVE'),(50, 11, 'Finanzas', 'desc: Finanzas', 50, 'ACTIVE'),(51, 21, 'Gastronomía', 'desc: Gastronomía', 51, 'ACTIVE'),(52, 3, 'Gerencia General', 'desc: Gerencia General', 52, 'ACTIVE'),(53, 1, 'Impuestos', 'desc: Impuestos', 53, 'ACTIVE'),(54, 23, 'Investigación de Mercado', 'desc: Investigación de Mercado', 54, 'ACTIVE'),(55, 24, 'Investigación y Desarrollo', 'desc: Investigación y Desarrollo', 55, 'ACTIVE'),(56, 22, 'Jóvenes Profesionales', 'desc: Jóvenes Profesionales', 56, 'ACTIVE'),(57, 12, 'Legales', 'desc: Legales', 57, 'ACTIVE'),(58, 8, 'Logística y Distribución', 'desc: Logística y Distribución', 58, 'ACTIVE'),(59, 24, 'Mantenimiento de planta', 'desc: Mantenimiento de planta', 59, 'ACTIVE'),(60, 15, 'Mantenimiento y Limpieza', 'desc: Mantenimiento y Limpieza', 60, 'ACTIVE'),(61, 23, 'Marketing', 'desc: Marketing', 61, 'ACTIVE'),(62, 23, 'Marketing Online & Digital', 'desc: Marketing Online & Digital', 62, 'ACTIVE'),(63, 6, 'Medico', 'desc: Medico', 63, 'ACTIVE'),(64, 14, 'Música & Arte & Cultura', 'desc: Música & Arte & Cultura', 64, 'ACTIVE'),(65, 15, 'Oficios y Profesiones', 'desc: Oficios y Profesiones', 65, 'ACTIVE'),(66, 24, 'Operaciones', 'desc: Operaciones', 66, 'ACTIVE'),(67, 16, 'Organización de Eventos', 'desc: Organización de Eventos', 67, 'ACTIVE'),(68, 25, 'Organización y Métodos', 'desc: Organización y Métodos', 68, 'ACTIVE'),(69, 22, 'Pasantía & Trainee', 'desc: Pasantía & Trainee', 69, 'ACTIVE'),(70, 13, 'Periodismo', 'desc: Periodismo', 70, 'ACTIVE'),(71, 9, 'Planeamiento comercial', 'desc: Planeamiento comercial', 71, 'ACTIVE'),(72, 11, 'Planeamiento económico-financiero', 'desc: Planeamiento económico-financiero', 72, 'ACTIVE'),(73, 24, 'Producción', 'desc: Producción', 73, 'ACTIVE'),(74, 13, 'Producción Audiovisual', 'desc: Producción Audiovisual', 74, 'ACTIVE'),(75, 23, 'Producto', 'desc: Producto', 75, 'ACTIVE'),(76, 7, 'Programación', 'desc: Programación', 76, 'ACTIVE'),(77, 24, 'Programación de producción', 'desc: Programación de producción', 77, 'ACTIVE'),(78, 15, 'Promotoras&es', 'desc: Promotoras&es', 78, 'ACTIVE'),(79, 10, 'Psicopedagogía', 'desc: Psicopedagogía', 79, 'ACTIVE'),(80, 23, 'Publicidad', 'desc: Publicidad', 80, 'ACTIVE'),(81, 4, 'Química', 'desc: Química', 81, 'ACTIVE'),(82, 5, 'Recepción', 'desc: Recepción', 82, 'ACTIVE'),(83, 25, 'Recursos Humanos', 'desc: Recursos Humanos', 83, 'ACTIVE'),(84, 7, 'Redes', 'desc: Redes', 84, 'ACTIVE'),(85, 16, 'Relaciones Institucionales & Públicas', 'desc: Relaciones Institucionales & Públicas', 85, 'ACTIVE'),(86, 25, 'Relaciones Laborales', 'desc: Relaciones Laborales', 86, 'ACTIVE'),(87, 25, 'Remuneraciones & Compen. y Beneficios', 'desc: Remuneraciones & Compen. y Beneficios', 87, 'ACTIVE'),(88, 6, 'Salud', 'desc: Salud', 88, 'ACTIVE'),(89, 5, 'Secretaria & Asistente', 'desc: Secretaria & Asistente', 89, 'ACTIVE'),(90, 15, 'Seguridad', 'desc: Seguridad', 90, 'ACTIVE'),(91, 24, 'Seguridad Industrial & Higiene & Medio Ambiente', 'desc: Seguridad Industrial & Higiene & Medio Ambiente', 92, 'ACTIVE'),(92, 7, 'Seguridad Informática', 'desc: Seguridad Informática', 93, 'ACTIVE'),(93, 1, 'Seguros & Análisis de Siniestros', 'desc: Seguros & Análisis de Siniestros', 94, 'ACTIVE'),(94, 25, 'Selección y Empleos', 'desc: Selección y Empleos', 95, 'ACTIVE'),(95, 7, 'Sistemas', 'desc: Sistemas', 96, 'ACTIVE'),(96, 7, 'Soporte Técnico & Mesa de Ayuda', 'desc: Soporte Técnico & Mesa de Ayuda', 97, 'ACTIVE'),(97, 7, 'Tecnología & Infraestructura', 'desc: Tecnología & Infraestructura', 98, 'ACTIVE'),(98, 5, 'Telefonista', 'desc: Telefonista', 99, 'ACTIVE'),(99, 9, 'Telemarketing', 'desc: Telemarketing', 100, 'ACTIVE'),(100, 11, 'Tesorería', 'desc: Tesorería', 101, 'ACTIVE'),(101, 7, 'Testing & QA & QC', 'desc: Testing & QA & QC', 102, 'ACTIVE'),(102, 13, 'Traducción', 'desc: Traducción', 103, 'ACTIVE'),(103, 15, 'Transporte', 'desc: Transporte', 104, 'ACTIVE'),(104, 6, 'Veterinaria', 'desc: Veterinaria', 105, 'ACTIVE')";

                    var insertHierarchies = "INSERT INTO Hierarchies (hierarchyId, name, description, coef_peq, coef_med, coef_grand, coef_min, coef_max, coef_junior, coef_senior, orden, status) VALUES(1, 'Analista', 'Analista Analista Analista Analista Analista Anali', 0.85, 1.16, 1.38, 0.75, 1.34, 0.79, 1.37, 7, 'ACTIVE'),(2, 'Asistente', 'Asistente Asistente Asistente Asistente Asistente ', 0.76, 1.3, 1.5, 0.62, 1.63, 0.63, 1.24, 5, 'ACTIVE'),(3, 'Auxiliar', 'Auxiliar Auxiliar Auxiliar Auxiliar Auxiliar Auxil', 0.77, 1.28, 1.48, 0.64, 1.59, 0.86, 1, 2, 'ACTIVE'),(4, 'Consultor & Asesor', 'Consultor / Asesor Consultor / Asesor Consultor / ', 0.8, 1.23, 1.41, 0.68, 1.5, 0.52, 2.72, 10, 'ACTIVE'),(5, 'Director', 'Director Director Director Director Director Direc', 0.8, 1.23, 1.47, 0.68, 1.49, 1, 1, 13, 'ACTIVE'),(6, 'Ejecutivo de ventas', 'Ejecutivo de ventas Ejecutivo de ventas Ejecutivo ', 0.82, 1.2, 1.55, 0.71, 1.43, 0.65, 1.27, 8, 'ACTIVE'),(7, 'Gerente', 'Gerente Gerente Gerente Gerente Gerente Gerente Ge', 0.84, 1.17, 1.41, 0.74, 1.36, 0.82, 1.37, 12, 'ACTIVE'),(8, 'Jefe & Supervisor', 'Jefe / Supervisor Jefe / Supervisor Jefe / Supervi', 0.85, 1.15, 1.39, 0.76, 1.33, 0.82, 1.17, 11, 'ACTIVE'),(9, 'Oficio', 'Oficio Oficio Oficio Oficio Oficio Oficio Oficio ', 0.54, 1.83, 2.04, 0.37, 2.72, 0.72, 1.39, 3, 'ACTIVE'),(10, 'Operario', 'Operario Operario Operario Operario Operario Opera', 0.76, 1.29, 1.64, 0.63, 1.61, 0.45, 1.08, 1, 'ACTIVE'),(11, 'Profesional', 'Profesional Profesional Profesional Profesional Pr', 0.8, 1.23, 1.48, 0.68, 1.49, 0.75, 1.37, 9, 'ACTIVE'),(12, 'Secretaria', 'Secretaria Secretaria Secretaria Secretaria Secret', 0.88, 1.12, 1.31, 0.8, 1.26, 0.91, 1.55, 4, 'ACTIVE'),(13, 'Tecnico', 'Tecnico Tecnico Tecnico Tecnico Tecnico Tecnico Te', 0.83, 1.19, 1.41, 0.72, 1.4, 0.69, 1.3, 6, 'ACTIVE')";

                    var insertSeniorities = "INSERT INTO Seniorities (seniorityId, name, description, orden, status) VALUES(1, 'Junior', 'Junior Junior Junior Junior Junior Junior Junior ', NULL, 'ACTIVE'),(2, 'Semi senior', 'Semi senior Semi senior Semi senior Semi senior Se', NULL, 'ACTIVE'),(3, 'Senior', 'Senior Senior Senior Senior Senior Senior Senior ', NULL, 'ACTIVE')";

                    var insertCountries = "INSERT INTO Countries (countryId, countryName, countryCurrency, exchangeRateDolar, status) VALUES (1, 'Argentina', 'Pesos', 8.9, 'ACTIVE');";






                    var insertPositions1 = "INSERT INTO Positions (positionId, name, description, areaId, sectorId, hierarchyId, average, orden, countryId, internalCode, status) VALUES(1, '', '', 1, 1, 1, 13800, 1, 1, 'N23', 'ACTIVE'),(2, '', '', 1, 1, 2, 12400, 2, 1, 'N178', 'ACTIVE'),(3, '', '', 1, 1, 3, 11600, 3, 1, 'N197', 'ACTIVE'),(4, '', '', 1, 1, 4, 19100, 4, 1, 'N190', 'ACTIVE'),(5, '', '', 1, 1, 5, 100900, 5, 1, 'N244', 'ACTIVE'),(6, '', '', 1, 1, 7, 46900, 6, 1, 'N297', 'ACTIVE'),(7, '', '', 1, 1, 8, 27900, 7, 1, 'N562', 'ACTIVE'),(8, '', '', 1, 1, 11, 16600, 8, 1, 'N234', 'ACTIVE'),(9, '', '', 1, 4, 1, 19800, 9, 1, 'N28', 'ACTIVE'),(10, '', '', 1, 4, 2, 12400, 10, 1, 'N178', 'ACTIVE'),(11, '', '', 1, 4, 3, 11600, 11, 1, 'N197', 'ACTIVE'),(12, '', '', 1, 4, 4, 19100, 12, 1, 'N190', 'ACTIVE'),(13, '', '', 1, 4, 7, 45800, 13, 1, 'N300', 'ACTIVE'),(14, '', '', 1, 4, 8, 28400, 14, 1, 'N567', 'ACTIVE'),(15, '', '', 1, 12, 1, 13800, 15, 1, 'N23', 'ACTIVE'),(16, '', '', 1, 12, 2, 12400, 16, 1, 'N178', 'ACTIVE'),(17, '', '', 1, 12, 3, 11600, 17, 1, 'N197', 'ACTIVE'),(18, '', '', 1, 12, 4, 19100, 18, 1, 'N190', 'ACTIVE'),(19, '', '', 1, 12, 7, 68800, 19, 1, 'N314', 'ACTIVE'),(20, '', '', 1, 12, 8, 35500, 20, 1, 'N572', 'ACTIVE'),(21, '', '', 1, 25, 1, 15800, 21, 1, 'N80', 'ACTIVE'),(22, '', '', 1, 25, 2, 12400, 22, 1, 'N178', 'ACTIVE'),(23, '', '', 1, 25, 3, 11600, 23, 1, 'N197', 'ACTIVE'),(24, '', '', 1, 25, 4, 19100, 24, 1, 'N190', 'ACTIVE'),(25, '', '', 1, 25, 7, 46200, 25, 1, 'N327', 'ACTIVE'),(26, '', '', 1, 25, 8, 30600, 26, 1, 'N582', 'ACTIVE'),(27, '', '', 1, 27, 1, 16400, 27, 1, 'N119', 'ACTIVE'),(28, '', '', 1, 27, 7, 45900, 28, 1, 'N330', 'ACTIVE'),(29, '', '', 1, 27, 8, 30600, 29, 1, 'N584', 'ACTIVE'),(30, '', '', 1, 48, 1, 14100, 30, 1, 'N77', 'ACTIVE'),(31, '', '', 1, 48, 2, 12400, 31, 1, 'N178', 'ACTIVE'),(32, '', '', 1, 48, 3, 11600, 32, 1, 'N197', 'ACTIVE'),(33, '', '', 1, 48, 7, 45800, 33, 1, 'N300', 'ACTIVE'),(34, '', '', 1, 48, 8, 25200, 34, 1, 'N601', 'ACTIVE'),(35, '', '', 1, 53, 1, 17400, 35, 1, 'N86', 'ACTIVE'),(36, '', '', 1, 53, 2, 12400, 36, 1, 'N178', 'ACTIVE'),(37, '', '', 1, 53, 3, 11600, 37, 1, 'N197', 'ACTIVE'),(38, '', '', 1, 53, 4, 19100, 38, 1, 'N190', 'ACTIVE'),(39, '', '', 1, 53, 8, 32500, 39, 1, 'N605', 'ACTIVE'),(40, '', '', 1, 53, 7, 50600, 40, 1, 'N368', 'ACTIVE'),(41, '', '', 1, 93, 1, 16400, 41, 1, 'N119', 'ACTIVE'),(42, '', '', 1, 93, 2, 12400, 42, 1, 'N178', 'ACTIVE'),(43, '', '', 1, 93, 3, 11600, 43, 1, 'N197', 'ACTIVE'),(44, '', '', 1, 93, 8, 37500, 44, 1, 'N638', 'ACTIVE'),(45, '', '', 3, 7, 5, 205100, 45, 1, 'N254', 'ACTIVE'),(46, '', '', 3, 7, 7, 152700, 46, 1, 'N361', 'ACTIVE'),(47, '', '', 3, 52, 5, 205100, 47, 1, 'N254', 'ACTIVE'),(48, '', '', 3, 52, 7, 152700, 48, 1, 'N361', 'ACTIVE'),(49, '', '', 5, 11, 12, 15700, 49, 1, 'N556', 'ACTIVE'),(50, '', '', 5, 82, 12, 15700, 50, 1, 'N556', 'ACTIVE'),(51, '', '', 5, 89, 12, 15700, 51, 1, 'N556', 'ACTIVE'),(52, '', '', 7, 2, 1, 18400, 52, 1, 'N17', 'ACTIVE'),(53, '', '', 7, 2, 2, 17200, 53, 1, 'N106', 'ACTIVE'),(54, '', '', 7, 2, 3, 17200, 54, 1, 'N106', 'ACTIVE'),(55, '', '', 7, 2, 4, 18400, 55, 1, 'N17', 'ACTIVE'),(56, '', '', 7, 2, 7, 49400, 56, 1, 'N442', 'ACTIVE'),(57, '', '', 7, 2, 8, 28400, 57, 1, 'N567', 'ACTIVE'),(58, '', '', 7, 2, 11, 20100, 58, 1, 'N102', 'ACTIVE'),(59, '', '', 7, 2, 13, 14700, 59, 1, 'N658', 'ACTIVE'),(60, '', '', 7, 9, 1, 19300, 60, 1, 'N163', 'ACTIVE'),(61, '', '', 7, 9, 2, 17200, 61, 1, 'N106', 'ACTIVE'),(62, '', '', 7, 9, 3, 17200, 62, 1, 'N106', 'ACTIVE'),(63, '', '', 7, 9, 4, 19700, 63, 1, 'N536', 'ACTIVE'),(64, '', '', 7, 9, 7, 48200, 64, 1, 'N304', 'ACTIVE'),(65, '', '', 7, 9, 11, 19700, 65, 1, 'N536', 'ACTIVE'),(66, '', '', 7, 9, 13, 14700, 66, 1, 'N658', 'ACTIVE'),(67, '', '', 7, 33, 1, 19300, 67, 1, 'N163', 'ACTIVE'),(68, '', '', 7, 33, 2, 17200, 68, 1, 'N106', 'ACTIVE'),(69, '', '', 7, 33, 3, 17200, 69, 1, 'N106', 'ACTIVE'),(70, '', '', 7, 33, 4, 19700, 70, 1, 'N536', 'ACTIVE'),(71, '', '', 7, 33, 7, 47200, 71, 1, 'N343', 'ACTIVE'),(72, '', '', 7, 33, 8, 32200, 72, 1, 'N563', 'ACTIVE'),(73, '', '', 7, 33, 11, 16700, 73, 1, 'N239', 'ACTIVE'),(74, '', '', 7, 33, 13, 14700, 74, 1, 'N658', 'ACTIVE'),(75, '', '', 7, 76, 1, 19500, 75, 1, 'N128', 'ACTIVE'),(76, '', '', 7, 76, 2, 17200, 76, 1, 'N106', 'ACTIVE'),(77, '', '', 7, 76, 3, 17200, 77, 1, 'N106', 'ACTIVE'),(78, '', '', 7, 76, 4, 19700, 78, 1, 'N536', 'ACTIVE'),(79, '', '', 7, 76, 7, 39900, 79, 1, 'N349', 'ACTIVE'),(80, '', '', 7, 76, 8, 33800, 80, 1, 'N594', 'ACTIVE'),(81, '', '', 7, 76, 11, 16700, 81, 1, 'N239', 'ACTIVE'),(82, '', '', 7, 76, 13, 14700, 82, 1, 'N658', 'ACTIVE'),(83, '', '', 7, 84, 1, 20700, 83, 1, 'N496', 'ACTIVE'),(84, '', '', 7, 84, 2, 17200, 84, 1, 'N106', 'ACTIVE'),(85, '', '', 7, 84, 3, 17200, 85, 1, 'N106', 'ACTIVE'),(86, '', '', 7, 84, 4, 19700, 86, 1, 'N536', 'ACTIVE'),(87, '', '', 7, 84, 7, 49400, 87, 1, 'N442', 'ACTIVE'),(88, '', '', 7, 84, 8, 32800, 88, 1, 'N618', 'ACTIVE'),(89, '', '', 7, 84, 11, 16700, 89, 1, 'N239', 'ACTIVE'),(90, '', '', 7, 84, 13, 14700, 90, 1, 'N658', 'ACTIVE'),(91, '', '', 7, 92, 1, 19500, 91, 1, 'N144', 'ACTIVE'),(92, '', '', 7, 92, 2, 17200, 92, 1, 'N106', 'ACTIVE'),(93, '', '', 7, 92, 3, 17200, 93, 1, 'N106', 'ACTIVE'),(94, '', '', 7, 92, 4, 19700, 94, 1, 'N536', 'ACTIVE'),(95, '', '', 7, 92, 7, 52400, 95, 1, 'N424', 'ACTIVE'),(96, '', '', 7, 92, 8, 34000, 96, 1, 'N635', 'ACTIVE'),(97, '', '', 7, 92, 11, 16700, 97, 1, 'N239', 'ACTIVE'),(98, '', '', 7, 92, 13, 14700, 98, 1, 'N658', 'ACTIVE'),(99, '', '', 7, 95, 1, 19500, 99, 1, 'N128', 'ACTIVE'),(100, '', '', 7, 95, 2, 17200, 100, 1, 'N106', 'ACTIVE'),(101, '', '', 7, 95, 3, 17200, 101, 1, 'N106', 'ACTIVE'),(102, '', '', 7, 95, 4, 19700, 102, 1, 'N536', 'ACTIVE'),(103, '', '', 7, 95, 5, 117100, 103, 1, 'N277', 'ACTIVE'),(104, '', '', 7, 95, 7, 42700, 104, 1, 'N392', 'ACTIVE'),(105, '', '', 7, 95, 8, 34900, 105, 1, 'N644', 'ACTIVE'),(106, '', '', 7, 95, 11, 16700, 106, 1, 'N239', 'ACTIVE'),(107, '', '', 7, 95, 13, 14700, 107, 1, 'N658', 'ACTIVE'),(108, '', '', 7, 96, 1, 14700, 108, 1, 'N658', 'ACTIVE'),(109, '', '', 7, 96, 2, 17200, 109, 1, 'N106', 'ACTIVE'),(110, '', '', 7, 96, 3, 17200, 110, 1, 'N106', 'ACTIVE'),(111, '', '', 7, 96, 4, 19700, 111, 1, 'N536', 'ACTIVE'),(112, '', '', 7, 96, 7, 48900, 112, 1, 'N366', 'ACTIVE'),(113, '', '', 7, 96, 8, 32300, 113, 1, 'N643', 'ACTIVE'),(114, '', '', 7, 96, 11, 16700, 114, 1, 'N239', 'ACTIVE'),(115, '', '', 7, 96, 13, 14700, 115, 1, 'N658', 'ACTIVE'),(116, '', '', 7, 97, 1, 19300, 116, 1, 'N163', 'ACTIVE'),(117, '', '', 7, 97, 2, 17200, 117, 1, 'N106', 'ACTIVE'),(118, '', '', 7, 97, 3, 17200, 118, 1, 'N106', 'ACTIVE'),(119, '', '', 7, 97, 4, 19700, 119, 1, 'N536', 'ACTIVE'),(120, '', '', 7, 97, 5, 117100, 120, 1, 'N277', 'ACTIVE'),(121, '', '', 7, 97, 7, 47200, 121, 1, 'N343', 'ACTIVE'),(122, '', '', 7, 97, 8, 32300, 122, 1, 'N643', 'ACTIVE'),(123, '', '', 7, 97, 11, 16700, 123, 1, 'N239', 'ACTIVE'),(124, '', '', 7, 97, 13, 14700, 124, 1, 'N658', 'ACTIVE'),(125, '', '', 7, 101, 1, 19500, 125, 1, 'N128', 'ACTIVE'),(126, '', '', 7, 101, 2, 17200, 126, 1, 'N106', 'ACTIVE'),(127, '', '', 7, 101, 3, 17200, 127, 1, 'N106', 'ACTIVE'),(128, '', '', 7, 101, 4, 19700, 128, 1, 'N536', 'ACTIVE'),(129, '', '', 7, 101, 7, 45600, 129, 1, 'N329', 'ACTIVE'),(130, '', '', 7, 101, 8, 32800, 130, 1, 'N618', 'ACTIVE'),(131, '', '', 7, 101, 11, 16700, 131, 1, 'N239', 'ACTIVE'),(132, '', '', 7, 101, 13, 14700, 132, 1, 'N658', 'ACTIVE'),(133, '', '', 8, 6, 7, 50600, 133, 1, 'N353', 'ACTIVE'),(134, '', '', 8, 6, 8, 23900, 134, 1, 'N568', 'ACTIVE'),(135, '', '', 8, 6, 12, 15700, 135, 1, 'N556', 'ACTIVE'),(136, '', '', 8, 58, 5, 107300, 136, 1, 'N256', 'ACTIVE'),(137, '', '', 8, 58, 7, 50600, 137, 1, 'N353', 'ACTIVE'),(138, '', '', 8, 58, 8, 27200, 138, 1, 'N597', 'ACTIVE'),(139, '', '', 8, 58, 12, 15700, 139, 1, 'N556', 'ACTIVE'),(140, '', '', 8, 0, 7, 49000, 140, 1, 'N379', 'ACTIVE'),(141, '', '', 8, 0, 8, 29100, 141, 1, 'N561', 'ACTIVE'),(142, '', '', 9, 21, 1, 15900, 142, 1, 'N30', 'ACTIVE'),(143, '', '', 9, 21, 2, 13200, 143, 1, 'N176', 'ACTIVE'),(144, '', '', 9, 21, 4, 19200, 144, 1, 'N230', 'ACTIVE'),(145, '', '', 9, 21, 5, 124000, 145, 1, 'N281', 'ACTIVE'),(146, '', '', 9, 21, 7, 46700, 146, 1, 'N453', 'ACTIVE'),(147, '', '', 9, 21, 8, 31700, 147, 1, 'N575', 'ACTIVE'),(148, '', '', 9, 21, 11, 15000, 148, 1, 'N547', 'ACTIVE'),(149, '', '', 9, 21, 12, 15700, 149, 1, 'N556', 'ACTIVE'),(150, '', '', 9, 21, 13, 20200, 150, 1, 'N551', 'ACTIVE'),(151, '', '', 9, 34, 1, 18300, 151, 1, 'N116', 'ACTIVE'),(152, '', '', 9, 34, 2, 13200, 152, 1, 'N176', 'ACTIVE'),(153, '', '', 9, 34, 4, 19200, 153, 1, 'N230', 'ACTIVE'),(154, '', '', 9, 34, 5, 119200, 154, 1, 'N255', 'ACTIVE'),(155, '', '', 9, 34, 7, 54000, 155, 1, 'N341', 'ACTIVE'),(156, '', '', 9, 34, 8, 20200, 156, 1, 'N551', 'ACTIVE'),(157, '', '', 9, 34, 11, 15000, 157, 1, 'N547', 'ACTIVE'),(158, '', '', 9, 34, 12, 15700, 158, 1, 'N556', 'ACTIVE'),(159, '', '', 9, 34, 13, 20200, 159, 1, 'N551', 'ACTIVE'),(160, '', '', 9, 42, 1, 16600, 160, 1, 'N169', 'ACTIVE'),(161, '', '', 9, 42, 2, 13200, 161, 1, 'N176', 'ACTIVE'),(162, '', '', 9, 42, 4, 19200, 162, 1, 'N230', 'ACTIVE'),(163, '', '', 9, 42, 7, 51400, 163, 1, 'N451', 'ACTIVE'),(164, '', '', 9, 42, 8, 27700, 164, 1, 'N647', 'ACTIVE'),(165, '', '', 9, 42, 11, 15000, 165, 1, 'N547', 'ACTIVE'),(166, '', '', 9, 42, 13, 20200, 166, 1, 'N551', 'ACTIVE'),(167, '', '', 9, 71, 1, 18300, 167, 1, 'N116', 'ACTIVE'),(168, '', '', 9, 71, 2, 13200, 168, 1, 'N176', 'ACTIVE'),(169, '', '', 9, 71, 4, 19200, 169, 1, 'N230', 'ACTIVE'),(170, '', '', 9, 71, 7, 54000, 170, 1, 'N397', 'ACTIVE'),(171, '', '', 9, 71, 8, 31300, 171, 1, 'N621', 'ACTIVE'),(172, '', '', 9, 71, 11, 15000, 172, 1, 'N547', 'ACTIVE'),(173, '', '', 9, 71, 13, 20200, 173, 1, 'N551', 'ACTIVE'),(174, '', '', 9, 99, 1, 10200, 174, 1, 'N187', 'ACTIVE'),(175, '', '', 9, 99, 2, 13200, 175, 1, 'N176', 'ACTIVE'),(176, '', '', 9, 99, 4, 19200, 176, 1, 'N230', 'ACTIVE'),(177, '', '', 9, 99, 7, 44400, 177, 1, 'N444', 'ACTIVE'),(178, '', '', 9, 99, 8, 22800, 178, 1, 'N645', 'ACTIVE'),(179, '', '', 9, 99, 11, 15000, 179, 1, 'N547', 'ACTIVE'),(180, '', '', 9, 99, 12, 15700, 180, 1, 'N556', 'ACTIVE'),(181, '', '', 9, 99, 13, 20200, 181, 1, 'N551', 'ACTIVE'),(182, '', '', 9, 45, 7, 46200, 182, 1, 'N354', 'ACTIVE'),(183, '', '', 10, 43, 12, 15700, 183, 1, 'N556', 'ACTIVE'),(184, '', '', 10, 79, 12, 15700, 184, 1, 'N556', 'ACTIVE'),(185, '', '', 11, 8, 1, 16400, 185, 1, 'N119', 'ACTIVE'),(186, '', '', 11, 8, 2, 12400, 186, 1, 'N178', 'ACTIVE'),(187, '', '', 11, 8, 3, 11600, 187, 1, 'N197', 'ACTIVE'),(188, '', '', 11, 8, 4, 19100, 188, 1, 'N190', 'ACTIVE'),(189, '', '', 11, 8, 7, 48200, 189, 1, 'N304', 'ACTIVE'),(190, '', '', 11, 8, 8, 33500, 190, 1, 'N620', 'ACTIVE'),(191, '', '', 11, 8, 11, 16600, 191, 1, 'N234', 'ACTIVE'),(192, '', '', 11, 28, 1, 16400, 192, 1, 'N119', 'ACTIVE'),(193, '', '', 11, 28, 2, 12400, 193, 1, 'N178', 'ACTIVE'),(194, '', '', 11, 28, 3, 11600, 194, 1, 'N197', 'ACTIVE'),(195, '', '', 11, 28, 4, 19100, 195, 1, 'N190', 'ACTIVE'),(196, '', '', 11, 28, 5, 0, 196, 1, 'N273', 'ACTIVE'),(197, '', '', 11, 28, 8, 29300, 197, 1, 'N630', 'ACTIVE'),(198, '', '', 11, 28, 11, 16600, 198, 1, 'N234', 'ACTIVE'),(199, '', '', 11, 28, 12, 15700, 199, 1, 'N556', 'ACTIVE'),(200, '', '', 11, 30, 1, 16000, 200, 1, 'N60', 'ACTIVE'),(201, '', '', 11, 30, 2, 12400, 201, 1, 'N178', 'ACTIVE'),(202, '', '', 11, 30, 3, 11600, 202, 1, 'N197', 'ACTIVE'),(203, '', '', 11, 30, 4, 19100, 203, 1, 'N190', 'ACTIVE'),(204, '', '', 11, 30, 7, 45800, 204, 1, 'N334', 'ACTIVE'),(205, '', '', 11, 30, 8, 29100, 205, 1, 'N587', 'ACTIVE'),(206, '', '', 11, 30, 11, 16600, 206, 1, 'N234', 'ACTIVE'),(207, '', '', 11, 31, 1, 14800, 207, 1, 'N63', 'ACTIVE'),(208, '', '', 11, 31, 2, 12400, 208, 1, 'N178', 'ACTIVE'),(209, '', '', 11, 31, 3, 11600, 209, 1, 'N197', 'ACTIVE'),(210, '', '', 11, 31, 4, 19100, 210, 1, 'N190', 'ACTIVE'),(211, '', '', 11, 31, 7, 49900, 211, 1, 'N339', 'ACTIVE'),(212, '', '', 11, 31, 8, 27700, 212, 1, 'N588', 'ACTIVE'),(213, '', '', 11, 31, 11, 16600, 213, 1, 'N234', 'ACTIVE'),(214, '', '', 11, 47, 1, 16400, 214, 1, 'N119', 'ACTIVE'),(215, '', '', 11, 47, 2, 12400, 215, 1, 'N178', 'ACTIVE'),(216, '', '', 11, 47, 3, 11600, 216, 1, 'N197', 'ACTIVE'),(217, '', '', 11, 47, 4, 19100, 217, 1, 'N190', 'ACTIVE'),(218, '', '', 11, 47, 7, 46400, 218, 1, 'N395', 'ACTIVE'),(219, '', '', 11, 47, 8, 33500, 219, 1, 'N620', 'ACTIVE'),(220, '', '', 11, 47, 11, 16600, 220, 1, 'N234', 'ACTIVE'),(221, '', '', 11, 50, 1, 15800, 221, 1, 'N80', 'ACTIVE'),(222, '', '', 11, 50, 2, 12400, 222, 1, 'N178', 'ACTIVE'),(223, '', '', 11, 50, 3, 11600, 223, 1, 'N197', 'ACTIVE'),(224, '', '', 11, 50, 4, 19100, 224, 1, 'N190', 'ACTIVE'),(225, '', '', 11, 50, 5, 100900, 225, 1, 'N244', 'ACTIVE'),(226, '', '', 11, 50, 7, 50100, 226, 1, 'N359', 'ACTIVE'),(227, '', '', 11, 50, 8, 32300, 227, 1, 'N602', 'ACTIVE'),(228, '', '', 11, 50, 11, 16600, 228, 1, 'N234', 'ACTIVE'),(229, '', '', 11, 50, 12, 15700, 229, 1, 'N556', 'ACTIVE'),(230, '', '', 11, 72, 1, 16400, 230, 1, 'N119', 'ACTIVE'),(231, '', '', 11, 72, 2, 12400, 231, 1, 'N178', 'ACTIVE'),(232, '', '', 11, 72, 3, 11600, 232, 1, 'N197', 'ACTIVE'),(233, '', '', 11, 72, 4, 19100, 233, 1, 'N190', 'ACTIVE'),(234, '', '', 11, 72, 7, 46400, 234, 1, 'N395', 'ACTIVE'),(235, '', '', 11, 72, 8, 33500, 235, 1, 'N620', 'ACTIVE'),(236, '', '', 11, 72, 11, 16600, 236, 1, 'N234', 'ACTIVE'),(237, '', '', 11, 100, 1, 15300, 237, 1, 'N166', 'ACTIVE'),(238, '', '', 11, 100, 2, 12400, 238, 1, 'N178', 'ACTIVE'),(239, '', '', 11, 100, 3, 11600, 239, 1, 'N197', 'ACTIVE'),(240, '', '', 11, 100, 4, 19100, 240, 1, 'N190', 'ACTIVE'),(241, '', '', 11, 100, 7, 49100, 241, 1, 'N445', 'ACTIVE'),(242, '', '', 11, 100, 8, 28600, 242, 1, 'N646', 'ACTIVE'),(243, '', '', 11, 100, 11, 16600, 243, 1, 'N234', 'ACTIVE'),(244, '', '', 11, 29, 1, 17800, 244, 1, 'N57', 'ACTIVE'),(245, '', '', 11, 29, 2, 12400, 245, 1, 'N178', 'ACTIVE'),(246, '', '', 11, 29, 3, 11600, 246, 1, 'N197', 'ACTIVE'),(247, '', '', 11, 29, 4, 19100, 247, 1, 'N190', 'ACTIVE'),(248, '', '', 11, 29, 7, 45700, 248, 1, 'N332', 'ACTIVE'),(249, '', '', 11, 29, 8, 26700, 249, 1, 'N586', 'ACTIVE'),(250, '', '', 11, 29, 11, 16600, 250, 1, 'N234', 'ACTIVE'),(251, '', '', 12, 57, 5, 134700, 251, 1, 'N263', 'ACTIVE'),(252, '', '', 12, 57, 7, 54800, 252, 1, 'N377', 'ACTIVE'),(253, '', '', 12, 57, 8, 37400, 253, 1, 'N609', 'ACTIVE'),(254, '', '', 12, 57, 12, 15700, 254, 1, 'N556', 'ACTIVE'),(255, '', '', 15, 13, 7, 48900, 255, 1, 'N366', 'ACTIVE'),(256, '', '', 15, 13, 8, 27900, 256, 1, 'N562', 'ACTIVE'),(257, '', '', 15, 32, 8, 27900, 257, 1, 'N562', 'ACTIVE'),(258, '', '', 15, 60, 8, 24400, 258, 1, 'N611', 'ACTIVE'),(259, '', '', 15, 90, 8, 22900, 259, 1, 'N634', 'ACTIVE'),(260, '', '', 15, 103, 8, 31900, 260, 1, 'N636', 'ACTIVE'),(261, '', '', 16, 85, 5, 118300, 261, 1, 'N245', 'ACTIVE'),(262, '', '', 16, 85, 7, 51800, 262, 1, 'N416', 'ACTIVE'),(263, '', '', 16, 85, 12, 15700, 263, 1, 'N556', 'ACTIVE'),(264, '', '', 17, 10, 12, 15700, 264, 1, 'N556', 'ACTIVE'),(265, '', '', 18, 5, 7, 51400, 265, 1, 'N451', 'ACTIVE'),(266, '', '', 18, 5, 8, 27900, 266, 1, 'N562', 'ACTIVE'),(267, '', '', 18, 22, 5, 124000, 267, 1, 'N281', 'ACTIVE'),(268, '', '', 18, 22, 7, 51400, 268, 1, 'N451', 'ACTIVE'),(269, '', '', 18, 22, 8, 27900, 269, 1, 'N562', 'ACTIVE'),(270, '', '', 18, 22, 12, 15700, 270, 1, 'N556', 'ACTIVE'),(271, '', '', 19, 23, 5, 115100, 271, 1, 'N252', 'ACTIVE'),(272, '', '', 19, 23, 7, 49100, 272, 1, 'N295', 'ACTIVE'),(273, '', '', 19, 23, 8, 29100, 273, 1, 'N561', 'ACTIVE'),(274, '', '', 19, 23, 12, 15700, 274, 1, 'N556', 'ACTIVE'),(275, '', '', 20, 46, 12, 15700, 275, 1, 'N556', 'ACTIVE'),(276, '', '', 22, 56, 8, 31800, 276, 1, 'N600', 'ACTIVE'),(277, '', '', 22, 69, 8, 31800, 277, 1, 'N600', 'ACTIVE'),(278, '', '', 23, 15, 1, 15700, 278, 1, 'N89', 'ACTIVE'),(279, '', '', 23, 15, 2, 15400, 279, 1, 'N285', 'ACTIVE'),(280, '', '', 23, 15, 4, 18500, 280, 1, 'N382', 'ACTIVE'),(281, '', '', 23, 15, 7, 71300, 281, 1, 'N376', 'ACTIVE'),(282, '', '', 23, 15, 8, 30200, 282, 1, 'N608', 'ACTIVE'),(283, '', '', 23, 54, 1, 15700, 283, 1, 'N89', 'ACTIVE'),(284, '', '', 23, 54, 2, 15400, 284, 1, 'N285', 'ACTIVE'),(285, '', '', 23, 54, 4, 18500, 285, 1, 'N382', 'ACTIVE'),(286, '', '', 23, 54, 7, 43000, 286, 1, 'N374', 'ACTIVE'),(287, '', '', 23, 54, 8, 30200, 287, 1, 'N608', 'ACTIVE'),(288, '', '', 23, 61, 1, 16300, 288, 1, 'N95', 'ACTIVE'),(289, '', '', 23, 61, 2, 15400, 289, 1, 'N285', 'ACTIVE'),(290, '', '', 23, 61, 4, 18500, 290, 1, 'N382', 'ACTIVE'),(291, '', '', 23, 61, 5, 127400, 291, 1, 'N264', 'ACTIVE'),(292, '', '', 23, 61, 7, 48600, 292, 1, 'N386', 'ACTIVE'),(293, '', '', 23, 61, 8, 31600, 293, 1, 'N613', 'ACTIVE'),(294, '', '', 23, 61, 12, 15700, 294, 1, 'N556', 'ACTIVE'),(295, '', '', 23, 62, 1, 16300, 295, 1, 'N95', 'ACTIVE'),(296, '', '', 23, 62, 2, 15400, 296, 1, 'N285', 'ACTIVE'),(297, '', '', 23, 62, 4, 18500, 297, 1, 'N382', 'ACTIVE'),(298, '', '', 23, 62, 7, 45400, 298, 1, 'N447', 'ACTIVE'),(299, '', '', 23, 62, 8, 27700, 299, 1, 'N647', 'ACTIVE'),(300, '', '', 23, 75, 1, 15700, 300, 1, 'N41', 'ACTIVE'),(301, '', '', 23, 75, 2, 15400, 301, 1, 'N285', 'ACTIVE'),(302, '', '', 23, 75, 4, 18500, 302, 1, 'N382', 'ACTIVE'),(303, '', '', 23, 75, 7, 65500, 303, 1, 'N365', 'ACTIVE'),(304, '', '', 23, 75, 8, 33300, 304, 1, 'N384', 'ACTIVE'),(305, '', '', 23, 80, 1, 16300, 305, 1, 'N95', 'ACTIVE'),(306, '', '', 23, 80, 2, 15400, 306, 1, 'N285', 'ACTIVE'),(307, '', '', 23, 80, 4, 18500, 307, 1, 'N382', 'ACTIVE'),(308, '', '', 23, 80, 5, 127400, 308, 1, 'N264', 'ACTIVE'),(309, '', '', 23, 80, 7, 53100, 309, 1, 'N325', 'ACTIVE'),(310, '', '', 23, 80, 8, 26700, 310, 1, 'N580', 'ACTIVE'),(311, '', '', 24, 18, 7, 45000, 311, 1, 'N313', 'ACTIVE'),(312, '', '', 24, 18, 8, 28700, 312, 1, 'N569', 'ACTIVE'),(313, '', '', 24, 26, 7, 45000, 313, 1, 'N313', 'ACTIVE'),(314, '', '', 24, 26, 8, 28100, 314, 1, 'N583', 'ACTIVE'),(315, '', '', 24, 55, 7, 72800, 315, 1, 'N375', 'ACTIVE'),(316, '', '', 24, 55, 8, 33900, 316, 1, 'N467', 'ACTIVE'),(317, '', '', 24, 59, 7, 54900, 317, 1, 'N372', 'ACTIVE'),(318, '', '', 24, 59, 8, 24400, 318, 1, 'N611', 'ACTIVE'),(319, '', '', 24, 66, 7, 49600, 319, 1, 'N391', 'ACTIVE'),(320, '', '', 24, 66, 8, 27100, 320, 1, 'N617', 'ACTIVE'),(321, '', '', 24, 66, 12, 15700, 321, 1, 'N556', 'ACTIVE'),(322, '', '', 24, 73, 5, 109100, 322, 1, 'N271', 'ACTIVE'),(323, '', '', 24, 73, 7, 54700, 323, 1, 'N405', 'ACTIVE'),(324, '', '', 24, 73, 8, 22100, 324, 1, 'N625', 'ACTIVE'),(325, '', '', 24, 73, 12, 15700, 325, 1, 'N556', 'ACTIVE'),(326, '', '', 24, 77, 7, 47500, 326, 1, 'N401', 'ACTIVE'),(327, '', '', 24, 77, 8, 31400, 327, 1, 'N623', 'ACTIVE'),(328, '', '', 24, 91, 5, 90500, 328, 1, 'N270', 'ACTIVE'),(329, '', '', 24, 91, 7, 68800, 329, 1, 'N314', 'ACTIVE'),(330, '', '', 24, 91, 8, 31500, 330, 1, 'N637', 'ACTIVE'),(331, '', '', 25, 3, 1, 15800, 331, 1, 'N25', 'ACTIVE'),(332, '', '', 25, 3, 2, 11000, 332, 1, 'N540', 'ACTIVE'),(333, '', '', 25, 3, 3, 0, 333, 1, 'N194', 'ACTIVE'),(334, '', '', 25, 3, 4, 20800, 334, 1, 'N499', 'ACTIVE'),(335, '', '', 25, 3, 7, 49000, 335, 1, 'N301', 'ACTIVE'),(336, '', '', 25, 3, 8, 28700, 336, 1, 'N565', 'ACTIVE'),(337, '', '', 25, 3, 13, 14700, 337, 1, 'N675', 'ACTIVE'),(338, '', '', 25, 20, 1, 16100, 338, 1, 'N74', 'ACTIVE'),(339, '', '', 25, 20, 2, 11000, 339, 1, 'N540', 'ACTIVE'),(340, '', '', 25, 20, 3, 0, 340, 1, 'N194', 'ACTIVE'),(341, '', '', 25, 20, 4, 20800, 341, 1, 'N499', 'ACTIVE'),(342, '', '', 25, 20, 7, 49100, 342, 1, 'N355', 'ACTIVE'),(343, '', '', 25, 20, 8, 31800, 343, 1, 'N600', 'ACTIVE'),(344, '', '', 25, 20, 13, 14700, 344, 1, 'N675', 'ACTIVE'),(345, '', '', 25, 24, 1, 17300, 345, 1, 'N48', 'ACTIVE'),(346, '', '', 25, 24, 2, 11000, 346, 1, 'N540', 'ACTIVE'),(347, '', '', 25, 24, 3, 0, 347, 1, 'N194', 'ACTIVE'),(348, '', '', 25, 24, 4, 20800, 348, 1, 'N499', 'ACTIVE'),(349, '', '', 25, 24, 7, 53400, 349, 1, 'N324', 'ACTIVE'),(350, '', '', 25, 24, 8, 29100, 350, 1, 'N579', 'ACTIVE'),(351, '', '', 25, 24, 13, 14700, 351, 1, 'N675', 'ACTIVE'),(352, '', '', 25, 68, 1, 15300, 352, 1, 'N109', 'ACTIVE'),(353, '', '', 25, 68, 2, 11000, 353, 1, 'N540', 'ACTIVE'),(354, '', '', 25, 68, 3, 0, 354, 1, 'N194', 'ACTIVE'),(355, '', '', 25, 68, 4, 20800, 355, 1, 'N499', 'ACTIVE'),(356, '', '', 25, 68, 7, 49000, 356, 1, 'N301', 'ACTIVE'),(357, '', '', 25, 68, 13, 14700, 357, 1, 'N675', 'ACTIVE'),(358, '', '', 25, 83, 1, 16000, 358, 1, 'N135', 'ACTIVE'),(359, '', '', 25, 83, 2, 11000, 359, 1, 'N540', 'ACTIVE'),(360, '', '', 25, 83, 3, 0, 360, 1, 'N194', 'ACTIVE'),(361, '', '', 25, 83, 4, 20800, 361, 1, 'N499', 'ACTIVE'),(362, '', '', 25, 83, 5, 117600, 362, 1, 'N272', 'ACTIVE'),(363, '', '', 25, 83, 7, 47900, 363, 1, 'N410', 'ACTIVE'),(364, '', '', 25, 83, 8, 24600, 364, 1, 'N629', 'ACTIVE'),(365, '', '', 25, 83, 12, 15700, 365, 1, 'N556', 'ACTIVE'),(366, '', '', 25, 83, 13, 14700, 366, 1, 'N675', 'ACTIVE'),(367, '', '', 25, 86, 1, 0, 367, 1, 'N137', 'ACTIVE'),(368, '', '', 25, 86, 2, 11000, 368, 1, 'N540', 'ACTIVE'),(369, '', '', 25, 86, 3, 0, 369, 1, 'N194', 'ACTIVE'),(370, '', '', 25, 86, 4, 20800, 370, 1, 'N499', 'ACTIVE'),(371, '', '', 25, 86, 7, 57700, 371, 1, 'N419', 'ACTIVE'),(372, '', '', 25, 86, 8, 35600, 372, 1, 'N631', 'ACTIVE'),(373, '', '', 25, 86, 12, 15700, 373, 1, 'N556', 'ACTIVE'),(374, '', '', 25, 86, 13, 14700, 374, 1, 'N675', 'ACTIVE'),(375, '', '', 25, 87, 1, 17300, 375, 1, 'N45', 'ACTIVE'),(376, '', '', 25, 87, 2, 11000, 376, 1, 'N540', 'ACTIVE'),(377, '', '', 25, 87, 3, 0, 377, 1, 'N194', 'ACTIVE'),(378, '', '', 25, 87, 4, 20800, 378, 1, 'N499', 'ACTIVE'),(379, '', '', 25, 87, 7, 49200, 379, 1, 'N319', 'ACTIVE'),(380, '', '', 25, 87, 8, 33100, 380, 1, 'N576', 'ACTIVE'),(381, '', '', 25, 87, 13, 14700, 381, 1, 'N675', 'ACTIVE'),(382, '', '', 25, 94, 1, 15600, 382, 1, 'N131', 'ACTIVE'),(383, '', '', 25, 94, 2, 11000, 383, 1, 'N540', 'ACTIVE'),(384, '', '', 25, 94, 3, 0, 384, 1, 'N194', 'ACTIVE'),(385, '', '', 25, 94, 4, 20800, 385, 1, 'N499', 'ACTIVE'),(386, '', '', 25, 94, 7, 45200, 386, 1, 'N408', 'ACTIVE'),(387, '', '', 25, 94, 8, 30200, 387, 1, 'N628', 'ACTIVE'),(388, '', '', 25, 94, 13, 14700, 388, 1, 'N675', 'ACTIVE')";
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