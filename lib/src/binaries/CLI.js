'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const constants_1 = require("../constants");
const project_manager_1 = __importDefault(require("../project-manager"));
const logger_1 = __importDefault(require("../helpers/logger"));
const package_json_1 = require("../../package.json");
const projectManager = new project_manager_1.default();
commander_1.program.version(package_json_1.version)
    .usage('<command> [options] [projects...]')
    .addHelpText('afterAll', constants_1.HELP_TEXT.afterAll)
    .showHelpAfterError();
/**
 * Define commands and arguments available
 */
const beginCommandProcessing = () => {
    try {
        commander_1.program.parse(process.argv);
        const options = commander_1.program.opts();
        console.log('OPTIONS => ', options);
    }
    catch (error) {
        logger_1.default.err(error);
        process.exit(constants_1.constants.ERROR_EXIT);
    }
};
//
// Init config
//
commander_1.program
    .command('init')
    .description('Generate a sample configuration')
    .action(() => {
    try {
        projectManager.generateConfigFile();
    }
    catch (error) {
        logger_1.default.err(error);
        process.exit(constants_1.constants.ERROR_EXIT);
    }
});
//
// Clone command
//
commander_1.program
    .command('clone')
    .description('Clone a list of projects')
    .argument('[projectNames...]', 'List of projects to be affected (default: all)')
    .action((projectNames) => {
    try {
        projectManager.loadProjectsFromFile();
        projectManager.executeCommandsForProjects('clone', projectNames.length === 0 ? Object.keys(projectManager.allProjects) : projectNames);
    }
    catch (error) {
        logger_1.default.err(error);
        process.exit(constants_1.constants.ERROR_EXIT);
    }
});
//
// Catch all
//
commander_1.program.command('*')
    .action(function () {
    logger_1.default.err(constants_1.constants.PREFIX_MSG_ERR + chalk_1.default.bold('Command not found\n'));
    // displayUsage();
    // Check if it does not forget to close fds from RPC
    process.exit(constants_1.constants.ERROR_EXIT);
});
beginCommandProcessing();
//
// Display help if -h or --help is present 
//
if (process.argv.length == 2) {
    // Check if it does not forget to close fds from RPC
    process.exit(constants_1.constants.ERROR_EXIT);
}
//# sourceMappingURL=CLI.js.map