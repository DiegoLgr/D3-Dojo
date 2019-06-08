import {Specimen} from './specimen.js';


///////////////////////////
///// Public Functions/////
///////////////////////////

export var Population = {
  new_population: new_population,
  iterate: iterate,
}

function new_population() {
    var population = {
      generation: 0,
      specimens: new Array(),
    };
    return population;
}

function iterate(population){
  population.generation ++;

  var winners = [];
  for(var i=0; i<population.specimens.length; i++){
    winners.push(selectSpecimen(population.specimens));
  }

  population.specimens = pairWinners(winners)
  population.best = getBest(population.specimens);
}



////////////////////////////
///// Private Functions/////
////////////////////////////
/*
    selectSpecimens,
    pairWinners,
    getBest.
  */

function selectSpecimen(specimens){
  var fitnesees = [0];

  specimens.forEach(
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

    return specimens[i-1];
}

function pairWinners(winners){
  var newSpecimens = new Array();
  var middle = winners.length/2;
  for(var i=0; i< middle; i++){
    var childs = Specimen.pair(winners[i], winners[middle + i]);
    newSpecimens = newSpecimens.concat(childs);
    }
  return newSpecimens;
}

function getBest(specimens){
  var bestSpecimen = null;
  var bestFitness = 0;
  specimens.forEach((specimen)=>{
        if(specimen.fitness > bestFitness){
          bestSpecimen = specimen;
          bestFitness = specimen.fitness;
        }
    });
  return bestSpecimen;
}
