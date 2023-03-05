const BlockChain = require('./BlockChain');
const Block = require('./Block')


var rzaChain1 = new BlockChain();
var rzaChain2 = new BlockChain();

function service(block){
    rzaChain1.addBlock(block);
    rzaChain2.addBlock(block);


}

block1 = new Block();

rzaChain1.addBlock(block1)
rzaChain1.addBlock(new Block())
rzaChain1.addBlock(new Block())

console.log(rzaChain1.getLatestBlock().getMadeBy());
if (rzaChain1.getLatestBlock().getMadeBy() == 'blockChain'){
    rzaChain1.getLatestBlock().setMadeBy('service');
    rzaChain2.addBlock(rzaChain1.getLatestBlock());

}

console.log(rzaChain2.showInformation());
// for (let i = 0; i<rzaChain1.chain.length; i++){
 
//     console.log(rzaChain1.chain[i]);
//     console.log(rzaChain1.chain[i].showData);

// }
 

