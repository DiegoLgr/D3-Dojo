require('./index.css');


import * as d3 from 'd3';
import {Population, newSpecimen} from "./genetic.js";


var population = Population.new_population(0.2, 1);
var generation = 0;
var best = "AprendiendoD3";
var bestFitness = 0;

var result = d3.select(".result")

result.selectAll("h2")
    .data([best])
    .enter()
    .append("h2")
      .text((d)=>{return d});

result.selectAll("p")
    .data([generation])
    .enter()
    .append("p")
      .text((d)=>{return d});

while (bestFitness < 11 && generation < 100000){
  Population.iterate(population);

  population.specimens.forEach(
    (e)=>{
        if(e.fitness > bestFitness){
          best = e.dna;
          bestFitness = e.fitness;
        }
    }
  );
  generation++;
  updateDom(generation, best);
}

function updateDom(generation, best){
  var result = d3.select(".result")

  result.selectAll("h2")
      .data([best])
        .text((d)=>{return d});
  result.selectAll("p")
      .data([generation])
        .text((d)=>{return d});
}
