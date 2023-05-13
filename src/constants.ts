
import chalk        from 'chalk';
import path         from 'path';
import { Commands } from '../types';

/**
 * Config values
 */
const CONFIG_FOLDER = path.join(process.env.HOME, '.commaid');
const CONFIG_FILE = 'projects-config.json';
const CONFIG_EXAMPLE = 'examples/project-names-example.json';

/**
 * Constants variables used by Commaid
 */
export const constants = {
    PREFIX_MSG: chalk.green('[COMMAID] '),
    PREFIX_MSG_INFO: chalk.cyan('[COMMAID][INFO] '),
    PREFIX_MSG_ERR: chalk.red('[COMMAID][ERROR] '),
    PREFIX_MSG_WARNING: chalk.yellow('[COMMAID][WARN] '),
    PREFIX_MSG_SUCCESS: chalk.cyan('[COMMAID] '),

    SUCCESS_EXIT: 0,
    ERROR_EXIT: 1,

    CONFIG_FOLDER: CONFIG_FOLDER,
    CONFIG_FILE: CONFIG_FILE,
    CONFIG_FILE_PATH: path.join(CONFIG_FOLDER, CONFIG_FILE),
    CONFIG_EXAMPLE: path.join(__dirname, CONFIG_EXAMPLE)
};

/**
 * Additional help intructions
 */
export const HELP_TEXT = {
    afterAll: `

Access commaid files in ~/.commaid
    `
};

/**
 * Common commands used in projects
 */
export const COMMON_COMMANDS: Commands<string> = {
    clone: 'git clone <url>',
    install: 'npm install',
    update: 'git checkout <branch> && git pull origin <branch>',
    exec: ''
};
