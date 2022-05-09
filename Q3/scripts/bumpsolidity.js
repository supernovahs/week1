const fs = require("fs");

const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

const verifierRegex = /contract Verifier/

let content = fs.readFileSync("./contracts/LessThan10.sol", { encoding: 'utf-8' });
let bumped = content.replace(solidityRegex, 'pragma solidity ^0.6.11');
bumped = bumped.replace(verifierRegex, 'contract LessThan');

fs.writeFileSync("./contracts/Lessthan10.sol", bumped);