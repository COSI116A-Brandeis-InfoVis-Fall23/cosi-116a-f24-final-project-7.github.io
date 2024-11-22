var svgStates = d3.select("svg #states"),
    svgBoundary = d3.select("svg #boundary"),
    states = {},
    startYear = 1910,
    currentYear = startYear;

var width = window.innerWidth, // (1)
  height = window.innerHeight;
var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2]);  // (2)

var path = d3.geoPath()
    .projection(projection);  // (3)

d3.json("data/usa.json", function(error, boundary) {
 svgBoundary.selectAll("path")
     .data(boundary.features)
     .enter()
   .append("path")
     .attr("d", path)
});

d3.json("data/states.json", function(error, topologies) {  // (4)
  console.log(topologies);
  var state = topojson.feature(topologies[12], topologies[12].objects.stdin);  // (5)

  svgStates.selectAll("path")  
      .data(state.features)
      .enter()
    .append("path")
      .attr("d", path)
    .style("fill", function(d, i) { 
      // console.log("d is ", d)
      var name = d.properties.STATENAM.replace(" Territory", "");
      return colors[name]; 
    }).append("svg:title")
    .text(function(d) { return d.properties.STATENAM; });
});