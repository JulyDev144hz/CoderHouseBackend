const winston = require("winston");
const { config } = require("../../config");

const transports = [];

if (!config.isProd) {
  transports.push(
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(winston.format.simple()),
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(winston.format.simple()),
    })
  );
  transports.push(
    new winston.transports.File({ filename: "error.log", level: "error" })
  );
}

const logger = winston.createLogger({
  transports: transports,
});

module.exports = (req, res, next) => {
  req.logger = logger;
  req.logger.info(
    `${req.method} ${req.url} ${new Date().toLocaleDateString()}`
  );
  next();
};
