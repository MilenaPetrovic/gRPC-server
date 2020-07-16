var PROTO_PATH = __dirname + '/../protos/pasos.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var pasos_proto = grpc.loadPackageDefinition(packageDefinition).pasos;

function main() {
  var client = new pasos_proto.BrojPasosa('localhost:50051', grpc.credentials.createInsecure());

  var brojPasosa = '1';

  client.vratiPasos({brojPasosa: brojPasosa}, function(err, response) {
    console.log(response.message);
  });
}

main();
