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

var SEGURIDAD ="https://www.datos.gov.co/resource/enju-8jvx.json"

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

var homicides= [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function objToString (obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += p + ':"' + obj[p] + '",\n';
    }
  }
  return '{'+str+'}';
}

function addNeighborhoods(fields){
  
  if(fields.barriocomu=="Britalia"){
  var neighborhood="{ name: '"+fields.barriocomu+"' ,coordinate: ["+4.6256414+","+(-74.1743829)+"], crimesCount:"+0+"}"
  }else if(fields.barriocomu=="Prados de la Calleja"){
    var neighborhood="{ name: '"+fields.barriocomu+"' ,coordinate: ["+4.7096067+","+(-74.0537672)+"], crimesCount:"+0+"}"
  }else if(fields.barriocomu=="S.C. Brisas Aldea Fontibón"){
    var neighborhood="{ name: '"+fields.barriocomu+"' ,coordinate: ["+4.6900913+","+(-74.1560577)+"], crimesCount:"+0+"}"
  }else{
    var neighborhood="{ name: '"+fields.barriocomu+"' , coordinate: ["+fields.geo_point_2d[0]+","+fields.geo_point_2d[1]+"], crimesCount:"+0+"}"
  }
  return neighborhood;
}
var nombres=["Esther J. Espino","Ashli T. Mendez","Sebastián Jones","Michele R. Spencer","Ronald N. Exum","Eric E. Worthley","Leann B. Hicks","Arán Alba Ceja","Eawinda Pizarro Pacheco","Teófano Meza Esparza","Mijael Urena Santillán","Heldo Zaragoza Verdugo","Evodia Linares Rico","Melas Abreu Moreno","Irineo Quiroz Ybarra","Emiliano Ferrer Maya","Helena Escalante Tamez","Arián Marcos Calvill","Honoria Puga Alfaro","Gisela Mercado Lerma"]
var telefonos=["758 744 381","730 040 649","629 387 625","669 790 703","636 146 200","762 630 886","607 150 769","747 452 451","642 487 623","784 458 501","783 340 789","715 655 962","793 938 602","787 644 651","647 117 371","743 399 026","606 106 395","644 305 404","635 226 054","699 208 794"]
//console.log(nombres.length);
//console.log("o", telefonos.length);
var htype=["Casa", "Apartamento","Habitacion"]
var type=["Arriendo", "Venta"];
var floor=["1","2","3","4","5","6","7","8","9","10"]
var estratos=["1","2","3","4","5","6"]
var preciosArriendo=["450000","500000","800000","1000000","1200000","1500000"]
var preciosVenta=["95000000","100000000","150000000","250000000","185000000","190000000","200000000","280000000","300000000","380000000","400000000"]
var barrio=["POLO CLUB","EL MINUTO DE DIOS","CHUCUA DE LA VACA II","EL RECUERDO","PALERMO","CAMPIN OCCIDENTAL","PORCIUNCULA","MANDALAY","PATIO BONITO","OSORIO X URBANO","LA GIRALDA","SANTA BARBARA OCCIDENTAL","QUIRIGUA ORIENTAL","CIUDAD JARDIN NORTE","BARRANCAS","LA MAGDALENA","LA ORQUIDEA DE USME","PUERTA AL LLANO DE USME","JOSE JOAQUIN VARGAS","LA CABANA"]
var direccion= ["Cl. 87 #22-63 a 22-1, Bogotá","Dg. 82g #75-7, Bogotá","Cl. 42b Sur #85-2 a 85-40, Bogotá","Cl. 25b #33-81","Dg. 46 #17 37, Bogotá","Cl. 58 #35a-6","Cl. 73 #10 - 83, Bogotá","Cl. 4 #75-12, Bogotá","Cra. 87c #26-16, Bogotá","Calle 51S #91-16, Bogotá","Cra. 104a #22h-99 ","Cl. 122 #17a-87 ","Cl. 81 #90-67, Bogotá, Cundinamarca","Cl. 132 #59b-47","Cra. 7H #153a-2","Cl. 40 #18a-75","Cra. 1A E #97A-09 S","Cl. 108b Sur #3a Este-34 ","Cl. 67d Bis #65-67 ","Cra. 71 #64-2 "]
var coordinates=["[4.675327, -74.061350]","[4.703503, -74.091088]","[4.629309, -74.085788]","[4.635372, -74.071174]","[4.648663, -74.080545]","[4.657893, -74.057988]","[4.627908, -74.144414]","[4.639372, -74.161387]","[4.634955, -74.183199]","[4.680413, -74.142011]","[4.701313, -74.046799]","[4.705622, -74.103844]","[4.724065, -74.070449]","[4.730726, -74.028332]","[4.629831, -74.072064]","[4.499649, -74.115220]","[4.491958, -74.114941]","[4.673483, -74.084903]","[4.675172, -74.100760]"]
//var rooms=["1","2","3","4"]
//var bathrooms=["1"]
//var numberfloors=[""]
var area=["50", "55","65","70","75","80","90","100"]
var mascotas=["Si", "No"]
var miStr="["
function addHouses(){

  for(var i=0; i<20;i++){
    var house={
      owner: "",
      phone: "",
      homeType: "",
      adType: "",
      floor: "",
      estrato: "",
      price: "",
      neighborhood:"",
      address: "",
      coordinates: "",
      numberOfRooms: "",
      numberOfBathrooms: "",
      numberOfFloors: "",
      buildingArea: "",
      pets: "",

      hospitals: [],
      cais:[],
      schools:[],
      restaurants:[],
      pubs:[],
      parks: [],
      details:""

    }
    house.owner=nombres[i];
    house.phone=telefonos[i];
    var aleatorio=getRandomInt(0, 3);
    var temp=htype[aleatorio];
  //console.log(temp)
  if(temp=="Habitacion"){
   house.homeType=temp;
   house.adType="Arriendo";
   house.floor=floor[getRandomInt(0, 10)];
   house.estrato=estratos[getRandomInt(0, 6)];
   house.price=preciosArriendo[getRandomInt(0, 6)];
   house.neighborhood=barrio[i];
   house.address=direccion[i];
   house.coordinates=coordinates[i];
   house.numberOfRooms="1";
   house.numberOfBathrooms=''+getRandomInt(0, 4);
   house.numberOfFloors='1';
   house.buildingArea=area[getRandomInt(0, 8)];
   house.pets=mascotas[getRandomInt(0, 2)];

 }else if(temp=="Casa"){
  house.homeType=temp;
  house.adType=type[getRandomInt(0, 2)];
  house.floor="0";
  house.estrato=estratos[getRandomInt(0, 6)];
  if(house.adType=="Arriendo")
    house.price=preciosArriendo[getRandomInt(0, 6)];
  else
    house.price=preciosVenta[getRandomInt(0, 6)];
  house.neighborhood=barrio[i];
  house.address=direccion[i];
  house.coordinates=coordinates[i];
  house.numberOfRooms=getRandomInt(0, 5);
  house.numberOfBathrooms=getRandomInt(0, 4);
  house.numberOfFloors=getRandomInt(0, 5);
  house.buildingArea=area[getRandomInt(0, 8)];
  house.pets=mascotas[getRandomInt(0, 2)]

}else if(temp=="Apartamento"){
  house.homeType=temp;
  house.adType=type[getRandomInt(0, 2)];
  house.floor=floor[getRandomInt(0, 10)]
  house.estrato=estratos[getRandomInt(0, 6)];
  if(house.adType=="Arriendo")
    house.price=preciosArriendo[getRandomInt(0, 6)];
  else
    house.price=preciosVenta[getRandomInt(0, 6)];
  house.neighborhood=barrio[i];
  house.address=direccion[i];
  house.coordinates=coordinates[i];
  house.numberOfRooms=getRandomInt(0, 5);
  house.numberOfBathrooms=getRandomInt(0, 4);
  house.numberOfFloors=getRandomInt(0, 5);
  house.buildingArea=area[getRandomInt(0, 8)];
  house.pets=mascotas[getRandomInt(0, 2)]
}
//console.log(objToString(house));
miStr+=(objToString(house)+",");
}
miStr+="]";
console.log(miStr);
}
/*estructuras
*/
/*
var hospital={
name:properties.f2,
address:properties.f3,
location:geometry.coordinates
}

var cai={
name: fields.cainombre,
neighborhood: fields.caibarrio,
address: fields.caidirecci,
phone: fields.caitelefon,
location: fields.geo_point_2d
}

var school={
name: nombreestablecimiento,
address: direccion,
phone: telefono,
levels: niveles,
journal: jornada,
location: mauroFuncion(address)
}

var restaurant={
name: fields.razo_soci,
address: fields.direcc_com,
location: fields.geo_point_2d
}

var pub={
name: fields.razo_soci,
address: fields.direcc_com,
location: fields.geo_point_2d
}



var park={
name:"",
multipoly:[],
center:[]
}
*/

function viewData(URL, text, callback){
  var data =$.get(URL, function(){})
  .done(function(){
    if(text=="BARRIOS"){
      var auxS="[";
      data.responseJSON.records.forEach(function(element){
         // console.log(element);
          neighborhoods.push(addNeighborhoods(element.fields));
        auxS+=addNeighborhoods(element.fields)+",\n"
      

    })
      auxS+="]";
    //  console.log(auxS);
  //console.log(data.responseJSON.records);
 // neighborhoods.push(constructor del element())
  //neighborhoods=data.responseJSON.records;
}else if(text=="ZONASVERDES"){
  greenAreas=data.responseJSON.records;
}else if(text=="CAI"){
  policeStations=data.responseJSON.records;
}else if(text=="HOMICIDIOS"){
  homicides=data.responseJSON.records;
}else if(text=="SEGURIDAD"){
  security=data.responseJSON;
}else if(text=="COLEGIOS"){
  schools=data.responseJSON;
}else{
  hospitals=data.responseJSON.features;
}

callback();
})
  .fail(function(error){
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
      $("#info_button").css("background-color", "#424242");
      $("#info_button_close").css("color", "white");
      $("#info_button_close").css("background-color", "#424242");
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
    $("#info_button").css("color", "#424242");
    $("#info_button").css("background-color", "white");
  }, function () {
    $("#info_button").css("color", "white");
    $("#info_button").css("background-color", "#424242");
  });

  $("#info_button_close").click(function () {
    if (infoActivated) {
      infoActivated = false;
      $("#info_button_close").css("color", "white");
      $("#info_button_close").css("background-color", "#424242");
      $("#info_button").css("color", "white");
      $("#info_button").css("background-color", "#424242");
      $(".info_container").css("left", "5%");
      $("#info_button_close").css("opacity", "0");
      $("#info_button").css("opacity", "1");
      $("#info_button_close").css("pointer-events", "none");
      $("#info_button").css("pointer-events", "all");
    }
  });

  $("#info_button_close").hover(function () {
    $("#info_button_close").css("color", "#424242");
    $("#info_button_close").css("background-color", "white");
  }, function () {
    $("#info_button_close").css("color", "white");
    $("#info_button_close").css("background-color", "#424242");
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

    $(".menu_button_2").css("color", "#03A9F4");
    $(".menu_button_2 i").removeClass("fas fa-chevron-left");
    $(".menu_button_2 i").addClass("fas fa-question");
    $(".button_2_txt").css("color", "#03A9F4");
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

    $(".menu_button_1").css("color", "#FF5722");
    $(".menu_button_1 i").removeClass("fas fa-chevron-left");
    $(".menu_button_1 i").addClass("fas fa-search");
    $(".button_1_txt").css("color", "#FF5722");
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

    $(".menu_button_1").css("color", "#FF5722");
    $(".menu_button_1 i").removeClass("fas fa-chevron-left");
    $(".menu_button_1 i").addClass("fas fa-search");
    $(".button_1_txt").css("color", "#FF5722");
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

    $(".menu_button_2").css("color", "#03A9F4");
    $(".menu_button_2 i").removeClass("fas fa-chevron-left");
    $(".menu_button_2 i").addClass("fas fa-question");
    $(".button_2_txt").css("color", "#03A9F4");
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

//Search menu buttons action
var selectedTabMain = "main filters";
$("#button_main_txt_1").css("font-weight", "600");

$("#main_filter_button").click(function () {
  if (selectedTabMain != "main filters") {
    selectedTabMain = "main filters";
    scrollToSearch("#main_filters_container");
    $(".menu_indicator_1").css("margin-left", "130px");
    $("#button_main_txt_1").css("font-weight", "600");
    $("#button_main_txt_2").css("font-weight", "400");
  }

});

$("#main_filter_button").hover(function () {
  $(".menu_indicator_1").css("margin-left", "130px");

}, function () {
  if (selectedTabMain == "main filters") {
    $(".menu_indicator_1").css("margin-left", "130px");
  } else if (selectedTabMain == "special filters") {
    $(".menu_indicator_1").css("margin-left", "232px");
  }
});

$("#special_filter_button").click(function () {
  if (selectedTabMain != "special filters") {
    selectedTabMain = "special filters";
    scrollToSearch("#special_filters_container");
    $(".menu_indicator_1").css("margin-left", "232px");
    $("#button_main_txt_1").css("font-weight", "400");
    $("#button_main_txt_2").css("font-weight", "600");
  }

});

$("#special_filter_button").hover(function () {
  $(".menu_indicator_1").css("margin-left", "230px");
}, function () {
  if (selectedTabMain == "main filters") {
    $(".menu_indicator_1").css("margin-left", "130px");
  } else if (selectedTabMain == "special filters") {
    $(".menu_indicator_1").css("margin-left", "232px");
  }
});

//Scroll functions
var autoScrollSearchPanel = false;

function scrollToSearch(targetStr) {
  var target = $(targetStr);
  if (target.length) {
    var top = (target[0].offsetTop) - 131;
    autoScrollSearchPanel = true;
    $(".left_panel_1").animate({
      scrollTop: top
    }, 460);
    setTimeout(function () {
      autoScrollSearchPanel = false;
    }, 701);
    return false;
  }
}

$(".left_panel_1").scroll(function () {
  if (!autoScrollSearchPanel) {
    var panel = $(".left_panel_1");
    var mainFilter = $("#main_filters_container");
    var specialFilter = $("#special_filters_container");

    if (((panel[0].scrollTop) + 200 >= (mainFilter[0].offsetTop) - 131) &&
      ((panel[0].scrollTop) + 200 < (specialFilter[0].offsetTop) - 131)) {
      selectedTabMain = "main filters";
    $(".menu_indicator_1").css("margin-left", "130px");
    $("#button_main_txt_1").css("font-weight", "600");
    $("#button_main_txt_2").css("font-weight", "400");
    hideRanking();
    hideRankingWarning();

  } else if (((panel[0].scrollTop) + 200 >= (specialFilter[0].offsetTop) - 131)) {
    selectedTabMain = "special filters";
    $(".menu_indicator_1").css("margin-left", "232px");
    $("#button_main_txt_1").css("font-weight", "400");
    $("#button_main_txt_2").css("font-weight", "600");
    hideRanking();
    hideRankingWarning();

  }
}

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
$('.main_filters_container').css({
  'height': ($('.main_filters_container').width() * 0.36) + 'px'
});

var locationSlider = document.getElementById("location_slider");
var safetySlider = document.getElementById("safety_slider");
var affordabilitySlider = document.getElementById("affordability_slider");

var locationButtonActive = false;
var safetyButtonActive = false;
var affordabilityButtonActive = false;

var specialFilter1Active = false;
var specialFilter1Value = 0;

var specialFilter2Active = false;
var specialFilter2Value = 0;

var specialFilter3Active = false;
var specialFilter3Value = 0;

var specialFilter4Active = false;
var specialFilter4Value = 0;

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
    $("#location_check_message").css("color", "#03A9F4");
    $("#location_button_icon").css("padding", "18px 22px 18px 22px");
    $("#location_button_icon").removeClass('fas fa-times').addClass('fas fa-map-marker-alt');
    location_check_message.innerHTML = "";
    $("#location_button_icon").css("background-color", "#03A9F4");
    $("#location_button_icon").css("color", "#424242");
    $("#location_button_title").css("color", "#03A9F4");
    $("#location_slider_title").css("display", "none");
    $("#location_slider").css("display", "none");
    $("#location_slider_output").css("display", "none");

  } else {
    locationButtonActive = true;
    $(".location_filter_button").css("background-color", "#03A9F4");
    $('.location_filter_button').css("height", "100%");
    $("#location_title_conatiner").css("height", "45%");
    $("#location_check_message").css("color", "white");
    $("#location_button_icon").css("padding", "18px 22px 18px 22px");
    $("#location_button_icon").removeClass('fas fa-check').addClass('fas fa-map-marker-alt');
    location_check_message.innerHTML = "";
    $("#location_button_icon").css("background-color", "white");
    $("#location_button_icon").css("color", "#03A9F4");
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
    $("#safety_check_message").css("color", "#D32F2F");
    $("#safety_button_icon").css("padding", "18px 14px 18px 14px");
    $("#safety_button_icon").removeClass('fas fa-times').addClass('fas fa-user-shield');
    safety_check_message.innerHTML = "";
    $("#safety_button_icon").css("background-color", "#D32F2F");
    $("#safety_button_icon").css("color", "#424242");
    $("#safety_button_title").css("color", "#D32F2F");
    $("#safety_slider_title").css("display", "none");
    $("#safety_slider").css("display", "none");
    $("#safety_slider_output").css("display", "none");

  } else {
    safetyButtonActive = true;
    $(".safety_filter_button").css("background-color", "#D32F2F");
    $('.safety_filter_button').css("height", "100%");
    $("#safety_title_conatiner").css("height", "45%");
    $("#safety_check_message").css("color", "white");
    $("#safety_button_icon").css("padding", "18px 14px 18px 14px");
    $("#safety_button_icon").removeClass('fas fa-check').addClass('fas fa-user-shield');
    safety_check_message.innerHTML = "";
    $("#safety_button_icon").css("background-color", "white");
    $("#safety_button_icon").css("color", "#D32F2F");
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
    $("#affordability_check_message").css("color", "#F9A825");
    $("#affordability_button_icon").css("padding", "18px 17px 18px 17px");
    $("#affordability_button_icon").removeClass('fas fa-times').addClass('fas fa-hand-holding-usd');
    affordability_check_message.innerHTML = "";
    $("#affordability_button_icon").css("background-color", "#F9A825");
    $("#affordability_button_icon").css("color", "#424242");
    $("#affordability_button_title").css("color", "#F9A825");
    $("#affordability_slider_title").css("display", "none");
    $("#affordability_slider").css("display", "none");
    $("#affordability_slider_output").css("display", "none");

  } else {
    affordabilityButtonActive = true;
    $(".affordability_filter_button").css("background-color", "#F9A825");
    $('.affordability_filter_button').css("height", "100%");
    $("#affordability_title_conatiner").css("height", "45%");
    $("#affordability_check_message").css("color", "white");
    $("#affordability_button_icon").css("padding", "18px 17px 18px 17px");
    $("#affordability_button_icon").removeClass('fas fa-check').addClass('fas fa-hand-holding-usd');
    affordability_check_message.innerHTML = "";
    $("#affordability_button_icon").css("background-color", "white");
    $("#affordability_button_icon").css("color", "#F9A825");
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

$("#special_filter_1").click(function () {
  if (specialFilter1Active) {
    specialFilter1Active = false;
    specialFilter1Value = 0;
    $('#special_filter_1').css("width", "91%");
    $('#special_filter_1').css("background-color", "transparent");
    $('#special_filter_1').css("color", "#7CB342");
    $('#special_filter_button_title_1').css("left", "50%");
    $('#special_filter_button_title_1').css("transform", "perspective(1px) translateX(-50%)");
    $('#special_filter_1_button_icon').css("background-color", "#7CB342");
    $('#special_filter_1_button_icon').css("color", "#424242");
    $('#check_icon_1').css("display", "none");

  } else {
    specialFilter1Active = true;
    specialFilter1Value = 1;
    $('#special_filter_1').css("width", "100%");
    $('#special_filter_1').css("background-color", "#7CB342");
    $('#special_filter_1').css("color", "white");
    $('#special_filter_button_title_1').css("left", "0%");
    $('#special_filter_button_title_1').css("transform", "perspective(1px) translateX(0%)");
    $('#special_filter_1').css("justify-content", "space-between");
    $('#special_filter_1_button_icon').css("background-color", "white");
    $('#special_filter_1_button_icon').css("color", "#7CB342");
    $('#check_icon_1').css("display", "inline-block");

  }
});

$("#special_filter_1").hover(function () {
  $('#special_filter_1').css("width", "100%");
}, function () {
  if (!specialFilter1Active) {
    $('#special_filter_1').css("width", "91%");
  } else {
    $('#special_filter_1').css("width", "100%");
  }
});

$("#special_filter_2").click(function () {
  if (specialFilter2Active) {
    specialFilter2Active = false;
    specialFilter2Value = 0;
    $('#special_filter_2').css("width", "91%");
    $('#special_filter_2').css("background-color", "transparent");
    $('#special_filter_2').css("color", "#7CB342");
    $('#special_filter_button_title_2').css("left", "50%");
    $('#special_filter_button_title_2').css("transform", "perspective(1px) translateX(-50%)");
    $('#special_filter_2_button_icon').css("background-color", "#7CB342");
    $('#special_filter_2_button_icon').css("color", "#424242");
    $('#check_icon_2').css("display", "none");

  } else {
    specialFilter2Active = true;
    specialFilter2Value = 1;
    $('#special_filter_2').css("width", "100%");
    $('#special_filter_2').css("background-color", "#7CB342");
    $('#special_filter_2').css("color", "white");
    $('#special_filter_button_title_2').css("left", "0%");
    $('#special_filter_button_title_2').css("transform", "perspective(1px) translateX(0%)");
    $('#special_filter_2').css("justify-content", "space-between");
    $('#special_filter_2_button_icon').css("background-color", "white");
    $('#special_filter_2_button_icon').css("color", "#7CB342");
    $('#check_icon_2').css("display", "inline-block");

  }
});

$("#special_filter_2").hover(function () {
  $('#special_filter_2').css("width", "100%");
}, function () {
  if (!specialFilter2Active) {
    $('#special_filter_2').css("width", "91%");
  } else {
    $('#special_filter_2').css("width", "100%");
  }
});

$("#special_filter_3").click(function () {
  if (specialFilter3Active) {
    specialFilter3Active = false;
    specialFilter3Value = 0;
    $('#special_filter_3').css("width", "91%");
    $('#special_filter_3').css("background-color", "transparent");
    $('#special_filter_3').css("color", "#7CB342");
    $('#special_filter_button_title_3').css("left", "50%");
    $('#special_filter_button_title_3').css("transform", "perspective(1px) translateX(-50%)");
    $('#special_filter_3_button_icon').css("background-color", "#7CB342");
    $('#special_filter_3_button_icon').css("color", "#424242");
    $('#check_icon_3').css("display", "none");

  } else {
    specialFilter3Active = true;
    specialFilter3Value = 1;
    $('#special_filter_3').css("width", "100%");
    $('#special_filter_3').css("background-color", "#7CB342");
    $('#special_filter_3').css("color", "white");
    $('#special_filter_button_title_3').css("left", "0%");
    $('#special_filter_button_title_3').css("transform", "perspective(1px) translateX(0%)");
    $('#special_filter_3').css("justify-content", "space-between");
    $('#special_filter_3_button_icon').css("background-color", "white");
    $('#special_filter_3_button_icon').css("color", "#7CB342");
    $('#check_icon_3').css("display", "inline-block");

  }
});

$("#special_filter_3").hover(function () {
  $('#special_filter_3').css("width", "100%");
}, function () {
  if (!specialFilter3Active) {
    $('#special_filter_3').css("width", "91%");
  } else {
    $('#special_filter_3').css("width", "100%");
  }
});

$("#special_filter_4").click(function () {
  if (specialFilter4Active) {
    specialFilter4Active = false;
    specialFilter4Value = 0;
    $('#special_filter_4').css("width", "91%");
    $('#special_filter_4').css("background-color", "transparent");
    $('#special_filter_4').css("color", "#7CB342");
    $('#special_filter_button_title_4').css("left", "50%");
    $('#special_filter_button_title_4').css("transform", "perspective(1px) translateX(-50%)");
    $('#special_filter_4_button_icon').css("background-color", "#7CB342");
    $('#special_filter_4_button_icon').css("color", "#424242");
    $('#check_icon_4').css("display", "none");

  } else {
    specialFilter4Active = true;
    specialFilter4Value = 1;
    $('#special_filter_4').css("width", "100%");
    $('#special_filter_4').css("background-color", "#7CB342");
    $('#special_filter_4').css("color", "white");
    $('#special_filter_button_title_4').css("left", "0%");
    $('#special_filter_button_title_4').css("transform", "perspective(1px) translateX(0%)");
    $('#special_filter_4').css("justify-content", "space-between");
    $('#special_filter_4_button_icon').css("background-color", "white");
    $('#special_filter_4_button_icon').css("color", "#7CB342");
    $('#check_icon_4').css("display", "inline-block");

  }
});

$("#special_filter_4").hover(function () {
  $('#special_filter_4').css("width", "100%");
}, function () {
  if (!specialFilter4Active) {
    $('#special_filter_4').css("width", "91%");
  } else {
    $('#special_filter_4').css("width", "100%");
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
  $("#info_button").css("background-color", "#424242");
  $(".info_container").css("left", "41.2%");
  $("#info_button").css("opacity", "0");
}, 800);

setTimeout(function () {
  if (infoActivated && !infoButtonActivated) {
    infoActivated = false;
    $("#info_button").css("color", "white");
    $("#info_button").css("background-color", "#424242");
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

viewData(BARRIOS,"BARRIOS", function(){
  viewData(SEGURIDAD, "SEGURIDAD", function(){
    viewData(COLEGIOS, "COLEGIOS", function(){
      viewData(HOSPITALES, "HOSPITALES", function(){
        viewData(ZONASVERDES, "ZONASVERDES", function(){
          viewData(CAI, "CAI", function(){
            viewData(HOMICIDIOS, "HOMICIDIOS", function(){
                     // console.log(neighborhoods, greenAreas, policeStations, homicides, security, schools, hospitals);
                     //console.log("barrios filtrado",neighborhoods);
                     //addHouses();
                   })
          })
        })
      })
    })
  })
})
/*
getDataFromURL(URL1, function () {
  getDataFromURL(URL2, function () {
    getDataFromURL(URL3, function () {
      getDataFromURL(URL4, function () {
        getDataFromURL(URL5, function () {
          commerce = commerce.flat();
          console.log(commerce);

        });
      });
    });
  });
});
*/

});