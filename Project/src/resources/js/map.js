/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
 //<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
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

    autocomplete.bindTo("bounds", map);
    autocomplete2.bindTo("bounds", map);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");

    infowindow.setContent(infowindowContent);

    const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
    });

    const directionsService = new google.maps.DirectionsService();

    const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map
    });

    async function whenPlaceChanged(autocomplete) {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
            window.alert('No address available for input: \'' + place.name + '\'');
            return;
        }

        directionsRenderer.setDirections({ routes: [] });

        const originPlace = autocomplete === autocomplete ? place : autocomplete.getPlace();
        const destinationPlace = autocomplete === autocomplete2 ? place : autocomplete2.getPlace();

        directionsService.route({
            origin: originPlace.geometry.location,
            destination: destinationPlace.geometry.location,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
                const route = response.routes[0];
                const distance = route.legs[0].distance.text;
                const time = route.legs[0].duration.text;
                var Disdiv = document.createElement("div");
                Disdiv.innerHTML= distance;
                // Append the list item to the list container
                document.getElementById("distance").appendChild(Disdiv);
                var Timediv = document.createElement("div");
                Timediv.innerHTML=time;
                document.getElementById("EstTime").appendChild(Timediv);

                console.log(distance);
                console.log(time);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    autocomplete.addListener('place_changed', () => whenPlaceChanged(autocomplete));
    autocomplete2.addListener('place_changed', () => whenPlaceChanged(autocomplete2));
}

window.initMap = initMap;
