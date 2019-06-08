require('./index.css');

import {Population} from "./population.js";
import {Drawer} from './draw.js';
import {Specimen} from './specimen.js';


function main(){
  Drawer.setUp();

  var loop = setUp();
  setTimeout(loop, 1200);
}


function setUp(){
  var enviroment = {
    target: "Learning D3   ",
    pairingRate: 0.7,
    mutationRate: 0.01,
    mutationBody: "Learning D3   ".split(""),
  }
  var population = Population.new_population();
  var initialValue = "Aprendiendo D3";
  for(var i=0; i<100; i++){
      var specimen = Specimen.newSpecimen(initialValue, enviroment)
      population.specimens.push(specimen);
  }

  function loop(){ // It may not be the best idea... the point is have population as clojure.
    Population.iterate(population);
    Drawer.updateDom(population);
    if(population.best.fitness < enviroment.target.length && population.generation < 5000)
      setTimeout(loop, 70);
  }
  return loop;
}

main();
