'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const constants_1 = require("../constants");
const package_json_1 = require("../../package.json");
commander_1.program.version(package_json_1.version)
    .option('--cwd <cwd>', 'current working directory')
    .usage('<command> [options] [projects...]')
    .addHelpText('afterAll', constants_1.HELP_TEXT.afterAll)
    .showHelpAfterError();
/**
 * Define commands and arguments available
 */
const beginCommandProcessing = () => {
    try {
        commander_1.program.parse(process.argv);
    }
    catch (error) {
        process.exit(constants_1.constants.ERROR_EXIT);
    }
};
beginCommandProcessing();
//
// Display help if -h or --help is present 
//
if (process.argv.length == 2) {
    // Check if it does not forget to close fds from RPC
    process.exit(constants_1.constants.ERROR_EXIT);
}
//# sourceMappingURL=CLI.js.map