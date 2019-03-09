var map;

function onGoogleMapResponse() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {
      lat: 4.6990,
      lng: -74.1615
    }
  });
}

function createMarkers() {

}