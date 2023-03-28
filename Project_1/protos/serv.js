const BlockChain = require('./../BlockChain');

const config = require ('./../config/' + process.argv.slice(2).toString() + '.json')
var rzaChain1 = new BlockChain(config.Where);


var PROTO_PATH = __dirname + '/block.proto';



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



function GetLastBlock(call, callback) {
    callback(null, {index: rzaChain1.getLatestBlock().getIndex(),
                    Timestamp:  rzaChain1.getLatestBlock().getTimestamp().toString(),
                    PreviousHash: rzaChain1.getLatestBlock().getPreviousHash(),
                    Hash: rzaChain1.getLatestBlock().getHash(),
                    MadeBy: rzaChain1.getLatestBlock().getMadeBy(),
                    Data: rzaChain1.getLatestBlock().getData()
  });
}

function SetNewBlock(call,callback){
  // var rec = call.request
  callback(null, {answer: getBlockFromClient(call.request)})
}

function getBlockFromClient (ClientBlock){
  if (rzaChain1.getLatestBlock().getData() == ClientBlock.Data){
    return false
  }else {
    rzaChain1.addNewBlockFromClient(ClientBlock)
    console.log(rzaChain1.showInformation())
    return true}
}

function main() {
  var server = new grpc.Server();
  server.addService(block_proto.RouteGuide.service, {GetLastBlock: GetLastBlock});
  server.addService(block_proto.SetNewBlock.service, {SetNewBlock: SetNewBlock});
  server.bindAsync(config.Port, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
};

main();
