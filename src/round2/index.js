require('./index.css');


import * as d3 from 'd3';

var data = [4, 8, 15, 16, 23]

var initial = d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });

var newData = [12, 4];
data = data.concat(newData);

var newer = d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", "0px")
    .style("background", "green")
    .text(function(d) { return d; });

newer.transition()
  .style("width", function(d) {return d * 10 + "px"});
