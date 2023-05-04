"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const constants_1 = require("../src/constants");
const logger_1 = __importDefault(require("./helpers/logger"));
/**
 * @typedef { import("./types").IProject } IProject
 */
class Project {
    constructor(pd, projectsLocation) {
        this.commands = constants_1.COMMON_COMMANDS;
        this.announceCommand = (command) => {
            logger_1.default.info(`> Project: ${this.name}`);
            logger_1.default.info(`> ${command}\n`);
        };
        this.clone = () => {
            const command = this.commands.clone.replace('<url>', this.originUrl).replace('<user>', process.env.USER);
            this.announceCommand(command);
            if (!(0, fs_1.existsSync)(this.cwd))
                throw new Error(`Working directory \`${this.cwd}\` not found.`);
            (0, child_process_1.execSync)(command, { cwd: this.cwd, stdio: 'inherit' });
        };
        this.install = () => {
            const command = this.commands.install;
            this.announceCommand(command);
            (0, child_process_1.execSync)(command, { cwd: `${this.cwd}\\${this.name}`, stdio: 'inherit' });
        };
        this.updateCurrentBranch = () => {
            const command = this.commands.updateCurrentBranch;
            this.announceCommand(command);
            (0, child_process_1.execSync)(command, { cwd: `${this.cwd}\\${this.name}`, stdio: 'inherit' });
        };
        this.name = pd.name;
        this.originUrl = pd.originUrl;
        this.baseBranch = pd.baseBranch;
        // Set default properties
        this.cwd = pd.cwd ? pd.cwd : `${projectsLocation}`;
        if (Object.keys(pd.commands || {}).length !== 0)
            this.commands = Object.assign(Object.assign({}, constants_1.COMMON_COMMANDS), pd.commands);
    }
    updateBaseBranch() {
        const command = this.commands.updateBaseBranch.replace('<main-branch>', this.baseBranch).replace('<main-branch>', this.baseBranch);
        this.announceCommand(command);
        (0, child_process_1.execSync)(command, { cwd: `${this.cwd}\\${this.name}`, stdio: 'inherit' });
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map