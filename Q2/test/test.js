const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { groth16, plonk } = require("snarkjs");

function unstringifyBigInts(o) {
    if ((typeof (o) == "string") && (/^[0-9]+$/.test(o))) {
        return BigInt(o);
    } else if ((typeof (o) == "string") && (/^0x[0-9a-fA-F]+$/.test(o))) {
        return BigInt(o);
    } else if (Array.isArray(o)) {
        return o.map(unstringifyBigInts);
    } else if (typeof o == "object") {
        if (o === null) return null;
        const res = {};
        const keys = Object.keys(o);
        keys.forEach((k) => {
            res[k] = unstringifyBigInts(o[k]);
        });
        return res;
    } else {
        return o;
    }
}

describe("HelloWorld", function () {
    let Verifier;
    let verifier;

    beforeEach(async function () {
        Verifier = await ethers.getContractFactory("HelloWorldVerifier");
        verifier = await Verifier.deploy();
        await verifier.deployed();
    });

    it("Should return true for correct proof", async function () {
        //[assignment] Add comments to explain what each line is doing


        // Creating 2 opjects of type "Groth16"
        const { proof, publicSignals } = await groth16.fullProve({ "a": "1", "b": "2" }, "contracts/circuits/HelloWorld/HelloWorld_js/HelloWorld.wasm", "contracts/circuits/HelloWorld/circuit_final.zkey");

        // Console logging the multiplication of a & b to check if it is equal to publicSignals object at index 0 
        console.log('1x2 =', publicSignals[0]);



        // if input is number , return bigInt of the input
        // if input is array, return the array without any change
        // if input is object && object value is number, reutrn bigint of value
        // And if input is object and value of any field is not number, return the value without any change for that particular key

        const editedPublicSignals = unstringifyBigInts(publicSignals);


        // Converting Proof object values to BigInt

        const editedProof = unstringifyBigInts(proof);



        // using exportSolidityCalldata method to generate calldata for verification in contract. 

        const calldata = await groth16.exportSolidityCallData(editedProof, editedPublicSignals);



        // Splitting the calldata in bytes32 and converting each of them to string
        const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());


        // splitting the calldata array into 3 parts a, b,c 
        const a = [argv[0], argv[1]];

        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];

        const c = [argv[6], argv[7]];

        const Input = argv.slice(8);


        // Testing whether the calldata is correct or not . We are calling the verifyProof function of the HelloWorldVerifier contract.
        expect(await verifier.verifyProof(a, b, c, Input)).to.be.true;
    });
    it("Should return false for invalid proof", async function () {
        let a = [0, 0];
        let b = [[0, 0], [0, 0]];
        let c = [0, 0];
        let d = [0]
        expect(await verifier.verifyProof(a, b, c, d)).to.be.false;
    });
});


describe("Multiplier3 with Groth16", function () {
    let Verifier;
    beforeEach(async function () {
        //[assignment] insert your script here
        Verifier = await ethers.getContractFactory("Multiplier3Verifier");
        verifier = await Verifier.deploy();
        await verifier.deployed();

    });

    it("Should return true for correct proof", async function () {
        //[assignment] insert your script here

        const { proof, publicSignals } = await groth16.fullProve({ "a": 1, "b": 2, "c": 3 }, "contracts/circuits/Multiplier3/Multiplier3_js/Multiplier3.wasm", "contracts/circuits/Multiplier3/circuit_final.zkey");
        console.log("1 *2*3=", publicSignals[0]);

        const editedPublicSignals = unstringifyBigInts(publicSignals);

        const editedProof = unstringifyBigInts(proof);

        const calldata = await groth16.exportSolidityCallData(editedProof, editedPublicSignals);

        const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());

        const a = [argv[0], argv[1]];

        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];

        const c = [argv[6], argv[7]];

        const Input = argv.slice(8);

        expect(await verifier.verifyProof(a, b, c, Input)).to.be.true;
    });
    it("Should return false for invalid proof", async function () {
        //[assignment] insert your script here

        let a = [0, 0];
        let b = [[0, 0], [0, 0]];
        let c = [0, 0];
        let d = [0]
        expect(await verifier.verifyProof(a, b, c, d)).to.be.false;
    });
});


describe("Multiplier3 with PLONK", function () {
    let Verifier;
    let verifier;
    beforeEach(async function () {
        //[assignment] insert your script here
        Verifier = await ethers.getContractFactory("PlonkVerifier");
        verifier = await Verifier.deploy();
        await verifier.deployed();
    });

    it("Should return true for correct proof", async function () {

        const { proof, publicSignals } = await plonk.fullProve({ "a": 1, "b": 2, "c": 3 }, "contracts/circuits/_plonkMultiplier3/Multiplier3_js/Multiplier3.wasm", "contracts/circuits/_plonkMultiplier3/circuit_final.zkey");
        console.log("1 * 2 * 3= ", publicSignals[0]);

        const editedPublicSignals = unstringifyBigInts(publicSignals);

        const editedProof = unstringifyBigInts(proof);

        const calldata = await plonk.exportSolidityCallData(editedProof, editedPublicSignals);


        //j splitting the calldata using , as separator and decalring const for the 0 index array
        const firstcalldata = calldata.split(",")[0];

        const secondcalldata = JSON.parse(calldata.split(",")[1]);

        expect(await verifier.verifyProof(firstcalldata, secondcalldata)).to.be.true;
    });

    it("Should return false for invalid proof", async function () {
        let a = '0x0000000000000000000000000000000000000000000000000000000000000000';
        let b = ['0'];
        expect(await verifier.verifyProof(a, b)).to.be.false;
    });
});