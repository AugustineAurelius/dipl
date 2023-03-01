let BlockChain = require('./BlockChain');
let Block = require('./Block')


let rzaChain = new BlockChain();
rzaChain.addBlock(new Block());
rzaChain.addBlock(new Block());
rzaChain.addBlock(new Block());


for (let i = 0; i<rzaChain.chain.length; i++){
 
    console.log(rzaChain.chain[i]);
    rzaChain.chain[i].showData();

}
 

