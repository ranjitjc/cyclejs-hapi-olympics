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

/*
"cors": {
        "headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
}

server.connections: ({
        labels: ['business'],
        host: Config.server.business.host,
        port: Config.server.business.port,
        routes: {
            cors: true,
            validate: {
                options: {
                    abortEarly: false
                }
            },
            timeout: {
                socket: 11 * 60 * 1000, // Determines how long before closing request socket.
                server: false // Determines how long to wait for server request processing. Disabled by default
            }
        }
    });
*/
const server  = new Hapi.Server();
//server.connection({ port: parseInt(process.env.PORT, 10) || 25500 });

server.connection({
    port: 4000,
    routes: {
        cors: {
            origin: ['*']
        }
    }
});

//server.connection({ address: '127.0.0.1',port: parseInt(process.env.PORT, 10) || 25500 });
//server.connection({ host: '0.0.0.0', port: parseInt(process.env.PORT, 10) || 25500 });
//var server = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 25500);


server.register({
    register : require('good'),
    options : goodOptions
}, err => {
    server.route(routes);
    server.start(() => {
        console.log('RxJS API server running at', server.info.uri);
    });        
})

