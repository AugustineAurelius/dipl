const BlockChain = require('./BlockChain');
const config = require ('./config/conf')


const readlineSync = require('readline-sync');
const node = readlineSync.question('Where is node?  ');
console.log(node)



var rzaChain1 = new BlockChain(config[node]);
rzaChain1.checkData();
rzaChain1.getLatestBlock().setMadeBy('service');





while (true){
    console.log(rzaChain1.checkData())
    rzaChain1.getLatestBlock().setMadeBy('service');
    console.log(rzaChain1.showInformation());
    sleep(3000)
}




function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}