let map;
let directionsService;
let directionsRenderer;

function initMap() {
  // Initialize the map centered on Nairobi, Kenya
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: { lat: -1.286389, lng: 36.817223 } // Nairobi coordinates
  });

  // Initialize the Directions service and renderer
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: 'blue'
    }
  });

  // Add traffic layer to the map
  const trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}

function calculateAndDisplayRoute() {
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;

  if (!origin || !destination) {
    alert('Please enter both origin and destination.');
    return;
  }

  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
      drivingOptions: {
        departureTime: new Date(), // for the desired time of departure
        trafficModel: 'bestguess'
      }
    },
    (response, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
        // Optionally, handle multiple routes here
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    }
  );
}