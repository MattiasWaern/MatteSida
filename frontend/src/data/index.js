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
    ...geometriCirkel
]


export default questions;