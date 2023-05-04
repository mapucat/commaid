/**
 * Possible executable accions in a project
 */

import { Project } from "../src/project";

export interface Commands<T> {
    clone: T,
    install: T,
    updateCurrentBranch: T,
    updateBaseBranch: T
}

/**
 * Class used to manage projects
 */
export interface IProjectManager {

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
     */
    execCommand(command: keyof Commands<string>, project: Project): void

    /**
     * Execute a command in several projects
     * @param command ommand to execute, must be defined inside Commands properties
     * @param projectNames project's names in which the command will be executed
     */
    executeCommandsForProjects(command: keyof Commands<string>, projectNames: string[], options: ProcessingOptions): void
}

/**
 * Project properties
 */
export interface ProjectDefinition {
    /**
     * Git project's name
     */
    name: string,

    /**
     * * Git project's url, could be the https or ssh url
     */
    originUrl: string,

    /**
     * Project's base branch
     */
    baseBranch: string,

    /**
     * Project's location
     */
    cwd?: string,

    /**
     * Possible executable accions in a project
     */
    commands?: Commands<string>;
}

/**
 * Project manager definition
 */
export interface ProjectManagerDefinition {
    /**
     * Current working directory
     */
    projectsLocation: string;

    /**
     * Runnable Projects's list
     */
    runnableProjects: IProject<unknown>[];

    /**
     * No runnable Projects's list
     */
    noRunnableProjects: IProject<unknown>[];
}

/**
 * Git project's information
 */
export interface IProject<FunctionType> extends Commands<FunctionType> {
    /**
     * Git project's name
     */
    name: string;

    /**
     * Git project's url, could be the https or ssh url
     */
    originUrl: string;
 
    /**
     * Project's base branch
     */
    baseBranch: string;

    /**
     * Possible executable accions in a project
     */
    commands: Commands<string>;

    /**
     * Print command and project's name on terminal
     * @param command command to be executed
     */
    announceCommand(command: string): void;

    /**
     * Execute command to clone repository
     */
    clone: FunctionType;

    /**
     * Execute command to install repository
     */
    install: FunctionType;

    /**
     * Execute command to install repository
     */
    updateCurrentBranch: FunctionType;

    /**
     * Execute command to install repository
     */
    updateBaseBranch: FunctionType;
}

/**
 * Processing options
 */
export interface ProcessingOptions {
    stopOnError?: boolean
}
