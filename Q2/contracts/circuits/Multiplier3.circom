pragma circom 2.0.0;

// [assignment] Modify the circuit below to perform a multiplication of three signals

template Multiplier2(){
   //Declaration of signals.
   signal input a;
   signal input b;
   signal output out;

   //Statements.
   out <== a * b;
}




template Multiplier3 () {  

   // Declaration of signals.  
   signal input a;  
   signal input b;
   signal input c;
   signal output d; 

   component mult2 = Multiplier2();
   component mult3 = Multiplier2();

   // Constraints. 
   mult2.a <== a;
   mult2.b <== b;
   mult3.a <== mult2.out;
   mult3.b <==c;
   d <== mult3.out;  
   
}

component main = Multiplier3();