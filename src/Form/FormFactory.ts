import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OptionsResolver } from '../OptionsResolver/OptionsResolver';
import { FormFactoryInterface } from './FormFactoryInterface';
import { FormInterface } from './FormInterface';

@Injectable()
export class FormFactory implements FormFactoryInterface {
    builder: FormBuilder;

    public constructor(builder: FormBuilder) {
        this.builder = builder;
    }

    public create(token, data?: any, options: {} = {}) {
        const form: FormInterface = new token();

        const resolver = new OptionsResolver();
        form.configureOptions(resolver);

        if (null !== data && !options.hasOwnProperty('data')) {
            if (resolver.hasDefault('data_class') && !(data instanceof resolver.offsetGet('data_class'))) {
                throw new Error('Data passed to form should be instance of ' + resolver.offsetGet('data_class'));
            }

            resolver.setRequired(['data']);

            options['data'] = data;
        }

        form.buildForm(this.builder, resolver.resolve(options));

        return form;
    }
}