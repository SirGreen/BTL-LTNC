
document.getElementById('directionsForm').addEventListener('submit', function(event) {
  event.preventDefault();
  calculateAndDisplayRoute();
});

function calculateAndDisplayRoute() {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 } // Điểm trung tâm mặc định (Chicago)
  });
  directionsRenderer.setMap(map);

  var origin = document.getElementById('origin').value;
  var destination = document.getElementById('destination').value;

  var request = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
  };

  directionsService.route(request, function(result, status) {
      if (status == 'OK') {
          directionsRenderer.setDirections(result);
      } else {
          window.alert('Directions request failed due to ' + status);
      }
  });
}
