"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const constants_1 = require("./constants");
const fs_1 = require("fs");
/**
 * @typedef { import("./types").IProjectManager } IProjectManager
 */
class ProjectManager {
    constructor() {
        this.configFileExists = () => {
            return (0, fs_1.existsSync)(`${constants_1.constants.CONFIG_FOLDER}/${constants_1.constants.CONFIG_FILE}`);
        };
        this.generateConfigFolder = () => {
            (0, child_process_1.execSync)(`mkdir -p ${constants_1.constants.CONFIG_FOLDER}`, { stdio: 'inherit' });
        };
        this.generateConfigFile = () => {
            this.generateConfigFolder();
            if (this.configFileExists()) {
                throw new Error(`Config file can not be generated, ${constants_1.constants.CONFIG_FILE} have been found in ${constants_1.constants.CONFIG_FOLDER}.`);
            }
            else {
                (0, child_process_1.execSync)(`cp ./configs/project-names-example.json ${constants_1.constants.CONFIG_FOLDER}/${constants_1.constants.CONFIG_FILE}`, { stdio: 'inherit' });
            }
        };
    }
}
exports.default = ProjectManager;
//# sourceMappingURL=project-manager.js.map