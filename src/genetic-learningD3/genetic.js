export var TARGET = "Learning D3   ";
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
      specimen = newSpecimen("Aprendiendo D3")
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
      var childs = pair(winners[i], winners[middle + i], mutationRate);
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


/*
##################################################
################### Especimens ###################
##################################################
*/
export var newSpecimen = function (dna){
  return {dna: dna, fitness: calcFitnes(dna)};
}

function pair(specimen1, specimen2, mutationRate){
  var dna1FirstHalf = getDNAtillI(specimen1, TARGET.length / 2);
  var dna1SecondHalf = getDNAfromI(specimen1, TARGET.length / 2);
  var dna2FirstHalf = getDNAtillI(specimen2, TARGET.length / 2);
  var dna2SecondHalf = getDNAfromI(specimen2, TARGET.length / 2);

  var child1 = newChild(dna1FirstHalf.concat(dna2SecondHalf), mutationRate)
  var child2 = newChild(dna2FirstHalf.concat(dna1SecondHalf), mutationRate)


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

function newDna(body){
  var dna = new Array();
  var j;
    for(var i=0; i<TARGET.length; i++){
      j = Math.floor(Math.random()*(body.length));
      dna.push(body[j]);
    }
  dna = dna.join("");
  if(dna.length<11){console.log("error: bad generated dna");}
    return dna;
}
function newChild(dna, mutationRate){
  dna = mutate(dna, mutationRate);
  return newSpecimen(dna);
}

function mutate(dna, mutationRate){
  dna = Array.from(dna);
  var j;
  for (var i=0; i<dna.length; i++){
      if(Math.random() < mutationRate){
        j = Math.floor(Math.random()*(BODY.length));
        dna[i] = BODY[j];
      }
  }
  dna = dna.join("");
  if(dna.length<11){console.log("error: bad generated child");}
  return dna;
}
