

var TARGET = "Learning D3";


///////////////////////////
///// Public Functions/////
///////////////////////////

function new_population(mutationRate, pairingRate) {
    var population = {
      mutationRate: mutationRate,
      pairingRate: pairingRate,
      generation: 0,
      specimens: null,
    };
    return population;
}

function setPopulation(population, specimens){
  population.specimens = specimens;
}

function iterate(population){
  population.generation ++;

  var winners = [];
  for(var i=0; i<population.specimens.length/2; i++){
    winners.push(selectSpecimens(population));
  }

  population.specimens = pairWinners(winners);
  population.specimens = population.specimens.concat(winners);
}


export var Population = {
  setPopulation: setPopulation,
  new_population: new_population,
  iterate: iterate,
}

////////////////////////////
///// Private Functions/////
////////////////////////////

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

function pairWinners(winners){
  var newSpecimens = new Array();

  var middle = winners.length/2;
  for(var i=0; i< middle; i++){
    var childs = pair(winners[i], winners[middle + i]);
    newSpecimens = newSpecimens.concat(childs);
  }
  return newSpecimens;
}



/*
##################################################
################### Especimens ###################
##################################################
*/
export var newSpecimen = function (dna){
  return {dna: dna, fitness: calcFitnes(dna)};
}

function pair(specimen1, specimen2){
  var dna1FirstHalf = getDNAtillI(specimen1, TARGET.length / 2);
  var dna1SecondHalf = getDNAfromI(specimen1, TARGET.length / 2);
  var dna2FirstHalf = getDNAtillI(specimen2, TARGET.length / 2);
  var dna2SecondHalf = getDNAfromI(specimen2, TARGET.length / 2);
  var child1 = newSpecimen(dna1FirstHalf.concat(dna2SecondHalf))
  var child2 = newSpecimen(dna2FirstHalf.concat(dna1SecondHalf))
  return [child1,child2];
}

function calcFitnes(dna){
  var fitness = 0;

  for(var i=0; i<dna.length; i++){
     if(dna[i] == TARGET[i]){
       fitness ++;
     }
  }

  return fitness;
}

function getDNAfromI(specimen, i){
    return specimen.dna.slice(i);
}

function getDNAtillI(specimen, i){
    return specimen.dna.slice(0, i);
}
