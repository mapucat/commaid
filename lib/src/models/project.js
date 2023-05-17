"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
const logger_1 = __importDefault(require("../utils/logger"));
/**
 * @typedef { import("../types").IProject } IProject
 */
class Project {
    constructor(name, pmProps, pf) {
        var _a, _b, _c, _d, _e, _f;
        this.cwd = '';
        this.user = '';
        this.announceCommand = (command) => {
            logger_1.default.printOut('');
            logger_1.default.info(`Project: ${this.name}`);
            logger_1.default.printOut('');
            logger_1.default.printOut(`> ${command}\n`);
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
        this.commands = {
            clone: ((_a = pmProps.commands) === null || _a === void 0 ? void 0 : _a.clone) || ((_b = pf.commands) === null || _b === void 0 ? void 0 : _b.clone) || constants_1.COMMON_COMMANDS.clone,
            install: ((_c = pmProps.commands) === null || _c === void 0 ? void 0 : _c.install) || ((_d = pf.commands) === null || _d === void 0 ? void 0 : _d.install) || constants_1.COMMON_COMMANDS.install,
            update: ((_e = pmProps.commands) === null || _e === void 0 ? void 0 : _e.update) || ((_f = pf.commands) === null || _f === void 0 ? void 0 : _f.update) || constants_1.COMMON_COMMANDS.update,
            exec: ''
        };
        this.setScripts(pmProps.scripts, pf.scripts);
    }
    setScripts(opt1 = {}, opt2 = {}) {
        this.scripts = {};
        const props = Object.keys(opt1).concat(Object.keys(opt2));
        [...new Set(props)].forEach((prop) => {
            this.scripts[prop] = opt1[prop] || opt2[prop];
        });
    }
    update({ branch }) {
        if (!this.branches[branch])
            throw new Error(`Branch \`${branch}\` not found in \`${this.name}\` definition. Add this branch into ${constants_1.constants.CONFIG_FILE_PATH}.`);
        const command = this.commands.update.replace(/<branch>/gi, this.branches[branch]);
        this.announceCommand(command);
        (0, child_process_1.execSync)(command, { cwd: path_1.default.join(this.cwd, this.name), stdio: 'inherit' });
    }
    exec({ command }) {
        const commandToExec = command[0] in this.scripts ? this.scripts[command[0]] : command.join(' ');
        this.announceCommand(commandToExec);
        if (!(command[0] in this.scripts))
            logger_1.default.warn(`Script \`${command[0]}\` not found in \`${this.name}\` definition. If you are trying to use a script, add it in \`scripts\` property into ${constants_1.constants.CONFIG_FILE_PATH}.`);
        (0, child_process_1.execSync)(commandToExec, { cwd: path_1.default.join(this.cwd, this.name), stdio: 'inherit' });
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map