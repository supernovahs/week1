const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { groth16 } = require("snarkjs");

describe("Less than 10", function () {

    let Verifier;
    let verifier;
    beforeEach(async function () {
        Verifier = await ethers.getContractFactory("LessThan");
        verifier = await Verifier.deploy();
        await verifier.deployed();
    });

    it("testing ", async function () {
        const a = await verifier.test("10");
        console.log(a);
    })




})