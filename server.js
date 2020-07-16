var PROTO_PATH = '../protos/pasos.proto';

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

// mongodb
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://comi:comi@cluster0.sl2ir.mongodb.net/fpis?retryWrites=true&w=majority",{ useNewUrlParser:true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to database"))

// Metoda koja vraca ime poslato u zahtevu
async function vratiPasos(call, callback) {
    const Pasos = require('./models/pasos')
    let query = {"brojPasosa":call.request.brojPasosa}
    const pasos = await Pasos.find(query)
    console.log(pasos)
    callback(null, {message: pasos});
}

// Prima zahteve od klijenta za izvrsenje metoda navedenih u {}
function main() {
  var server = new grpc.Server();
  server.addService(pasos_proto.BrojPasosa.service, {vratiPasos: vratiPasos});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
