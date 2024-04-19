function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 10.77221,
        lng: 106.65791
      },
      zoom: 18,
      mapTypeControl: false,
  
    });
    const card = document.getElementById("pac-card");
    const card2 = document.getElementById("pac-card2");
    const input = document.getElementById("pac-input");
    const input2 = document.getElementById("pac-input2");
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };
  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card2);
  
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    const autocomplete2 = new google.maps.places.Autocomplete(input2, options);
  
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);
    autocomplete2.bindTo("bounds", map);
  
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
  
    infowindow.setContent(infowindowContent);
  
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
  
    /* autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);
    
      const place = autocomplete.getPlace();
    
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
    
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
    
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    });
    autocomplete2.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);
    
      const place = autocomplete.getPlace();
    
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
    
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
    
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    }); */
  
    autocomplete.bindTo("bounds", map);
    autocomplete2.bindTo("bounds", map);
  
    const directionsService = new google.maps.DirectionsService();
  
    // Create a directions renderer.
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: map
    });
  
      async function whenPlaceChanged() {
        const originPlace = autocomplete.getPlace();
  
      if (!originPlace.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No address available for input: \'' + originPlace.name + '\'');
        return;
      }
  
      // Clear any previous directions.
      directionsRenderer.setDirections({
        routes: []
      });
  
      // Get destination address from the user.
      const destinationPlace = autocomplete2.getPlace();
  
      if (!destinationPlace.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No address available for input: \'' + destinationPlace.name + '\'');
        return;
      }
  
      // Calculate the directions.
      directionsService.route({
        origin: originPlace.geometry.location,
        destination: destinationPlace.geometry.location,
        travelMode: 'DRIVING'
      }, (response, status) => {
        // Check for the status of the request.
        if (status === 'OK') {
          // Display the directions on the map.
          directionsRenderer.setDirections(response);
          const route = response.routes[0];
          const distance = route.legs[0].distance.text;
          const time = route.legs[0].duration.text;
  
          // Display the distance and time in the UI.
          document.getElementById('distance').innerHTML = distance;
          document.getElementById('time').innerHTML = time; 
          
          console.log(distance);
          console.log(time);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  
    autocomplete2.addListener('place_changed', whenPlaceChanged);
    autocomplete.addListener('place_changed', whenPlaceChanged);
  }
  
  window.initMap = initMap;