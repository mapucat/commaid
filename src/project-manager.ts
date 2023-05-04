import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";

import { constants } from "./constants";
import { Commands, IProjectManager, ProjectDefinition, ProjectManagerDefinition } from "../types/index";
import { Project } from "./project";
import logger from "./helpers/logger";

/**
 * @typedef { import("./types").IProjectManager } IProjectManager
 */
export default class ProjectManager implements IProjectManager {

    CONFIG_FILE_PATH = `${constants.CONFIG_FOLDER}/${constants.CONFIG_FILE}`;

    runnableProjects: { [x: string]: Project } = {};
    noRunnableProjects: { [x: string]: Project } = {};
    allProjects: { [x: string]: Project } = {};

    configFileExists = () => {
        return existsSync(this.CONFIG_FILE_PATH);
    }

    generateConfigFolder = () => {
        execSync(`mkdir -p ${constants.CONFIG_FOLDER}`, { stdio: 'inherit' });
    }

    generateConfigFile = () => {
        this.generateConfigFolder();
        if (this.configFileExists()) {
            throw new Error(`Config file can not be generated, ${constants.CONFIG_FILE} have been found in ${constants.CONFIG_FOLDER}.`);
        } else {
            execSync(`cp ./configs/project-names-example.json ${constants.CONFIG_FOLDER}/${constants.CONFIG_FILE}`, { stdio: 'inherit' });
            logger.info(`Config file ${constants.CONFIG_FILE} have been created in ${constants.CONFIG_FOLDER}. Update the file with your own values.`);
        }
    }

    loadProjectsFromFile = (): void => {
        // Create file if it does not exists
        if (!this.configFileExists()) {
            throw new Error(`No ${constants.CONFIG_FILE} found in ${constants.CONFIG_FOLDER}. Use \`commaid init\` to generate your own project's file.`);
        }
        
        const data = readFileSync(this.CONFIG_FILE_PATH).toString();
        const fileContent: ProjectManagerDefinition = JSON.parse(data) as ProjectManagerDefinition;

        fileContent.runnableProjects.forEach((projectJSON: ProjectDefinition) => {
            this.runnableProjects[projectJSON.name] = new Project(projectJSON, fileContent.projectsLocation);
        });

        fileContent.noRunnableProjects.forEach((projectJSON: ProjectDefinition) => {
            this.noRunnableProjects[projectJSON.name] = new Project(projectJSON, fileContent.projectsLocation);
        });

        this.allProjects = { ...this.runnableProjects, ...this.noRunnableProjects };
    }

    execCommand = (command: keyof Commands<string>, project: Project): void => {
        if (command in project) {
            project[command]();
        } else {
            throw new Error(`Command \`${command}\` is not valid. Read README.md to learn more about usage.`);
        }
    }
    
    executeCommandsForProjects = (command: keyof Commands<string>, projectNames: string[]) => {
        const projectList = { ...this.runnableProjects, ...this.noRunnableProjects };
        for (const projectName of projectNames) {
            if (projectName in projectList) {
                this.execCommand(command, projectList[projectName]);
            } else {
                throw new Error(
                    `Project \`${projectName}\` is not specified in \`${constants.CONFIG_FOLDER}/${constants.CONFIG_FILE}\` file.\nTo solve this error, you may need to check the project's config and make sure that \`${projectName}\` project is correctly defined.`);
            }
        }
    };
}
