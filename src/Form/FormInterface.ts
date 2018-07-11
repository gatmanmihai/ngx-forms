import { FormBuilder } from '@angular/forms';
import { OptionsResolver } from '..';

export interface FormInterface {
    /**
     * @param {FormBuilder} builder
     * @param {{}} options
     */
    buildForm(builder: FormBuilder, options: {});

    /**
     * @param {OptionsResolver} resolver
     */
    configureOptions(resolver: OptionsResolver);

    /**
     * @returns {string}
     */
    getBlockPrefix(): string;
}