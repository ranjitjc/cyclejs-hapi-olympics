'use strict';
// import hapi from 'hapi';
// import OlympicsApi from './routes/olympics';

const Hapi          = require('hapi');
const OlympicsFileApi   = require('./routes/file/olympics');
 
let goodOptions = {
    reporters : [{
        reporter : require('good-console'),
        events    : {log:'*', response : '*' }
    }]
}


const routes  = [
    { method: 'GET', path: '/api/discipline', config: OlympicsFileApi.getDisciplines },
    { method: 'GET', path: '/api/event', config: OlympicsFileApi.getEvents },
];


const server  = new Hapi.Server();
server.connection({ port: 25500 });

server.register({
    register : require('good'),
    options : goodOptions
}, err => {
    server.route(routes);
    server.start(() => {
        console.log('RxJS API server running at', server.info.uri);
    });        
})

