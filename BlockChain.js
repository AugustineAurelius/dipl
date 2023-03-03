const Block = require('./Block')

class  BlockChain   {

    constructor (){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block (0,"GenesisBlock");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.index = this.chain.length;
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValid() {
        for (let i = 1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];
            if (currentBlock.hash != currentBlock.calculateHash() || prevBlock.hash != currentBlock.previousHash){
                return false;
            }
        }
        return true;
    }
    
}
module.exports = BlockChain;
