"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const util_1 = __importDefault(require("util"));
const branches_json_1 = __importDefault(require("../schemas/branches.json"));
const commands_json_1 = __importDefault(require("../schemas/commands.json"));
const pm_json_1 = __importDefault(require("../schemas/pm.json"));
const project_json_1 = __importDefault(require("../schemas/project.json"));
const validators_1 = require("./validators");
/**
 * Manage application config
 */
class Config {
    constructor() {
        /**
         * Config file errors
         */
        this._errors = [];
        /**
         * Validator of config file
         */
        this._errMsgs = {
            'require': '"%s" is required.',
            'type': 'Expect "%s" to be a typeof %s, but now is %s.',
        };
    }
    /**
     * Get schemas definitions
     * @returns {SchemaProp} branchesSch branches schema
     * @returns {SchemaProp} commandsSch commands schema
     * @returns {SchemaProp} pmSch project manager schema
     * @returns {SchemaProp} projectSch project schema
     */
    get schemas() {
        this._schemas = {
            branchesSch: branches_json_1.default,
            commandsSch: commands_json_1.default,
            pmSch: pm_json_1.default,
            projectSch: project_json_1.default
        };
        return this._schemas;
    }
    /**
     * Validates the config json
     * It returns an object with two properties: errors and config
     * @param {unknown} json config json from config file
     * @returns {errors} represents any errors encountered during the validation process
     * @returns {config} validated and processed configuration
     */
    validateJSON(json) {
        // clone config
        const conf = Object.assign({}, json);
        this._errors = [];
        // Verify project manager data
        const { branchesSch, commandsSch, pmSch, projectSch } = this.schemas;
        const res = this.validateSchema(pmSch, conf);
        res['commands'] = conf['commands'] && this.validateSchema(commandsSch, conf['commands']);
        // Verify project data
        const projects = {};
        for (const name in conf['projects']) {
            const projectJSON = conf['projects'][name];
            projects[name] = this.validateSchema(projectSch, projectJSON);
            projects[name]['branches'] = projectJSON['branches'] && this.validateSchema(branchesSch, projectJSON['branches']);
            projects[name]['commands'] = projectJSON['commands'] && this.validateSchema(commandsSch, projectJSON['command']);
        }
        res['projects'] = projects;
        return { errors: this._errors, config: res };
    }
    /**
     * Performs validations on conf given a schema
     * @param sch schema to compare
     * @param conf compared value
     * @returns validated and processed configuration
     */
    validateSchema(sch, conf) {
        for (const key in sch) {
            this.validateProp(sch[key], key, conf);
        }
        return conf;
    }
    /**
     * Performs validations on conf props given a schema and set default
     * values if defined
     * @param sch schema to compare
     * @param key prop name to verify
     * @param conf compared value
     * @returns {unknown} property's value
     */
    validateProp(schAttr, key, conf) {
        const sch = Object.assign({}, schAttr);
        delete sch.default;
        for (const prop in sch) {
            if (!this.hasError(validators_1.Validator.isValid(prop, sch[prop], conf[key]), this._errMsgs[prop], key, sch[prop], typeof conf[key]))
                return;
        }
        return conf[key] = !conf[key] ? schAttr.default : conf[key];
    }
    /**
     * Given a condition, adds an error to the error list
     * @param condition boolean condition
     * @param errMsgs error message standard, uses a printf like format string.
     * @param args complements to errMsgs, this args will be replaced
     *             in errMsgs.
     * @returns {boolean} condition
     */
    hasError(condition, errMsgs, ...args) {
        const count = (errMsgs.match(/(?<!%)%(?!%)/g) || []).length;
        if (!condition)
            this._errors.push(util_1.default.format(errMsgs, ...args.slice(0, count)));
        return condition;
    }
}
exports.Config = Config;
exports.default = new Config();
//# sourceMappingURL=config.js.map