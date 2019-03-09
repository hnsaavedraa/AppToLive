var map;
var markers = [];
var currentInfoWindow = null;
var currentHouse = null;
var markerClicked = false;

function onGoogleMapResponse() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {
      lat: 4.6990,
      lng: -74.1615
    }
  });
  fillMarkers();
}

Number.prototype.format = function (n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function getMapOffset() {
  var mapOffset = 0;
  var zoom = map.getZoom();

  // y = x-(x*0.5)
  if (zoom <= 12) {
    mapOffset = 0.11;
  } else if (zoom > 12 && zoom <= 13) {
    mapOffset = 0.05;
  } else if (zoom > 13 && zoom <= 14) {
    mapOffset = 0.025;
  } else if (zoom > 14 && zoom <= 15) {
    mapOffset = 0.0125;
  } else if (zoom > 15 && zoom <= 16) {
    mapOffset = 0.00625;
  } else if (zoom > 16 && zoom <= 17) {
    mapOffset = 0.003125;
  } else if (zoom > 17 && zoom <= 18) {
    mapOffset = 0.0015625;
  } else if (zoom > 18 && zoom <= 19) {
    mapOffset = 0.00078125;
  } else if (zoom > 19 && zoom <= 20) {
    mapOffset = 0.000390625;
  } else if (zoom > 20 && zoom <= 21) {
    mapOffset = 0.0001953125;
  } else if (zoom > 21 && zoom <= 22) {
    mapOffset = 0.00009765625;
  }

  return mapOffset;
}

function setMapCenterOnclick(latLng) {
  var latitude = latLng.lat;
  var longitude = latLng.lng;
  var mapCenter = new google.maps.LatLng(latitude, (longitude - getMapOffset()));
  map.setCenter(mapCenter);
}

function fillMarkers(callback) {
  loadedHouses.forEach(function (house, i) {
    markers[i] = new markerObject(house, house.coordinates, null, null, i);
  });
  createMarkers();
}

var cont = 0;

function createMarkers() {

  loadedHouses.forEach(function (house, i) {
    markers[i].marker.setMap(null);
  });

  hospitalsUnCheck();
  schoolsUnCheck();
  restaurantsUnCheck();
  pubsUnCheck();
  parksUnCheck();
  caisUnCheck();

  if (currentInfoWindow != null) {
    currentInfoWindow.setMap(null);
    currentInfoWindow = null;
  }

  filteredHouses.forEach(function (house) {
    var index = loadedHouses.indexOf(house);
    markers[index].marker.setMap(map);
    markers[index].marker.setAnimation(google.maps.Animation.DROP)
  });
}

function markerObject(house, location, infoHover, infoClick, i) {
  var lat = parseFloat(location.substring(1, location.search(' ')));
  var lng = parseFloat(location.substring(location.search(',') + 2, location.search(']')));
  var ar = [lat, lng];
  location = {
    lat: ar[0],
    lng: ar[1]
  };
  var markerObject = {
    marker: new google.maps.Marker({
      position: location,
      animation: google.maps.Animation.DROP,
      icon: {
        url: 'https://imgur.com/uvvXGxB.png',
        scaledSize: new google.maps.Size(35, 50)
      }
    }),
    infoWinHover: null,
    infoWinOut: null,
    infoWinClick: null
  }
  markerObject.infoWinHover = markerObject.marker.addListener('mouseover', function () {
    markerObject.marker.setAnimation(google.maps.Animation.BOUNCE);
    console.log(house.address);
  });
  markerObject.infoWinOut = markerObject.marker.addListener('mouseout', function () {
    markerObject.marker.setAnimation(null);
  });

  markerObject.infoWinClick = markerObject.marker.addListener('click', function () {
    var mapCenter = {
      lat: parseFloat(house.coordinates.substring(1, house.coordinates.search(' '))),
      lng: parseFloat(house.coordinates.substring(house.coordinates.search(',') + 2, house.coordinates.search(']')))
    };

    console.log(mapCenter);
    setMapCenterOnclick(mapCenter);
    displayInfoWindow(house);
  });
  return markerObject;

}

var hospitalsListButtonActive = false;
var schoolsListButtonActive = false;
var restaurantsListButtonActive = false;
var pubsListButtonActive = false;
var parksListButtonActive = false;
var caiListButtonActive = false;
var listButtonsArrayStr = [];
var listButtonsArray = [];

$(window).resize(function () {
  if (!markerClicked) displayInfoWindow(currentHouse);
});

function displayInfoWindow(house) {
  var flag = true;
  markerClicked = true;
  if (currentInfoWindow != null) {
    currentInfoWindow.setMap(null);
    currentInfoWindow = null;
    currentHouse = null;
    if (house == null) {
      flag = false;
    }
  }

  hospitalsUnCheck();
  schoolsUnCheck();
  restaurantsUnCheck();
  pubsUnCheck();
  parksUnCheck();
  caisUnCheck();

  if (flag) {
    hospitalsListButtonActive = false;
    schoolsListButtonActive = false;
    restaurantsListButtonActive = false;
    pubsListButtonActive = false;
    parksListButtonActive = false;
    caiListButtonActive = false;

    listButtonsArrayStr = [
      '<i class="fas fa-hospital"></i>',
      '<i class="fas fa-school"></i>',
      '<i class="fas fa-utensils"></i>',
      '<i class="fas fa-glass-cheers"></i>',
      '<i  class="fas fa-tree"></i>',
      '<i  class="fas fa-user-shield"></i>'
    ];

    var contentCarousel =
      '<div id = "containerCarrousel">' +
      '<div id = "Carrousel">' +
      '<div id="carouselInfo" class="carousel slide" data-ride="carousel" data-interval="false">' +
      '<div class="carousel-inner">' +
      '<div class="carousel-item active">' +

      '<div id = "house_info_window_buttons_container" style="padding-top:' + (($(window).height()) * 0.015).toString() + 'px;' +
      'padding-bottom:' + (($(window).height()) * 0.015).toString() + 'px;">' +

      '<div class = "house_info_window_list_icon_container" >' +
      '<div class = "house_info_window_list_icon" onmouseover="listButtonMouseOver(this,1)" onmouseout="listButtonMouseOut(this,1)"' +
      ' onclick="listButtonOnClick(this,1,' + filteredHouses.indexOf(house) + ')" >' +
      listButtonsArrayStr[0] +
      '</div>' +
      '<h4 id = "house_info_window_hospital_button_text">Hospitales</h4>' +
      '</div>' +

      '<div class = "house_info_window_list_icon_container" >' +
      '<div class = "house_info_window_list_icon" onmouseover="listButtonMouseOver(this,2)" onmouseout="listButtonMouseOut(this,2)"' +
      ' onclick="listButtonOnClick(this,2,' + filteredHouses.indexOf(house) + ')">' +
      listButtonsArrayStr[1] +
      '</div>' +
      '<h4 id = "house_info_window_schools_button_text">Colegios</h4>' +
      '</div>' +

      '<div class = "house_info_window_list_icon_container" >' +
      '<div class = "house_info_window_list_icon" onmouseover="listButtonMouseOver(this,3)" onmouseout="listButtonMouseOut(this,3)"' +
      ' onclick="listButtonOnClick(this,3,' + filteredHouses.indexOf(house) + ')">' +
      listButtonsArrayStr[2] +
      '</div>' +
      '<h4 id = "house_info_window_restaurants_button_text">Restaurantes</h4>' +
      '</div>' +

      '</div>' +

      '</div>' +
      '<div class="carousel-item">' +

      '<div id = "house_info_window_buttons_container" style="padding-top:' + (($(window).height()) * 0.015).toString() + 'px;' +
      'padding-bottom:' + (($(window).height()) * 0.015).toString() + 'px;">' +

      '<div class = "house_info_window_list_icon_container" >' +
      '<div class = "house_info_window_list_icon" onmouseover="listButtonMouseOver(this,4)" onmouseout="listButtonMouseOut(this,4)"' +
      ' onclick="listButtonOnClick(this,4,' + filteredHouses.indexOf(house) + ')">' +
      listButtonsArrayStr[3] +
      '</div>' +
      '<h4 id = "house_info_window_pubs_button_text">Bares</h4>' +
      '</div>' +

      '<div class = "house_info_window_list_icon_container" >' +
      '<div class = "house_info_window_list_icon" onmouseover="listButtonMouseOver(this,5)" onmouseout="listButtonMouseOut(this,5)"' +
      ' onclick="listButtonOnClick(this,5,' + filteredHouses.indexOf(house) + ')">' +
      listButtonsArrayStr[4] +
      '</div>' +
      '<h4 id = "house_info_window_parks_button_text">Parques</h4>' +
      '</div>' +

      '<div class = "house_info_window_list_icon_container" >' +
      '<div class = "house_info_window_list_icon" onmouseover="listButtonMouseOver(this,6)" onmouseout="listButtonMouseOut(this,6)"' +
      ' onclick="listButtonOnClick(this,6,' + filteredHouses.indexOf(house) + ')">' +
      listButtonsArrayStr[5] +
      '</div>' +
      '<h4 id = "house_info_window_cai_button_text">CAI</h4>' +
      '</div>' +

      '</div>' +
      '</div>' +
      '<a class="carousel-control-prev" href="#carouselInfo" role="button" data-slide="prev">' +
      '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
      '<span class="sr-only">Previous</span>' +
      '</a>' +
      '<a class="carousel-control-next" href="#carouselInfo" role="button" data-slide="next">' +
      '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
      '<span class="sr-only">Next</span>' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    var numberOfFloorsText = "";
    if (house.numberOfFloors > 1) {
      numberOfFloorsText = " pisos";
    } else {
      numberOfFloorsText = " piso";
    }

    var numberOfRoomsText = "";
    if (house.numberOfRooms > 1) {
      numberOfRoomsText = " habitaciones";
    } else {
      numberOfRoomsText = " habitacion";
    }

    var numberOfBathroomsText = "";
    if (house.numberOfBathrooms > 1) {
      numberOfBathroomsText = " baños";
    } else {
      numberOfBathroomsText = " baño";
    }

    var petsText = "";
    if (house.pets == "Si") {
      petsText = "Se admiten mascotas";
    } else {
      petsText = "No se admiten mascotas";
    }

    var contentString =
      '<div class = "house_info_window_close_button_container" ></div>' +
      '<div class = "house_info_window">' +
      '<div class = "house_info_window_main_content" >' +
      '<div class = "house_info_window_title" style="padding-top:' + (($(window).height()) * 0.03).toString() + 'px;' +
      'padding-bottom:' + (($(window).height()) * 0.02).toString() + 'px;" >' +
      '<h1>' + house.adType + '</h1>' +
      '<div class = "price_container" >' +
      '<h1>' + '$' + Number(house.price).format(0) + ' COP' + '</h1>' +
      '</div>' +
      '</div>' +

      '<div class = "house_info_window_owner_info_container" >' +
      '<div class = "house_info_window_icon_container" >' +
      '<div class = "house_info_window_icon" >' +
      '<i id="house_owner_icon" class="fas fa-user"></i>' +
      '</div>' +
      '<h4>Contacto</h4>' +
      '</div>' +
      '<div class = "house_info_window_list_container" style="padding-top:' + (($(window).height()) * 0.015).toString() + 'px;' +
      'padding-bottom:' + (($(window).height()) * 0.015).toString() + 'px;">' +
      '<ul style="margin: 0px;">' +
      '<li class = "house_info_window_data_text">' + '' + house.owner + ' </li>' +
      '<li class = "house_info_window_data_text">Telefono: 3508263720</li>' +
      '</ul>' +
      '</div>' +
      '</div>' +

      '<div class = "house_info_window_house_info_container" style="padding-top:' + (($(window).height()) * 0.015).toString() + 'px;' +
      'padding-bottom:' + (($(window).height()) * 0.03).toString() + 'px;">' +
      '<div class = "house_info_window_icon_container" >' +
      '<div class = "house_info_window_icon" >' +
      '<i id="house_owner_icon" class="fas fa-home"></i>' +
      '</div>' +
      '<h4>Info de la vivienda</h4>' +
      '</div>' +
      '<div class = "house_info_window_list_container" >' +
      '<ul style="margin: 0px;">' +
      '<li class = "house_info_window_data_text">' + house.address + '</li>' +
      '<li class = "house_info_window_data_text">Barrio ' + house.neighborhood.charAt(0).toUpperCase() + house.neighborhood.slice(1).toLowerCase() + '</li>' +
      '<li class = "house_info_window_data_text">Estrato ' + house.estrato + '</li>' +
      '<li class = "house_info_window_data_text">Area construida de ' + house.buildingArea + ' m2</li>' +
      '<li class = "house_info_window_data_text">' + house.numberOfFloors + numberOfFloorsText + '</li>' +
      '<li class = "house_info_window_data_text">' + house.numberOfRooms + numberOfRoomsText + '</li>' +
      '<li class = "house_info_window_data_text">' + house.numberOfBathrooms + numberOfBathroomsText + '</li>' +
      '<li class = "house_info_window_data_text">' + petsText + '</li>' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '</div>' +
      contentCarousel +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      position: {
        lat: parseFloat(house.coordinates.substring(1, house.coordinates.search(' '))),
        lng: parseFloat(house.coordinates.substring(house.coordinates.search(',') + 2, house.coordinates.search(']')))
      },
      content: contentString
    });

    infowindow.addListener('closeclick', function () {
      hospitalsUnCheck();
      schoolsUnCheck();
      restaurantsUnCheck();
      pubsUnCheck();
      parksUnCheck();
      caisUnCheck();
      markerClicked = false;
    });

    currentInfoWindow = infowindow;
    currentHouse = house;
    infowindow.setZIndex(2000);
    infowindow.open(map);
  }
}

function listButtonMouseOver(element, type) {
  if (type == 1) {
    if (!hospitalsListButtonActive) {
      element.childNodes[0].style.color = "#9C27B0";
      element.style.backgroundColor = "white";
    }
  } else if (type == 2) {
    if (!schoolsListButtonActive) {
      element.childNodes[0].style.color = "#9C27B0";
      element.style.backgroundColor = "white";
    }
  } else if (type == 3) {
    if (!restaurantsListButtonActive) {
      element.childNodes[0].style.color = "#9C27B0";
      element.style.backgroundColor = "white";
    }
  } else if (type == 4) {
    if (!pubsListButtonActive) {
      element.childNodes[0].style.color = "#9C27B0";
      element.style.backgroundColor = "white";
    }
  } else if (type == 5) {
    if (!parksListButtonActive) {
      element.childNodes[0].style.color = "#9C27B0";
      element.style.backgroundColor = "white";
    }
  } else if (type == 6) {
    if (!caiListButtonActive) {
      element.childNodes[0].style.color = "#9C27B0";
      element.style.backgroundColor = "white";
    }
  }
}

function listButtonMouseOut(element, type) {

  if (type == 1) {
    if (!hospitalsListButtonActive) {
      element.childNodes[0].style.color = "white";
      element.style.backgroundColor = "#9C27B0";
    }
  } else if (type == 2) {
    if (!schoolsListButtonActive) {
      element.childNodes[0].style.color = "white";
      element.style.backgroundColor = "#9C27B0";
    }
  } else if (type == 3) {
    if (!restaurantsListButtonActive) {
      element.childNodes[0].style.color = "white";
      element.style.backgroundColor = "#9C27B0";
    }
  } else if (type == 4) {
    if (!pubsListButtonActive) {
      element.childNodes[0].style.color = "white";
      element.style.backgroundColor = "#9C27B0";
    }
  } else if (type == 5) {
    if (!parksListButtonActive) {
      element.childNodes[0].style.color = "white";
      element.style.backgroundColor = "#9C27B0";
    }
  } else if (type == 6) {
    if (!caiListButtonActive) {
      element.childNodes[0].style.color = "white";
      element.style.backgroundColor = "#9C27B0";
    }
  }
}

function hospitalsListButtonCheck(element) {
  hospitalsListButtonActive = true;
  element.childNodes[0].style.color = "#9C27B0";
  element.style.backgroundColor = "white";
}

function hospitalsListButtonUncheck(element) {
  hospitalsListButtonActive = false;
  element.childNodes[0].style.color = "white";
  element.style.backgroundColor = "#9C27B0";
}

function schoolsListButtonCheck(element) {
  schoolsListButtonActive = true;
  element.childNodes[0].style.color = "#9C27B0";
  element.style.backgroundColor = "white";
}

function schoolsListButtonUncheck(element) {
  schoolsListButtonActive = false;
  element.childNodes[0].style.color = "white";
  element.style.backgroundColor = "#9C27B0";
}

function restaurantsListButtonCheck(element) {
  restaurantsListButtonActive = true;
  element.childNodes[0].style.color = "#9C27B0";
  element.style.backgroundColor = "white";
}

function restaurantsListButtonUncheck(element) {
  restaurantsListButtonActive = false;
  element.childNodes[0].style.color = "white";
  element.style.backgroundColor = "#9C27B0";
}

function pubsListButtonCheck(element) {
  pubsListButtonActive = true;
  element.childNodes[0].style.color = "#9C27B0";
  element.style.backgroundColor = "white";
}

function pubsListButtonUncheck(element) {
  pubsListButtonActive = false;
  element.childNodes[0].style.color = "white";
  element.style.backgroundColor = "#9C27B0";
}

function parksListButtonCheck(element) {
  parksListButtonActive = true;
  element.childNodes[0].style.color = "#9C27B0";
  element.style.backgroundColor = "white";
}

function parksListButtonUncheck(element) {
  parksListButtonActive = false;
  element.childNodes[0].style.color = "white";
  element.style.backgroundColor = "#9C27B0";
}

function caiListButtonCheck(element) {
  caiListButtonActive = true;
  element.childNodes[0].style.color = "#9C27B0";
  element.style.backgroundColor = "white";
}

function caiListButtonUncheck(element) {
  caiListButtonActive = false;
  element.childNodes[0].style.color = "white";
  element.style.backgroundColor = "#9C27B0";
}

function listButtonOnClick(element, type, houseIndex) {
  if (type == 1) {
    $("#hospitals_list_button_close").click(function () {
      $("#hospitals_list_button_close").css("color", "black");
      $("#hospitals_list_button_close").css("background-color", "white");
      $(".hospitals_list_container").css("left", "102%");
      $("#hospitals_list_button_close").css("opacity", "0");
      hospitalsListButtonUncheck(element);
    });

    $("#hospitals_list_button_close").hover(function () {
      $("#hospitals_list_button_close").css("color", "white");
      $("#hospitals_list_button_close").css("background-color", "black");
    }, function () {
      $("#hospitals_list_button_close").css("color", "black");
      $("#hospitals_list_button_close").css("background-color", "white");
    });

    if (!hospitalsListButtonActive) {
      listButtonsArray[0] = element;
      hospitalsListButtonCheck(element);
      hospitalsCheck(filteredHouses[houseIndex]);
      schoolsUnCheck();
      restaurantsUnCheck();
      pubsUnCheck();
      parksUnCheck();
      caisUnCheck();

      if (listButtonsArray[1] != undefined) schoolsListButtonUncheck(listButtonsArray[1]);
      if (listButtonsArray[2] != undefined) restaurantsListButtonUncheck(listButtonsArray[2]);
      if (listButtonsArray[3] != undefined) pubsListButtonUncheck(listButtonsArray[3]);
      if (listButtonsArray[4] != undefined) parksListButtonUncheck(listButtonsArray[4]);
      if (listButtonsArray[5] != undefined) caiListButtonUncheck(listButtonsArray[5]);

    } else {
      hospitalsListButtonUncheck(element);
      hospitalsUnCheck();
    }

  } else if (type == 2) {

    $("#schools_list_button_close").click(function () {
      $("#schools_list_button_close").css("color", "black");
      $("#schools_list_button_close").css("background-color", "white");
      $(".schools_list_container").css("left", "102%");
      $("#schools_list_button_close").css("opacity", "0");
      schoolsListButtonUncheck(element);
    });

    $("#schools_list_button_close").hover(function () {
      $("#schools_list_button_close").css("color", "white");
      $("#schools_list_button_close").css("background-color", "black");
    }, function () {
      $("#schools_list_button_close").css("color", "black");
      $("#schools_list_button_close").css("background-color", "white");
    });

    if (!schoolsListButtonActive) {
      listButtonsArray[1] = element;
      schoolsListButtonCheck(element);
      schoolsCheck(filteredHouses[houseIndex]);
      hospitalsUnCheck();
      restaurantsUnCheck();
      pubsUnCheck();
      parksUnCheck();
      caisUnCheck();


      if (listButtonsArray[0] != undefined) hospitalsListButtonUncheck(listButtonsArray[0]);
      if (listButtonsArray[2] != undefined) restaurantsListButtonUncheck(listButtonsArray[2]);
      if (listButtonsArray[3] != undefined) pubsListButtonUncheck(listButtonsArray[3]);
      if (listButtonsArray[4] != undefined) parksListButtonUncheck(listButtonsArray[4]);
      if (listButtonsArray[5] != undefined) caiListButtonUncheck(listButtonsArray[5]);
    } else {
      schoolsListButtonUncheck(element);
      schoolsUnCheck();
    }

  } else if (type == 3) {
    $("#restaurants_list_button_close").click(function () {
      $("#restaurants_list_button_close").css("color", "black");
      $("#restaurants_list_button_close").css("background-color", "white");
      $(".restaurants_list_container").css("left", "102%");
      $("#restaurants_list_button_close").css("opacity", "0");
      restaurantsListButtonUncheck(element);
    });

    $("#restaurants_list_button_close").hover(function () {
      $("#restaurants_list_button_close").css("color", "white");
      $("#restaurants_list_button_close").css("background-color", "black");
    }, function () {
      $("#restaurants_list_button_close").css("color", "black");
      $("#restaurants_list_button_close").css("background-color", "white");
    });
    if (!restaurantsListButtonActive) {
      listButtonsArray[2] = element;
      restaurantsListButtonCheck(element);
      restaurantsCheck(filteredHouses[houseIndex]);
      hospitalsUnCheck();
      schoolsUnCheck();
      pubsUnCheck();
      parksUnCheck();
      caisUnCheck();

      if (listButtonsArray[0] != undefined) hospitalsListButtonUncheck(listButtonsArray[0]);
      if (listButtonsArray[1] != undefined) schoolsListButtonUncheck(listButtonsArray[1]);
      if (listButtonsArray[3] != undefined) pubsListButtonUncheck(listButtonsArray[3]);
      if (listButtonsArray[4] != undefined) parksListButtonUncheck(listButtonsArray[4]);
      if (listButtonsArray[5] != undefined) caiListButtonUncheck(listButtonsArray[5]);
    } else {
      restaurantsListButtonUncheck(element);
      restaurantsUnCheck();
    }

  } else if (type == 4) {
    $("#pubs_list_button_close").click(function () {
      $("#pubs_list_button_close").css("color", "black");
      $("#pubs_list_button_close").css("background-color", "white");
      $(".pubs_list_container").css("left", "102%");
      $("#pubs_list_button_close").css("opacity", "0");
      pubsListButtonUncheck(element);
    });

    $("#pubs_list_button_close").hover(function () {
      $("#pubs_list_button_close").css("color", "white");
      $("#pubs_list_button_close").css("background-color", "black");
    }, function () {
      $("#pubs_list_button_close").css("color", "black");
      $("#pubs_list_button_close").css("background-color", "white");
    });
    if (!pubsListButtonActive) {
      listButtonsArray[3] = element;
      pubsListButtonCheck(element);
      pubsListButtonCheck(element);
      pubsCheck(filteredHouses[houseIndex]);
      hospitalsUnCheck();
      schoolsUnCheck();
      restaurantsUnCheck();
      parksUnCheck();
      caisUnCheck();

      if (listButtonsArray[0] != undefined) hospitalsListButtonUncheck(listButtonsArray[0]);
      if (listButtonsArray[1] != undefined) schoolsListButtonUncheck(listButtonsArray[1]);
      if (listButtonsArray[2] != undefined) restaurantsListButtonUncheck(listButtonsArray[2]);
      if (listButtonsArray[4] != undefined) parksListButtonUncheck(listButtonsArray[4]);
      if (listButtonsArray[5] != undefined) caiListButtonUncheck(listButtonsArray[5]);
    } else {
      pubsListButtonUncheck(element);
      pubsUnCheck();
    }
  } else if (type == 5) {
    $("#parks_list_button_close").click(function () {
      $("#parks_list_button_close").css("color", "black");
      $("#parks_list_button_close").css("background-color", "white");
      $(".parks_list_container").css("left", "102%");
      $("#parks_list_button_close").css("opacity", "0");
      parksListButtonUncheck(element);
    });

    $("#parks_list_button_close").hover(function () {
      $("#parks_list_button_close").css("color", "white");
      $("#parks_list_button_close").css("background-color", "black");
    }, function () {
      $("#parks_list_button_close").css("color", "black");
      $("#parks_list_button_close").css("background-color", "white");
    });

    if (!parksListButtonActive) {
      listButtonsArray[4] = element;
      parksListButtonCheck(element);
      console.log("in 5");
      parksCheck(filteredHouses[houseIndex]);
      hospitalsUnCheck();
      schoolsUnCheck();
      restaurantsUnCheck();
      pubsUnCheck();
      caisUnCheck();

      if (listButtonsArray[0] != undefined) schoolsListButtonUncheck(listButtonsArray[0]);
      if (listButtonsArray[1] != undefined) hospitalsListButtonUncheck(listButtonsArray[1]);
      if (listButtonsArray[2] != undefined) restaurantsListButtonUncheck(listButtonsArray[2]);
      if (listButtonsArray[3] != undefined) pubsListButtonUncheck(listButtonsArray[3]);
      if (listButtonsArray[5] != undefined) caiListButtonUncheck(listButtonsArray[5]);
    } else {
      parksListButtonUncheck(element);
      parksUnCheck();
    }

  } else if (type == 6) {

    $("#cais_list_button_close").click(function () {
      $("#cais_list_button_close").css("color", "black");
      $("#cais_list_button_close").css("background-color", "white");
      $(".cais_list_container").css("left", "102%");
      $("#cais_list_button_close").css("opacity", "0");
      caiListButtonUncheck(element);
    });

    $("#cais_list_button_close").hover(function () {
      $("#cais_list_button_close").css("color", "white");
      $("#cais_list_button_close").css("background-color", "black");
    }, function () {
      $("#cais_list_button_close").css("color", "black");
      $("#cais_list_button_close").css("background-color", "white");
    });

    if (!caiListButtonActive) {
      listButtonsArray[5] = element;
      caiListButtonCheck(element);
      caisCheck(filteredHouses[houseIndex]);
      hospitalsUnCheck();
      schoolsUnCheck();
      restaurantsUnCheck();
      pubsUnCheck();
      parksUnCheck();

      if (listButtonsArray[0] != undefined) hospitalsListButtonUncheck(listButtonsArray[0]);
      if (listButtonsArray[1] != undefined) schoolsListButtonUncheck(listButtonsArray[1]);
      if (listButtonsArray[2] != undefined) restaurantsListButtonUncheck(listButtonsArray[2]);
      if (listButtonsArray[3] != undefined) pubsListButtonUncheck(listButtonsArray[3]);
      if (listButtonsArray[4] != undefined) parksListButtonUncheck(listButtonsArray[4]);
    } else {
      caiListButtonUncheck(element);
      caisUnCheck();
    }
  }
}

function gethospitalsList(house) {
  var content = "";

  if (house.hospitals.length == 0) {
    return '<h3 class="house_list_bold_text">No se encontraron hospitales</h3>';
  }

  house.hospitals.forEach(function (hospital) {
    content = content +
      '<div class="houses_list_data_container">' +
      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Nombre: </h3>' +
      '<h4 class="house_list_plain_text">' + hospital.name.charAt(0).toUpperCase() +hospital.name.slice(1).toLowerCase()  + '</h4>' +
      '</div>' +
      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Direccion: </h3>' +
      '<h4 class="house_list_plain_text">' + hospital.address.charAt(0).toUpperCase() +hospital.address.slice(1).toLowerCase() + '</h4>' +
      '</div>' +
      '<div class="divider_line"></div>' +
      '</div>';
  });

  return content;
}

function hospitalsCheck(house) {
  $("#hospitals_list_button_close").css("color", "black");
  $("#hospitals_list_button_close").css("background-color", "white");
  $(".hospitals_list_container").css("left", "79%");
  $("#hospitals_list_button_close").css("opacity", "1");

  $(".hospitals_list_container").animate({
    scrollTop: 0
  }, 0);
  $(".hospitals_list_txt_container").html(gethospitalsList(house));
}

function hospitalsUnCheck() {
  $("#hospitals_list_button_close").css("color", "white");
  $("#hospitals_list_button_close").css("background-color", "black");
  $(".hospitals_list_container").css("left", "102%");
  $("#hospitals_list_button_close").css("opacity", "0");
}


function getschoolsList(house) {
  var content = "";

  if (house.schools.length == 0) {
    return '<h3 class="house_list_bold_text">No se encontraron </h3>';
  }

  house.schools.forEach(function (school) {
    content = content +
      '<div class="houses_list_data_container">' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Nombre: </h3>' +
      '<h4 class="house_list_plain_text">' + school.name.charAt(0).toUpperCase() +school.name.slice(1).toLowerCase() + '</h4>' +
      '</div>' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Direccion: </h3>' +
      '<h4 class="house_list_plain_text">' + school.address.charAt(0).toUpperCase() +school.address.slice(1).toLowerCase() + '</h4>' +
      '</div>' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Contacto: </h3>' +
      '<h4 class="house_list_plain_text">' + school.phone + '</h4>' +
      '</div>' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Escolaridad: </h3>' +
      '<h4 class="house_list_plain_text">' + school.levels + '</h4>' +
      '</div>' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Jornada: </h3>' +
      '<h4 class="house_list_plain_text">' + school.journal+ '</h4>' +
      '</div>' +

      '<div class="divider_line"></div>' +
      '</div>';
  });
// pub.name.charAt(0).toUpperCase() +pub.name.slice(1).toLowerCase()

  return content;
}

function schoolsCheck(house) {
  $("#schools_list_button_close").css("color", "black");
  $("#schools_list_button_close").css("background-color", "white");
  $(".schools_list_container").css("left", "79%");
  $("#schools_list_button_close").css("opacity", "1");

  $(".schools_list_container").animate({
    scrollTop: 0
  }, 0);
  $(".schools_list_txt_container").html(getschoolsList(house));
}

function schoolsUnCheck() {
  $("#schools_list_button_close").css("color", "white");
  $("#schools_list_button_close").css("background-color", "black");
  $(".schools_list_container").css("left", "102%");
  $("#schools_list_button_close").css("opacity", "0");
}

function getcaisList(house) {
  var content = "";

  if (house.cais.length == 0) {
    return '<h3 class="house_list_bold_text">No se encontraron </h3>';
  }

  house.cais.forEach(function (cai) {
    content = content +
      '<div class="houses_list_data_container">' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Nombre: </h3>' +
      '<h4 class="house_list_plain_text">' + cai.name.charAt(0).toUpperCase() +cai.name.slice(1).toLowerCase()  + '</h4>' +
      '</div>' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Direccion: </h3>' +
      '<h4 class="house_list_plain_text">' + cai.address.charAt(0).toUpperCase() +cai.address.slice(1).toLowerCase() + '</h4>' +
      '</div>' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Telefono: </h3>' +
      '<h4 class="house_list_plain_text">' + cai.phone + '</h4>' +
      '</div>' +

      '<div class="divider_line"></div>' +
      '</div>';
  });
  return content;
}

function caisCheck(house) {
  $("#cais_list_button_close").css("color", "black");
  $("#cais_list_button_close").css("background-color", "white");
  $(".cais_list_container").css("left", "79%");
  $("#cais_list_button_close").css("opacity", "1");

  $(".cais_list_container").animate({
    scrollTop: 0
  }, 0);
  $(".cais_list_txt_container").html(getcaisList(house));
}

function caisUnCheck() {
  $("#cais_list_button_close").css("color", "white");
  $("#cais_list_button_close").css("background-color", "black");
  $(".cais_list_container").css("left", "102%");
  $("#cais_list_button_close").css("opacity", "0");
}

function getrestaurantsList(house) {
  var content = "";

  if (house.restaurants.length == 0) {
    return '<h3 class="house_list_bold_text">No se encontraron </h3>';
  }

  house.restaurants.forEach(function (restaurant) {
    content = content +
      '<div class="houses_list_data_container">' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Nombre: </h3>' +
      '<h4 class="house_list_plain_text">' + restaurant.name.charAt(0).toUpperCase()+restaurant.name.slice(1).toLowerCase()  + '</h4>' +
      '</div>' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Direccion: </h3>' +
      '<h4 class="house_list_plain_text">' + restaurant.address.charAt(0).toUpperCase()+restaurant.address.slice(1).toLowerCase() + '</h4>' +
      '</div>' +

      '<div class="divider_line"></div>' +
      '</div>';
  });

  return content;
}

function restaurantsCheck(house) {
  $("#restaurants_list_button_close").css("color", "black");
  $("#restaurants_list_button_close").css("background-color", "white");
  $(".restaurants_list_container").css("left", "79%");
  $("#restaurants_list_button_close").css("opacity", "1");

  $(".restaurants_list_container").animate({
    scrollTop: 0
  }, 0);
  $(".restaurants_list_txt_container").html(getrestaurantsList(house));
}

function restaurantsUnCheck() {
  $("#restaurants_list_button_close").css("color", "white");
  $("#restaurants_list_button_close").css("background-color", "black");
  $(".restaurants_list_container").css("left", "102%");
  $("#restaurants_list_button_close").css("opacity", "0");
}


function getparksList(house) {
  var content = "";

  if (house.parks.length == 0) {
    return '<h3 class="house_list_bold_text">No se encontraron </h3>';
  }

  house.parks.forEach(function (park) {
    content = content +
      '<div class="houses_list_data_container">' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Nombre: </h3>' +
      '<h4 class="house_list_plain_text">' + park.name.charAt(0).toUpperCase() +park.name.slice(1).toLowerCase()+ '</h4>' +
      '</div>' +

      '<div class="divider_line"></div>' +
      '</div>';
  });

  return content;
}

function parksCheck(house) {
  $("#parks_list_button_close").css("color", "black");
  $("#parks_list_button_close").css("background-color", "white");
  $(".parks_list_container").css("left", "79%");
  $("#parks_list_button_close").css("opacity", "1");

  $(".parks_list_container").animate({
    scrollTop: 0
  }, 0);
  $(".parks_list_txt_container").html(getparksList(house));
}

function parksUnCheck() {
  $("#parks_list_button_close").css("color", "white");
  $("#parks_list_button_close").css("background-color", "black");
  $(".parks_list_container").css("left", "102%");
  $("#parks_list_button_close").css("opacity", "0");
}

function getpubsList(house) {
  var content = "";

  if (house.pubs.length == 0) {
    return '<h3 class="house_list_bold_text">No se encontraron </h3>';
  }

  house.pubs.forEach(function (pub) {
    content = content +
      '<div class="houses_list_data_container">' +

      '<div class="houses_list_data">' +
      '<h3 class="house_list_bold_text">Nombre: </h3>' +
      '<h4 class="house_list_plain_text">' + pub.name.charAt(0).toUpperCase() +pub.name.slice(1).toLowerCase() +'</h4>' +
      '</div>' +

    '<div class="houses_list_data">' +
    '<h3 class="house_list_bold_text">Direccion: </h3>' +
    '<h4 class="house_list_plain_text">' + pub.address.charAt(0).toUpperCase() + pub.address.slice(1).toLowerCase() +'</h4>' +
      '</div>' +
      '<div class="divider_line"></div>' +
      '</div>';
  });

  return content;
}

function pubsCheck(house) {
  $("#pubs_list_button_close").css("color", "black");
  $("#pubs_list_button_close").css("background-color", "white");
  $(".pubs_list_container").css("left", "79%");
  $("#pubs_list_button_close").css("opacity", "1");

  $(".pubs_list_container").animate({
    scrollTop: 0
  }, 0);
  $(".pubs_list_txt_container").html(getpubsList(house));
}

function pubsUnCheck() {
  $("#pubs_list_button_close").css("color", "white");
  $("#pubs_list_button_close").css("background-color", "black");
  $(".pubs_list_container").css("left", "102%");
  $("#pubs_list_button_close").css("opacity", "0");
}
