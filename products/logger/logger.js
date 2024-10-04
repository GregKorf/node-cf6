const {format, createLogger, transports} = require("winston");
require("winston-daily-rotate-file");
require("winston-mongodb");

const {combine, timestamp, label, prettyPrint} = format;

const CATEGORY = "winston custom format";


// create and save a file with name rotate and Date
const fileRotateTransport = new transports.DailyRotateFile({
    filename: "logs/rotate-%DATE%.logs", // the file location and the name of the log file
    datePattern: "DD-MM-YYYY", // date format of the file
    maxFiles: "14d",
})

const logger = createLogger({
    format: combine(
        label({label: CATEGORY}),
        timestamp({
            format: "DD-MM-YYYY HH:mm:ss"
        }),
        // prettyPrint()
        format.json()
    ),
    transports:[
        fileRotateTransport,
        new transports.File({
            level: "info",
            filename: "logs/example.log"
        }),
        new transports.File({
            level: "error",
            filename: "logs/example-error.log"
        }),
        new transports.Console(), // show logs in console
        new transports.MongoDB({
            level:"error",
            db: process.env.MONGODB_URI,
            collection: "logs",
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ]
})

module.exports = logger;