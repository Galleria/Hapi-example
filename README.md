'use strict'

const Hapi = require('hapi')
const Good = require('good')
const Blipp = require('blipp')

const server = new Hapi.Server()
server.connection({ port: 3000, host: 'localhost' })


server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, reply) => {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    },
    config: {
        description: 'Description to display'
    }
});

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
                */
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
    .then( () => server.log('info','Register Blipp Completed') )
    .catch( (err) => {throw err} ) 


server.register({ register: Blipp, options: {} })
    .then( () => server.log('info','Register Blipp Completed') )
    .catch( (err) => {throw err} ) 


server.start()
    .then( () => server.log('info', 'Server running at: ' + server.info.uri) )
    .catch( (err) => { throw err } )
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    https://github.com/danielb2/blipp

https://github.com/ar4mirez/hapi-aws

https://github.com/Marsup/hapi-mongodb

https://github.com/jedireza/hapi-mongo-models











{
  "dependencies": {
    "blipp": "^2.3.0",
    "boom": "^4.3.1",
    "good": "^7.1.0",
    "good-console": "^6.4.0",
    "good-file": "^6.0.1",
    "good-squeeze": "^5.0.2",
    "hapi": "^16.1.1"
  }
}








