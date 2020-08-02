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
require('dotenv').config()
const mongoose = require('mongoose')
const Pasos = require('./models/pasos')


mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser:true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to database"))

// Metoda koja vraca ime poslato u zahtevu
async function vratiPasos(brojPasosa) {
    let query = {"brojPasosa":brojPasosa}
    console.log(query)
    const pasos = await Pasos.find(query)
    return pasos[0];
}

async function upsertPasos(call, callback) {
  console.log(call.request.pasos)
  var pasosNadjen = vratiPasos(call.request.pasos.brojPasosa)
  console.log(pasosNadjen)
  if(pasosNadjen != null){
    console.log(call.request)
    // const pasos = await call.request.save()
    // console.log(pasos)
    // callback(null, {message: pasos});
  } else{
    console.log(pasosNadjen)
    callback(null, {message: pasosNadjen});
  }
}

// Prima zahteve od klijenta za izvrsenje metoda navedenih u {}
function main() {
  var server = new grpc.Server();
  server.addService(pasos_proto.Pasos.service, {upsertPasos: upsertPasos});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
