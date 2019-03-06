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

var arr = [1, 2, 3];
console.log('[' + arr.toString() + ']');

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

console.log("RESTAURANTS");
console.log(restaurantsData);
console.log("PUBS");
console.log(pubsData);

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

  //Main filters buttons action
  $('.location_filter_button').css({
    'height': $('.location_filter_button').width() + 'px'
  });
  $('.safety_filter_button').css({
    'height': $('.location_filter_button').width() + 'px'
  });
  $('.affordability_filter_button').css({
    'height': $('.location_filter_button').width() + 'px'
  });
  $('.filters_container').css({
    'height': ($('.filters_container').width() * 0.37) + 'px'
  });

  $('.filters_background').css({
    'height': ($('.filters_background_image').height()) + 'px'
  });

  var locationSlider = document.getElementById("location_slider");
  var safetySlider = document.getElementById("safety_slider");
  var affordabilitySlider = document.getElementById("affordability_slider");

  var locationButtonActive = false;
  var safetyButtonActive = false;
  var affordabilityButtonActive = false;

  var mainFilter1Active = false;
  var mainFilter1Value = 0;

  var mainFilter2Active = false;
  var mainFilter2Value = 0;

  var mainFilter3Active = false;
  var mainFilter3Value = 0;

  var mainFilter4Active = false;
  var mainFilter4Value = 0;

  var locationSliderOutput = document.getElementById("location_slider_output");
  locationSlider.oninput = function () {
    if (this.value === '1') {
      locationSliderOutput.innerHTML = 'Baja';
    } else if (this.value === '2') {
      locationSliderOutput.innerHTML = 'Media';
    } else {
      locationSliderOutput.innerHTML = 'Alta';
    }

  };


  var safetySliderOutput = document.getElementById("safety_slider_output");
  safetySlider.oninput = function () {
    if (this.value === '1') {
      safetySliderOutput.innerHTML = 'Poco seguro';
    } else if (this.value === '2') {
      safetySliderOutput.innerHTML = 'Seguro';
    } else {
      safetySliderOutput.innerHTML = 'Muy seguro';
    }

  };

  Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  };

  var affordabilitySliderOutput = document.getElementById("affordability_slider_output");
  affordabilitySlider.oninput = function () {
    affordabilitySliderOutput.innerHTML = "Menor a " + Number(this.value).format(0).toString() + " COP";

  };

  locationSliderOutput.innerHTML = 'Alta';
  safetySliderOutput.innerHTML = 'Muy seguro';
  affordabilitySliderOutput.innerHTML = "Menor a " + Number(affordabilitySlider.value).format(0).toString() + " COP";

  $("#location_title_conatiner").click(function () {
    if (locationButtonActive) {
      locationButtonActive = false;
      $(".location_filter_button").css("background-color", "transparent");
      $('.location_filter_button').css({
        'height': $('.location_filter_button').width() + 'px'
      });
      $("#location_title_conatiner").css("height", "100%");
      $("#location_check_message").css("color", "var(--secondary_color)");
      $("#location_button_icon").css("padding", "18px 22px 18px 22px");
      $("#location_button_icon").removeClass('fas fa-times').addClass('fas fa-map-marker-alt');
      location_check_message.innerHTML = "";
      $("#location_button_icon").css("background-color", "var(--secondary_color)");
      $("#location_button_icon").css("color", "var(--background_color)");
      $("#location_button_title").css("color", "var(--secondary_color)");
      $("#location_slider_title").css("display", "none");
      $("#location_slider").css("display", "none");
      $("#location_slider_output").css("display", "none");

    } else {
      locationButtonActive = true;
      $(".location_filter_button").css("background-color", "var(--secondary_color)");
      $('.location_filter_button').css("height", "100%");
      $("#location_title_conatiner").css("height", "45%");
      $("#location_check_message").css("color", "white");
      $("#location_button_icon").css("padding", "18px 22px 18px 22px");
      $("#location_button_icon").removeClass('fas fa-check').addClass('fas fa-map-marker-alt');
      location_check_message.innerHTML = "";
      $("#location_button_icon").css("background-color", "white");
      $("#location_button_icon").css("color", "var(--secondary_color)");
      $("#location_button_title").css("color", "white");
      $("#location_slider_title").css("display", "inline");
      $("#location_slider").css("display", "inline");
      $("#location_slider_output").css("display", "inline");

    }
  });

  $("#location_title_conatiner").hover(function () {
    if (!locationButtonActive) {
      $('.location_filter_button').css("height", "100%");
      $("#location_button_icon").css("padding", "18px 18px 18px 18px");
      $("#location_button_icon").removeClass('fas fa-map-marker-alt').addClass('fas fa-check');
      location_check_message.innerHTML = "Activar?";
    } else {
      $("#location_button_icon").css("padding", "18px 23px 18px 23px");
      $("#location_button_icon").removeClass('fas fa-map-marker-alt').addClass('fas fa-times');
      location_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    $("#location_button_icon").css("padding", "18px 22px 18px 22px");
    location_check_message.innerHTML = "";
    if (!locationButtonActive) {
      $("#location_button_icon").removeClass('fas fa-check').addClass('fas fa-map-marker-alt');
      $('.location_filter_button').css({
        'height': $('.location_filter_button').width() + 'px'
      });
    } else {
      $("#location_button_icon").removeClass('fas fa-times').addClass('fas fa-map-marker-alt');
    }
  });

  $("#safety_title_conatiner").click(function () {
    if (safetyButtonActive) {
      safetyButtonActive = false;
      $(".safety_filter_button").css("background-color", "transparent");
      $('.safety_filter_button').css({
        'height': $('.safety_filter_button').width() + 'px'
      });
      $("#safety_title_conatiner").css("height", "100%");
      $("#safety_check_message").css("color", "var(--secondary_color)");
      $("#safety_button_icon").css("padding", "18px 14px 18px 14px");
      $("#safety_button_icon").removeClass('fas fa-times').addClass('fas fa-user-shield');
      safety_check_message.innerHTML = "";
      $("#safety_button_icon").css("background-color", "var(--secondary_color)");
      $("#safety_button_icon").css("color", "var(--background_color)");
      $("#safety_button_title").css("color", "var(--secondary_color)");
      $("#safety_slider_title").css("display", "none");
      $("#safety_slider").css("display", "none");
      $("#safety_slider_output").css("display", "none");

    } else {
      safetyButtonActive = true;
      $(".safety_filter_button").css("background-color", "var(--secondary_color)");
      $('.safety_filter_button').css("height", "100%");
      $("#safety_title_conatiner").css("height", "45%");
      $("#safety_check_message").css("color", "white");
      $("#safety_button_icon").css("padding", "18px 14px 18px 14px");
      $("#safety_button_icon").removeClass('fas fa-check').addClass('fas fa-user-shield');
      safety_check_message.innerHTML = "";
      $("#safety_button_icon").css("background-color", "white");
      $("#safety_button_icon").css("color", "var(--secondary_color)");
      $("#safety_button_title").css("color", "white");
      $("#safety_slider_title").css("display", "inline");
      $("#safety_slider").css("display", "inline");
      $("#safety_slider_output").css("display", "inline");

    }
  });

  $("#safety_title_conatiner").hover(function () {
    if (!safetyButtonActive) {
      $('.safety_filter_button').css("height", "100%");
      $("#safety_button_icon").css("padding", "18px 18px 18px 18px");
      $("#safety_button_icon").removeClass('fas fa-user-shield').addClass('fas fa-check');
      safety_check_message.innerHTML = "Activar?";
    } else {
      $("#safety_button_icon").css("padding", "18px 23px 18px 23px");
      $("#safety_button_icon").removeClass('fas fa-user-shield').addClass('fas fa-times');
      safety_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    $("#safety_button_icon").css("padding", "18px 14px 18px 14px");
    safety_check_message.innerHTML = "";
    if (!safetyButtonActive) {
      $("#safety_button_icon").removeClass('fas fa-check').addClass('fas fa-user-shield');
      $('.safety_filter_button').css({
        'height': $('.safety_filter_button').width() + 'px'
      });
    } else {
      $("#safety_button_icon").removeClass('fas fa-times').addClass('fas fa-user-shield');
    }
  });

  $("#affordability_title_conatiner").click(function () {
    if (affordabilityButtonActive) {
      affordabilityButtonActive = false;
      $(".affordability_filter_button").css("background-color", "transparent");
      $('.affordability_filter_button').css({
        'height': $('.affordability_filter_button').width() + 'px'
      });
      $("#affordability_title_conatiner").css("height", "100%");
      $("#affordability_check_message").css("color", "var(--secondary_color)");
      $("#affordability_button_icon").css("padding", "18px 17px 18px 17px");
      $("#affordability_button_icon").removeClass('fas fa-times').addClass('fas fa-hand-holding-usd');
      affordability_check_message.innerHTML = "";
      $("#affordability_button_icon").css("background-color", "var(--secondary_color)");
      $("#affordability_button_icon").css("color", "var(--background_color)");
      $("#affordability_button_title").css("color", "var(--secondary_color)");
      $("#affordability_slider_title").css("display", "none");
      $("#affordability_slider").css("display", "none");
      $("#affordability_slider_output").css("display", "none");

    } else {
      affordabilityButtonActive = true;
      $(".affordability_filter_button").css("background-color", "var(--secondary_color)");
      $('.affordability_filter_button').css("height", "100%");
      $("#affordability_title_conatiner").css("height", "45%");
      $("#affordability_check_message").css("color", "white");
      $("#affordability_button_icon").css("padding", "18px 17px 18px 17px");
      $("#affordability_button_icon").removeClass('fas fa-check').addClass('fas fa-hand-holding-usd');
      affordability_check_message.innerHTML = "";
      $("#affordability_button_icon").css("background-color", "white");
      $("#affordability_button_icon").css("color", "var(--secondary_color)");
      $("#affordability_button_title").css("color", "white");
      $("#affordability_slider_title").css("display", "inline");
      $("#affordability_slider").css("display", "inline");
      $("#affordability_slider_output").css("display", "inline");

    }
  });

  $("#affordability_title_conatiner").hover(function () {
    if (!affordabilityButtonActive) {
      $('.affordability_filter_button').css("height", "100%");
      $("#affordability_button_icon").css("padding", "18px 18px 18px 19px");
      $("#affordability_button_icon").removeClass('fas fa-hand-holding-usd').addClass('fas fa-check');
      affordability_check_message.innerHTML = "Activar?";
    } else {
      $("#affordability_button_icon").css("padding", "18px 23px 18px 23px");
      $("#affordability_button_icon").removeClass('fas fa-hand-holding-usd').addClass('fas fa-times');
      affordability_check_message.innerHTML = "Desactivar?";
    }
  }, function () {
    $("#affordability_button_icon").css("padding", "18px 17px 18px 17px");
    affordability_check_message.innerHTML = "";
    if (!affordabilityButtonActive) {
      $("#affordability_button_icon").removeClass('fas fa-check').addClass('fas fa-hand-holding-usd');
      $('.affordability_filter_button').css({
        'height': $('.affordability_filter_button').width() + 'px'
      });
    } else {
      $("#affordability_button_icon").removeClass('fas fa-times').addClass('fas fa-hand-holding-usd');
    }
  });

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
  getDataFromURL(URL1, function () {
    getDataFromURL(URL2, function () {
      getDataFromURL(URL3, function () {
        getDataFromURL(URL4, function () {
          getDataFromURL(URL5, function () {
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


});