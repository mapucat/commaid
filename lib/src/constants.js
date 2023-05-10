"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_COMMANDS = exports.HELP_TEXT = exports.constants = void 0;
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
/**
 * Config values
 */
const CONFIG_FOLDER = '/Users/mp.rodriguez/Documents/dev/commaid/configs'; // path.join(process.env.HOME, '.commaid');
const CONFIG_FILE = 'project-names-example.json'; // 'projects-config.json';
/**
 * Constants variables used by Commaid
 */
exports.constants = {
    PREFIX_MSG: chalk_1.default.green('[COMMAID] '),
    PREFIX_MSG_INFO: chalk_1.default.cyan('[COMMAID][INFO] '),
    PREFIX_MSG_ERR: chalk_1.default.red('[COMMAID][ERROR] '),
    PREFIX_MSG_WARNING: chalk_1.default.yellow('[COMMAID][WARN] '),
    PREFIX_MSG_SUCCESS: chalk_1.default.cyan('[COMMAID] '),
    SUCCESS_EXIT: 0,
    ERROR_EXIT: 1,
    CONFIG_FOLDER: CONFIG_FOLDER,
    CONFIG_FILE: CONFIG_FILE,
    CONFIG_FILE_PATH: path_1.default.join(CONFIG_FOLDER, CONFIG_FILE)
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
    update: 'git checkout <branch> && git pull origin <branch>',
    exec: ''
};
//# sourceMappingURL=constants.js.map