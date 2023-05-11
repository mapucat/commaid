import { execSync }                 from "child_process";
import { existsSync, readFileSync } from "fs";

import { constants }                from "./constants";
import { Commands,
    IProject,
    IProjectManager,
    OverwritableProps,
    ProcessingOptions,
    ProjectFields,
    ProjectFunctionType,
    ProjectManagerFields }      from "../types/index";
import { Project }                  from "./project";
import logger                       from "./utils/logger";

/**
 * @typedef { import("./types").IProjectManager } IProjectManager
 */
export default class ProjectManager implements IProjectManager {

    projects = {};

    configFileExists = () => {
        return existsSync(constants.CONFIG_FILE_PATH);
    }

    getProjectNames = (projectNamesTyped: string[]) => {
        return projectNamesTyped?.length === 0 ? Object.keys(this.projects) : projectNamesTyped;
    }

    generateConfigFolder = () => {
        execSync(`mkdir -p ${constants.CONFIG_FOLDER}`, { stdio: 'inherit' });
    }

    transformProjectList = (pmProps: OverwritableProps, rawProjects: { [x: string]: ProjectFields }): { [x: string]: Project } => {
        return Object.keys(rawProjects).reduce((accumulator: { [x: string]: Project }, currentValue: string) => ({
            ...accumulator,
            [currentValue]: new Project(currentValue, pmProps, rawProjects[currentValue])
        }), {})
    }

    generateConfigFile = () => {
        this.generateConfigFolder();
        if (this.configFileExists()) {
            throw new Error(`Config file can not be generated, ${constants.CONFIG_FILE} have been found in ${constants.CONFIG_FOLDER}.`);
        } else {
            execSync(`cp ./configs/project-names-example.json ${constants.CONFIG_FILE_PATH}`, { stdio: 'inherit' });
            logger.info(`Config file ${constants.CONFIG_FILE} have been created in ${constants.CONFIG_FOLDER}. Update the file with your own values.`);
        }
    }

    loadProjectsFromFile = (): void => {
        if (!this.configFileExists()) {
            throw new Error(`No ${constants.CONFIG_FILE} found in ${constants.CONFIG_FOLDER}. Use \`commaid init\` to generate your own project's file.`);
        }
        const data = readFileSync(constants.CONFIG_FILE_PATH).toString();
        const { projects, ...pmProps } = JSON.parse(data) as ProjectManagerFields<ProjectFields>;
        this.projects = this.transformProjectList(pmProps, projects);
    }

    execCommand = <T extends IProject<ProjectFunctionType>>(command: keyof Commands<string>, project: T, options: ProcessingOptions): void => {
        if (command in project) {
            project[command](options);
        } else {
            throw new Error(`Command \`${command}\` is not valid. Read README.md to learn more about usage.`);
        }
    }
    
    executeCommandsForProjects = (command: keyof Commands<string>, projectNamesTyped: string[], options: ProcessingOptions): void => {
        const projectNames: string[] = this.getProjectNames(projectNamesTyped);
        for (const projectName of projectNames) {
            if (!(projectName in this.projects)) 
                throw new Error(
                    `Project \`${projectName}\` is not specified in \`${constants.CONFIG_FILE_PATH}\` file.
        To solve this error, you may need to check the project's config and make sure that \`${projectName}\` project is correctly defined.`);
            try {
                this.execCommand(command, this.projects[projectName], options);
            } catch(error) {
                if (options.stopOnError) throw error;
                logger.err(error);
            }
        }
    };
}
