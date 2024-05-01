var map;
var routeParams;
var routeLayer;
var journeyData = {
  StartLocation: "NullA",
  EndLocation: "NullB",
  Kilomet: 0,
  Time: 0,
  TransportationType: "car",
};
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/rest/locator",
  "esri/core/reactiveUtils",
  "esri/widgets/Search",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/rest/route",
  "esri/rest/support/RouteParameters",
  "esri/rest/support/FeatureSet",
  "esri/rest/networkService",
], (
  esriConfig,
  Map,
  MapView,
  locator,
  reactiveUtils,
  Search,
  Graphic,
  GraphicsLayer,
  route,
  RouteParameters,
  FeatureSet,
  networkService
) => {
  esriConfig.apiKey =
    "AAPK062e7a74a2014006a64fa63cb03059eaR1dlWYZg2svCwpD6QR8TTpGnxbaSfEtpp-UMmus4jB31-Sf_snHx8I6UY_vsuvPt";

  // Point the URL to a valid routing service
  const routeUrl =
    "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
  const apiKey =
    "AAPK062e7a74a2014006a64fa63cb03059eaR1dlWYZg2svCwpD6QR8TTpGnxbaSfEtpp-UMmus4jB31-Sf_snHx8I6UY_vsuvPt";
  // The stops and route result will be stored in this layer
  routeLayer = new GraphicsLayer();

  // Setup the route parameters
  routeParams = new RouteParameters({
    // An authorization string used to access the routing service
    apiKey: apiKey,
    stops: new FeatureSet(),
    outSpatialReference: {
      // autocasts as new SpatialReference()
      wkid: 3857,
    },
  });

  // Define the symbology used to display the stops
  const stopSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    style: "cross",
    size: 15,
    outline: {
      // autocasts as new SimpleLineSymbol()
      width: 4,
    },
  };

  // Define the symbology used to display the route
  const routeSymbol = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [0, 0, 255, 0.5],
    width: 5,
  };

  map = new Map({
    basemap: "topo-vector",
    layers: [routeLayer],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [106.65791, 10.77221],
    zoom: 16,
  });

  searchBoxStart = new Search({
    view: view,
    includeDefaultSources: false,
    maxResults: 5,
    maxSuggestions: 8,
    locationEnabled: false,
    sources: [
      {
        url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",
        countryCode: "VNM",
        placeholder: "Start point",
        singleLineFieldName: "SingleLine",
        apiKey: apiKey,
        name: "Custom Geocoding Service",
        localSearchOptions: {
          minScale: 300000,
          distance: 50000,
        },
      },
    ],
  });

  searchBoxEnd = new Search({
    view: view,
    includeDefaultSources: false,
    maxResults: 5,
    maxSuggestions: 8,
    locationEnabled: false,
    sources: [
      {
        url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",
        countryCode: "VNM",
        placeholder: "End point",
        singleLineFieldName: "SingleLine",
        apiKey: apiKey,
        name: "Custom Geocoding Service",
        localSearchOptions: {
          minScale: 300000,
          distance: 50000,
        },
      },
    ],
  });

  searchBoxStart.on("search-complete", (event) => onSearchComplete(event, 1));

  searchBoxEnd.on("search-complete", (event) =>
    onSearchComplete(event, "showSearchEnd")
  );

  function onSearchComplete(event, id) {
    if (id == 1) {
      journeyData.StartLocation = event.searchTerm;
      document.getElementById("showSearchStart").innerHTML = event.searchTerm;
    } else {
      journeyData.EndLocation = event.searchTerm;
      document.getElementById("showSearchEnd").innerHTML = event.searchTerm;
    }
    console.log(event);
    addStop(event.results[0].results[0].feature.geometry);
  }

  view.ui.add(searchBoxStart, "top-right");
  view.ui.add(searchBoxEnd, "top-right");

  function addStop(geo) {
    // Add a point at the location of the map click
    const stop = new Graphic({
      geometry: geo,
      symbol: stopSymbol,
    });
    routeLayer.add(stop);

    // Execute the route if 2 or more stops are input
    routeParams.stops.features.push(stop);
    if (routeParams.stops.features.length >= 2) {
      route.solve(routeUrl, routeParams).then(showRoute);
    }
  }
  // Adds the solved route to the map as a graphic
  function showRoute(data) {
    const routeResult = data.routeResults[0].route;
    routeResult.symbol = routeSymbol;
    routeLayer.add(routeResult);
    const TravelTime = routeResult.attributes.Total_TravelTime.toFixed(4);
    const TravelDist = routeResult.attributes.Total_Kilometers.toFixed(4);
    document.getElementById("showTravelTime").innerHTML = TravelTime; //in minutes
    document.getElementById("showTravelLength").innerHTML = TravelDist;
    journeyData.Time = TravelTime;
    journeyData.Kilomet = TravelDist;
  }
});

function clearAll(event) {
  // event.preventDefault();
  // console.log("Clearing map");
  // routeParams.stops.features = [];
  // routeLayer.removeAll();
  // var iframe = document.getElementById("myFrame");
  // Reload the iframe content
  // iframe.contentWindow.location.reload();
  window.parent.location.reload();
}

async function send(event) {
  event.preventDefault();
  let types = document.getElementsByName("type");
  let selectedType;
  for (let i = 0; i < types.length; i++) {
    if (types[i].checked) {
      selectedType = types[i].value;
      break;
    }
  }
  journeyData.TransportationType = selectedType;
  console.log(journeyData);
  await fetch("admin/addJourney", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(journeyData),
  }).then((response) => console.log(response.json()));
  let information = "Added successfully!";

  information = JSON.stringify(information);
  window.parent.location.href = `/adminjourney?info=${information}`;
}
