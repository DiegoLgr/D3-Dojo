require('./index.css');


import * as d3 from 'd3';

var data = [4, 8, 15, 16, 23, 42]

// Part one: first chart.
d3.select(".chart1")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });


// Part 2: Adding nodes.
d3.select(".chart2")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });

var data = [4, 8, 15, 16, 23, 42]
var newData = [12, 4];
data = data.concat(newData);


var selection = d3.select(".chart2")
  .selectAll("div")
    .data(data)
    .style("background", "orange")

selection
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });


// Part 3: Deleting nodes.

data = [4, 8, 15, 16, 23, 42]
d3.select(".chart3")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });

data.pop();
data.pop();

var selection = d3.select(".chart3")
  .selectAll("div")
    .data(data)
    .style("background", "orange")

selection
  .exit()
    .style("background", "red")
