'use strict';

import chalk          from 'chalk';
import { program }    from 'commander';

import { constants, HELP_TEXT }  from '../constants'
import ProjectManager from '../project-manager';
import logger         from '../helpers/logger';
import { version }    from '../../package.json';

const projectManager = new ProjectManager();

program.version(version)
    .option('--cwd <cwd>', 'current working directory')
    .usage('<command> [options] [projects...]')
    .addHelpText('afterAll', HELP_TEXT.afterAll)
    .showHelpAfterError();

/**
 * Define commands and arguments available
 */
const beginCommandProcessing = () => {
    try {
        program.parse(process.argv);
    } catch (error) {
        logger.err(error);
        process.exit(constants.ERROR_EXIT);
    }
}

//
// Init config
//
program
    .command('init')
    .description('Generate a sample configuration')
    .action(() => {
        try {
            projectManager.generateConfigFile();
            logger.info(`Config file ${constants.CONFIG_FILE} have been created in ${constants.CONFIG_FOLDER}. Update the file with your own values.`);
        } catch (error) {
            logger.err(error);
            process.exit(constants.ERROR_EXIT);
        }
    });

//
// Catch all
//
program.command('*')
    .action(function () {
        logger.err(constants.PREFIX_MSG_ERR + chalk.bold('Command not found\n'));
        // displayUsage();
        // Check if it does not forget to close fds from RPC
        process.exit(constants.ERROR_EXIT);
    });


beginCommandProcessing();

//
// Display help if -h or --help is present 
//
if (process.argv.length == 2) {
    // Check if it does not forget to close fds from RPC
    process.exit(constants.ERROR_EXIT);
}
