const fs = require("fs");
const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

const verifierRegex = /contract Verifier/

let content = fs.readFileSync("./contracts/HelloWorldVerifier.sol", { encoding: 'utf-8' });
let bumped = content.replace(solidityRegex, 'pragma solidity ^0.6.11');
bumped = bumped.replace(verifierRegex, 'contract HelloWorldVerifier');

fs.writeFileSync("./contracts/HelloWorldVerifier.sol", bumped);

// [assignment] add your own scripts below to modify the other verifier contracts you will build during the assignment

let multiplier3content = fs.readFileSync("./contracts/Multiplier3Verifier.sol", { encoding: 'utf-8' });
let bumpedmultiplier3 = multiplier3content.replace(solidityRegex, 'pragma solidity ^0.6.11');
bumpedmultiplier3 = bumpedmultiplier3.replace(verifierRegex, 'contract Multiplier3Verifier');

fs.writeFileSync("./contracts/Multiplier3Verifier.sol", bumpedmultiplier3);


// plonkmultiplier verifier


let plonkmultiplier3content = fs.readFileSync("./contracts/_plonkMultiplier3Verifier.sol", { encoding: 'utf-8' });
let plonkbumpedmultiplier3 = plonkmultiplier3content.replace(solidityRegex, 'pragma solidity ^0.6.11');
plonkbumpedmultiplier3 = plonkbumpedmultiplier3.replace(verifierRegex, 'contract plonkMultiplier3Verifier');

fs.writeFileSync("./contracts/_plonkMultiplier3Verifier.sol", plonkbumpedmultiplier3);

