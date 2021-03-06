export var Specimen = {
    newSpecimen: newSpecimen,
    pair: pair,
    calcFitnes: calcFitnes,
}


function newSpecimen (dna, enviroment){
  return {
    dna: dna,
    enviroment: enviroment,
    fitness: calcFitnes(dna, enviroment.target),
  };
}

function pair(specimen1, specimen2){
  var enviroment = specimen1.enviroment;


  if(Math.random() > enviroment.pairingRate)
    return [specimen1, specimen2]

  var dna1FirstHalf = getDNAtillI(specimen1, specimen1.dna.length / 2);
  var dna1SecondHalf = getDNAfromI(specimen1, specimen1.dna.length / 2);
  var dna2FirstHalf = getDNAtillI(specimen2, specimen1.dna.length / 2);
  var dna2SecondHalf = getDNAfromI(specimen2, specimen1.dna.length / 2);

  var child1 = newChild(dna1FirstHalf.concat(dna2SecondHalf), enviroment, enviroment)
  var child2 = newChild(dna2FirstHalf.concat(dna1SecondHalf), enviroment, enviroment)

  return [child1,child2];
}

function calcFitnes(dna, target){
  var fitness = 0;

  for(var i=0; i<dna.length; i++){
     if(dna[i] == target[i]){
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
function newChild(dna, enviroment){
  dna = mutate(dna, enviroment.mutationRate, enviroment.mutationBody);
  return newSpecimen(dna, enviroment);
}

function mutate(dna, mutationRate, mutationBody){
  dna = Array.from(dna);
  var j;
  for (var i=0; i<dna.length; i++){
      if(Math.random() < mutationRate){
        j = Math.floor(Math.random()*(mutationBody.length));
        dna[i] = mutationBody[j];
      }
  }
  dna = dna.join("");
  if(dna.length<11){console.log("error: bad generated child");}
  return dna;
}
