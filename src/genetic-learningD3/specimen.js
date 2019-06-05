export var Specimen = {
    newSpecimen: newSpecimen,
    pair: pair,
    calcFitnes: calcFitnes,
    newDna: newDna,
}


function newSpecimen (dna, target, body){
  return {
    dna: dna,
    fitness: calcFitnes(dna, target),
    mutation_body: body,
  };
}

function pair(specimen1, specimen2, mutationRate, body, target){
  var dna1FirstHalf = getDNAtillI(specimen1, specimen1.dna.length / 2);
  var dna1SecondHalf = getDNAfromI(specimen1, specimen1.dna.length / 2);
  var dna2FirstHalf = getDNAtillI(specimen2, specimen1.dna.length / 2);
  var dna2SecondHalf = getDNAfromI(specimen2, specimen1.dna.length / 2);

  var child1 = newChild(dna1FirstHalf.concat(dna2SecondHalf), mutationRate, body, target)
  var child2 = newChild(dna2FirstHalf.concat(dna1SecondHalf), mutationRate, body, target)


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
function newChild(dna, mutationRate, body, target){
  dna = mutate(dna, mutationRate, body);
  return newSpecimen(dna, target);
}

function mutate(dna, mutationRate, body){
  dna = Array.from(dna);
  var j;
  for (var i=0; i<dna.length; i++){
      if(Math.random() < mutationRate){
        j = Math.floor(Math.random()*(body.length));
        dna[i] = body[j];
      }
  }
  dna = dna.join("");
  if(dna.length<11){console.log("error: bad generated child");}
  return dna;
}
