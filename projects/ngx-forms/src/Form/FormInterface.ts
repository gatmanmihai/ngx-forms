import {FormBuilder} from '@angular/forms';
import {OptionsResolver} from '../OptionsResolver/OptionsResolver';

export interface FormInterface {
  buildForm(builder: FormBuilder, options: {}): void;

  configureOptions(resolver: OptionsResolver): void;

  getBlockPrefix(): string;
}
