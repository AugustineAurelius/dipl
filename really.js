let BlockChain = require('./BlockChain');
let Block = require('./Block')


let rzaChain = new BlockChain();
rzaChain.addBlock(new Block());
rzaChain.addBlock(new Block());
rzaChain.addBlock(new Block());

rzaChain[0] = "123";
for (let i = 0; i<rzaChain.chain.length; i++){
 
    console.log(rzaChain.chain[i]);
    console.log(rzaChain.chain[i].showData());

}
 

