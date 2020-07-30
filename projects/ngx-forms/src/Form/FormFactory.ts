import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormFactoryInterface} from './FormFactoryInterface';
import {OptionsResolver} from '../OptionsResolver/OptionsResolver';

@Injectable({
  providedIn: 'root'
})
export class FormFactory implements FormFactoryInterface {
  builder: FormBuilder;

  public constructor(builder: FormBuilder) {
    this.builder = builder;
  }

  public create<T>(token, data?: any, options: object = {}): T {
    const form = new token();

    const resolver = new OptionsResolver();
    form.configureOptions(resolver);

    if (null !== data && !options.hasOwnProperty('data')) {
      if (resolver.hasDefault('data_class') && !(data instanceof resolver.offsetGet('data_class'))) {
        throw new Error('Data passed to form should be instance of ' + resolver.offsetGet('data_class'));
      }

      resolver.setRequired(['data']);

      // @ts-ignore
      options.data = data;
    }

    form.buildForm(this.builder, resolver.resolve(options));
    // @ts-ignore
    if (options.hasOwnProperty('data') && options.data) {
      // @ts-ignore
      form.patchValue(options.data);
    }

    return form;
  }
}
