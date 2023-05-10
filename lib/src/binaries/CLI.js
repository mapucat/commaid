'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const project_manager_1 = __importDefault(require("../project-manager"));
const logger_1 = __importDefault(require("../helpers/logger"));
const commander_1 = require("../helpers/commander");
const package_json_1 = require("../../package.json");
const program = new commander_1.CommandWithRawArgs();
const projectManager = new project_manager_1.default();
program.version(package_json_1.version)
    .usage('<command> [options] [projects...]')
    .addHelpText('afterAll', constants_1.HELP_TEXT.afterAll)
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
    }
    catch (error) {
        logger_1.default.err(error);
        process.exit(constants_1.constants.ERROR_EXIT);
    }
};
/**
 * Get command's arguments
 */
function getCommandArgs() {
    let argsIndex;
    let args = [];
    if ((argsIndex = program.rawArgs.indexOf('--')) >= 0) {
        args = program.rawArgs.slice(argsIndex + 1);
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
    }
    catch (error) {
        logger_1.default.err(error);
        process.exit(constants_1.constants.ERROR_EXIT);
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
    .action((options) => {
    try {
        projectManager.executeCommandsForProjects('clone', projectManager.getProjectNames(options.projects), options);
    }
    catch (error) {
        logger_1.default.err(error);
        process.exit(constants_1.constants.ERROR_EXIT);
    }
});
program
    .command('install')
    .description('Install a list of projects')
    .option('-s --stop-on-error', 'Stop process on install error')
    .option('-p --projects [projects...]', 'List of projects to be affected (default: all)', [])
    .action((options) => {
    try {
        projectManager.executeCommandsForProjects('install', projectManager.getProjectNames(options.projects), options);
    }
    catch (error) {
        logger_1.default.err(error);
        process.exit(constants_1.constants.ERROR_EXIT);
    }
});
program
    .command('update')
    .description('Update a list of projects')
    .argument('<branch>', 'Branch to be updated')
    .option('-s --stop-on-error', 'Stop process on update error')
    .option('-p --projects [projects...]', 'List of projects to be affected (default: all)', [])
    .action((branch, options) => {
    try {
        projectManager.executeCommandsForProjects('update', projectManager.getProjectNames(options.projects), Object.assign(Object.assign({}, options), { branch }));
    }
    catch (error) {
        logger_1.default.err(error);
        process.exit(constants_1.constants.ERROR_EXIT);
    }
});
program
    .command('exec')
    .description('Exec a command into a list of projects')
    .requiredOption('-c --command <command...>', 'Required option, command to be executed')
    .option('-s --stop-on-error', 'Stop process on update error')
    .option('-p --projects [projects...]', 'List of projects to be affected (default: all)', [])
    .action((options) => {
    try {
        projectManager.executeCommandsForProjects('exec', projectManager.getProjectNames(options.projects), Object.assign(Object.assign({}, options), { command: [...options.command, ...getCommandArgs()] }));
    }
    catch (error) {
        logger_1.default.err(error);
        process.exit(constants_1.constants.ERROR_EXIT);
    }
}).usage('[options] -c <command> [-- <args>]');
//
// Catch all
//
program.command('*')
    .action(function () {
    logger_1.default.err('Command not found\n');
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