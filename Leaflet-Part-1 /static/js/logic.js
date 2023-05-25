// build map 
var map = L.map("map", {
    center: 
    [40, -95],
    zoom: 3});

// add the tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// link geojson data 
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson"

// Data
d3.json(url).then(function(data) {
    for (var i = 0; i < data.features.length; i++) {
        console.log(i);
        let longitude = data.features[i].geometry.coordinates[0];
        let latitude = data.features[i].geometry.coordinates[1];
        let depth = data.features[i].geometry.coordinates[2];
        let magnitude = data.features[i].properties.mag;

        var dataMarker = L.circleMarker([latitude, longitude],{
            radius: magnitude**2,
            color: "black",
            fillColor: colorMap(depth),
            fillOpacity: 1,
        });
        dataMarker.addTo(myMap);
        dataMarker.bindPopup((`<h1>${magnitude} earthquake, ${depth} miles deep. </h1> <hr> <h3>At ${place}</h3>`));
    }

    //Adding a legend
    var legend = L.control({
        position: 'bottomright'});

legend.onAdd = function(map){
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += "<h4>Depth Range</h4>";
    var ranges = ['<10', '10-30', '30-50', '50-70', '70-90', '90+'];
    var color = ['red','orange','yellow', 'green','blue','purple'];
    for (var i = 0; i < ranges.length; i++) {
        div.innerHTML += '<i style="background:' + color[i] + '"></i><span>' + ranges[i] + '</span><br>';
    }

return div;

};

legend.addTo(myMap);

});