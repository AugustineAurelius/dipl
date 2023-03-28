const Block = require('./Block')

class  BlockChain   {
    
    constructor (whereRead = ''){
        this.chain = [this.createGenesisBlock()];
        this.whereRead = whereRead;
        this.lastDataFromExcel = '';
        this.createGenesisBlock();
        this.getLatestBlock().setMadeBy('service');
        this.checkData();
        this.getLatestBlock().setMadeBy('service');
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
        newBlock.setData(this.whereRead)
        newBlock.setTimestamp((new Date()).toString())
        this.lastDataFromExcel = newBlock.readDataFromExcel(this.whereRead)
        this.chain.push(newBlock);
    }

    addBlockServ(newBlock){
        newBlock.setIndex(this.chain.length);
        newBlock.setPreviousHash(this.getLatestBlock().getHash());
        newBlock.setHash(newBlock.calculateHash());
        this.chain.push(newBlock);
    }
    
    isValid() {
        for (let i = 1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];
            if (prevBlock.getHash() != currentBlock.getPreviousHash()){
                return false;
            }
        }
        return true;
    }

    showData(){
        var Data = []
        for (let i = 0; i<this.chain.length; i++){
                Data.push(this.chain[i].getData())
        }
        return Data
    }

    showInformation (){
        var result = []
        for (let i = 0; i<this.chain.length; i++){
            const information = new Map();
            information.set('Index       ', this.chain[i].getIndex());
            information.set('Timestamp   ', this.chain[i].getTimestamp());
            information.set('PreviousHash', this.chain[i].getPreviousHash());
            information.set('Hash        ', this.chain[i].getHash());  
            information.set('MadeBy      ', this.chain[i].getMadeBy());
            information.set("Data        :", this.chain[i].getData())
            result.push(information);
        }
        return result
    }
    
    checkData () {
        if (this.lastDataFromExcel != this.getLatestBlock().readDataFromExcel(this.whereRead) && this.getLatestBlock().getMadeBy() == 'service'){
            this.addBlock(new Block());
            return true;
        }else {return false}
    }

    addNewBlockFromClient(ClientBlock){
        var clBlock = new Block(this.chain.length,ClientBlock.Timestamp,this.getLatestBlock().getHash(),ClientBlock.Hash,ClientBlock.Data,ClientBlock.MadeBy)        
        this.chain.push(clBlock);
    }

}
module.exports = BlockChain;
