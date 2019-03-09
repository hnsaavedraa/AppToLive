var map;

function onGoogleMapResponse() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {
      lat: 4.6990,
      lng: -74.1615
    }
  });

  createTestMarker();
}

function createMarkers() {

}

function createTestMarker() {
  var marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {
      lat: 4.69971,
      lng: -74.08175
    }
  });

  marker.addListener('click', displayInfoWindow);
  marker.addListener('mouseover', displayInfoWindowHover);
  marker.addListener('mouseout', hideInfoWindowHover);
}

function displayInfoWindow() {
  var contentCarousel=
  '<div id = "containerCarrousel">'+
  '<div id = "Carrousel">'+
  '<div id="carouselInfo" class="carousel slide" data-ride="carousel" data-interval="false">'+
  '<div class="carousel-inner">'+
   '<div class="carousel-item active">'+
   '<div id ="itemc">'+
   'TEST1'+
   '</div>'+
  '</div>'+
  '<div class="carousel-item">'+
  '<div id ="itemc">'+
  'TEST2'+
   '</div>'+
  '</div>'+
  '</div>'+
  '<a class="carousel-control-prev" href="#carouselInfo" role="button" data-slide="prev">'+
  '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
  '<span class="sr-only">Previous</span>'+
  '</a>'+
  '<a class="carousel-control-next" href="#carouselInfo" role="button" data-slide="next">'+
  '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
  '<span class="sr-only">Next</span>'+
  '</a>'+
  '</div>'+
  '</div>'+
  '</div>'+
  '</div>';


  var test =
    '<div class = "" >' +
    '</div>';

  var test2 = '<h3>< /h3>';

  var contentString =
    '<div class = "house_info_window_close_button_container" ></div>' +
    '<div class = "house_info_window">' +
    '<div class = "house_info_window_main_content" >' +
    '<div class = "house_info_window_title" >' +
    '<h1>Venta</h1>' +
    '<div class = "price_container" >' +
    '<h1>$300.000.000 COP</h1>' +
    '</div>' +
    '</div>' +
    '</div>' +
contentCarousel+
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    position: {
      lat: 4.69971,
      lng: -74.08175
    },
    content: contentString
  });



  infowindow.setZIndex(2000);
  infowindow.open(map);
}

function displayInfoWindowHover() {
  console.log("mouse in");
}

function hideInfoWindowHover() {
  console.log("mouse out");
}