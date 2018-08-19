$(document).ready(function() {
  $('#slider').slick({
    autoplay: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    centerMode: true,
    fade: true,
    cssEase: 'linear',
    infinite: true
  });
});

if (document.getElementById('js-map')) {
  function initMap() {
    var map = new google.maps.Map(document.getElementById('js-map'), {
      zoom: 15,
      center: {
        lat: 45.802982,
        lng: 16.004666
      }
    });

    var marker = new google.maps.Marker({
      position: map.getCenter(),
      icon: "assets/img/marker_icon.png",
      map: map
    });
  };
};
