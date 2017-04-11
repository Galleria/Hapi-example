const winston = require('winston')
const moment = require('moment')


const formatter = (options) => {
    let timestamp = moment().format('YYYY-MM-DD hh:mm:ss')
    let log_lv = options.level.toUpperCase()
    let msg = options.message
    let meta = options.meta
    return '['+log_lv+']['+ timestamp +'] '+ (undefined !== msg ? msg : '') +
        (meta && Object.keys(meta).length ? '\n\t'+ JSON.stringify(meta) : '' )
}


const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ 
            name: 'logging-file',
            filename: './logging/logging.log',
            datePattern: 'yyyy-MM-dd.',
            formatter: formatter,
            json : false,
            prepend: true
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: './logging/filelog-error.log',
            level: 'error',
            datePattern: 'yyyy-MM-dd.',
            formatter: formatter,
            json : false,
            prepend: true
        })
    ]
})


module.exports = logger