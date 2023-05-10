'use strict';

import { constants, HELP_TEXT }     from '../constants';
import ProjectManager               from '../project-manager';
import logger                       from '../utils/logger';
import { CommandWithRawArgs }       from '../utils/commander';
import { ProcessingOptions }        from '../../types';
import { version }                  from '../../package.json';

const program = new CommandWithRawArgs();
const projectManager = new ProjectManager();

program.version(version)
    .usage('<command> [options] [projects...]')
    .addHelpText('afterAll', HELP_TEXT.afterAll)
    .showHelpAfterError()
    .hook('preAction', () => {
        projectManager.loadProjectsFromFile();
    });

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

/**
 * Get command's arguments
 */
function getCommandArgs(isNpmCommand: boolean): string[] {
    let argsIndex: number;
    let args = [];
    if ((argsIndex = program.rawArgs.indexOf('--')) >= 0) {
        args = program.rawArgs.slice(argsIndex + 1);
        if (isNpmCommand) args.unshift('--');
    }
    return args;
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
    .option('-p --projects [projects...]', 'List of projects to be affected (default: all)', [])
    .action((options: ProcessingOptions) => {
        try {
            projectManager.executeCommandsForProjects(
                'clone', projectManager.getProjectNames(options.projects), options);
        } catch (error) {
            logger.err(error);
            process.exit(constants.ERROR_EXIT);
        }
    });

program
    .command('install')
    .description('Install a list of projects')
    .option('-s --stop-on-error', 'Stop process on install error')
    .option('-p --projects [projects...]', 'List of projects to be affected (default: all)', [])
    .action((options: ProcessingOptions) => {
        try {
            projectManager.executeCommandsForProjects(
                'install', projectManager.getProjectNames(options.projects), options);
        } catch (error) {
            logger.err(error);
            process.exit(constants.ERROR_EXIT);
        }
    });

program
    .command('update')
    .description('Update a list of projects')
    .argument('<branch>', 'Branch to be updated')
    .option('-s --stop-on-error', 'Stop process on update error')
    .option('-p --projects [projects...]', 'List of projects to be affected (default: all)', [])
    .action((branch: string, options: ProcessingOptions) => {
        try {
            projectManager.executeCommandsForProjects(
                'update', projectManager.getProjectNames(options.projects), { ...options, branch });
        } catch (error) {
            logger.err(error);
            process.exit(constants.ERROR_EXIT);
        }
    });

program
    .command('exec')
    .description('Exec a command into a list of projects')
    .requiredOption('-c --command <command...>', 'Required option, command to be executed')
    .option('-s --stop-on-error', 'Stop process on update error')
    .option('-p --projects [projects...]', 'List of projects to be affected (default: all)', [])
    .action((options: ProcessingOptions) => {
        try {
            projectManager.executeCommandsForProjects(
                'exec', projectManager.getProjectNames(options.projects), { ...options, command: [ ...options.command, ...getCommandArgs(options.command[0] === 'npm') ] });
        } catch (error) {
            logger.err(error);
            process.exit(constants.ERROR_EXIT);
        }
    }).usage('[options] -c <command> [-- <args>]');

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
