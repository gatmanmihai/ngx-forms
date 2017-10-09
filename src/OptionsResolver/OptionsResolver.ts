import * as _ from 'lodash';
import { Options } from './Options';

export class OptionsResolver implements Options {
    protected defined  = {};
    protected defaults = {};
    protected required = {};
    protected resolved = {};

    /**
     * @param {string} option
     * @param value
     * @returns {OptionsResolver}
     */
    public setDefault(option: string, value: any) {
        if (!this.defined.hasOwnProperty(option) || this.resolved.hasOwnProperty(option)) {
            this.resolved[option] = value;
        }

        this.defaults[option] = value;
        this.defined[option]  = true;

        return this;
    }

    /**
     * @param {{}} defaults
     * @returns {OptionsResolver}
     */
    public setDefaults(defaults: {}) {
        for (const key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                this.setDefault(key, defaults[key])
            }
        }

        return this;
    }

    /**
     * @param option
     * @returns {boolean}
     */
    public hasDefault(option) {
        return this.defaults.hasOwnProperty(option);
    }

    /**
     * @param {string[]} optionNames
     * @returns {OptionsResolver}
     */
    public setRequired(optionNames: string[]) {
        for (const optionName of optionNames) {
            this.defined[optionName]  = true;
            this.required[optionName] = true;
        }

        return this;
    }

    /**
     * @param option
     * @returns {boolean}
     */
    public isRequired(option) {
        return this.required.hasOwnProperty(option);
    }

    /**
     * @returns {string[]}
     */
    public getRequiredOptions() {
        return Object.keys(this.required);
    }

    public resolve(options: {} = {}) {

        const clone = Object.create(this);

        let diff = _.difference(Object.keys(options), Object.keys(clone.defined));

        if (diff.length > 0) {
            throw new Error('The options "' + diff.join(', ') + '" do not exist. Defined options are: "' + clone.defined.join(', ') + '".');
        }

        for (const option in options) {
            if (options.hasOwnProperty(option)) {
                clone.defaults[option] = options[option];
                delete clone.resolved[option];
            }
        }

        diff = _.difference(Object.keys(clone.required), Object.keys(clone.defaults));

        if (diff.length > 0) {
            throw new Error('The required options "' + diff.join(', ') + '" are missing.');
        }

        for (let option in clone.defaults) {
            if (clone.defaults.hasOwnProperty(option)) {
                clone.offsetGet(option);
            }
        }

        return clone.resolved;
    }


    public offsetGet(option: string) {
        if (this.resolved.hasOwnProperty(option)) {
            return this.resolved[option];
        }

        // Check whether the option is set at all
        if (!this.defaults.hasOwnProperty(option)) {
            if (!this.defined.hasOwnProperty(option) || !this.defined[option]) {
                throw new Error('options does not exist');
            }

            throw new Error('the optional options has no value set');
        }

        const value = this.defaults[option];

        this.resolved[option] = value;

        return value;
    }
}