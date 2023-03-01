const SHA256 = require('crypto-js/sha256');
const XLSX = require('xlsx');

class  Block {
    #data;
    
    constructor (index, previousHash = '0'){
        if (index == 0){
            this.index = index;
            this.timestamp = new Date();
            this.#data = previousHash;
            this.previousHash = "zero";
            this.hash = this.calculateHash();
        }else{
            this.index = index;
            this.timestamp = new Date();
            let dt = this.readDataFromExcel();
            this.#data = dt ;
            this.previousHash = previousHash;
            let hs = this.calculateHash();
            this.hash = hs;
        }
        
    }

    calculateHash(){
        return SHA256((this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)),'pass').toString();
    }
    
    
    readDataFromExcel(){
        const parse = (filename) => {
            const excelData = XLSX.readFile(filename);
        
            return Object.keys(excelData.Sheets).map((name) =>({
                name,
                data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
            }));
        }
        
        let par = parse("./Rza.xlsx")[0].data[0];
        let string = '|Время/Дата| ' + par['Время/Дата']+ ' |Виртуальное устройство| ' +par['Виртуальное устройство'] 
        + ' |Описание| ' + par['Описание'] + ' |Значение| ' + par['Значение'];
               
        return  string;
    }
    
}
