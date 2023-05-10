import { constants } from "../constants";

/**
 * Prints error in terminal
 * @param message string or error
 */
export const err = (message: string | Error): void => {
    if (message instanceof Error)
        return console.error(`${constants.PREFIX_MSG_ERR}${message.message}`);
    return console.error(`${constants.PREFIX_MSG_ERR}${message}`);
}

/**
 * Prints log message in terminal
 * @param message string message
 */
export const log = (message: string): void => console.log(`${constants.PREFIX_MSG}${message}`);

/**
 * Prints info message in terminal
 * @param message string message
 */
export const info = (message: string): void => console.log(`${constants.PREFIX_MSG_INFO}${message}`);

/**
 * Prints warn message in terminal
 * @param message string message
 */
export const warn = (message: string): void => console.log(`${constants.PREFIX_MSG_WARNING}${message}`);

/**
 * Prints message in terminal
 * @param message string message
 */
export const printOut = (...args: string[]): void => console.log(...args);

export default { err, log, info, warn, printOut }
