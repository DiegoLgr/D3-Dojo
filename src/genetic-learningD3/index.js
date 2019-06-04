require('./index.css');


import * as d3 from 'd3';
import {Population, newSpecimen, TARGET} from "./genetic.js";

var mutationRate = 0.1 // mutation rate should be less then 0.5 and greater than 0.
var pairingRate = 0.3 // pair rate should can be whatever you want except 0.
var population = Population.new_population(mutationRate, pairingRate);

var generation = 0;
var best = "AprendiendoD3";
var bestFitness = 0;

function setUp(){
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
}

function loop(){
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
  updateDom(generation, best)
  if(bestFitness < TARGET.length && generation < 5000){
    setTimeout(loop, 10);
  }
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

// ->-> -> -> -> -> -> -> ->
// -> -> ->   MAIN  -> -> ->
// ->-> -> -> -> -> -> -> ->
setUp();
setTimeout(loop, 300);
