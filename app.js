'use strict'

const Hapi = require('hapi')
const Good = require('good')
const Blipp = require('blipp')

const moment = require('moment')

const logger = require('./logger')

const server = new Hapi.Server()
server.connection({ port: 3000, host: 'localhost' })


server.ext('onRequest', (request,reply)=> {
    const uri = request.raw.req.url
    const client_ip = request.info.remoteAddress

    logger.log( 'info' ,'request', {
        ip : client_ip , 
        uri : uri 
    } )

    return reply.continue()
})

server.ext('onPreResponse', (request,reply)=> {
    const uri = request.raw.req.url
    const client_ip = request.info.remoteAddress

    logger.log( 'info' ,'response', { 
        ip : client_ip , 
        uri : uri , 
        response : {
            statusCode : request.response.statusCode,
            content : request.response.source
        }
    } )

    return reply.continue()
})


server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: (request, reply) => {
       // reply('Hello, world!');
       reply().code(204).type('image/x-icon')
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, reply) => {
        logger.log( 'info' , 'request.params.name : %s', request.params.name )
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    },
    config: {
        description: 'Description to display'
    }
});

/*
server.register({
        register: Good,
        options: {
            ops: {
                interval: 1000
            },
            reporters: {
                /*
                console: [
                    {
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{
                            response: '*',
                            log: '*'
                        }]
                    },
                    {
                        module: 'good-console'
                    },'stdout'
                ],
                * /
                file:[
                    {
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{
                            response: '*',
                            log: '*'
                        }]
                    },
                     {
                            module: 'good-squeeze',
                            name: 'SafeJson'
                        },
                    {
                        module: 'good-file',
                        args: ['./logging/server_log.log']
                    }
                ]
            }
        }
    })
    .then( () => logger.log('info','Register Good Completed') )
    .catch( (err) => {throw err} ) 
*/

server.register({ register: Blipp, options: {} })
    .then( () => logger.log('info','Register Blipp Completed') )
    .catch( (err) => {throw err} ) 


server.start()
    .then( () => logger.log('info', 'Server running at: ' + server.info.uri) )
    .catch( (err) => { throw err } )