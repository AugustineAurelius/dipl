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
        newBlock.setIndex(this.chain.length);
        newBlock.setPreviousHash(this.getLatestBlock().getHash());
        newBlock.setHash(newBlock.calculateHash());
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

    showData(){
        var Data = []

        for (let i = 0; i<this.chain.length; i++){
            // if (time<this.chain[i].){
                console.log(this.chain[i].getData())
                Data.push(this.chain[i].getData())
            // }else {continue} 
        }
        return Data
    }

    showInformation (){
        var result = []
        for (let i = 0; i<this.chain.length; i++){
            const information = new Map();
            information.set('Index', this.chain[i].getIndex());
            information.set('Timestamp', this.chain[i].getTimestamp());
            information.set('Hash', this.chain[i].getHash());
            information.set('PreviousHash', this.chain[i].getPreviousHash());
            information.set('MadeBy', this.chain[i].getMadeBy());
            result.push(information);
        }
        return result
    }
    
}
module.exports = BlockChain;
