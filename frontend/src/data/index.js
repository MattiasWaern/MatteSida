import quadraticGraph from './quadraticGraph.json';
import rootsSymmetry from './rootsSymmetry.json';
import wordProblems from './wordProblems.json';
import rationalPowers from './rationalPowers.json';
import exponentialFunctions from './exponentialFunctions.json';
import logarithms from './logarithms.json';
import linearExponential from './linearExponential.json';
import statistik from './statistic.json';      
import andragrad from './andragrad.json';
import linjara from './linjara.json';
import linjaraFunktioner from './linjaraFunktioner.json';
import parallellaLinjer from './parallellaLinjer.json';
import ekvationssystem from './ekvationsSystem.json';
import geometriPythagoras from './geometriPythagoras.json';
import geometriArea from './geometriArea.json';
import geometriVolym from './geometriVolym.json';
import geometriCirkel from './geometriCirkel.json';

const questions = [
    ...statistik,
    ...andragrad,
    ...linjara,
    ...linjaraFunktioner,
    ...parallellaLinjer,
    ...ekvationssystem,
    ...geometriPythagoras,
    ...geometriArea,
    ...geometriVolym,
    ...geometriCirkel,
    ...quadraticGraph,
    ...rootsSymmetry,
    ...wordProblems,
    ...rationalPowers,
    ...exponentialFunctions,
    ...logarithms,
    ...linearExponential
]


export default questions;