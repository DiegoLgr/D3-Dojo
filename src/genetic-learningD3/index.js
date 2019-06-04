require('./index.css');


import {Population, TARGET} from "./genetic.js";
import {Drawer} from './draw.js';


var mutationRate = 0.1 // mutation rate should be less then 0.5 and greater than 0.
var pairingRate = 0.3 // pair rate should can be whatever you want except 0.
var population = Population.new_population(mutationRate, pairingRate);

function loop(){
  Population.iterate(population);
  Drawer.updateDom(population);

  if(population.best.fitness < TARGET.length && population.generation < 5000){
    setTimeout(loop, 10);
  }
}

Drawer.setUp();
setTimeout(loop, 1500);
