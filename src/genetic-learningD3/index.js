require('./index.css');

import {Population, newSpecimen} from "./genetic.js";


var population = Population.new_population(1, 1);
var specimens = [
                  newSpecimen("le*rning D3"), newSpecimen("L*arni** D3"),
                  newSpecimen("le*rni*g D3"), newSpecimen("Learni** D*"),
                  newSpecimen("Le*rni*g*D3"), newSpecimen("**a*ni*g* D"),
                  newSpecimen("learning D3"), newSpecimen("Learni** D3"),
                  newSpecimen("Le*rni*g*D3"), newSpecimen("**a*ni*g* D"),
                  newSpecimen("learning D3"), newSpecimen("Learni** D3"),

                ];
Population.setPopulation(population, specimens);

var generation = 0;
var best = "";
var bestFitness = 0;
while (bestFitness < 11 && generation < 20){
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
}
  console.log(best);
  console.log(generation);
