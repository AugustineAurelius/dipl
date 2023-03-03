const SHA256 = require('crypto-js/sha256');
const XLSX = require('xlsx');
const aes = require('aes-js');


class Block {
    constructor (nonce, previousHash = ''){
        this.nonce = nonce;
        this.timestamp = new Date();
        this.data = this.readDataFromExcel();
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.nonce + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
    
    
    readDataFromExcel(){
        const parse = (filename) => {
            const excelData = XLSX.readFile(filename);
        
            return Object.keys(excelData.Sheets).map((name) =>({
                name,
                data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
            }));
        }
        
        let str = [];
        let par = parse("./Rza.xlsx")[0].data;
        for (let i = 0; i<par.length; i++ ){
            str.push(aes.utils.utf8.toBytes('|Время/Дата| ' + par[i]['Время/Дата']+ ' |Виртуальное устройство| ' +par[i]['Виртуальное устройство'] 
            + ' |Описание| ' + par[i]['Описание'] + ' |Значение| ' + par[i]['Значение']));
            
        }
        let res = this.merakleTree(str);
        this.readFromTree(res);
        return  res;
    }
    
    merakleTree (mass){
        let arr = [];
        if (mass.length%2 != 0){
            mass.push(mass[mass.length-1])
        }
        for (let i = 0; i<mass.length-1;i=i+2){arr.push(aes.utils.utf8.toBytes(mass[i]+ mass[i+1]));}

        if (arr.length == 1){
            return arr
        }else{
            return this.merakleTree(arr);
        }
        
    }

    readFromTree (node){
        let arr = [];
        for (let i = 0; i<= node.length;i++){
            arr.push(aes.utils.utf8.fromBytes(node[i]))
        }
        console.log(arr)
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block (0,"GenesisBlock", '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        let start = new Date().getTime();
        let end = new Date().getTime() + 3000;
        while (start<end){
            start = new Date();
        }
        newBlock.nonce = this.chain.length;
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    //is Valid?
}

let rzaChain = new BlockChain();
rzaChain.addBlock(new Block())

//console.log(rzaChain.chain[0].data)
for (let i = 0; i<rzaChain.chain.length; i++){
    console.log(rzaChain.chain[i])
}

//console.log(JSON.stringify(rzaChain,null,6))

