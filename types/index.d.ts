/**
 * Possible executable accions in a project
 */

import { Project } from "../src/project";

export interface Commands<T> {
    clone: T,
    install: T,
    updateWorkingBranch: T,
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
     * Project's base branch.
     */
    baseBranch: string;

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

    /**
     * Execute command to clone repository.
     */
    clone: FunctionType;

    /**
     * Execute command to install repository.
     */
    install: FunctionType;

    /**
     * Execute command to update working branch into repository.
     */
    updateWorkingBranch: FunctionType;

    /**
     * Execute command to update main branch into repository.
     */
    updateBaseBranch: FunctionType;
}

/**
 * Processing options.
 */
export interface ProcessingOptions {
    stopOnError?: boolean
}
