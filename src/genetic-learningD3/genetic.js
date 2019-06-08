function Enviroment(pairingRate, mutationRatem, mutationBody) = {
  this.pairingRate: pairingRate,
  this.mutationRate: mutationRate,
  this.mutationBody: mutationBody,
}

var TARGET = "Learning D3   ";
var MUTATION_BODY = TARGET.split("");
var INITIAL_VALUE = "Aprendiendo D3";
var MUTATION_RATE = 0.01; // mutation rate should be less then 0.5 and greater than 0.
var PAIR_RATE = 0.7; // pair rate should can be whatever you want except 0.

var enviromentConditions = new Enviroment(
                                           TARGET,
                                           PAIR_RATE,
                                           MUTATION_RATE,
                                           MUTATION_BODY,
                                         );

var population = Population.new_population(enviroment);
population.specimens = new Array();
var specimen;
for(var i=0; i<100; i++){
  specimen = Specimen.newSpecimen(initialValue, enviroment)
  population.specimens.push(specimen);
}
