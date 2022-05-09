#!/bin/bash
cd contracts/circuits

mkdir _plonkMultiplier3

echo "compiling Multiplier3.circom..."
# [assignment] create your own bash script to compile Multipler3.circom using PLONK below

# compile circuit 

circom Multiplier3.circom --r1cs --wasm --sym -o _plonkMultiplier3
snarkjs r1cs info _plonkMultiplier3/Multiplier3.r1cs

snarkjs plonk setup _plonkMultiplier3/Multiplier3.r1cs powersOfTau28_hez_final_10.ptau _plonkMultiplier3/circuit_final.zkey  
snarkjs zkey export verificationkey _plonkMultiplier3/circuit_final.zkey _plonkMultiplier3/verification_key.json

snarkjs zkey export solidityverifier _plonkMultiplier3/circuit_final.zkey ../_plonkMultiplier3Verifier.sol

cd ../..