import { execSync } from "child_process";

import { constants } from "./constants";
import { IProjectManager } from "../types/index";
import { existsSync } from "fs";

/**
 * @typedef { import("./types").IProjectManager } IProjectManager
 */
export default class ProjectManager implements IProjectManager {

    configFileExists = () => {
        return existsSync(`${constants.CONFIG_FOLDER}/${constants.CONFIG_FILE}`);
    }

    generateConfigFolder = () => {
        execSync(`mkdir -p ${constants.CONFIG_FOLDER}`, { stdio: 'inherit' });
    }

    generateConfigFile = () => {
        this.generateConfigFolder();
        if (this.configFileExists()) {
            throw new Error(`Config file can not be generated, ${constants.CONFIG_FILE} have been found in ${constants.CONFIG_FOLDER}.`);
        } else {
            execSync(`cp ./configs/project-names-example.json ${constants.CONFIG_FOLDER}/${constants.CONFIG_FILE}`, { stdio: 'inherit' });
        }
    }
}
