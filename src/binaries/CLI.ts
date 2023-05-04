'use strict';

import { program }    from 'commander';

import { constants, HELP_TEXT }  from '../constants';
import { version }    from '../../package.json';

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
        process.exit(constants.ERROR_EXIT);
    }
}

beginCommandProcessing();

//
// Display help if -h or --help is present 
//
if (process.argv.length == 2) {
    // Check if it does not forget to close fds from RPC
    process.exit(constants.ERROR_EXIT);
}
