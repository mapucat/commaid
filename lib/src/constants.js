"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_COMMANDS = exports.HELP_TEXT = exports.constants = void 0;
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
/**
 * Constants variables used by ComMaid
 */
exports.constants = {
    PREFIX_MSG: chalk_1.default.green('[COMMAID] '),
    PREFIX_MSG_INFO: chalk_1.default.cyan('[COMMAID][INFO] '),
    PREFIX_MSG_ERR: chalk_1.default.red('[COMMAID][ERROR] '),
    PREFIX_MSG_WARNING: chalk_1.default.yellow('[COMMAID][WARN] '),
    PREFIX_MSG_SUCCESS: chalk_1.default.cyan('[COMMAID] '),
    SUCCESS_EXIT: 0,
    ERROR_EXIT: 1,
    CONFIG_FOLDER: path_1.default.join(process.env.HOME, '.commaid'),
    CONFIG_FILE: 'projects-config.json',
};
/**
 * Additional help intructions
 */
exports.HELP_TEXT = {
    afterAll: `

Access commaid files in ~/.commaid
    `
};
/**
 * Common commands used in projects
 */
exports.COMMON_COMMANDS = {
    clone: 'git clone <url>',
    install: 'npm install',
    updateCurrentBranch: 'git pull',
    updateBaseBranch: 'git fetch --prune && git checkout <main-branch> && git pull origin <main-branch>'
};
//# sourceMappingURL=constants.js.map