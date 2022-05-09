pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/comparators.circom";

template RangeProof(n) {
    assert(n <= 252);
    signal input in; // this is the number to be proved inside the range
    signal input range[2]; // the two elements should be the range, i.e. [lower bound, upper bound]
    signal output out;
    signal output lowerOutput;
    signal output HigherOutput;

    component low = LessEqThan(n);
    component high = GreaterEqThan(n);

    // [assignment] insert your code here
    // checking upper range
    low.in[0] <== in;
    low.in[1] <== range[1];
    low.out ==> lowerOutput;
    // checking lower range 
    high.in[0] <== in;
    high.in[1] <== range[0];
    high.out ==> HigherOutput;

    // if result is 0 , then number is not in range else if result is 1 , no is in range 
    lowerOutput*HigherOutput ==> out; 


}