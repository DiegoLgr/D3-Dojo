require('./index.css');

import {Population, specimen} from "./genetic.js";


var population = Population.new_population(1, 1);
var specimens = [specimen("juan", 0.6), specimen("Pedro", 0.4),specimen("Laura", 0.8), specimen("Vanesa", 0.2)];
Population.setPopulation(population, specimens);
Population.iterate(population);
