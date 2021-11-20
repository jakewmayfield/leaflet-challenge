
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"; 

  console.log(queryUrl);

d3.json(queryUrl).then(function(data) {
  createFeatures(data.features);
});


function createFeatures(earthquakeData) {
    function styleInfo(feature){
        return {
                radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: "#000",
                opacity: 1,
                weight: 1,
                fillOpacity: 0.8
            };
    }

    function getRadius(magnitude){
        return magnitude * 3;
    }
    function getColor(d){
        return d > 90 ? '#FFEDA0'  :
        d > 70  ?  '#FD8D3C' :
        d > 50  ?  '#FC4E2A' :
        d > 30  ? '#E31A1C' :
        d > 10   ?  '#BD0026':
        '#FFEDA0' ;
    }
    

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    style: styleInfo, 
    pointToLayer: function(feature,latlng)
    {
        return L.circleMarker(latlng);
    }
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {

 // Define outdoors and lightmap layers
 var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "outdoors-v11",
  accessToken: API
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API
});

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Outdoor Map": outdoorsmap,
    "Light Map": lightmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

 
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [outdoorsmap, earthquakes]
  });


  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(myMap);

  var legend = L.control({position: 'topright'});

    legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [ 0, 10, 30, 50, 70, 90],
        colors = ['#FFEDA0', '#FD8D3C','#FC4E2A', '#E31A1C','#BD0026','#800026' ];

    
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(myMap);
}