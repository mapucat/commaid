/**
 * Set of validation functions or methods. 
 * These methods are designed to validate or verify certain conditions or 
 * requirements on given values.
 */
export class Validator {

    /**
     * Check value existence
     * @param value the compared value to be used in the validation
     * @param require if required
     * @returns {boolean} if value meets the requirement
     */
    require = (value: unknown, require: boolean): boolean => {
        const existValue = value !== null && value !== undefined && (!this.object(value) || Object.keys(value).length > 0)
        return require && existValue;
    }

    /**
     * Check if the value match with the type specified
     * It returns true on null or undefined values
     * @param value the compared value to be used in the validation
     * @param require element type required
     * @returns {boolean} if value meets the requirement
     */
    type = (value: unknown, type: string): boolean => {
        return value === null || value === undefined || this[type](value);
    }

    /**
     * Check if the value entered is array type
     * @param value the compared value to be used in the validation
     * @returns if value is an array
     */
    array = (value: unknown): boolean => {
        return Array.isArray(value)
    }

    /**
     * Check if the value entered is string type
     * @param value the compared value to be used in the validation
     * @returns if value is a string
     */
    string = (value: unknown): boolean => {
        return typeof value === 'string'
    }

    /**
     * Check if the value entered is boolean type
     * @param value the compared value to be used in the validation
     * @returns if value is a boolean
     */
    boolean = (value: unknown): boolean => {
        return typeof value === 'boolean';
    }

    /**
     * Check if the value entered is object type
     * @param value the compared value to be used in the validation
     * @returns if value is an object
     */
    object = (value: unknown): boolean => {
        return !value || !Array.isArray(value) && typeof value === 'object';
    }

    /**
     * * Static function to validate a value given some requirements
     * @param prop specifies the name of the validation function to be invoked 
     *              (required|type)
     * @param source match condition
     * @param compared the compared value to be used in the validation
     * @returns if value compared match the criteria
     */
    public static isValid = (prop: string, source: unknown, compared: unknown): boolean => {
        return new Validator()[prop](compared, source);
    };
}
