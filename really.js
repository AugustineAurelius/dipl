const BlockChain = require('./BlockChain');
const Block = require('./Block')


var rzaChain1 = new BlockChain("./Rza.xlsx");
var rzaChain2 = new BlockChain("./TN.xlsx");
var rzaChain3 = new BlockChain("./TT.xlsx");
var rzaChain4 = new BlockChain("./G.xlsx");
let inf = [rzaChain1,rzaChain2,rzaChain3,rzaChain4]

function service(){
    for (var i = 0; i < inf.length; i++){
        if (inf[i].getLatestBlock().getMadeBy() != "service"){
            inf[i].getLatestBlock().setMadeBy('service');
            for (var j = 0; j < inf.length; j++) {
                    if (inf[i] != inf[j]){
                        inf[j].addBlockServ(inf[i].getLatestBlock());
                    }
            }
        }
    }
}


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


let cc = 0
while (true){
    if (cc<=1){
        rzaChain1.checkData();
        rzaChain1.getLatestBlock().setMadeBy('service');
        rzaChain2.checkData()
        rzaChain2.getLatestBlock().setMadeBy('service');
        rzaChain3.checkData()
        rzaChain3.getLatestBlock().setMadeBy('service');
        rzaChain4.checkData()
        rzaChain4.getLatestBlock().setMadeBy('service');
    }else {
        if (rzaChain1.checkData()){
            service();
        } else if (rzaChain2.checkData()){
            service();
        }else if (rzaChain3.checkData()){
            service();
        }else if (rzaChain4.checkData()){
            service();
        }
    }
    cc++;
    // console.log('rza1')
    // console.log(rzaChain1.showInformation());
    // console.log('rza2')
    // console.log(rzaChain2.showInformation());
    // console.log('rza3')
    // console.log(rzaChain3.showInformation());
    // console.log('rza4')
    // console.log(rzaChain4.showInformation());
    sleep(3000);
   
}
// if (rzaChain1.getLatestBlock().getMadeBy() == 'blockChain'){
//     rzaChain1.getLatestBlock().setMadeBy('service');
//     rzaChain2.addBlock(rzaChain1.getLatestBlock());
// }


// if (rzaChain1.getLatestBlock().getMadeBy() == 'blockChain'){
//     rzaChain1.getLatestBlock().setMadeBy('service');
//     rzaChain2.addBlock(rzaChain1.getLatestBlock());
// }


// while (true) {
//     console.log(rzaChain1.showInformation());
// }

