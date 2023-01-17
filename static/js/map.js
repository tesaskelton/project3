// Setting the main coordinates (US coordinates) for our map
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4
  });

   
  // Adding attribution (the tile layer) to Openstreet map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


// // The function that will determine the color of a popup based on the depth of the earthquake
// function chooseColor(work_environment) {
//     if (work_environment = 'onsite') return 'green';
//     else if (work_environment = 'remote') return 'yellow';    
//     else return 'red';
    
//   }
  
 
// Use this link to get the GeoJSON data
var link = '../data/sample.json'

// Getting our GeoJSON data
d3.json(link).then(function(data) {
  console.log(data)
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return new L.Marker(latlng, {                 
                color: 'black',
                fillColor: chooseColor(feature.geometry.work_environment),
                fillOpacity: 0.5,
                weight: 0.1    
            });
        },

        // Binding a popup to each layer
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3> Title:" + feature.properties.title+ "</h3><br /><br />Company: " +
            feature.properties.company + "<br /><br />Location:" + feature.geometry.location);
      }

    }).addTo(myMap);

    // // Creating legend for the map
    // var legend = L.control({position: 'bottomright',});

    // legend.onAdd = function (map) {

    //     var div = L.DomUtil.create('div', 'info legend'),
    //         work_environment = [onsite, remote, hybrid];

    //     // loop through the work_environment range and generate a label with a colored square for each range
    //     for (var i = 0; i < work_environment.length; i++) {
    //         div.innerHTML +=
    //             '<i style="background:' + chooseColor(work_environment[i] + 1) + '"></i> ' +
    //             work_environment[i] + (work_environment[i + 1] ? '&ndash;' + work_environment[i + 1] + '<br>' : '+');
    //     }

    //     return div;  
    // };
    // legend.addTo(myMap);   
  });

