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


var LOCA="https://bogota-laburbano.opendatasoft.com/api/records/1.0/search/?dataset=poligonos-localidades&rows=36&facet=Nombre+de+la+localidad";

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

var locali=[];


function viewData(URL, text, callback) {
  var data = $.get(URL, function () {})
    .done(function () {
      if (text == "BARRIOS") {
        console.log(data.responseJSON.records);
        neighborhoods = data.responseJSON.records;
      } else if (text == "ZONASVERDES") {
        greenAreas = data.responseJSON.records;
      }else if(text=="LOCA"){
        locali=data.responseJSON;
      }else if (text == "CAI") {
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

      loadPolygons();
    })
    .fail(function (error) {
      console.error(error);
    })
}

function loadPolygons(){

  var ind=0;
  locali.records.forEach(function (){
  if(locali.records[ind].fields.geometry.type == "MultiPolygon"){
  for(var j=0; j<locali.records[ind].fields.geometry.coordinates[0][0].length; j++){
  locali.records[ind].fields.geometry.coordinates[0][0][j] = {lat:locali.records[ind].fields.geometry.coordinates[0][0][j][1], lng:locali.records[ind].fields.geometry.coordinates[0][0][j][0] }
  }
  var polygon= new google.maps.Polygon({
    paths:locali.records[ind].fields.geometry.coordinates[0][0],
    strokeColor: "#03A9F4",
    fillColor: "#03A9F4",
    strokeOpacity: 0.8,
    strokeWeight: 2.5,
    fillOpacity: 0.35,
    map:map
  });
  }
  ind++;
  });


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


function clasifyCrimes() {
  crimes.forEach(function (element) {
    if (element.crimes > 0) {
      for (var i = 0; i < loadedHouses.length; i++) {
        var lat = parseFloat(loadedHouses[i].coordinates.substring(1, loadedHouses[i].coordinates.search(' ')));
        var lng = parseFloat(loadedHouses[i].coordinates.substring(loadedHouses[i].coordinates.search(',') + 2, loadedHouses[i].coordinates.search(']')));
        var ar = [lat, lng];
        if (distanceBetweenPoints(element.center, ar) <= 1) {
          loadedHouses[i].crimesCount++;
        }
      }
    }
  });
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
      } else if(text=="LOCA"){
        locali=data.responseJSON;
      }else if (text == "HOMICIDIOS") {
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


      loadPolygons();
    })
    .fail(function (error) {
      console.error(error);
    })
}

function classifyData() {
  //console.log(loadedHouses)
  loadedHouses.forEach(function (element) {
    element.hospitals = [];
    element.cais = [];
    element.schools = [];
    element.restaurants = [];
    element.pubs = [];
    element.parks = [];
    var lat = parseFloat(element.coordinates.substring(1, element.coordinates.search(' ')));
    var lng = parseFloat(element.coordinates.substring(element.coordinates.search(',') + 2, element.coordinates.search(']')));
    var ar = [lat, lng];
    hospitalsData.forEach(function (elementH) {
      var arH = [elementH.location[1], elementH.location[0]];
      if (distanceBetweenPoints(arH, ar) <= 1)
        element.hospitals.push(elementH);
    });
    policeStationsData.forEach(function (elementP) {
      if (distanceBetweenPoints(elementP.location, ar) <= 1)
        element.cais.push(elementP);
    });
    restaurantsData.forEach(function (elementR) {
      if (distanceBetweenPoints(elementR.location, ar) <= 1)
        element.restaurants.push(elementR);
    });
    pubsData.forEach(function (elementPub) {
      if (distanceBetweenPoints(elementPub.location, ar) <= 1)
        element.pubs.push(elementPub);
    });
    park.forEach(function (elementPark) {
      if (distanceBetweenPoints(elementPark.center, ar) <= 1)
        element.parks.push(elementPark);
    });

    colegiosData.forEach(function (elementC) {
      if (elementC.location) {
        var arC = [elementC.location.lat, elementC.location.lng]
        if (distanceBetweenPoints(arC, ar) <= 1)
          element.schools.push(elementC);
      }

    });

    clasifyCrimes();

  });
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

var safetyInfo = [];
var safetyMidlow, safetyAvg;
var hospitalsInfo = [];
var hospitalsMidlow, hospitalsAvg;
var schoolsInfo = [];
var schoolsMidlow, schoolsAvg;
var restaurantsInfo = [];
var restaurantsMidlow, restaurantsAvg;
var pubsInfo = [];
var pubsMidlow, pubsAvg;
var parksInfo = [];
var parksMidlow, parksAvg;
var caiInfo = [];
var caiMidlow, caiAvg;

function setSafetyInfo() {
  loadedHouses.forEach(function (house) {
    safetyInfo.push(house.crimesCount)
  });
  safetyInfo.sort(minSort);
  safetyAvg = Math.floor(getAverageValue(safetyInfo));
  safetyMidlow = Math.floor(Number((safetyInfo[0]) + Number(safetyAvg)) / 2);

}

function setHospitalsInfo() {
  loadedHouses.forEach(function (house) {
    hospitalsInfo.push(house.hospitals.length);
  });
  hospitalsInfo.sort(minSort);
  hospitalsAvg = Math.floor(getAverageValue(hospitalsInfo));
  hospitalsMidlow = Math.floor((hospitalsInfo[hospitalsInfo.length - 1] + Number(hospitalsAvg)) / 2);
}

function setSchoolsInfo() {
  loadedHouses.forEach(function (house) {
    schoolsInfo.push(house.schools.length);
  });
  schoolsInfo.sort(minSort);
  schoolsAvg = Math.floor(getAverageValue(schoolsInfo));
  schoolsMidlow = Math.floor((schoolsInfo[schoolsInfo.length - 1] + Number(schoolsAvg)) / 2);
}

function setRestaurantsInfo() {
  loadedHouses.forEach(function (house) {
    restaurantsInfo.push(house.restaurants.length);
  });
  restaurantsInfo.sort(minSort);
  restaurantsAvg = Math.floor(getAverageValue(restaurantsInfo));
  restaurantsMidlow = Math.floor((Number(restaurantsInfo[restaurantsInfo.length - 1]) + Number(restaurantsAvg)) / 2);
}

function setPubsInfo() {
  loadedHouses.forEach(function (house) {
    pubsInfo.push(house.pubs.length);
  });
  pubsInfo.sort(minSort);
  pubsAvg = Math.floor(getAverageValue(pubsInfo));
  pubsMidlow = Math.floor((Number(pubsInfo[pubsInfo.length - 1]) + Number(pubsAvg)) / 2);
}

function setParksInfo() {
  loadedHouses.forEach(function (house) {
    parksInfo.push(house.parks.length);
  });
  parksInfo.sort(minSort);
  parksAvg = Math.floor(getAverageValue(parksInfo));
  parksMidlow = Math.floor(Math.floor((Number(parksInfo[parksInfo.length - 1]) + Number(parksAvg)) / 2));
}

function setCaiInfo() {
  loadedHouses.forEach(function (house) {
    caiInfo.push(house.cais.length);
  });
  caiInfo.sort(minSort);
  caiAvg = Math.floor(getAverageValue(caiInfo));
  caiMidlow = Math.floor((Number(caiInfo[caiInfo.length - 1]) + Number(caiAvg)) / 2);
}

function maxSort(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function minSort(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

function getAverageValue(array) {
  var set = new Set();
  array.forEach(function (element) {
    set.add(element);
  });

  var sum = 0;
  set.forEach(function (element) {
    sum += Number(element); //don't forget to add the base
  });

  return (parseFloat(sum) / (set.size)).toFixed(2);
}

var filteredHouses = [];
var nullIndex = [];

function deleteNullHouses(callback) {
  nullIndex.forEach(function (index, j) {
    filteredHouses.splice(index - j, 1);
  });
  callback();
}

function filterHouses(activeFiltersList, filtersValueList) {

  filteredHouses = [];

  loadedHouses.forEach(function (house) {
    filteredHouses.push(house);
  });

  if(!activeFiltersList[0] && !activeFiltersList[1] ){
    loadedHouses.forEach(function (house, i) {
      markers[i].marker.setMap(null);

      hospitalsUnCheck();
      schoolsUnCheck();
      restaurantsUnCheck();
      pubsUnCheck();
      parksUnCheck();
      caisUnCheck();
    })
    if(currentInfoWindow!=null){
      currentInfoWindow.setMap(null);
        currentInfoWindow = null;
      }
  }


  for (var i = 0; i < 15; i++) {

    if (activeFiltersList[i]) {

      nullIndex = [];

      switch (i) {
        case 0:
          filteredHouses.forEach(function (house) {
            if (house.adType != "Arriendo") nullIndex.push(filteredHouses.indexOf(house));
          });
          deleteNullHouses(createMarkers);
          break;

        case 1:
          filteredHouses.forEach(function (house) {
            if (house.adType != "Venta") nullIndex.push(filteredHouses.indexOf(house));
          });
          deleteNullHouses(createMarkers);
          break;

        case 2:
          filteredHouses.forEach(function (house) {
            if (Number(house.price) > Number(filtersValueList[2])) nullIndex.push(filteredHouses.indexOf(house));
          });
          deleteNullHouses(createMarkers);
          break;

        case 3:
          filteredHouses.forEach(function (house) {
            if ((filtersValueList[3] == 1) && (house.homeType != "Casa")) nullIndex.push(filteredHouses.indexOf(house));
            if ((filtersValueList[3] == 2) && (house.homeType != "Apartamento")) nullIndex.push(filteredHouses.indexOf(house));
            if ((filtersValueList[3] == 3) && (house.homeType != "Habitacion")) nullIndex.push(filteredHouses.indexOf(house));
          });
          deleteNullHouses(createMarkers);
          break;

        case 4:
          filteredHouses.forEach(function (house) {
            if (Number(house.estrato) != Number(filtersValueList[4])) nullIndex.push(filteredHouses.indexOf(house));
          });
          deleteNullHouses(createMarkers);
          break;

        case 5:
          filteredHouses.forEach(function (house) {
            if (Number(house.buildingArea) > Number(filtersValueList[5])) nullIndex.push(filteredHouses.indexOf(house));
          });
          deleteNullHouses(createMarkers);
          break;

        case 6:
          filteredHouses.forEach(function (house) {
            if (Number(house.numberOfRooms) != Number(filtersValueList[6])) nullIndex.push(filteredHouses.indexOf(house));
          });
          deleteNullHouses(createMarkers);
          break;

        case 7:
          if (Number(filtersValueList[7]) == 3) {
            filteredHouses.forEach(function (house) {
              if (house.crimesCount >= safetyAvg) nullIndex.push(filteredHouses.indexOf(house));
            });

          } else if (Number(filtersValueList[7]) == 2) {
            filteredHouses.forEach(function (house) {
              if (house.crimesCount > safetyMidlow) nullIndex.push(filteredHouses.indexOf(house));
            });

          }
          deleteNullHouses(createMarkers);
          break;

        case 8:
          if (Number(filtersValueList[8]) == 3) {
            filteredHouses.forEach(function (house) {
              if (house.hospitals.length <= hospitalsAvg) nullIndex.push(filteredHouses.indexOf(house));
            });

          } else if (Number(filtersValueList[8]) == 2) {
            filteredHouses.forEach(function (house) {
              if (house.hospitals.length < hospitalsMidlow) nullIndex.push(filteredHouses.indexOf(house));
            });

          }
          deleteNullHouses(createMarkers);
          break;

        case 9:
          if (Number(filtersValueList[9]) == 3) {
            filteredHouses.forEach(function (house) {
              if (house.schools.length <= schoolsAvg) nullIndex.push(filteredHouses.indexOf(house));
            });

          } else if (Number(filtersValueList[9]) == 2) {
            filteredHouses.forEach(function (house) {
              if (house.schools.length < schoolsMidlow) nullIndex.push(filteredHouses.indexOf(house));
            });

          }
          deleteNullHouses(createMarkers);
          break;

        case 10:
          if (Number(filtersValueList[10]) == 3) {
            filteredHouses.forEach(function (house) {
              if (house.restaurants.length <= restaurantsAvg) nullIndex.push(filteredHouses.indexOf(house));
            });

          } else if (Number(filtersValueList[10]) == 2) {
            filteredHouses.forEach(function (house) {
              if (house.restaurants.length < restaurantsMidlow) nullIndex.push(filteredHouses.indexOf(house));
            });

          }
          deleteNullHouses(createMarkers);
          break;

        case 11:
          if (Number(filtersValueList[11]) == 3) {
            filteredHouses.forEach(function (house) {
              if (house.pubs.length <= pubsAvg) nullIndex.push(filteredHouses.indexOf(house));
            });

          } else if (Number(filtersValueList[11]) == 2) {
            filteredHouses.forEach(function (house) {
              if (house.pubs.length < pubsMidlow) nullIndex.push(filteredHouses.indexOf(house));
            });

          }
          deleteNullHouses(createMarkers);
          break;

        case 12:
          if (Number(filtersValueList[12]) == 3) {
            filteredHouses.forEach(function (house) {
              if (house.parks.length <= parksAvg) nullIndex.push(filteredHouses.indexOf(house));
            });

          } else if (Number(filtersValueList[12]) == 2) {
            console.log(2 <= parksMidlow);
            filteredHouses.forEach(function (house) {
              if (house.parks.length < parksMidlow) nullIndex.push(filteredHouses.indexOf(house));
            });

          }
          deleteNullHouses(createMarkers);
          break;

        case 13:
          if (Number(filtersValueList[13]) == 3) {
            filteredHouses.forEach(function (house) {
              if (house.cais.length <= caiAvg) nullIndex.push(filteredHouses.indexOf(house));
            });

          } else if (Number(filtersValueList[13]) == 2) {
            console.log(2 <= caiMidlow);
            filteredHouses.forEach(function (house) {
              if (house.cais.length < caiMidlow) nullIndex.push(filteredHouses.indexOf(house));
            });

          }
          deleteNullHouses(createMarkers);
          break;

      }
    }
  }
  console.log("LISTA DE CASAS FILTRADA");
  console.log(filteredHouses);
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

  /* list index
  [0] -> arriendo
  [1] -> compra
  [2] -> presupuesto
  [3] -> tipo de vivienda
  [4] -> estrato
  [5] -> area construida
  [6] -> numero de habitaciones
  [7] -> seguridad
  [8] -> hospitales
  [9] -> colegios
  [10] -> restaurantes
  [11] -> bares
  [12] -> parques
  [13] -> cai
  */

  var activeFiltersList = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  var filtersValueList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //Filters buttons action

  function setHouseFilterParams(index, active, value) {
    activeFiltersList[index] = active;
    filtersValueList[index] = value;
  }
  //Budget button
  var budgetButtonActive = false;
  var budgetSlider = document.getElementById("budget_slider");

  var budgetSliderOutput = document.getElementById("budget_slider_output");
  budgetSlider.oninput = function () {
    budgetSliderOutput.innerHTML = "Menor a " + Number(this.value).format(0).toString() + "";
    setHouseFilterParams(2, budgetButtonActive, budgetSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

    setHouseFilterParams(2, budgetButtonActive, budgetSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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
  var roomsButtonActive = false;
  var roomsSlider = document.getElementById("rooms_slider");

  function setRoomSliderEnabled() {
    console.log(filtersValueList[3]);
    if (filtersValueList[3] != 3) {
      roomsSlider.disabled = false;
      roomsSliderOutput.innerHTML = roomsSlider.value.toString() + " habitaciones";
    } else {
      roomsSlider.value = 1;
      roomsSlider.disabled = true;
      roomsSliderOutput.innerHTML = "Fijado a 1";
    }
  }

  var houseTypeButtonActive = false;
  var houseTypeButtonValue = 0;
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

      setHouseFilterParams(3, houseTypeButtonActive, houseTypeButtonValue);
      filterHouses(activeFiltersList, filtersValueList);

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

      setHouseFilterParams(3, houseTypeButtonActive, houseTypeButtonValue);
      filterHouses(activeFiltersList, filtersValueList);
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
      houseTypeButtonValue = 1;
      checkHouseTypeHouse();
      uncheckHouseTypeApto();
      uncheckHouseTypeBoth();
    } else {
      houseTypeButtonValue = 0;
      uncheckHouseTypeHouse();
    }

    setHouseFilterParams(3, houseTypeButtonActive, houseTypeButtonValue);
    filterHouses(activeFiltersList, filtersValueList);
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
      houseTypeButtonValue = 2;
      checkHouseTypeApto();
      uncheckHouseTypeHouse();
      uncheckHouseTypeBoth();
    } else {
      houseTypeButtonValue = 0;
      uncheckHouseTypeApto();
    }

    setHouseFilterParams(3, houseTypeButtonActive, houseTypeButtonValue);
    filterHouses(activeFiltersList, filtersValueList);
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
      houseTypeButtonValue = 3;
      checkHouseTypeBoth();
      uncheckHouseTypeApto();
      uncheckHouseTypeHouse();
    } else {
      houseTypeButtonValue = 0;
      uncheckHouseTypeBoth();
    }

    setHouseFilterParams(3, houseTypeButtonActive, houseTypeButtonValue);
    setRoomSliderEnabled();
    filterHouses(activeFiltersList, filtersValueList);
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
    setHouseFilterParams(4, estratosButtonActive, estratosSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

    setHouseFilterParams(4, estratosButtonActive, estratosSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

  // building area button
  var areaButtonActive = false;
  var areaSlider = document.getElementById("area_slider");

  var areaSliderOutput = document.getElementById("area_slider_output");
  areaSlider.oninput = function () {
    areaSliderOutput.innerHTML = "Menor a " + this.value.toString() + " m2";
    setHouseFilterParams(5, areaButtonActive, areaSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

    setHouseFilterParams(5, areaButtonActive, areaSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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
  var roomsSliderOutput = document.getElementById("rooms_slider_output");
  roomsSlider.oninput = function () {
    roomsSliderOutput.innerHTML = this.value.toString() + " habitaciones";
    setHouseFilterParams(6, roomsButtonActive, roomsSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
  };

  setRoomSliderEnabled();

  $("#rooms_title_conatiner").click(function () {
    setRoomSliderEnabled();
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

    setHouseFilterParams(6, roomsButtonActive, roomsSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

  // safety button
  var safetyButtonActive = false;
  var safetySlider = document.getElementById("safety_slider");

  var safetySliderOutput = document.getElementById("safety_slider_output");
  safetySlider.oninput = function () {
    getSliderImportanceTxt(this.value, safetySliderOutput);
    setHouseFilterParams(7, safetyButtonActive, safetySlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

    setHouseFilterParams(7, safetyButtonActive, safetySlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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


  // hospitals button
  var hospitalsButtonActive = false;
  var hospitalsSlider = document.getElementById("hospitals_slider");

  var hospitalsSliderOutput = document.getElementById("hospitals_slider_output");
  hospitalsSlider.oninput = function () {
    getSliderImportanceTxt(this.value, hospitalsSliderOutput);
    setHouseFilterParams(8, hospitalsButtonActive, hospitalsSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

    setHouseFilterParams(8, hospitalsButtonActive, hospitalsSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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
    setHouseFilterParams(9, schoolsButtonActive, schoolsSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

    setHouseFilterParams(9, schoolsButtonActive, schoolsSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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
    setHouseFilterParams(10, restaurantsButtonActive, restaurantsSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

    setHouseFilterParams(10, restaurantsButtonActive, restaurantsSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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
    setHouseFilterParams(11, pubsButtonActive, pubsSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

    setHouseFilterParams(11, pubsButtonActive, pubsSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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
    setHouseFilterParams(12, parksButtonActive, parksSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

    setHouseFilterParams(12, parksButtonActive, parksSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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
    setHouseFilterParams(13, caiButtonActive, caiSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

    setHouseFilterParams(13, caiButtonActive, caiSlider.value);
    filterHouses(activeFiltersList, filtersValueList);
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

  function setSliderMaxMin(slider, min, max) {
    slider.min = min;
    slider.max = max;
  }

  function setSliderValue(slider, value) {
    slider.value = value;
  }

  function setSliderTxt(slider, value) {
    slider.innerHTML = "Menor a " + Number(value).format(0).toString() + "";
  }

  //Main filters buttons action
  var mainFilter1Active = false;
  var mainFilter1Value = 0;

  var mainFilter2Active = false;
  var mainFilter2Value = 0;

  function setMainFiltersParams() {
    activeFiltersList[0] = mainFilter1Active;
    filtersValueList[0] = mainFilter1Value;
    activeFiltersList[1] = mainFilter2Active;
    filtersValueList[1] = mainFilter2Value;
  }

  //Main filter button 1 (arriendo)
  function checkMainFilter1() {
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

  function uncheckMainFilter1() {
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
  }

  $("#main_filter_1").click(function () {
    if (!mainFilter1Active) {
      checkMainFilter1();
      uncheckMainFilter2();
      setSliderMaxMin(budgetSlider, 400000, 3000000);
      setSliderValue(budgetSlider, 3000000);
      setSliderTxt(budgetSliderOutput, 3000000);

    } else {
      uncheckMainFilter1();
      if (!mainFilter2Active) {
        setSliderMaxMin(budgetSlider, 400000, 900000000);
        setSliderValue(budgetSlider, 900000000);
        setSliderTxt(budgetSliderOutput, 900000000);
      }

    }
    setMainFiltersParams();
    filterHouses(activeFiltersList, filtersValueList);
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

  function checkMainFilter2() {
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

  function uncheckMainFilter2() {
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
  }

  $("#main_filter_2").click(function () {
    if (!mainFilter2Active) {
      checkMainFilter2();
      uncheckMainFilter1();
      setSliderMaxMin(budgetSlider, 95000000, 900000000);
      setSliderValue(budgetSlider, 900000000);
      setSliderTxt(budgetSliderOutput, 900000000);
    } else {
      uncheckMainFilter2();
      if (!mainFilter1Active) {
        setSliderMaxMin(budgetSlider, 400000, 900000000);
        setSliderValue(budgetSlider, 900000000);
        setSliderTxt(budgetSliderOutput, 900000000);
      }

    }
    setMainFiltersParams();
    filterHouses(activeFiltersList, filtersValueList);
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

        } else {
          $(".info_container").css("left", "-16%");

        }
      }
    }, 10000);
  }

  setTimeout(function () {
    setSafetyInfo();
    setHospitalsInfo();
    setSchoolsInfo();
    setRestaurantsInfo();
    setPubsInfo();
    setParksInfo();
    setCaiInfo();
    loadEnd();

    console.log("CRIMES");
    console.log(safetyInfo);
    console.log("midlow: " + safetyMidlow + ", avg: " + safetyAvg);
    console.log("HOSPITALS");
    console.log(hospitalsInfo);
    console.log("midlow: " + hospitalsMidlow + ", avg: " + hospitalsAvg);
    console.log("SCHOOLS");
    console.log(schoolsInfo);
    console.log("midlow: " + schoolsMidlow + ", avg: " + schoolsAvg);
    console.log("RESTAURANTS");
    console.log(restaurantsInfo);
    console.log("midlow: " + restaurantsMidlow + ", avg: " + restaurantsAvg);
    console.log("PUBS");
    console.log(pubsInfo);
    console.log("midlow: " + pubsMidlow + ", avg: " + pubsAvg);
    console.log("PARKS");
    console.log(parksInfo);
    console.log("midlow: " + parksMidlow + ", avg: " + parksAvg);
    console.log("CAIS");
    console.log(caiInfo);
    console.log("midlow: " + caiMidlow + ", avg: " + caiAvg);
  }, 2000);

  classifyData();
  viewData(LOCA,"LOCA", function(){
  })

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
