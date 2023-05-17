import { execSync }         from 'child_process';
import { existsSync }       from 'fs';
import path                 from 'path';

import { COMMON_COMMANDS,
    constants }             from '../constants';
import { Commands,
    IProject,
    OverwritableProps,
    ProcessingOptions,
    ProjectFields, 
    ProjectFunctionType, 
    Scripts }               from '../../types/index';
import logger               from '../utils/logger';

/**
 * @typedef { import("../types").IProject } IProject
 */
export class Project implements IProject<ProjectFunctionType> {
    name: string;
    originUrl: string;
    branches: {
        main: string;
    };

    cwd = '';
    user = '';
    commands: Commands<string>;
    scripts: Scripts;

    constructor(name: string, pmProps: OverwritableProps, pf: ProjectFields){
        this.name = name;
        this.originUrl = pf.originUrl;
        this.branches = pf.branches;
        // Set properties
        this.cwd = pf.cwd || pmProps.cwd;
        this.user = pmProps.user || pmProps.user || '';
        this.commands = {
            clone: pmProps.commands?.clone ||  pf.commands?.clone || COMMON_COMMANDS.clone,
            install: pmProps.commands?.install ||  pf.commands?.install || COMMON_COMMANDS.install,
            update: pmProps.commands?.update ||  pf.commands?.update || COMMON_COMMANDS.update,
            exec: ''
        };
        this.setScripts(pmProps.scripts, pf.scripts);
    }

    private setScripts(opt1: Scripts = {}, opt2: Scripts = {}) {
        this.scripts = {};
        const props = Object.keys(opt1).concat(Object.keys(opt2));
        [...new Set(props)].forEach((prop: string) => {
            this.scripts[prop] = opt1[prop] || opt2[prop];
        });
    }

    announceCommand = (command: string): void => {
        logger.printOut('');
        logger.info(`Project: ${this.name}`);
        logger.printOut('');
        logger.printOut(`> ${command}\n`);
    }

    clone = () => {
        const command = this.commands.clone.replace(/<url>/gi, this.originUrl).replace(/<user>/gi, this.user);
        this.announceCommand(command);
        if (!existsSync(this.cwd)) throw new Error(`Working directory \`${this.cwd}\` not found.`) 
        execSync(command, { cwd: this.cwd, stdio: 'inherit' });
    }

    install = () => {
        const command = this.commands.install;
        this.announceCommand(command);
        execSync(command, { cwd: path.join(this.cwd, this.name), stdio: 'inherit' });
    }

    update({ branch }: ProcessingOptions) {
        if (!this.branches[branch]) throw new Error(`Branch \`${branch}\` not found in \`${this.name}\` definition. Add this branch into ${constants.CONFIG_FILE_PATH}.`) 
        const command = this.commands.update.replace(/<branch>/gi, this.branches[branch]);
        this.announceCommand(command);
        execSync(command, { cwd: path.join(this.cwd, this.name), stdio: 'inherit' });
    }

    exec({ command }: ProcessingOptions) {
        const commandToExec = command[0] in this.scripts ? this.scripts[command[0]] : command.join(' '); 
        this.announceCommand(commandToExec);
        if (!(command[0] in this.scripts)) logger.warn(`Script \`${command[0]}\` not found in \`${this.name}\` definition. If you are trying to use a script, add it in \`scripts\` property into ${constants.CONFIG_FILE_PATH}.`);
        execSync(commandToExec, { cwd: path.join(this.cwd, this.name), stdio: 'inherit' });
    }
}
