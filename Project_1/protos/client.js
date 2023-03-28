const config = require ('./../config/' + process.argv.slice(2).toString() + '.json')
const SHA256 = require('crypto-js/sha256');
const XLSX = require('xlsx')

var PROTO_PATH = __dirname + '/block.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var block_proto = grpc.loadPackageDefinition(packageDefinition).test;

lastReadString = ''

function main() {
    target = config.Port;
    var client2 = new block_proto.SetNewBlock(target,
      grpc.credentials.createInsecure());
    
    
      if (Confirm(lastReadString)) {
        timeStamp = new Date().toString();
        madeBy = 'client ' + config.Where.slice(5,7)
        hash = calculateHash(timeStamp, lastReadString, madeBy)

        client2.SetNewBlock({
          Timestamp: timeStamp,
          Hash: hash,
          MadeBy: madeBy,
          Data: lastReadString
        }, function(err,response){
          console.log(response)
          if (response.answer) {
            console.log("Block Added")
          }else {console.log("BlockChainIsOk")}
        })
      }else{ console.log("iter 1")}
}
 
main();
  


function readDataFromExcel(Where){
  const parse = (filename) => {
      const excelData = XLSX.readFile(filename);
      return Object.keys(excelData.Sheets).map((name) =>({data: XLSX.utils.sheet_to_json(excelData.Sheets[name])[0]}))};
  
  let par = parse(Where)[0].data;
  let string = '|Время/Дата| ' + par['Время/Дата']+ ' |Виртуальное устройство| ' +par['Виртуальное устройство'] 
  + ' |Описание| ' + par['Описание'] + ' |Значение| ' + par['Значение'];
         
  return  string;
}

function Confirm(lastData){
  var NewData = readDataFromExcel(config.Where)
  if (lastData != NewData){
    lastReadString = NewData
    return true
  } else {return false}
}

function calculateHash(timeStamp,data,madeBy){
  return SHA256(timeStamp + data + madeBy).toString();
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

    // client1.GetLastBlock({where: config.Where}, function(err, response) {
    //   console.log('Response:', 'Index:'+ response.index,
    //   '\n Timestamp: '+ response.Timestamp,
    //   '\n PreviousHash: '+ response.PreviousHash,
    //   '\n Hash: '+response.Hash,
    //   '\n MadeBy: '+response.MadeBy,
    //   "\n Data: " + response.Data);
    // });