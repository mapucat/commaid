import { Project } from "../src/project";


///////////////////////////////////////////////////
// 
// General types
// 
///////////////////////////////////////////////////


/**
 * Default executable accions in a project
 */
export interface Commands<T> {
    clone: T;
    install: T;
    update: T;
    exec: T;
}

/**
 * Custom scripts defined by user
 */
export interface Scripts extends Commands<string> {
    [x: string]: string;
}

/**
 * Config's file overwritable properties
 */
export interface OverwritableProps {
    /**
     * Git user
     * This value will be replaced on project's url
     */
    user?: string;

    /**
     * Project(s) location
     */
    cwd?: string;

    /**
     * Possible executable accions
     */
    commands?: Commands<string>;

    /**
     * Executable scripts
     */
    scripts?: Scripts;
}

/**
 * Processing options
 */
export interface ProcessingOptions {
    projects: string[];
    stopOnError?: boolean;
    branch?: string;
    command?: string[];
}

///////////////////////////////////////////////////
// 
// Project Manager's types
// 
///////////////////////////////////////////////////

/**
 * Project Manager properties
 */
export interface ProjectManagerFields<T> extends OverwritableProps {
    /**
     * Runnable Projects's list
     */
    runnableProjects: { 
        [x: string]: T;
    };

    /**
     * No runnable Projects's list
     */
    noRunnableProjects: { 
        [x: string]: T;
    };
}

/**
 * Class used to manage projects
 */
export interface IProjectManager extends ProjectManagerFields<IProject<ProjectFunctionType>> {

    /**
     * List of runnable and no runnable projects
     */
    allProjects: { [x: string]: ProjectFunctionType };

    /**
     * Get projects names given user's input
     */
    getProjectNames(projectNamesInput: string[]): string[];

    /**
     * Create a list of Project instances using the project list from config file
     * @param rawProjects project list from config file
     * @param props properties to be overwrited
     */
    transformProjectList(rawProjects: { [x: string]: ProjectFields }, props: OverwritableProps): { [x: string]: Project };

    /**
     * Check config file existence
     */
    configFileExists(): boolean;

    /**
     * Generate commaid config folder
     */
    generateConfigFolder(): void;

    /**
     * Copy sample configs into config folder
     */
    generateConfigFile(): void;

    /**
     * Load configuration defined in config file
     */
    loadProjectsFromFile(): void

    /**
     * Execute a command in a specific project
     * @param command command to execute, must be defined inside Commands properties
     * @param project project in which the command will be executed
     * @param options additional options
     */
    execCommand<T extends IProject<ProjectFunctionType>>(command: keyof Commands<string>, project: T, options: ProcessingOptions): void

    /**
     * Execute a command in several projects
     * @param command ommand to execute, must be defined inside Commands properties
     * @param projectNames project's names in which the command will be executed
     * @param options additional options
     */
    executeCommandsForProjects(command: keyof Commands<string>, projectNames: string[], options: ProcessingOptions): void
}

///////////////////////////////////////////////////
// 
// Project's types
// 
///////////////////////////////////////////////////

/**
 * Project generic function's type
 */
export type ProjectFunctionType = (options: ProcessingOptions) => void;

/**
 * Project properties
 */
export interface ProjectFields extends OverwritableProps {
    /**
     * Project's name
     */
    name: string;

    /**
     * Git project's url, could be the https or ssh url
     */
    originUrl: string;

    /**
     * Project's branches
     */
    branches: {
        /**
         * Base project's branch
         */
        main: string;
        /**
         * Others branches
         */
        [x: string]: string;
    };
}

/**
 * Project's methods
 */
export interface IProject<FunctionType> extends ProjectFields, Commands<FunctionType> {

    /**
     * Print command and project's name on terminal
     * @param command command to be executed
     */
    announceCommand(command: string): void;
}
