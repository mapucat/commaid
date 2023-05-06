/**
 * Possible executable accions in a project
 */

import { Project } from "../src/project";

export interface Commands<T> {
    clone: T,
    install: T,
    update: T
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
     * get projects names given user's input
     */
    getProjectNames(projectNamesInput: string[]): string[];

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
    execCommand(command: keyof Commands<string>, project: Project, options: ProcessingOptions): void

    /**
     * Execute a command in several projects
     * @param command ommand to execute, must be defined inside Commands properties
     * @param projectNames project's names in which the command will be executed
     */
    executeCommandsForProjects(command: keyof Commands<string>, projectNames: string[], options: ProcessingOptions): void
}

/**
 * Project manager definition
 */
export interface ProjectManagerDefinition {
    /**
     * Projects's main location.
     */
    cwd: string;

    /**
     * General project's git user.
     * This value will be replaced on project's url.
     */
    user: string;

    /**
     * Runnable Projects's list.
     */
    runnableProjects: IProject<unknown>[];

    /**
     * No runnable Projects's list.
     */
    noRunnableProjects: IProject<unknown>[];
}

/**
 * Project properties
 */
export interface ProjectDefinition {
    /**
     * Project's name.
     */
    name: string;

    /**
     * Git project's url, could be the https or ssh url.
     */
    originUrl: string;

    /**
     * Specific project's git user.
     * This value will be replaced on project's url.
     */
    user: string;

    /**
     * Project's branches.
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

    /**
     * Specific project's location
     */
    cwd?: string;

    /**
     * Possible executable accions in a project
     */
    commands?: Commands<string>;
}

/**
 * Git project's information
 */
export interface IProject<FunctionType> extends ProjectDefinition, Commands<FunctionType> {

    /**
     * Print command and project's name on terminal.
     * @param command command to be executed.
     */
    announceCommand(command: string): void;
}

/**
 * Processing options.
 */
export interface ProcessingOptions {
    projects?: string[],
    stopOnError?: boolean,
    branch?: string
}
