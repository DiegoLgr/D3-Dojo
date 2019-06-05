require('./index.css');


import {Population} from "./genetic.js";
import {Drawer} from './draw.js';

// Configuration constants.
var TARGET = "Learning D3";
var MUTATION_BODY = TARGET.split("");
var INITIAL_VALUE = "Aprendiendo D3";
var MUTATION_RATE = 0.05; // mutation rate should be less then 0.5 and greater than 0.
var PAIR_RATE = 0.7; // pair rate should can be whatever you want except 0.

var population = Population.new_population(
                                           INITIAL_VALUE,
                                           TARGET,
                                           PAIR_RATE,
                                           MUTATION_RATE,
                                           MUTATION_BODY,
                                         );

function loop(){
  Population.iterate(population);
  Drawer.updateDom(population);
  if(population.best.fitness < TARGET.length && population.generation < 5000){
    setTimeout(loop, 70);
  }
}

Drawer.setUp();
setTimeout(loop, 1500);
