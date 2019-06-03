
function setPopulation(population, specimens){
  population.specimens = specimens;
}

function new_population(mutationRate, pairingRate) {
    var population = {
      mutationRate: mutationRate,
      pairingRate: pairingRate,
      generation: 0,
      specimens: null,
    };
    return population;
}

function iterate(population){
  population.generation ++;
  var winners = [];
  for(var i=0; i<population.specimens.length/2; i++){
    winners.push(selectSpecimens(population));
  }
  winners.forEach((w) => console.log(w.name));
  population.specimens = pairWinners(winners);
}


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

function pairWinners(){
  console.log("pair winners not implemented");
  return null;
}
export var Population = {
  setPopulation: setPopulation,
  new_population: new_population,
  iterate: iterate,
}


// Especimens
export var specimen = function (name, fitness){
  return {name: name, fitness: fitness};
}
