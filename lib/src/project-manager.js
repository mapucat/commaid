"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const constants_1 = require("./constants");
const project_1 = require("./project");
const logger_1 = __importDefault(require("./helpers/logger"));
/**
 * @typedef { import("./types").IProjectManager } IProjectManager
 */
class ProjectManager {
    constructor() {
        this.CONFIG_FILE_PATH = `${constants_1.constants.CONFIG_FOLDER}/${constants_1.constants.CONFIG_FILE}`;
        this.runnableProjects = {};
        this.noRunnableProjects = {};
        this.allProjects = {};
        this.configFileExists = () => {
            return (0, fs_1.existsSync)(this.CONFIG_FILE_PATH);
        };
        this.generateConfigFolder = () => {
            (0, child_process_1.execSync)(`mkdir -p ${constants_1.constants.CONFIG_FOLDER}`, { stdio: 'inherit' });
        };
        this.generateConfigFile = () => {
            this.generateConfigFolder();
            if (this.configFileExists()) {
                throw new Error(`Config file can not be generated, ${constants_1.constants.CONFIG_FILE} have been found in ${constants_1.constants.CONFIG_FOLDER}.`);
            }
            else {
                (0, child_process_1.execSync)(`cp ./configs/project-names-example.json ${constants_1.constants.CONFIG_FOLDER}/${constants_1.constants.CONFIG_FILE}`, { stdio: 'inherit' });
                logger_1.default.info(`Config file ${constants_1.constants.CONFIG_FILE} have been created in ${constants_1.constants.CONFIG_FOLDER}. Update the file with your own values.`);
            }
        };
        this.loadProjectsFromFile = () => {
            // Create file if it does not exists
            if (!this.configFileExists()) {
                throw new Error(`No ${constants_1.constants.CONFIG_FILE} found in ${constants_1.constants.CONFIG_FOLDER}. Use \`commaid init\` to generate your own project's file.`);
            }
            const data = (0, fs_1.readFileSync)(this.CONFIG_FILE_PATH).toString();
            const fileContent = JSON.parse(data);
            fileContent.runnableProjects.forEach((projectJSON) => {
                this.runnableProjects[projectJSON.name] = new project_1.Project(projectJSON, fileContent.projectsLocation);
            });
            fileContent.noRunnableProjects.forEach((projectJSON) => {
                this.noRunnableProjects[projectJSON.name] = new project_1.Project(projectJSON, fileContent.projectsLocation);
            });
            this.allProjects = Object.assign(Object.assign({}, this.runnableProjects), this.noRunnableProjects);
        };
        this.execCommand = (command, project) => {
            if (command in project) {
                project[command]();
            }
            else {
                throw new Error(`Command \`${command}\` is not valid. Read README.md to learn more about usage.`);
            }
        };
        this.executeCommandsForProjects = (command, projectNames, options) => {
            const projectList = Object.assign(Object.assign({}, this.runnableProjects), this.noRunnableProjects);
            for (const projectName of projectNames) {
                if (!(projectName in projectList))
                    throw new Error(`Project \`${projectName}\` is not specified in \`${constants_1.constants.CONFIG_FOLDER}/${constants_1.constants.CONFIG_FILE}\` file.\nTo solve this error, you may need to check the project's config and make sure that \`${projectName}\` project is correctly defined.`);
                try {
                    this.execCommand(command, projectList[projectName]);
                }
                catch (error) {
                    if (options.stopOnError)
                        throw error;
                    logger_1.default.err(error);
                }
            }
        };
    }
}
exports.default = ProjectManager;
//# sourceMappingURL=project-manager.js.map