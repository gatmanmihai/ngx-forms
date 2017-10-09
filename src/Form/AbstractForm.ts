import { FormBuilder, FormGroup } from '@angular/forms';
import * as changeCase from 'change-case';
import { OptionsResolver } from '../OptionsResolver/OptionsResolver';
import { FormInterface } from './FormInterface';

export abstract class AbstractForm extends FormGroup implements FormInterface {
    constructor() {
        super({});
    }

    public buildForm(builder: FormBuilder, options: {}) {
    }

    public configureOptions(resolver: OptionsResolver) {
    }

    public getBlockPrefix() {
        return this.constructor['name'];
    }

    /**
     * @returns {Object}
     */
    toSimpleObject(): Object {
        const result                                        = {};
        result[changeCase.snakeCase(this.getBlockPrefix())] = this.value;
        return result;
    }
}