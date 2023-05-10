"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printOut = exports.warn = exports.info = exports.log = exports.err = void 0;
const constants_1 = require("../constants");
/**
 * Prints error in terminal
 * @param message string or error
 */
const err = (message) => {
    if (message instanceof Error)
        return console.error(`${constants_1.constants.PREFIX_MSG_ERR}${message.message}`);
    return console.error(`${constants_1.constants.PREFIX_MSG_ERR}${message}`);
};
exports.err = err;
/**
 * Prints log message in terminal
 * @param message string message
 */
const log = (message) => console.log(`${constants_1.constants.PREFIX_MSG}${message}`);
exports.log = log;
/**
 * Prints info message in terminal
 * @param message string message
 */
const info = (message) => console.log(`${constants_1.constants.PREFIX_MSG_INFO}${message}`);
exports.info = info;
/**
 * Prints warn message in terminal
 * @param message string message
 */
const warn = (message) => console.log(`${constants_1.constants.PREFIX_MSG_WARNING}${message}`);
exports.warn = warn;
/**
 * Prints message in terminal
 * @param message string message
 */
const printOut = (...args) => console.log(...args);
exports.printOut = printOut;
exports.default = { err: exports.err, log: exports.log, info: exports.info, warn: exports.warn, printOut: exports.printOut };
//# sourceMappingURL=logger.js.map