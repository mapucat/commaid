import util             from 'util';

import { ProjectFields, 
    ProjectManagerFields,
    SchType,
    SchemaProp,
    Schemas }           from "../../types";

import branchesSch      from '../schemas/branches.json';
import commandsSch      from '../schemas/commands.json';
import pmSch            from '../schemas/pm.json';
import projectSch       from '../schemas/project.json';
import { Validator } from './validators';

/**
 * Manage application config
 */
export class Config {

    /**
     * Schemas definitions
     */
    private _schemas: Schemas;

    /**
     * Config file errors
     */
    private _errors = [];

    /**
     * Validator of config file
     */
    
    _errMsgs = {
        'require': '"%s" is required.',
        'type'   : 'Expect "%s" to be a typeof %s, but now is %s.',
    }
    
    /**
     * Get schemas definitions
     * @returns {SchemaProp} branchesSch branches schema 
     * @returns {SchemaProp} commandsSch commands schema 
     * @returns {SchemaProp} pmSch project manager schema 
     * @returns {SchemaProp} projectSch project schema 
     */
    get schemas(): Schemas {
        this._schemas = {
            branchesSch: branchesSch as unknown as SchemaProp,
            commandsSch: commandsSch as unknown as SchemaProp,
            pmSch: pmSch as unknown as SchemaProp,
            projectSch: projectSch as unknown as SchemaProp
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
    validateJSON(json: unknown): { errors: string[], config: ProjectManagerFields<ProjectFields> } {
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
            const projectJSON = conf['projects'][name]
            projects[name] = this.validateSchema(projectSch, projectJSON);
            projects[name]['branches'] = projectJSON['branches'] && this.validateSchema(branchesSch, projectJSON['branches']);
            projects[name]['commands'] = projectJSON['commands'] && this.validateSchema(commandsSch, projectJSON['command']);
        }
        res['projects'] = projects;
        return { errors: this._errors, config: res as ProjectManagerFields<ProjectFields> };
    }

    /**
     * Performs validations on conf given a schema
     * @param sch schema to compare
     * @param conf compared value
     * @returns validated and processed configuration
     */
    validateSchema(sch: SchemaProp, conf: unknown): unknown {
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
    validateProp(schAttr: SchType, key: string, conf: unknown): unknown {
        const sch = Object.assign({}, schAttr);
        delete sch.default;
        for (const prop in sch) {
            if(!this.hasError(
                Validator.isValid(prop, sch[prop], conf[key]),
                this._errMsgs[prop], 
                key,
                sch[prop],
                typeof conf[key]
            )) return;
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
    hasError(condition: boolean, errMsgs: string, ...args: unknown[]): boolean {
        const count = (errMsgs.match(/(?<!%)%(?!%)/g) || []).length;
        if (!condition) this._errors.push(util.format(errMsgs, ...args.slice(0, count)));
        return condition;
    }
}

export default new Config();

