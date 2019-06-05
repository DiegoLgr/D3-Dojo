import {Specimen} from './specimen.js';

export var TARGET = "Learning D3   ";
export var INITIL_STATE = "Aprendiendo D3"
var BODY = Array.from(TARGET);

///////////////////////////
///// Public Functions/////
///////////////////////////

export var Population = {
  new_population: new_population,
  iterate: iterate,
}

function new_population(mutationRate, pairingRate) {
    var population = {
      mutationRate: mutationRate,
      pairingRate: pairingRate,
      generation: 0,
      specimens: null,
    };
    population.specimens = new Array();
    var specimen;
    for(var i=0; i<100; i++){
      specimen = Specimen.newSpecimen(INITIL_STATE, TARGET)
      population.specimens.push(specimen);
    }
    return population;
}

function iterate(population){
  population.generation ++;

  var winners = [];
  for(var i=0; i<population.specimens.length; i++){
    winners.push(selectSpecimens(population));
  }

  population.specimens = pairWinners(winners, population.mutationRate, population.pairingRate);
  population.best = getBest(population);
}



////////////////////////////
///// Private Functions/////
////////////////////////////
/*
    selectSpecimens,
    pairWinners,
    getBest.
  */

function selectSpecimens(population){
  var fitnesees = [0];

  population.specimens.forEach(
    (specimen) => {
      var temp = fitnesees.pop();
      fitnesees.push(temp);
      fitnesees.push(specimen.fitness + temp);
    }
  );

    var n = Math.random() * fitnesees[fitnesees.length - 1];
    var i = 1;
    while (fitnesees[i] < n){
          i++;
    }

    return population.specimens[i-1];
}

function pairWinners(winners, mutationRate, pairingRate){
  var newSpecimens = new Array();
  var middle = winners.length/2;
  for(var i=0; i< middle; i++){
    if (Math.random() < pairingRate){
      var childs = Specimen.pair(winners[i], winners[middle + i], mutationRate, BODY, TARGET);
    }else{
      childs = [winners[i], winners[i+1]];
    }
    newSpecimens = newSpecimens.concat(childs);
  }
  return newSpecimens;
}

function getBest(population){
  var bestSpecimen = null;
  var bestFitness = 0;
  population.specimens.forEach((specimen)=>{
        if(specimen.fitness > bestFitness){
          bestSpecimen = specimen;
          bestFitness = specimen.fitness;
        }
    });
  return bestSpecimen;
}
