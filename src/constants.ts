
import chalk from 'chalk';
import path from 'path';
import { Commands } from '../types';

/**
 * Constants variables used by ComMaid
 */
export const constants = {
    PREFIX_MSG: chalk.green('[COMMAID] '),
    PREFIX_MSG_INFO: chalk.cyan('[COMMAID][INFO] '),
    PREFIX_MSG_ERR: chalk.red('[COMMAID][ERROR] '),
    PREFIX_MSG_WARNING: chalk.yellow('[COMMAID][WARN] '),
    PREFIX_MSG_SUCCESS: chalk.cyan('[COMMAID] '),

    SUCCESS_EXIT: 0,
    ERROR_EXIT: 1,

    CONFIG_FOLDER: path.join(process.env.HOME, '.commaid'),
    CONFIG_FILE: 'projects-config.json',
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
    updateWorkingBranch: 'git pull',
    updateBaseBranch: 'git fetch --prune && git checkout <main-branch> && git pull origin <main-branch>'
};
