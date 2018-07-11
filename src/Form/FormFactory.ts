import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OptionsResolver } from '..';
import { AbstractForm } from './AbstractForm';
import { FormFactoryInterface } from './FormFactoryInterface';

@Injectable()
export class FormFactory implements FormFactoryInterface {
    builder: FormBuilder;

    public constructor(builder: FormBuilder) {
        this.builder = builder;
    }

    public create(token, data?: any, options: {} = {}) {
        const form: AbstractForm = new token();

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
        if (options['data']) {
            form.patchValue(options['data']);
        }

        return form;
    }
}