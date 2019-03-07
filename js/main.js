var URL1 = "https://bogota-laburbano.opendatasoft.com/api/records/1.0/search/?dataset=establecimientos-comerciales-2016&" +
  "q=(objectid+%3E0)+AND+(objectid+%3C%3D+88000)+AND+((%23exact(desc_cod_c%2C%22EXPENDIO+A+LA+MESA+DE+COMIDAS+PREPARADAS%22))" +
  "+OR+(%23exact(desc_cod_c%2C%22EXPENDIO+DE+BEBIDAS+ALCOHOLICAS+PARA+EL+CONSUMO+DENTRO+DEL+ESTABLECIMIENTO%22)))&rows=10000&sort=-objectid";

var URL2 = "https://bogota-laburbano.opendatasoft.com/api/records/1.0/search/?dataset=establecimientos-comerciales-2016&" +
  "q=(objectid+%3E88000)+AND+(objectid+%3C%3D+188000)+AND+((%23exact(desc_cod_c%2C%22EXPENDIO+A+LA+MESA+DE+COMIDAS+PREPARADAS%22))" +
  "+OR+(%23exact(desc_cod_c%2C%22EXPENDIO+DE+BEBIDAS+ALCOHOLICAS+PARA+EL+CONSUMO+DENTRO+DEL+ESTABLECIMIENTO%22)))&rows=10000&sort=-objectid";

var URL3 = "https://bogota-laburbano.opendatasoft.com/api/records/1.0/search/?dataset=establecimientos-comerciales-2016&" +
  "q=(objectid+%3E188000)+AND+(objectid+%3C%3D+280000)+AND+((%23exact(desc_cod_c%2C%22EXPENDIO+A+LA+MESA+DE+COMIDAS+PREPARADAS%22))" +
  "+OR+(%23exact(desc_cod_c%2C%22EXPENDIO+DE+BEBIDAS+ALCOHOLICAS+PARA+EL+CONSUMO+DENTRO+DEL+ESTABLECIMIENTO%22)))&rows=10000&sort=-objectid";

var URL4 = "https://bogota-laburbano.opendatasoft.com/api/records/1.0/search/?dataset=establecimientos-comerciales-2016&" +
  "q=(objectid+%3E280000)+AND+(objectid+%3C%3D+395000)+AND+((%23exact(desc_cod_c%2C%22EXPENDIO+A+LA+MESA+DE+COMIDAS+PREPARADAS%22))" +
  "+OR+(%23exact(desc_cod_c%2C%22EXPENDIO+DE+BEBIDAS+ALCOHOLICAS+PARA+EL+CONSUMO+DENTRO+DEL+ESTABLECIMIENTO%22)))&rows=10000&sort=-objectid";

var URL5 = "https://bogota-laburbano.opendatasoft.com/api/records/1.0/search/?dataset=establecimientos-comerciales-2016&" +
  "q=(objectid+%3E395000)+AND+(objectid+%3C%3D+439887)+AND+((%23exact(desc_cod_c%2C%22EXPENDIO+A+LA+MESA+DE+COMIDAS+PREPARADAS%22))" +
  "+OR+(%23exact(desc_cod_c%2C%22EXPENDIO+DE+BEBIDAS+ALCOHOLICAS+PARA+EL+CONSUMO+DENTRO+DEL+ESTABLECIMIENTO%22)))&rows=10000&sort=-objectid";


var BARRIOS = "https://bogota-laburbano.opendatasoft.com/api/records/1.0/search/?dataset=barrios_prueba&rows=3871"

var SEGURIDAD = "https://www.datos.gov.co/resource/enju-8jvx.json"

var COLEGIOS = "https://www.datos.gov.co/resource/qijw-htwa.json"

var HOSPITALES = "http://bogotaghub-gov-esri-co.opendata.arcgis.com/datasets/52d4d7402ec64e029b46abf2594e3c3a_0.geojson"

var ZONASVERDES = "https://transport.opendatasoft.com/api/records/1.0/search/?dataset=parques-bogota&rows=137"

var CAI = "https://bogota-laburbano.opendatasoft.com/api/records/1.0/search/?dataset=cai&rows=10000"

var HOMICIDIOS = "https://bogota-laburbano.opendatasoft.com/api/records/1.0/search/?dataset=homicidios-en-bogota-2016&rows=10000"

var commerce = [];

var neighborhoods = [];

var security = [];

var schools = [];

var hospitals = [];

var greenAreas = [];

var policeStations = [];

var homicides = [];

/*estructuras*/
// var neighborhood={
//   name: barriocomu,
//   coordinate: geo_point_2d,
//   polygons: geo_shape,
//   crimesCount: 0
// }

// var hospital={
//   name:properties.f2,
//   address:properties.f3,
//   location:geometry.coordinates
// }

// var cai={
//   name: fields.cainombre,
//   neighborhood: fields.caibarrio,
//   address: fields.caidirecci,
//   phone: fields.caitelefon,
//   location: fields.geo_point_2d
// }

// var school={
//   name: nombreestablecimiento,
//   address: direccion,
//   phone: telefono,
//   levels: niveles,
//   journal: jornada,
//   location: mauroFuncion(address)
// }

// var house={
//   owner: nombre,
//   phone: phone,
//   floor: piso,
//   estrato: estrato,
//   price: precio,
//   homeType: apartamento_casa_habitacion,
//   adType: arroVent,
//   neighborhood:barrio,
//   address: direccion,
//   numberOfRooms: rooms,
//   numberOfBathrooms: bathrooms,
//   numberOfFloors: nf,
//   buildingArea: area,
//   pets: booleanP,
//   hospitals: [].length,
//   cais:[].length,
//   schools:[].length,
//   restaurants:[].length,
//   pubs:[].length,
//   parks: [].length,
//   details: unString

// }

// var park={
//   name:"",
//   multipoly:[],
//   center:[]
// }

function viewData(URL, text, callback) {
  var data = $.get(URL, function () {})
    .done(function () {
      if (text == "BARRIOS") {
        /* data.responseJSON.records.forEach(function(element){
           neighborhoods.push(Constructor_neighborhoods(element.lamierda, element.laotrameirda));
         })
         */
        console.log(data.responseJSON.records);
        neighborhoods = data.responseJSON.records;
      } else if (text == "ZONASVERDES") {
        greenAreas = data.responseJSON.records;
      } else if (text == "CAI") {
        policeStations = data.responseJSON.records;
      } else if (text == "HOMICIDIOS") {
        homicides = data.responseJSON.records;
      } else if (text == "SEGURIDAD") {
        security = data.responseJSON;
      } else if (text == "COLEGIOS") {
        schools = data.responseJSON;
      } else {
        hospitals = data.responseJSON.features;
      }

      callback();
    })
    .fail(function (error) {
      console.error(error);
    })
}

function getDataFromURL(URL, callback) {
  var data = $.get(URL, function () {})
    .done(function () {
      commerce.push(data.responseJSON.records);
      callback();
    })
    .fail(function (error) {
      console.error(error);
    });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function objToString(obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += p + ':"' + obj[p] + '",\n';
    }
  }
  return '{' + str + '}';
}
function distanceBetweenPoints(p1, p2) {
  var rad = function (x) {
    return x * Math.PI / 180;
  };

  var R = 6371; // Earth’s mean radius in km
  var dLat = rad(p2[0] - p1[0]);
  var dLong = rad(p2[1] - p1[1]);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1[0])) * Math.cos(rad(p2[0])) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
}

function addNeighborhoods(fields) {

  if (fields.barriocomu == "Britalia") {
    var neighborhood = "{ name: '" + fields.barriocomu + "' ,coordinate: [" + 4.6256414 + "," + (-74.1743829) + "], crimesCount:" + 0 + "}"
  } else if (fields.barriocomu == "Prados de la Calleja") {
    var neighborhood = "{ name: '" + fields.barriocomu + "' ,coordinate: [" + 4.7096067 + "," + (-74.0537672) + "], crimesCount:" + 0 + "}"
  } else if (fields.barriocomu == "S.C. Brisas Aldea Fontibón") {
    var neighborhood = "{ name: '" + fields.barriocomu + "' ,coordinate: [" + 4.6900913 + "," + (-74.1560577) + "], crimesCount:" + 0 + "}"
  } else {
    var neighborhood = "{ name: '" + fields.barriocomu + "' , coordinate: [" + fields.geo_point_2d[0] + "," + fields.geo_point_2d[1] + "], crimesCount:" + 0 + "}"
  }
  return neighborhood;
}

function addHouses() {

  for (var i = 0; i < 20; i++) {
    var house = {
      owner: "",
      phone: "",
      homeType: "",
      adType: "",
      floor: "",
      estrato: "",
      price: "",
      neighborhood: "",
      address: "",
      coordinates: "",
      numberOfRooms: "",
      numberOfBathrooms: "",
      numberOfFloors: "",
      buildingArea: "",
      pets: "",

      hospitals: [],
      cais: [],
      schools: [],
      restaurants: [],
      pubs: [],
      parks: [],
      details: ""

    }
    house.owner = nombres[i];
    house.phone = telefonos[i];
    var aleatorio = getRandomInt(0, 3);
    var temp = htype[aleatorio];
    //console.log(temp)
    if (temp == "Habitacion") {
      house.homeType = temp;
      house.adType = "Arriendo";
      house.floor = floor[getRandomInt(0, 10)];
      house.estrato = estratos[getRandomInt(0, 6)];
      house.price = preciosArriendo[getRandomInt(0, 6)];
      house.neighborhood = barrio[i];
      house.address = direccion[i];
      house.coordinates = coordinates[i];
      house.numberOfRooms = "1";
      house.numberOfBathrooms = '' + getRandomInt(0, 4);
      house.numberOfFloors = '1';
      house.buildingArea = area[getRandomInt(0, 8)];
      house.pets = mascotas[getRandomInt(0, 2)];

    } else if (temp == "Casa") {
      house.homeType = temp;
      house.adType = type[getRandomInt(0, 2)];
      house.floor = "0";
      house.estrato = estratos[getRandomInt(0, 6)];
      if (house.adType == "Arriendo")
        house.price = preciosArriendo[getRandomInt(0, 6)];
      else
        house.price = preciosVenta[getRandomInt(0, 6)];
      house.neighborhood = barrio[i];
      house.address = direccion[i];
      house.coordinates = coordinates[i];
      house.numberOfRooms = getRandomInt(0, 5);
      house.numberOfBathrooms = getRandomInt(0, 4);
      house.numberOfFloors = getRandomInt(0, 5);
      house.buildingArea = area[getRandomInt(0, 8)];
      house.pets = mascotas[getRandomInt(0, 2)]

    } else if (temp == "Apartamento") {
      house.homeType = temp;
      house.adType = type[getRandomInt(0, 2)];
      house.floor = floor[getRandomInt(0, 10)]
      house.estrato = estratos[getRandomInt(0, 6)];
      if (house.adType == "Arriendo")
        house.price = preciosArriendo[getRandomInt(0, 6)];
      else
        house.price = preciosVenta[getRandomInt(0, 6)];
      house.neighborhood = barrio[i];
      house.address = direccion[i];
      house.coordinates = coordinates[i];
      house.numberOfRooms = getRandomInt(0, 5);
      house.numberOfBathrooms = getRandomInt(0, 4);
      house.numberOfFloors = getRandomInt(0, 5);
      house.buildingArea = area[getRandomInt(0, 8)];
      house.pets = mascotas[getRandomInt(0, 2)]
    }

    miStr += (objToString(house) + ",");
  }
  miStr += "]";
  console.log(miStr);
}
var arr = [1, 2, 3];


function getRestaurantsAndPubs() {
  var restaurants = '[\n';
  var pubs = '[\n';

  commerce.forEach(function (item) {
    if (item.fields.desc_cod_c == "EXPENDIO A LA MESA DE COMIDAS PREPARADAS") {
      restaurants = restaurants +
        '{name: "' + item.fields.razon_soci + '",\n' +
        'address: "' + item.fields.direcc_com + '",\n' +
        'location: [' + item.fields.geo_point_2d[0] + ', ' + item.fields.geo_point_2d[1] + ']\n' +
        '},\n';
    } else {
      pubs = pubs +
        '{name: "' + item.fields.razon_soci + '",\n' +
        'address: "' + item.fields.direcc_com + '",\n' +
        'location: [' + item.fields.geo_point_2d[0] + ', ' + item.fields.geo_point_2d[1] + ']\n' +
        '},\n';
    }
  });

  restaurants = restaurants + '];\n';
  pubs = pubs + '];\n';

  console.log("RESTAURANTS");
  console.log(restaurants);
  console.log("PUBS");
  console.log(pubs);

}


/*var hospital={
  name:properties.f2,
  address:properties.f3,
  location:geometry.coordinates
}*/

function viewData(URL, text, callback) {
  var data = $.get(URL, function () {})
    .done(function () {
      if (text == "BARRIOS") {
        /* data.responseJSON.records.forEach(function(element){
           neighborhoods.push(Constructor_neighborhoods(element.lamierda, element.laotrameirda));
         })
         */
        console.log(data.responseJSON.records);
        //neighborhoods.push(constructor del element())
        neighborhoods = data.responseJSON.records;
      } else if (text == "ZONASVERDES") {
        greenAreas = data.responseJSON.records;
      } else if (text == "CAI") {
        data.responseJSON.records.forEach(function (element) {
          policeStations.push({
            name: element.fields.cainombre,
            neighborhood: element.fields.caibarrio,
            address: element.fields.caidirecci,
            phone: element.fields.caitelefon,
            location: element.fields.geo_point_2d
          })
        })
      } else if (text == "HOMICIDIOS") {
        homicides = data.responseJSON.records;
      } else if (text == "SEGURIDAD") {
        security = data.responseJSON;
      } else if (text == "COLEGIOS") {
        schools = data.responseJSON;
      } else {
        data.responseJSON.features.forEach(function (element) {
          hospitals.push({
            name: element.properties.f2,
            address: element.properties.f3,
            location: element.geometry.coordinates
          })
          console.log(hospitalsData);

        })

      }

      callback();
    })
    .fail(function (error) {
      console.error(error);
    })
}

function classifyData(){
  //console.log(loadedHouses)
  loadedHouses.forEach(function(element){
    element.hospitals = []
    element.cais = []
    element.schools = []
    element.restaurants = []
    element.pubs = []
    element.parks = []
    var lat = parseFloat(element.coordinates.substring(1,element.coordinates.search(' ')))
    var lng = parseFloat(element.coordinates.substring(element.coordinates.search(',')+2,element.coordinates.search(']')))
    var ar=[lat,lng];
    hospitalsData.forEach(function(elementH){
      var arH=[elementH.location[1],elementH.location[0]]
      if(distanceBetweenPoints(arH,ar)<=1)
        element.hospitals.push(elementH);
    })
    policeStationsData.forEach(function(elementP){
      if(distanceBetweenPoints(elementP.location,ar)<=1)
        element.cais.push(elementP);
    })
    restaurantsData.forEach(function(elementR){
      if(distanceBetweenPoints(elementR.location,ar)<=1)
        element.restaurants.push(elementR);
    })
    pubsData.forEach(function(elementPub){
      if(distanceBetweenPoints(elementPub.location,ar)<=1)
        element.pubs.push(elementPub);
    })
    park.forEach(function(elementPark){
      if(distanceBetweenPoints(elementPark.center,ar)<=1)
        element.parks.push(elementPark);
    })
    
    colegiosData.forEach(function(elementC){
      if(elementC.location){
        var arC=[elementC.location.lat, elementC.location.lng]
      if(distanceBetweenPoints(arC,ar)<=1)
        element.schools.push(elementC);
      }
      
    })

  })
  console.log(loadedHouses);
}

function getDataFromURL(URL, callback) {
  var data = $.get(URL, function () {})
    .done(function () {
      commerce.push(data.responseJSON.records);
      callback();
    })
    .fail(function (error) {
      console.error(error);
    });
}

Number.prototype.format = function (n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

$(document).ready(function () {

  $("#check_1").prop('checked', true);
  $(".menu_button_1").css("color", "#E53935");
  $(".menu_button_1 i").removeClass("fas fa-filter");
  $(".menu_button_1 i").addClass("fas fa-chevron-left");
  $(".button_1_txt").css("color", "#E53935");
  $(".button_1_txt").text("Cerrar");

  var infoActivated = false;
  var infoButtonActivated = false;

  $("#info_button").click(function () {
    if (!infoActivated) {
      infoActivated = true;
      infoButtonActivated = true;
      $("#info_button").css("color", "white");
      $("#info_button").css("background-color", "var(--background_color)");
      $("#info_button_close").css("color", "white");
      $("#info_button_close").css("background-color", "var(--background_color)");
      $(".info_container").css("left", "41.2%");
      $("#info_button").css("opacity", "0");
      $("#info_button_close").css("opacity", "1");
      $("#info_button").css("pointer-events", "none");
      $("#info_button_close").css("pointer-events", "all");
    } else {
      infoButtonActivated = false;
    }
  });

  $("#info_button").hover(function () {
    $("#info_button").css("color", "var(--background_color)");
    $("#info_button").css("background-color", "white");
  }, function () {
    $("#info_button").css("color", "white");
    $("#info_button").css("background-color", "var(--background_color)");
  });

  $("#info_button_close").click(function () {
    if (infoActivated) {
      infoActivated = false;
      $("#info_button_close").css("color", "white");
      $("#info_button_close").css("background-color", "var(--background_color)");
      $("#info_button").css("color", "white");
      $("#info_button").css("background-color", "var(--background_color)");
      $(".info_container").css("left", "5%");
      $("#info_button_close").css("opacity", "0");
      $("#info_button").css("opacity", "1");
      $("#info_button_close").css("pointer-events", "none");
      $("#info_button").css("pointer-events", "all");
    }
  });

  $("#info_button_close").hover(function () {
    $("#info_button_close").css("color", "var(--background_color)");
    $("#info_button_close").css("background-color", "white");
  }, function () {
    $("#info_button_close").css("color", "white");
    $("#info_button_close").css("background-color", "var(--background_color)");
  });

  function check1() {
    $("#check_2").prop('checked', false);

    $("#check_1").prop('checked', true);
    $(".left_panel_1").css("left", "0");
    $(".left_panel_2").css("left", "-43%");

    $(".menu_button_1").css("color", "#E53935");
    $(".menu_button_1 i").removeClass("fas fa-search");
    $(".menu_button_1 i").addClass("fas fa-chevron-left");
    $(".button_1_txt").css("color", "#E53935");
    $(".button_1_txt").text("Cerrar");

    $(".menu_button_2").css("color", "var(--main_color)");
    $(".menu_button_2 i").removeClass("fas fa-chevron-left");
    $(".menu_button_2 i").addClass("fas fa-question");
    $(".button_2_txt").css("color", "var(--main_color)");
    $(".button_2_txt").text("Acerca de");

    if (infoActivated) {
      $(".info_container").css("left", "41.2%");
    } else {
      $(".info_container").css("left", "5%");
    }
  }

  function unCheck1() {
    $("#check_1").prop('checked', false);
    $(".left_panel_1").css("left", "-43%");
    $(".left_panel_2").css("left", "-43%");

    $(".menu_button_1").css("color", "var(--main_color)");
    $(".menu_button_1 i").removeClass("fas fa-chevron-left");
    $(".menu_button_1 i").addClass("fas fa-search");
    $(".button_1_txt").css("color", "var(--main_color)");
    $(".button_1_txt").text("Buscar");
    $(".info_container").css("left", "-16%");
  }

  $("#check_1").change(function () {
    if ($("#check_1").is(":checked")) {
      check1();
    } else {
      unCheck1();
    }
  });


  function check2() {
    $("#check_1").prop('checked', false);

    $("#check_2").prop('checked', true);
    $(".left_panel_1").css("left", "-43%");
    $(".left_panel_2").css("left", "0");

    $(".menu_button_2").css("color", "#E53935");
    $(".menu_button_2 i").removeClass("fas fa-question");
    $(".menu_button_2 i").addClass("fas fa-chevron-left");
    $(".button_2_txt").css("color", "#E53935");
    $(".button_2_txt").text("Cerrar");

    $(".menu_button_1").css("color", "var(--main_color)");
    $(".menu_button_1 i").removeClass("fas fa-chevron-left");
    $(".menu_button_1 i").addClass("fas fa-search");
    $(".button_1_txt").css("color", "var(--main_color)");
    $(".button_1_txt").text("Buscar");

    if (infoActivated) {
      $(".info_container").css("left", "41.2%");
    } else {
      $(".info_container").css("left", "5%");
    }
  }

  function unCheck2() {

    hideMainGraphs();

    $("#check_2").prop('checked', false);
    $(".left_panel_1").css("left", "-43%");
    $(".left_panel_2").css("left", "-43%");

    $(".menu_button_2").css("color", "var(--main_color)");
    $(".menu_button_2 i").removeClass("fas fa-chevron-left");
    $(".menu_button_2 i").addClass("fas fa-question");
    $(".button_2_txt").css("color", "var(--main_color)");
    $(".button_2_txt").text("Acerca de");
    $(".info_container").css("left", "-16%");
  }

  $("#check_2").change(function () {
    if (this.checked) {
      check2();
    } else {
      unCheck2();
    }
  });

  $(".menu_button_1").click(function () {
    $(".button_1_txt").css("padding-left", "36px");
  });

  $(".menu_button_1").hover(function () {
    $(".button_1_txt").css("padding-left", "72px");
  }, function () {
    $(".button_1_txt").css("padding-left", "36px");
  });

  $(".button_1_txt").click(function () {
    if (!$("#check_1").is(":checked")) {
      $(".button_1_txt").css("padding-left", "36px");
      check1();
    } else {
      $(".button_1_txt").css("padding-left", "36px");
      unCheck1();
    }
  });

  $(".button_1_txt").hover(function () {
    $(".button_1_txt").css("padding-left", "72px");
  }, function () {
    $(".button_1_txt").css("padding-left", "36px");
  });

  $(".menu_button_2").click(function () {
    $(".button_2_txt").css("padding-left", "36px");
  });

  $(".menu_button_2").hover(function () {
    $(".button_2_txt").css("padding-left", "72px");
  }, function () {
    $(".button_2_txt").css("padding-left", "36px");
  });

  $(".button_2_txt").click(function () {
    if (!$("#check_2").is(":checked")) {
      $(".button_2_txt").css("padding-left", "36px");
      check2();
    } else {
      $(".button_2_txt").css("padding-left", "36px");
      unCheck2();
    }
  });

  $(".button_2_txt").hover(function () {
    $(".button_2_txt").css("padding-left", "72px");
  }, function () {
    $(".button_2_txt").css("padding-left", "36px");
  });

  $('.filters_container').css({
    'height': ($('.filters_container').width() * 0.55) + 'px'
  });

  $('.filters_background').css({
    'height': ($('#filters_container').height()) + 'px'
  });

  $(window).resize(function () {
    $('.filters_container').css({
      'height': ($('.filters_container').width() * 0.55) + 'px'
    });

    $('.filters_background').css({
      'height': ($('#filters_container').height()) + 'px'
    });
  });

  //Main filters buttons action
  var mainFilter1Active = false;
  var mainFilter1Value = 0;

  var mainFilter2Active = false;
  var mainFilter2Value = 0;

  //Main filter button 1 (arriendo)  
  $("#main_filter_1").click(function () {
    if (mainFilter1Active) {
      mainFilter1Active = false;
      mainFilter1Value = 0;
      $('#main_filter_1').css("width", "91%");
      $('#main_filter_1').css("background-color", "transparent");
      $('#main_filter_1').css("color", "var(--main_color)");
      $('#main_filter_button_title_1').css("left", "50%");
      $('#main_filter_button_title_1').css("transform", "perspective(1px) translateX(-50%)");
      $('#main_filter_1_button_icon').css("background-color", "var(--main_color)");
      $('#main_filter_1_button_icon').css("color", "var(--background_color)");
      $('#check_icon_1').css("display", "none");

    } else {
      mainFilter1Active = true;
      mainFilter1Value = 1;
      $('#main_filter_1').css("width", "100%");
      $('#main_filter_1').css("background-color", "var(--main_color)");
      $('#main_filter_1').css("color", "white");
      $('#main_filter_button_title_1').css("left", "0%");
      $('#main_filter_button_title_1').css("transform", "perspective(1px) translateX(0%)");
      $('#main_filter_1').css("justify-content", "space-between");
      $('#main_filter_1_button_icon').css("background-color", "white");
      $('#main_filter_1_button_icon').css("color", "var(--main_color)");
      $('#check_icon_1').css("display", "inline-block");

    }
  });

  $("#main_filter_1").hover(function () {
    $('#main_filter_1').css("width", "100%");
  }, function () {
    if (!mainFilter1Active) {
      $('#main_filter_1').css("width", "91%");
    } else {
      $('#main_filter_1').css("width", "100%");
    }
  });

  //Main filter button 2 (compra)
  $("#main_filter_2").click(function () {
    if (mainFilter2Active) {
      mainFilter2Active = false;
      mainFilter2Value = 0;
      $('#main_filter_2').css("width", "91%");
      $('#main_filter_2').css("background-color", "transparent");
      $('#main_filter_2').css("color", "var(--main_color)");
      $('#main_filter_button_title_2').css("left", "50%");
      $('#main_filter_button_title_2').css("transform", "perspective(1px) translateX(-50%)");
      $('#main_filter_2_button_icon').css("background-color", "var(--main_color)");
      $('#main_filter_2_button_icon').css("color", "var(--background_color)");
      $('#check_icon_2').css("display", "none");

    } else {
      mainFilter2Active = true;
      mainFilter2Value = 1;
      $('#main_filter_2').css("width", "100%");
      $('#main_filter_2').css("background-color", "var(--main_color)");
      $('#main_filter_2').css("color", "white");
      $('#main_filter_button_title_2').css("left", "0%");
      $('#main_filter_button_title_2').css("transform", "perspective(1px) translateX(0%)");
      $('#main_filter_2').css("justify-content", "space-between");
      $('#main_filter_2_button_icon').css("background-color", "white");
      $('#main_filter_2_button_icon').css("color", "var(--main_color)");
      $('#check_icon_2').css("display", "inline-block");

    }
  });

  $("#main_filter_2").hover(function () {
    $('#main_filter_2').css("width", "100%");
  }, function () {
    if (!mainFilter2Active) {
      $('#main_filter_2').css("width", "91%");
    } else {
      $('#main_filter_2').css("width", "100%");
    }
  });


  //Filters buttons action

  //Budget button
  var budgetButtonActive = false;
  var budgetSlider = document.getElementById("budget_slider");

  var budgetSliderOutput = document.getElementById("budget_slider_output");
  budgetSlider.oninput = function () {
    budgetSliderOutput.innerHTML = "Menor a " + Number(this.value).format(0).toString() + "";

  };

  budgetSliderOutput.innerHTML = "Menor a " + Number(budgetSlider.value).format(0).toString() + "";

  $("#budget_title_conatiner").click(function () {
    if (budgetButtonActive) {
      budgetButtonActive = false;
      $(".budget_filter_button").css("background-color", "transparent");
      $("#budget_title_conatiner").css("height", "100%");
      $("#budget_check_message").css("color", "var(--secondary_color)");
      $("#budget_button_icon").removeClass('fas fa-times').addClass('fas fa-hand-holding-usd');
      budget_check_message.innerHTML = "";
      $("#budget_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#budget_button_icon").css("color", "var(--background_color)");
      $("#budget_button_title").css("color", "var(--secondary_color)");
      $("#budget_slider_title").css("display", "none");
      $("#budget_slider").css("display", "none");
      $("#budget_slider_output").css("display", "none");

    } else {
      budgetButtonActive = true;
      $(".budget_filter_button").css("background-color", "var(--secondary_color)");
      $("#budget_title_conatiner").css("height", "46%");
      $("#budget_check_message").css("color", "white");
      $("#budget_button_icon").removeClass('fas fa-check').addClass('fas fa-hand-holding-usd');
      budget_check_message.innerHTML = "";
      $("#budget_button_icon_container").css("background-color", "white");
      $("#budget_button_icon").css("color", "var(--secondary_color)");
      $("#budget_button_title").css("color", "white");
      $("#budget_slider_title").css("display", "inline");
      $("#budget_slider").css("display", "inline");
      $("#budget_slider_output").css("display", "inline");

    }
  });

  $("#budget_title_conatiner").hover(function () {
    if (!budgetButtonActive) {
      $("#budget_button_icon").removeClass('fas fa-hand-holding-usd').addClass('fas fa-check');
      budget_check_message.innerHTML = "Activar?";
    } else {
      $("#budget_button_icon").removeClass('fas fa-hand-holding-usd').addClass('fas fa-times');
      budget_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    budget_check_message.innerHTML = "";
    if (!budgetButtonActive) {
      $("#budget_button_icon").removeClass('fas fa-check').addClass('fas fa-hand-holding-usd');
    } else {
      $("#budget_button_icon").removeClass('fas fa-times').addClass('fas fa-hand-holding-usd');
    }
  });

  //house type button

  var houseTypeButtonActive = false;
  var houseTypeButtonHouseActive = false;
  var houseTypeButtonAptoActive = false;
  var houseTypeButtonBothActive = false;

  $("#house_type_title_conatiner").click(function () {
    if (houseTypeButtonActive) {
      houseTypeButtonActive = false;
      $(".house_type_filter_button").css("background-color", "transparent");
      $("#house_type_title_conatiner").css("height", "100%");
      $("#house_type_check_message").css("color", "var(--secondary_color)");
      $("#house_type_button_icon").removeClass('fas fa-times').addClass('fas fa-home');
      house_type_check_message.innerHTML = "";
      $("#house_type_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#house_type_button_icon").css("color", "var(--background_color)");
      $("#house_type_button_title").css("color", "var(--secondary_color)");
      $("#house_type_options_title").css("display", "none");
      $(".house_type_buttons_container").css("display", "none");

    } else {
      houseTypeButtonActive = true;
      $(".house_type_filter_button").css("background-color", "var(--secondary_color)");
      $("#house_type_title_conatiner").css("height", "46%");
      $("#house_type_check_message").css("color", "white");
      $("#house_type_button_icon").removeClass('fas fa-check').addClass('fas fa-home');
      house_type_check_message.innerHTML = "";
      $("#house_type_button_icon_container").css("background-color", "white");
      $("#house_type_button_icon").css("color", "var(--secondary_color)");
      $("#house_type_button_title").css("color", "white");
      $("#house_type_options_title").css("display", "inline");
      $(".house_type_buttons_container").css("display", "flex");

    }
  });

  $("#house_type_title_conatiner").hover(function () {
      if (!houseTypeButtonActive) {
        $("#house_type_button_icon").removeClass('fas fa-home').addClass('fas fa-check');
        house_type_check_message.innerHTML = "Activar?";
      } else {
        $("#house_type_button_icon").removeClass('fas fa-home').addClass('fas fa-times');
        house_type_check_message.innerHTML = "Desactivar?";
      }
    },
    function () {
      house_type_check_message.innerHTML = "";
      if (!houseTypeButtonActive) {
        $("#house_type_button_icon").removeClass('fas fa-check').addClass('fas fa-home');
      } else {
        $("#house_type_button_icon").removeClass('fas fa-times').addClass('fas fa-home');
      }
    });


  function checkHouseTypeHouse() {
    houseTypeButtonHouseActive = true;
    $(".house_type_house_button").css("background-color", "white");
    $(".house_type_house_button").css("color", "var(--secondary_color)");
  }

  function uncheckHouseTypeHouse() {
    houseTypeButtonHouseActive = false;
    $(".house_type_house_button").css("background-color", "var(--secondary_color)");
    $(".house_type_house_button").css("color", "white");
  }

  function checkHouseTypeApto() {
    houseTypeButtonAptoActive = true;
    $(".house_type_apto_button").css("background-color", "white");
    $(".house_type_apto_button").css("color", "var(--secondary_color)");
  }

  function uncheckHouseTypeApto() {
    houseTypeButtonAptoActive = false;
    $(".house_type_apto_button").css("background-color", "var(--secondary_color)");
    $(".house_type_apto_button").css("color", "white");
  }

  function checkHouseTypeBoth() {
    houseTypeButtonBothActive = true;
    $(".house_type_both_button").css("background-color", "white");
    $(".house_type_both_button").css("color", "var(--secondary_color)");
  }

  function uncheckHouseTypeBoth() {
    houseTypeButtonBothActive = false;
    $(".house_type_both_button").css("background-color", "var(--secondary_color)");
    $(".house_type_both_button").css("color", "white");
  }

  $(".house_type_house_button").click(function () {
    if (!houseTypeButtonHouseActive) {
      checkHouseTypeHouse();
      uncheckHouseTypeApto();
      uncheckHouseTypeBoth();
    } else {
      uncheckHouseTypeHouse();
    }
  });

  $(".house_type_house_button").hover(function () {
      if (!houseTypeButtonHouseActive) {
        $(".house_type_house_button").css("background-color", "white");
        $(".house_type_house_button").css("color", "var(--secondary_color)");
      }
    },
    function () {
      if (!houseTypeButtonHouseActive) {
        $(".house_type_house_button").css("background-color", "var(--secondary_color)");
        $(".house_type_house_button").css("color", "white");
      }
    });

  $(".house_type_apto_button").click(function () {
    if (!houseTypeButtonAptoActive) {
      checkHouseTypeApto();
      uncheckHouseTypeHouse();
      uncheckHouseTypeBoth();
    } else {
      uncheckHouseTypeApto();
    }
  });

  $(".house_type_apto_button").hover(function () {
      if (!houseTypeButtonAptoActive) {
        $(".house_type_apto_button").css("background-color", "white");
        $(".house_type_apto_button").css("color", "var(--secondary_color)");
      }
    },
    function () {
      if (!houseTypeButtonAptoActive) {
        $(".house_type_apto_button").css("background-color", "var(--secondary_color)");
        $(".house_type_apto_button").css("color", "white");
      }
    });

  $(".house_type_both_button").click(function () {
    if (!houseTypeButtonBothActive) {
      checkHouseTypeBoth();
      uncheckHouseTypeApto();
      uncheckHouseTypeHouse();
    } else {
      uncheckHouseTypeBoth();
    }
  });

  $(".house_type_both_button").hover(function () {
      if (!houseTypeButtonBothActive) {
        $(".house_type_both_button").css("background-color", "white");
        $(".house_type_both_button").css("color", "var(--secondary_color)");
      }
    },
    function () {
      if (!houseTypeButtonBothActive) {
        $(".house_type_both_button").css("background-color", "var(--secondary_color)");
        $(".house_type_both_button").css("color", "white");
      }
    });

  //estratos button
  var estratosButtonActive = false;
  var estratosSlider = document.getElementById("estratos_slider");

  var estratosSliderOutput = document.getElementById("estratos_slider_output");
  estratosSlider.oninput = function () {
    estratosSliderOutput.innerHTML = "Estrato " + this.value.toString();

  };

  estratosSliderOutput.innerHTML = "Estrato " + estratosSlider.value.toString();

  $("#estratos_title_conatiner").click(function () {
    if (estratosButtonActive) {
      estratosButtonActive = false;
      $(".estratos_filter_button").css("background-color", "transparent");
      $("#estratos_title_conatiner").css("height", "100%");
      $("#estratos_check_message").css("color", "var(--secondary_color)");
      $("#estratos_button_icon").removeClass('fas fa-times').addClass('fas fa-signal');
      estratos_check_message.innerHTML = "";
      $("#estratos_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#estratos_button_icon").css("color", "var(--background_color)");
      $("#estratos_button_title").css("color", "var(--secondary_color)");
      $("#estratos_slider_title").css("display", "none");
      $("#estratos_slider").css("display", "none");
      $("#estratos_slider_output").css("display", "none");

    } else {
      estratosButtonActive = true;
      $(".estratos_filter_button").css("background-color", "var(--secondary_color)");
      $("#estratos_title_conatiner").css("height", "46%");
      $("#estratos_check_message").css("color", "white");
      $("#estratos_button_icon").removeClass('fas fa-check').addClass('fas fa-signal');
      estratos_check_message.innerHTML = "";
      $("#estratos_button_icon_container").css("background-color", "white");
      $("#estratos_button_icon").css("color", "var(--secondary_color)");
      $("#estratos_button_title").css("color", "white");
      $("#estratos_slider_title").css("display", "inline");
      $("#estratos_slider").css("display", "inline");
      $("#estratos_slider_output").css("display", "inline");

    }
  });

  $("#estratos_title_conatiner").hover(function () {
    if (!estratosButtonActive) {
      $("#estratos_button_icon").removeClass('fas fa-signal').addClass('fas fa-check');
      estratos_check_message.innerHTML = "Activar?";
    } else {
      $("#estratos_button_icon").removeClass('fas fa-signal').addClass('fas fa-times');
      estratos_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    estratos_check_message.innerHTML = "";
    if (!estratosButtonActive) {
      $("#estratos_button_icon").removeClass('fas fa-check').addClass('fas fa-signal');
    } else {
      $("#estratos_button_icon").removeClass('fas fa-times').addClass('fas fa-signal');
    }
  });

  // safety button
  var safetyButtonActive = false;
  var safetySlider = document.getElementById("safety_slider");

  var safetySliderOutput = document.getElementById("safety_slider_output");
  safetySlider.oninput = function () {
    getSliderImportanceTxt(this.value, safetySliderOutput);
  };

  getSliderImportanceTxt(safetySlider.value, safetySliderOutput);

  $("#safety_title_conatiner").click(function () {
    if (safetyButtonActive) {
      safetyButtonActive = false;
      $(".safety_filter_button").css("background-color", "transparent");
      $("#safety_title_conatiner").css("height", "100%");
      $("#safety_check_message").css("color", "var(--secondary_color)");
      $("#safety_button_icon").removeClass('fas fa-times').addClass('fas fa-user-shield');
      safety_check_message.innerHTML = "";
      $("#safety_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#safety_button_icon").css("color", "var(--background_color)");
      $("#safety_button_title").css("color", "var(--secondary_color)");
      $("#safety_slider_title").css("display", "none");
      $("#safety_slider").css("display", "none");
      $("#safety_slider_output").css("display", "none");

    } else {
      safetyButtonActive = true;
      $(".safety_filter_button").css("background-color", "var(--secondary_color)");
      $("#safety_title_conatiner").css("height", "46%");
      $("#safety_check_message").css("color", "white");
      $("#safety_button_icon").removeClass('fas fa-check').addClass('fas fa-user-shield');
      safety_check_message.innerHTML = "";
      $("#safety_button_icon_container").css("background-color", "white");
      $("#safety_button_icon").css("color", "var(--secondary_color)");
      $("#safety_button_title").css("color", "white");
      $("#safety_slider_title").css("display", "inline");
      $("#safety_slider").css("display", "inline");
      $("#safety_slider_output").css("display", "inline");

    }
  });

  $("#safety_title_conatiner").hover(function () {
    if (!safetyButtonActive) {
      $("#safety_button_icon").removeClass('fas fa-user-shield').addClass('fas fa-check');
      safety_check_message.innerHTML = "Activar?";
    } else {
      $("#safety_button_icon").removeClass('fas fa-user-shield').addClass('fas fa-times');
      safety_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    safety_check_message.innerHTML = "";
    if (!safetyButtonActive) {
      $("#safety_button_icon").removeClass('fas fa-check').addClass('fas fa-user-shield');
    } else {
      $("#safety_button_icon").removeClass('fas fa-times').addClass('fas fa-user-shield');
    }
  });


  // building area button
  var areaButtonActive = false;
  var areaSlider = document.getElementById("area_slider");

  var areaSliderOutput = document.getElementById("area_slider_output");
  areaSlider.oninput = function () {
    areaSliderOutput.innerHTML = "Menor a " + this.value.toString() + " m2";
  };

  areaSliderOutput.innerHTML = "Menor a " + areaSlider.value.toString() + " m2";

  $("#area_title_conatiner").click(function () {
    if (areaButtonActive) {
      areaButtonActive = false;
      $(".area_filter_button").css("background-color", "transparent");
      $("#area_title_conatiner").css("height", "100%");
      $("#area_check_message").css("color", "var(--secondary_color)");
      $("#area_button_icon").removeClass('fas fa-times').addClass('fas fa-ruler-combined');
      area_check_message.innerHTML = "";
      $("#area_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#area_button_icon").css("color", "var(--background_color)");
      $("#area_button_title").css("color", "var(--secondary_color)");
      $("#area_slider_title").css("display", "none");
      $("#area_slider").css("display", "none");
      $("#area_slider_output").css("display", "none");

    } else {
      areaButtonActive = true;
      $(".area_filter_button").css("background-color", "var(--secondary_color)");
      $("#area_title_conatiner").css("height", "46%");
      $("#area_check_message").css("color", "white");
      $("#area_button_icon").removeClass('fas fa-check').addClass('fas fa-ruler-combined');
      area_check_message.innerHTML = "";
      $("#area_button_icon_container").css("background-color", "white");
      $("#area_button_icon").css("color", "var(--secondary_color)");
      $("#area_button_title").css("color", "white");
      $("#area_slider_title").css("display", "inline");
      $("#area_slider").css("display", "inline");
      $("#area_slider_output").css("display", "inline");

    }
  });

  $("#area_title_conatiner").hover(function () {
    if (!areaButtonActive) {
      $("#area_button_icon").removeClass('fas fa-ruler-combined').addClass('fas fa-check');
      area_check_message.innerHTML = "Activar?";
    } else {
      $("#area_button_icon").removeClass('fas fa-ruler-combined').addClass('fas fa-times');
      area_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    area_check_message.innerHTML = "";
    if (!areaButtonActive) {
      $("#area_button_icon").removeClass('fas fa-check').addClass('fas fa-ruler-combined');
    } else {
      $("#area_button_icon").removeClass('fas fa-times').addClass('fas fa-ruler-combined');
    }
  });


  // number of rooms button
  var roomsButtonActive = false;
  var roomsSlider = document.getElementById("rooms_slider");

  var roomsSliderOutput = document.getElementById("rooms_slider_output");
  roomsSlider.oninput = function () {
    roomsSliderOutput.innerHTML = this.value.toString() + " habitaciones";
  };

  roomsSliderOutput.innerHTML = roomsSlider.value.toString() + " habitaciones";

  $("#rooms_title_conatiner").click(function () {
    if (roomsButtonActive) {
      roomsButtonActive = false;
      $(".rooms_filter_button").css("background-color", "transparent");
      $("#rooms_title_conatiner").css("height", "100%");
      $("#rooms_check_message").css("color", "var(--secondary_color)");
      $("#rooms_button_icon").removeClass('fas fa-times').addClass('fas fa-bed');
      rooms_check_message.innerHTML = "";
      $("#rooms_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#rooms_button_icon").css("color", "var(--background_color)");
      $("#rooms_button_title").css("color", "var(--secondary_color)");
      $("#rooms_slider_title").css("display", "none");
      $("#rooms_slider").css("display", "none");
      $("#rooms_slider_output").css("display", "none");

    } else {
      roomsButtonActive = true;
      $(".rooms_filter_button").css("background-color", "var(--secondary_color)");
      $("#rooms_title_conatiner").css("height", "46%");
      $("#rooms_check_message").css("color", "white");
      $("#rooms_button_icon").removeClass('fas fa-check').addClass('fas fa-bed');
      rooms_check_message.innerHTML = "";
      $("#rooms_button_icon_container").css("background-color", "white");
      $("#rooms_button_icon").css("color", "var(--secondary_color)");
      $("#rooms_button_title").css("color", "white");
      $("#rooms_slider_title").css("display", "inline");
      $("#rooms_slider").css("display", "inline");
      $("#rooms_slider_output").css("display", "inline");

    }
  });

  $("#rooms_title_conatiner").hover(function () {
    if (!roomsButtonActive) {
      $("#rooms_button_icon").removeClass('fas fa-bed').addClass('fas fa-check');
      rooms_check_message.innerHTML = "Activar?";
    } else {
      $("#rooms_button_icon").removeClass('fas fa-bed').addClass('fas fa-times');
      rooms_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    rooms_check_message.innerHTML = "";
    if (!roomsButtonActive) {
      $("#rooms_button_icon").removeClass('fas fa-check').addClass('fas fa-bed');
    } else {
      $("#rooms_button_icon").removeClass('fas fa-times').addClass('fas fa-bed');
    }
  });

  function getSliderImportanceTxt(value, output) {
    if (value === '1') {
      output.innerHTML = 'Poco';
    } else if (value === '2') {
      output.innerHTML = 'No mucho';
    } else {
      output.innerHTML = 'Mucho';
    }
  }

  // hospitals button 
  var hospitalsButtonActive = false;
  var hospitalsSlider = document.getElementById("hospitals_slider");

  var hospitalsSliderOutput = document.getElementById("hospitals_slider_output");
  hospitalsSlider.oninput = function () {
    getSliderImportanceTxt(this.value, hospitalsSliderOutput);
  };

  getSliderImportanceTxt(hospitalsSlider.value, hospitalsSliderOutput);

  $("#hospitals_title_conatiner").click(function () {
    if (hospitalsButtonActive) {
      hospitalsButtonActive = false;
      $(".hospitals_filter_button").css("background-color", "transparent");
      $("#hospitals_title_conatiner").css("height", "100%");
      $("#hospitals_check_message").css("color", "var(--secondary_color)");
      $("#hospitals_button_icon").removeClass('fas fa-times').addClass('fas fa-hospital');
      hospitals_check_message.innerHTML = "";
      $("#hospitals_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#hospitals_button_icon").css("color", "var(--background_color)");
      $("#hospitals_button_title").css("color", "var(--secondary_color)");
      $("#hospitals_slider_title").css("display", "none");
      $("#hospitals_slider").css("display", "none");
      $("#hospitals_slider_output").css("display", "none");

    } else {
      hospitalsButtonActive = true;
      $(".hospitals_filter_button").css("background-color", "var(--secondary_color)");
      $("#hospitals_title_conatiner").css("height", "46%");
      $("#hospitals_check_message").css("color", "white");
      $("#hospitals_button_icon").removeClass('fas fa-check').addClass('fas fa-hospital');
      hospitals_check_message.innerHTML = "";
      $("#hospitals_button_icon_container").css("background-color", "white");
      $("#hospitals_button_icon").css("color", "var(--secondary_color)");
      $("#hospitals_button_title").css("color", "white");
      $("#hospitals_slider_title").css("display", "inline");
      $("#hospitals_slider").css("display", "inline");
      $("#hospitals_slider_output").css("display", "inline");

    }
  });

  $("#hospitals_title_conatiner").hover(function () {
    if (!hospitalsButtonActive) {
      $("#hospitals_button_icon").removeClass('fas fa-hospital').addClass('fas fa-check');
      hospitals_check_message.innerHTML = "Activar?";
    } else {
      $("#hospitals_button_icon").removeClass('fas fa-hospital').addClass('fas fa-times');
      hospitals_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    hospitals_check_message.innerHTML = "";
    if (!hospitalsButtonActive) {
      $("#hospitals_button_icon").removeClass('fas fa-check').addClass('fas fa-hospital');
    } else {
      $("#hospitals_button_icon").removeClass('fas fa-times').addClass('fas fa-hospital');
    }
  });

  // schools button
  var schoolsButtonActive = false;
  var schoolsSlider = document.getElementById("schools_slider");

  var schoolsSliderOutput = document.getElementById("schools_slider_output");
  schoolsSlider.oninput = function () {
    getSliderImportanceTxt(this.value, schoolsSliderOutput);
  };

  getSliderImportanceTxt(schoolsSlider.value, schoolsSliderOutput);

  $("#schools_title_conatiner").click(function () {
    if (schoolsButtonActive) {
      schoolsButtonActive = false;
      $(".schools_filter_button").css("background-color", "transparent");
      $("#schools_title_conatiner").css("height", "100%");
      $("#schools_check_message").css("color", "var(--secondary_color)");
      $("#schools_button_icon").removeClass('fas fa-times').addClass('fas fa-school');
      schools_check_message.innerHTML = "";
      $("#schools_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#schools_button_icon").css("color", "var(--background_color)");
      $("#schools_button_title").css("color", "var(--secondary_color)");
      $("#schools_slider_title").css("display", "none");
      $("#schools_slider").css("display", "none");
      $("#schools_slider_output").css("display", "none");

    } else {
      schoolsButtonActive = true;
      $(".schools_filter_button").css("background-color", "var(--secondary_color)");
      $("#schools_title_conatiner").css("height", "46%");
      $("#schools_check_message").css("color", "white");
      $("#schools_button_icon").removeClass('fas fa-check').addClass('fas fa-school');
      schools_check_message.innerHTML = "";
      $("#schools_button_icon_container").css("background-color", "white");
      $("#schools_button_icon").css("color", "var(--secondary_color)");
      $("#schools_button_title").css("color", "white");
      $("#schools_slider_title").css("display", "inline");
      $("#schools_slider").css("display", "inline");
      $("#schools_slider_output").css("display", "inline");

    }
  });

  $("#schools_title_conatiner").hover(function () {
    if (!schoolsButtonActive) {
      $("#schools_button_icon").removeClass('fas fa-school').addClass('fas fa-check');
      schools_check_message.innerHTML = "Activar?";
    } else {
      $("#schools_button_icon").removeClass('fas fa-school').addClass('fas fa-times');
      schools_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    schools_check_message.innerHTML = "";
    if (!schoolsButtonActive) {
      $("#schools_button_icon").removeClass('fas fa-check').addClass('fas fa-school');
    } else {
      $("#schools_button_icon").removeClass('fas fa-times').addClass('fas fa-school');
    }
  });

  // restaurants button
  var restaurantsButtonActive = false;
  var restaurantsSlider = document.getElementById("restaurants_slider");

  var restaurantsSliderOutput = document.getElementById("restaurants_slider_output");
  restaurantsSlider.oninput = function () {
    getSliderImportanceTxt(this.value, restaurantsSliderOutput);
  };

  getSliderImportanceTxt(restaurantsSlider.value, restaurantsSliderOutput);

  $("#restaurants_title_conatiner").click(function () {
    if (restaurantsButtonActive) {
      restaurantsButtonActive = false;
      $(".restaurants_filter_button").css("background-color", "transparent");
      $("#restaurants_title_conatiner").css("height", "100%");
      $("#restaurants_check_message").css("color", "var(--secondary_color)");
      $("#restaurants_button_icon").removeClass('fas fa-times').addClass('fas fa-utensils');
      restaurants_check_message.innerHTML = "";
      $("#restaurants_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#restaurants_button_icon").css("color", "var(--background_color)");
      $("#restaurants_button_title").css("color", "var(--secondary_color)");
      $("#restaurants_slider_title").css("display", "none");
      $("#restaurants_slider").css("display", "none");
      $("#restaurants_slider_output").css("display", "none");

    } else {
      restaurantsButtonActive = true;
      $(".restaurants_filter_button").css("background-color", "var(--secondary_color)");
      $("#restaurants_title_conatiner").css("height", "46%");
      $("#restaurants_check_message").css("color", "white");
      $("#restaurants_button_icon").removeClass('fas fa-check').addClass('fas fa-utensils');
      restaurants_check_message.innerHTML = "";
      $("#restaurants_button_icon_container").css("background-color", "white");
      $("#restaurants_button_icon").css("color", "var(--secondary_color)");
      $("#restaurants_button_title").css("color", "white");
      $("#restaurants_slider_title").css("display", "inline");
      $("#restaurants_slider").css("display", "inline");
      $("#restaurants_slider_output").css("display", "inline");

    }
  });

  $("#restaurants_title_conatiner").hover(function () {
    if (!restaurantsButtonActive) {
      $("#restaurants_button_icon").removeClass('fas fa-utensils').addClass('fas fa-check');
      restaurants_check_message.innerHTML = "Activar?";
    } else {
      $("#restaurants_button_icon").removeClass('fas fa-utensils').addClass('fas fa-times');
      restaurants_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    restaurants_check_message.innerHTML = "";
    if (!restaurantsButtonActive) {
      $("#restaurants_button_icon").removeClass('fas fa-check').addClass('fas fa-utensils');
    } else {
      $("#restaurants_button_icon").removeClass('fas fa-times').addClass('fas fa-utensils');
    }
  });

  // pubs button
  var pubsButtonActive = false;
  var pubsSlider = document.getElementById("pubs_slider");

  var pubsSliderOutput = document.getElementById("pubs_slider_output");
  pubsSlider.oninput = function () {
    getSliderImportanceTxt(this.value, pubsSliderOutput);
  };

  getSliderImportanceTxt(pubsSlider.value, pubsSliderOutput);

  $("#pubs_title_conatiner").click(function () {
    if (pubsButtonActive) {
      pubsButtonActive = false;
      $(".pubs_filter_button").css("background-color", "transparent");
      $("#pubs_title_conatiner").css("height", "100%");
      $("#pubs_check_message").css("color", "var(--secondary_color)");
      $("#pubs_button_icon").removeClass('fas fa-times').addClass('fas fa-glass-cheers');
      pubs_check_message.innerHTML = "";
      $("#pubs_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#pubs_button_icon").css("color", "var(--background_color)");
      $("#pubs_button_title").css("color", "var(--secondary_color)");
      $("#pubs_slider_title").css("display", "none");
      $("#pubs_slider").css("display", "none");
      $("#pubs_slider_output").css("display", "none");

    } else {
      pubsButtonActive = true;
      $(".pubs_filter_button").css("background-color", "var(--secondary_color)");
      $("#pubs_title_conatiner").css("height", "46%");
      $("#pubs_check_message").css("color", "white");
      $("#pubs_button_icon").removeClass('fas fa-check').addClass('fas fa-glass-cheers');
      pubs_check_message.innerHTML = "";
      $("#pubs_button_icon_container").css("background-color", "white");
      $("#pubs_button_icon").css("color", "var(--secondary_color)");
      $("#pubs_button_title").css("color", "white");
      $("#pubs_slider_title").css("display", "inline");
      $("#pubs_slider").css("display", "inline");
      $("#pubs_slider_output").css("display", "inline");

    }
  });

  $("#pubs_title_conatiner").hover(function () {
    if (!pubsButtonActive) {
      $("#pubs_button_icon").removeClass('fas fa-glass-cheers').addClass('fas fa-check');
      pubs_check_message.innerHTML = "Activar?";
    } else {
      $("#pubs_button_icon").removeClass('fas fa-glass-cheers').addClass('fas fa-times');
      pubs_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    pubs_check_message.innerHTML = "";
    if (!pubsButtonActive) {
      $("#pubs_button_icon").removeClass('fas fa-check').addClass('fas fa-glass-cheers');
    } else {
      $("#pubs_button_icon").removeClass('fas fa-times').addClass('fas fa-glass-cheers');
    }
  });


  // parks button
  var parksButtonActive = false;
  var parksSlider = document.getElementById("parks_slider");

  var parksSliderOutput = document.getElementById("parks_slider_output");
  parksSlider.oninput = function () {
    getSliderImportanceTxt(this.value, parksSliderOutput);
  };

  getSliderImportanceTxt(parksSlider.value, parksSliderOutput);

  $("#parks_title_conatiner").click(function () {
    if (parksButtonActive) {
      parksButtonActive = false;
      $(".parks_filter_button").css("background-color", "transparent");
      $("#parks_title_conatiner").css("height", "100%");
      $("#parks_check_message").css("color", "var(--secondary_color)");
      $("#parks_button_icon").removeClass('fas fa-times').addClass('fas fa-tree');
      parks_check_message.innerHTML = "";
      $("#parks_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#parks_button_icon").css("color", "var(--background_color)");
      $("#parks_button_title").css("color", "var(--secondary_color)");
      $("#parks_slider_title").css("display", "none");
      $("#parks_slider").css("display", "none");
      $("#parks_slider_output").css("display", "none");

    } else {
      parksButtonActive = true;
      $(".parks_filter_button").css("background-color", "var(--secondary_color)");
      $("#parks_title_conatiner").css("height", "46%");
      $("#parks_check_message").css("color", "white");
      $("#parks_button_icon").removeClass('fas fa-check').addClass('fas fa-tree');
      parks_check_message.innerHTML = "";
      $("#parks_button_icon_container").css("background-color", "white");
      $("#parks_button_icon").css("color", "var(--secondary_color)");
      $("#parks_button_title").css("color", "white");
      $("#parks_slider_title").css("display", "inline");
      $("#parks_slider").css("display", "inline");
      $("#parks_slider_output").css("display", "inline");

    }
  });

  $("#parks_title_conatiner").hover(function () {
    if (!parksButtonActive) {
      $("#parks_button_icon").removeClass('fas fa-tree').addClass('fas fa-check');
      parks_check_message.innerHTML = "Activar?";
    } else {
      $("#parks_button_icon").removeClass('fas fa-tree').addClass('fas fa-times');
      parks_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    parks_check_message.innerHTML = "";
    if (!parksButtonActive) {
      $("#parks_button_icon").removeClass('fas fa-check').addClass('fas fa-tree');
    } else {
      $("#parks_button_icon").removeClass('fas fa-times').addClass('fas fa-tree');
    }
  });

  // cai button
  var caiButtonActive = false;
  var caiSlider = document.getElementById("cai_slider");

  var caiSliderOutput = document.getElementById("cai_slider_output");
  caiSlider.oninput = function () {
    getSliderImportanceTxt(this.value, caiSliderOutput);
  };

  getSliderImportanceTxt(caiSlider.value, caiSliderOutput);

  $("#cai_title_conatiner").click(function () {
    if (caiButtonActive) {
      caiButtonActive = false;
      $(".cai_filter_button").css("background-color", "transparent");
      $("#cai_title_conatiner").css("height", "100%");
      $("#cai_check_message").css("color", "var(--secondary_color)");
      $("#cai_button_icon").removeClass('fas fa-times').addClass('fas fa-user-shield');
      cai_check_message.innerHTML = "";
      $("#cai_button_icon_container").css("background-color", "var(--secondary_color)");
      $("#cai_button_icon").css("color", "var(--background_color)");
      $("#cai_button_title").css("color", "var(--secondary_color)");
      $("#cai_slider_title").css("display", "none");
      $("#cai_slider").css("display", "none");
      $("#cai_slider_output").css("display", "none");

    } else {
      caiButtonActive = true;
      $(".cai_filter_button").css("background-color", "var(--secondary_color)");
      $("#cai_title_conatiner").css("height", "46%");
      $("#cai_check_message").css("color", "white");
      $("#cai_button_icon").removeClass('fas fa-check').addClass('fas fa-user-shield');
      cai_check_message.innerHTML = "";
      $("#cai_button_icon_container").css("background-color", "white");
      $("#cai_button_icon").css("color", "var(--secondary_color)");
      $("#cai_button_title").css("color", "white");
      $("#cai_slider_title").css("display", "inline");
      $("#cai_slider").css("display", "inline");
      $("#cai_slider_output").css("display", "inline");

    }
  });

  $("#cai_title_conatiner").hover(function () {
    if (!caiButtonActive) {
      $("#cai_button_icon").removeClass('fas fa-user-shield').addClass('fas fa-check');
      cai_check_message.innerHTML = "Activar?";
    } else {
      $("#cai_button_icon").removeClass('fas fa-user-shield').addClass('fas fa-times');
      cai_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    cai_check_message.innerHTML = "";
    if (!caiButtonActive) {
      $("#cai_button_icon").removeClass('fas fa-check').addClass('fas fa-user-shield');
    } else {
      $("#cai_button_icon").removeClass('fas fa-times').addClass('fas fa-user-shield');
    }
  });


  function loadEnd() {
    //Loading end
    $('body').addClass('loaded');

    setTimeout(function () {
      $(".loader").css("display", "none");
    }, 200);

    setTimeout(function () {
      infoActivated = true;
      $("#info_button").css("color", "white");
      $("#info_button").css("background-color", "var(--background_color)");
      $(".info_container").css("left", "41.2%");
      $("#info_button").css("opacity", "0");
    }, 800);

    setTimeout(function () {
      if (infoActivated && !infoButtonActivated) {
        infoActivated = false;
        $("#info_button").css("color", "white");
        $("#info_button").css("background-color", "var(--background_color)");
        $("#info_button").css("opacity", "1");

        if ($("#check_1")[0].checked) {
          $(".info_container").css("left", "5%");

        } else if ($("#check_2")[0].checked) {
          $(".info_container").css("left", "5%");

        } else if ($("#check_3")[0].checked) {
          $(".info_container").css("left", "5%");

        } else {
          $(".info_container").css("left", "-16%");

        }
      }
    }, 10000);
  }

  loadEnd();
  classifyData();
  /*getDataFromURL(URL1, function() {
    getDataFromURL(URL2, function() {
      getDataFromURL(URL3, function() {
        getDataFromURL(URL4, function() {
          getDataFromURL(URL5, function() {
            commerce = commerce.flat();
            console.log(commerce);
            viewData(BARRIOS, "BARRIOS", function () {
              //getRestaurantsAndPubs();
              viewData(SEGURIDAD, "SEGURIDAD", function () {
                viewData(COLEGIOS, "COLEGIOS", function () {
                  viewData(HOSPITALES, "HOSPITALES", function () {
                    viewData(ZONASVERDES, "ZONASVERDES", function () {
                      viewData(CAI, "CAI", function () {
                        viewData(HOMICIDIOS, "HOMICIDIOS", function () {
                          // console.log(neighborhoods, greenAreas, policeStations, homicides, security, schools, hospitals);
                        })
                      })
                    })
                  })
                })
              })
            })
          });
        });
      });
    });
  });
*/

});