import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { COMMON_COMMANDS, constants } from '../src/constants';
import { Commands, IProject, ProjectDefinition } from '../types/index';
import logger from './helpers/logger';

/**
 * @typedef { import("./types").IProject } IProject
 */
export class Project implements IProject<(...args: string[]) => void> {
    name: string;
    originUrl: string;
    baseBranch: string;
    cwd: string;
    commands: Commands<string> = COMMON_COMMANDS;

    constructor(pd: ProjectDefinition, projectsLocation: string){
        this.name = pd.name;
        this.originUrl = pd.originUrl;
        this.baseBranch = pd.baseBranch;
        // Set default properties
        this.cwd = pd.cwd ? pd.cwd : `${projectsLocation}`;
        if (Object.keys(pd.commands || {}).length !== 0) this.commands = { ...COMMON_COMMANDS, ...pd.commands};
    }

    announceCommand = (command: string) => {
        // console.log(`\n\n> `);
        logger.info(constants.PREFIX_MSG + `${command} for ${this.name}\n`);
    }

    clone = () => {
        const command = this.commands.clone.replace('<url>', this.originUrl).replace('<user>', process.env.USER);
        this.announceCommand(command);
        if (!existsSync(this.cwd)) throw new Error(`Working directory \`${this.cwd}\` not found.`) 
        execSync(command, { cwd: this.cwd, stdio: 'inherit' });
    }

    install = () => {
        const command = this.commands.install;
        logger.info(constants.PREFIX_MSG + `${command} for ${this.name}\n`);
        execSync(command, { cwd: `${this.cwd}\\${this.name}`, stdio: 'inherit' });
    }

    updateCurrentBranch = () => {
        const command = this.commands.updateCurrentBranch;
        this.announceCommand(command);
        execSync(command, { cwd: `${this.cwd}\\${this.name}`, stdio: 'inherit' });
    }

    updateBaseBranch() {
        const command = this.commands.updateBaseBranch.replace('<main-branch>', this.baseBranch).replace('<main-branch>', this.baseBranch);
        this.announceCommand(command);
        execSync(command, { cwd: `${this.cwd}\\${this.name}`, stdio: 'inherit' });
    }
}
