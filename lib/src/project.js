"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const constants_1 = require("../src/constants");
const logger_1 = __importDefault(require("./utils/logger"));
/**
 * @typedef { import("./types").IProject } IProject
 */
class Project {
    constructor(name, pmProps, pf) {
        this.cwd = '';
        this.user = '';
        this.commands = constants_1.COMMON_COMMANDS;
        this.scripts = {};
        this.announceCommand = (command) => {
            console.log('');
            logger_1.default.info(`Project: ${this.name}`);
            console.log('');
            console.log(`> ${command}\n`);
        };
        this.clone = () => {
            const command = this.commands.clone.replace(/<url>/gi, this.originUrl).replace(/<user>/gi, this.user);
            this.announceCommand(command);
            if (!(0, fs_1.existsSync)(this.cwd))
                throw new Error(`Working directory \`${this.cwd}\` not found.`);
            (0, child_process_1.execSync)(command, { cwd: this.cwd, stdio: 'inherit' });
        };
        this.install = () => {
            const command = this.commands.install;
            this.announceCommand(command);
            (0, child_process_1.execSync)(command, { cwd: path_1.default.join(this.cwd, this.name), stdio: 'inherit' });
        };
        this.name = name;
        this.originUrl = pf.originUrl;
        this.branches = pf.branches;
        // Set properties
        this.cwd = pf.cwd || pmProps.cwd;
        this.user = pmProps.user || pmProps.user || '';
        this.commands = Object.assign(Object.assign(Object.assign({}, this.commands), pmProps.commands), pf.commands);
        this.scripts = Object.assign(Object.assign({}, pmProps.scripts), pf.scripts);
    }
    update({ branch }) {
        if (!this.branches[branch])
            throw new Error(`Branch \`${branch}\` not found in \`${this.name}\` definition. Add this branch into ${constants_1.constants.CONFIG_FILE_PATH}.`);
        const command = this.commands.update.replace(/<branch>/gi, this.branches[branch]);
        this.announceCommand(command);
        (0, child_process_1.execSync)(command, { cwd: path_1.default.join(this.cwd, this.name), stdio: 'inherit' });
    }
    exec({ command }) {
        const commandToExec = command.join(' ');
        this.announceCommand(commandToExec);
        (0, child_process_1.execSync)(commandToExec, { cwd: path_1.default.join(this.cwd, this.name), stdio: 'inherit' });
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map