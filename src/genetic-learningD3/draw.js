import * as d3 from 'd3';

var TARGET = "Learning D3"

function setUp(){
  // Draws the initial html.
  var result = d3.select(".result")

  result.selectAll("h2")
      .data(["Aprendiendo D3"])
      .enter()
      .append("h2")
        .text((d)=>{return d});

  result.selectAll("p")
      .data([0])
      .enter()
      .append("p")
        .text((d)=>{return "Generation: " + d});
}


function updateDom(population){
  var result = d3.select(".result")

  result.selectAll("h2")
      .data([population.best.dna])
        .text((d)=>{return d});

  result.selectAll("p")
      .data([population.generation])
        .text((d)=>{return "Generation: " + d});
}

export var Drawer = {
  setUp: setUp,
  updateDom: updateDom,
}
