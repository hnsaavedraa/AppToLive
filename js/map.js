var map;
var markers = [];
var currentInfoWindow = null;
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
  createTestMarker();
}

Number.prototype.format = function (n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function fillMarkers(callback) {

  loadedHouses.forEach(function (house, i) {
    markers[i] = new markerObject(house, house.coordinates, null, null, i);
  })
  createMarkers()
}

function createMarkers() {
  loadedHouses.forEach(function (house, i) {
    markers[i].marker.setMap(null);
  })

  filteredHouses.forEach(function (house) {
    var index = loadedHouses.indexOf(house);
    markers[index].marker.setMap(map);
    markers[index].marker.setAnimation(google.maps.Animation.DROP)


  })
}

function markerObject(house, location, infoHover, infoClick, i) {
  var lat = parseFloat(location.substring(1, location.search(' ')));
  var lng = parseFloat(location.substring(location.search(',') + 2, location.search(']')));
  var ar = [lat, lng];
  location = {
    lat: ar[0],
    lng: ar[1]
  };
  console.log(i);
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
    console.log("hover out hijoputas1");
  });

  markerObject.infoWinClick = markerObject.marker.addListener('click', function () {
    displayInfoWindow(house);
    console.log("click hijoputas");
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
  if (!markerClicked) displayInfoWindow();
});

function displayInfoWindow(house) {

  markerClicked = true;

  if (currentInfoWindow != null) {
    currentInfoWindow.setMap(null);
    currentInfoWindow = null;
  }

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
    ' onclick="listButtonOnClick(this,1)" >' +
    listButtonsArrayStr[0] +
    '</div>' +
    '<h4 id = "house_info_window_hospital_button_text">Hospitales</h4>' +
    '</div>' +

    '<div class = "house_info_window_list_icon_container" >' +
    '<div class = "house_info_window_list_icon" onmouseover="listButtonMouseOver(this,2)" onmouseout="listButtonMouseOut(this,2)"' +
    ' onclick="listButtonOnClick(this,2)">' +
    listButtonsArrayStr[1] +
    '</div>' +
    '<h4 id = "house_info_window_schools_button_text">Colegios</h4>' +
    '</div>' +

    '<div class = "house_info_window_list_icon_container" >' +
    '<div class = "house_info_window_list_icon" onmouseover="listButtonMouseOver(this,3)" onmouseout="listButtonMouseOut(this,3)"' +
    ' onclick="listButtonOnClick(this,3)">' +
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
    ' onclick="listButtonOnClick(this,4)">' +
    listButtonsArrayStr[3] +
    '</div>' +
    '<h4 id = "house_info_window_pubs_button_text">Bares</h4>' +
    '</div>' +

    '<div class = "house_info_window_list_icon_container" >' +
    '<div class = "house_info_window_list_icon" onmouseover="listButtonMouseOver(this,5)" onmouseout="listButtonMouseOut(this,5)"' +
    ' onclick="listButtonOnClick(this,5)">' +
    listButtonsArrayStr[4] +
    '</div>' +
    '<h4 id = "house_info_window_parks_button_text">Parques</h4>' +
    '</div>' +

    '<div class = "house_info_window_list_icon_container" >' +
    '<div class = "house_info_window_list_icon" onmouseover="listButtonMouseOver(this,6)" onmouseout="listButtonMouseOut(this,6)"' +
    ' onclick="listButtonOnClick(this,6)">' +
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
  }else{
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
    '<li class = "house_info_window_data_text">' + house.numberOfFloors +  numberOfFloorsText + '</li>' +
    '<li class = "house_info_window_data_text">' + house.numberOfRooms + numberOfRoomsText + '</li>' +
    '<li class = "house_info_window_data_text">' + house.numberOfBathrooms + numberOfBathroomsText + '</li>' +
    '<li class = "house_info_window_data_text">' + petsText + '</li>' +
    '<li class = "house_info_window_detail_text">Detalles adicionales: </li>' +
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
    markerClicked = false;
  });

  currentInfoWindow = infowindow;
  infowindow.setZIndex(2000);
  infowindow.open(map);
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

function listButtonOnClick(element, type) {
  if (type == 1) {
    console.log("in 1");
    if (!hospitalsListButtonActive) {
      if (listButtonsArray[0] == undefined) listButtonsArray[0] = element;
      hospitalsListButtonCheck(element);
      if (listButtonsArray[1] != undefined) schoolsListButtonUncheck(listButtonsArray[1]);
      if (listButtonsArray[2] != undefined) restaurantsListButtonUncheck(listButtonsArray[2]);
      if (listButtonsArray[3] != undefined) pubsListButtonUncheck(listButtonsArray[3]);
      if (listButtonsArray[4] != undefined) parksListButtonUncheck(listButtonsArray[4]);
      if (listButtonsArray[5] != undefined) caiListButtonUncheck(listButtonsArray[5]);

    } else {
      hospitalsListButtonUncheck(element);

    }
  } else if (type == 2) {
    console.log("in 2");
    if (!schoolsListButtonActive) {
      if (listButtonsArray[1] == undefined) listButtonsArray[1] = element;
      schoolsListButtonCheck(element);
      if (listButtonsArray[0] != undefined) hospitalsListButtonUncheck(listButtonsArray[0]);
      if (listButtonsArray[2] != undefined) restaurantsListButtonUncheck(listButtonsArray[2]);
      if (listButtonsArray[3] != undefined) pubsListButtonUncheck(listButtonsArray[3]);
      if (listButtonsArray[4] != undefined) parksListButtonUncheck(listButtonsArray[4]);
      if (listButtonsArray[5] != undefined) caiListButtonUncheck(listButtonsArray[5]);
    } else {
      schoolsListButtonUncheck(element);
    }
  } else if (type == 3) {
    console.log("in 3");
    if (!restaurantsListButtonActive) {
      if (listButtonsArray[2] == undefined) listButtonsArray[2] = element;
      restaurantsListButtonCheck(element);
      if (listButtonsArray[0] != undefined) hospitalsListButtonUncheck(listButtonsArray[0]);
      if (listButtonsArray[1] != undefined) schoolsListButtonUncheck(listButtonsArray[1]);
      if (listButtonsArray[3] != undefined) pubsListButtonUncheck(listButtonsArray[3]);
      if (listButtonsArray[4] != undefined) parksListButtonUncheck(listButtonsArray[4]);
      if (listButtonsArray[5] != undefined) caiListButtonUncheck(listButtonsArray[5]);
    } else {
      restaurantsListButtonUncheck(element);
    }
  } else if (type == 4) {
    console.log("in 4");
    if (!pubsListButtonActive) {
      if (listButtonsArray[3] == undefined) listButtonsArray[3] = element;
      pubsListButtonCheck(element);
      if (listButtonsArray[0] != undefined) hospitalsListButtonUncheck(listButtonsArray[0]);
      if (listButtonsArray[1] != undefined) schoolsListButtonUncheck(listButtonsArray[1]);
      if (listButtonsArray[2] != undefined) restaurantsListButtonUncheck(listButtonsArray[2]);
      if (listButtonsArray[4] != undefined) parksListButtonUncheck(listButtonsArray[4]);
      if (listButtonsArray[5] != undefined) caiListButtonUncheck(listButtonsArray[5]);
    } else {
      pubsListButtonUncheck(element);
    }
  } else if (type == 5) {
    console.log("in 5");
    if (!parksListButtonActive) {
      if (listButtonsArray[4] == undefined) listButtonsArray[4] = element;
      parksListButtonCheck(element);
      if (listButtonsArray[0] != undefined) schoolsListButtonUncheck(listButtonsArray[0]);
      if (listButtonsArray[1] != undefined) hospitalsListButtonUncheck(listButtonsArray[1]);
      if (listButtonsArray[2] != undefined) restaurantsListButtonUncheck(listButtonsArray[2]);
      if (listButtonsArray[3] != undefined) pubsListButtonUncheck(listButtonsArray[3]);
      if (listButtonsArray[5] != undefined) caiListButtonUncheck(listButtonsArray[5]);
    } else {
      parksListButtonUncheck(element);
    }
  } else if (type == 6) {
    console.log("in 6");
    if (!caiListButtonActive) {
      if (listButtonsArray[5] == undefined) listButtonsArray[5] = element;
      caiListButtonCheck(element);
      if (listButtonsArray[0] != undefined) hospitalsListButtonUncheck(listButtonsArray[0]);
      if (listButtonsArray[1] != undefined) schoolsListButtonUncheck(listButtonsArray[1]);
      if (listButtonsArray[2] != undefined) restaurantsListButtonUncheck(listButtonsArray[2]);
      if (listButtonsArray[3] != undefined) pubsListButtonUncheck(listButtonsArray[3]);
      if (listButtonsArray[4] != undefined) parksListButtonUncheck(listButtonsArray[4]);
    } else {
      caiListButtonUncheck(element);
    }
  }
}

function displayInfoWindowHover() {
  console.log("mouse in");
}


function hideInfoWindowHover() {
  console.log("mouse out");
}