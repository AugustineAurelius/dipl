const SHA256 = require('crypto-js/sha256');
const XLSX = require('xlsx');

class Block {
    index: any;
    timestamp: Date;
    data: string;
    previousHash: string;
    hash: any;
    
    constructor (index, previousHash = ''){
        if (index == 0){
            this.index = index;
            this.timestamp = new Date();
            this.data = previousHash;
            this.previousHash = "zero";
            this.hash = this.calculateHash();
        }else{
            this.index = index;
            this.timestamp = new Date();
            this.data = this.readDataFromExcel();
            this.previousHash = previousHash;
            this.hash = this.calculateHash();
        }
        
    }

    calculateHash(){
        return SHA256((this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)),'pass').toString();
    }
    
    
    readDataFromExcel() {
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
            str.push('|Время/Дата| ' + par[i]['Время/Дата']+ ' |Виртуальное устройство| ' +par[i]['Виртуальное устройство'] 
            + ' |Описание| ' + par[i]['Описание'] + ' |Значение| ' + par[i]['Значение']);
        }
        var rez = this.merakleTree(str)[0];
        return  rez;
    }
    
    merakleTree (mass){
        let arr = [];
        if (mass.length%2 != 0){
            mass.push(mass[mass.length-1])
        }
        for (let i = 0; i<mass.length-1;i=i+2){
            arr.push(SHA256(mass[i]+ mass[i+1]).toString());
            
        }
        
        if (arr.length == 1){
            return arr
        }else{
            return this.merakleTree(arr);
        }
        
        
    }
}

class BlockChain{
    chain: Block[];
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block (0,"GenesisBlock");
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
        newBlock.index = this.chain.length;
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    //is Valid?
}

let rzaChain = new BlockChain();
rzaChain.addBlock(new Block(1,"asdf"))
rzaChain.chain[1].data = "U U U"
console.log(rzaChain.chain[1].data)
for (let i = 0; i<rzaChain.chain.length; i++){
    console.log(rzaChain.chain[i])
}
//console.log(JSON.stringify(rzaChain,null,6))

