import {FormBuilder, FormGroup} from '@angular/forms';
import * as changeCase from 'change-case';
import {FormInterface} from './FormInterface';
import {OptionsResolver} from '../OptionsResolver/OptionsResolver';

export abstract class AbstractForm extends FormGroup implements FormInterface {
  constructor() {
    super({});
  }

  public buildForm(builder: FormBuilder, options: {}): void {
  }

  public configureOptions(resolver: OptionsResolver): void {
  }

  public getBlockPrefix(): string {
    return this.constructor.name;
  }

  public toSimpleObject(): object {
    const result = {};
    result[changeCase.snakeCase(this.getBlockPrefix())] = this.value;
    return result;
  }

  protected addControls(controls: object): void {
    for (const controlName in controls) {
      if (controls.hasOwnProperty(controlName)) {
        this.addControl(controlName, controls[controlName]);
      }
    }
  }
}
