var map;
var markers = [];

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

function fillMarkers(callback) {

  loadedHouses.forEach(function (house, i) {
    markers[i] = new markerObject(house.coordinates, null, null, i);
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

function markerObject(location, infoHover, infoClick, i) {
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
      icon:{url: 'https://imgur.com/uvvXGxB.png', 
            scaledSize: new google.maps.Size(35,50)}
    }),
    infoWinHover: null,
    infoWinOut:null,
    infoWinClick: null
  }
  markerObject.infoWinHover = markerObject.marker.addListener('mouseover', function () {
    markerObject.marker.setAnimation(google.maps.Animation.BOUNCE);
    console.log("hover hijoputas1");
  });

  markerObject.infoWinOut = markerObject.marker.addListener('mouseout', function () {
    markerObject.marker.setAnimation(null);
    console.log("hover out hijoputas1");
  });

  markerObject.infoWinClick = markerObject.marker.addListener('click', function () {
    console.log("click hijoputas");
  });
  return markerObject;
}