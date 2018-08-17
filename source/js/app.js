if (document.getElementById('map')) {
  // Coordinates to center the map
//   var myLatlng = new google.maps.LatLng(45.8025711, 16.0029489);
//
//   // Other options for the map, pretty much selfexplanatory
//   var mapOptions = {
//     zoom: 14,
//     center: myLatlng,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//
//   // Attach a map to the DOM Element, with the defined settings
//   var map = new google.maps.Map(document.getElementById("map"), mapOptions);
// }
// document.ready(function() {

// });



  // The location
  var myLatlng = {lat: 45.802982, lng: 16.004666};
  // The map, centered at myLatlng
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 16, center: myLatlng});
  // The marker, positioned at place
  var marker = new google.maps.Marker({position: myLatlng, map: map});
};
