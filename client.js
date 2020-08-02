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
  var client = new pasos_proto.Pasos('localhost:50051', grpc.credentials.createInsecure());

  var pasos = {
    brojPasosa: '1',
    idZivotinje: 'RS1'
  };

  console.log(pasos);
  

  client.upsertPasos({pasos: pasos}, function(err, response) {
    console.log(response.message);
    pasos = response.message
    console.log(pasos)
  });

}

main();
