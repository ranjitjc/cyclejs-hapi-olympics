'use strict';
// import hapi from 'hapi';
// import OlympicsApi from './routes/olympics';

const Hapi          = require('hapi');
const OlympicsApi   = require('./routes/olympics');
 

const routes  = [
  { method: 'GET', path: '/api/discipline', config: OlympicsApi.findDisciplines },
];

const server  = new Hapi.Server();

server.connection({ port: 25500 });
server.route(routes);

server.start(() => {
  console.log('RxJS API server running at', server.info.uri);
});