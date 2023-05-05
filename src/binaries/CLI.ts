'use strict';

import { program }    from 'commander';

import { constants, HELP_TEXT }  from '../constants';
import ProjectManager from '../project-manager';
import logger         from '../helpers/logger';
import { version }    from '../../package.json';

const projectManager = new ProjectManager();

program.version(version)
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
        } catch (error) {
            logger.err(error);
            process.exit(constants.ERROR_EXIT);
        }
    });

//
// Git commands
//
program
    .command('clone')
    .description('Clone a list of projects')
    .option('-s --stop-on-error', 'Stop process on clone error')
    .argument('[projectNames...]', 'List of projects to be affected (default: all)')
    .action((projectNames: string[], options: { stopOnError: boolean }) => {
        try {
            projectManager.loadProjectsFromFile();
            projectManager.executeCommandsForProjects(
                'clone', projectNames.length === 0 ? Object.keys(projectManager.allProjects) : projectNames, options);
        } catch (error) {
            logger.err(error);
            process.exit(constants.ERROR_EXIT);
        }
    });

program
    .command('install')
    .description('Install a list of projects')
    .option('-s --stop-on-error', 'Stop process on installation error')
    .argument('[projectNames...]', 'List of projects to be affected (default: all)')
    .action((projectNames: string[], options: { stopOnError: boolean }) => {
        try {
            projectManager.loadProjectsFromFile();
            projectManager.executeCommandsForProjects(
                'install', projectNames.length === 0 ? Object.keys(projectManager.allProjects) : projectNames, options);
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
        logger.err('Command not found\n');
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
