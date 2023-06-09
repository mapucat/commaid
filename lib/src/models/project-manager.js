"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const constants_1 = require("../constants");
const project_1 = require("./project");
const logger_1 = __importDefault(require("../utils/logger"));
const config_1 = __importDefault(require("../utils/config"));
/**
 * @typedef { import("./types").IProjectManager } IProjectManager
 */
class ProjectManager {
    constructor() {
        this.projects = {};
        this.configFileExists = () => {
            return (0, fs_1.existsSync)(constants_1.constants.CONFIG_FILE_PATH);
        };
        this.getProjectNames = (projectNamesTyped) => {
            return (projectNamesTyped === null || projectNamesTyped === void 0 ? void 0 : projectNamesTyped.length) === 0 ? Object.keys(this.projects) : projectNamesTyped;
        };
        this.generateConfigFolder = () => {
            (0, child_process_1.execSync)(`mkdir ${constants_1.constants.CONFIG_FOLDER}`, { stdio: 'inherit' });
        };
        this.transformProjectList = (pmProps, jsonProjects) => {
            const projects = {};
            for (const key in jsonProjects) {
                projects[key] = new project_1.Project(key, pmProps, jsonProjects[key]);
            }
            return projects;
        };
        this.generateConfigFile = () => {
            this.generateConfigFolder();
            if (this.configFileExists()) {
                throw new Error(`Config file can not be generated, ${constants_1.constants.CONFIG_FILE} have been found in ${constants_1.constants.CONFIG_FOLDER}.`);
            }
            else {
                (0, child_process_1.execSync)(`cp ${constants_1.constants.CONFIG_EXAMPLE} ${constants_1.constants.CONFIG_FILE_PATH}`, { stdio: 'inherit' });
                logger_1.default.info(`Config file ${constants_1.constants.CONFIG_FILE} have been created in ${constants_1.constants.CONFIG_FOLDER}. Update the file with your own values.`);
            }
        };
        this.loadDataFromFile = () => {
            if (!this.configFileExists()) {
                throw new Error(`No ${constants_1.constants.CONFIG_FILE} found in ${constants_1.constants.CONFIG_FOLDER}. Use \`commaid init\` to generate your own project's file.`);
            }
            const data = (0, fs_1.readFileSync)(constants_1.constants.CONFIG_FILE_PATH).toString();
            const { errors, config } = config_1.default.validateJSON(JSON.parse(data));
            if (errors && errors.length > 0) {
                throw new Error(`Validation Error: The provided ${constants_1.constants.CONFIG_FILE} does not match the required schema.
    Next errors found:
        * ${errors.join(`
        * `)}
    Please review README.md file for futher information.`);
            }
            const { projects } = config, pmProps = __rest(config, ["projects"]);
            this.projects = this.transformProjectList(pmProps, projects);
        };
        this.execCommand = (command, project, options) => {
            if (command in project) {
                project[command](options);
            }
            else {
                throw new Error(`Command \`${command}\` is not valid. Read README.md to learn more about usage.`);
            }
        };
        this.executeCommandsForProjects = (command, projectNamesTyped, options) => {
            const projectNames = this.getProjectNames(projectNamesTyped);
            for (const name of projectNames) {
                if (!(name in this.projects))
                    throw new Error(`Project \`${name}\` is not specified in \`${constants_1.constants.CONFIG_FILE_PATH}\` file.
    To solve this error, you may need to check the project's config and make sure that \`${name}\` project is correctly defined.`);
                try {
                    this.execCommand(command, this.projects[name], options);
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