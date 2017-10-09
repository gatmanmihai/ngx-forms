Angular Forms on "small" steroids ;)

# Installation

```bash
npm i @gatman/ngx-forms --save
```

# Usage

```typescript
import { FormFactory } from '@gatman/ngx-forms/dist';

@NgModule({
    providers:    [FormFactory]
})
export class AppModule {
}
```

Create a class for your form

```typescript
// MyForm.ts

import { FormBuilder, Validators } from "@angular/forms";
import { AbstractForm, OptionsResolver } from '@gatman/ngx-forms/dist';

export class MyForm extends AbstractForm {
    /**
     * @param {FormBuilder} builder
     * @param {{}} options
     */
    buildForm(builder: FormBuilder, options) {
        this.addControls({
            'my_control_name': builder.control(null, [Validators.required])
        });
    }
}
```

Call FormFactory to create your form

```typescript
import { Component, OnInit } from "@angular/core";
import { FormFactory } from '@gatman/ngx-forms/dist';
import { MyForm } from './MyForm.ts';

@Component({
    selector: 'app-base',
    template: `html content`
})
export class BaseComponent implements OnInit {
    form:MyForm;
    
    constructor(protected formFactory: FormFactory) {
    }
    
    ngOnInit() {
        this.form = this.formFactory.create(MyForm)
    }
    
    submit() {
        if (this.form.valid) {
            console.log(this.form.toSimpleObject());
            
            return;
        }
        
        console.log('form.invalid');
        
        return;
    }
}
```

```html
<form *ngIf="form" [formGroup]="form" (submit)="submit()">
    <input [formControlName]="'my_control_name'" />
    
    <button type="submit">Submit</button>
</form>
```

# Set default data for form

Create a model
```typescript
// MyUser.ts

export class MyUser {
    username:string = 'Default Username';
}
```

Update your component

```typescript
const user = new MyUser();

this.form = this.formFactory.create(MyForm, user);
```

Update your form class

```typescript
// MyForm.ts

import { FormBuilder, Validators } from "@angular/forms";
import { AbstractForm, OptionsResolver } from '@gatman/ngx-forms/dist';
import { MyUser } from './MyUser';

export class MyForm extends AbstractForm {
    /**
     * @param {FormBuilder} builder
     * @param {{}} options
     */
    buildForm(builder: FormBuilder, options) {
        this.addControls({
            'username': builder.control(null, [Validators.required]) // do not set the control value here, it will be automatically set later from data that you passed to Form class
        });
    }

    configureOptions(resolver: OptionsResolver) {
        resolver.setDefaults({
            'data_class': MyUser
        })
    }

    getBlockPrefix() {
        return 'user';
    }
}
```

# Pass options to your form

Update your component

```typescript
const user = new MyUser();

this.form = this.formFactory.create(MyForm, user, {
    'option_1': 'value_1'
});
```

Update your form class

```typescript
// MyForm.ts

import { FormBuilder, Validators } from "@angular/forms";
import { AbstractForm, OptionsResolver } from '@gatman/ngx-forms/dist';
import { MyUser } from './MyUser';

export class MyForm extends AbstractForm {
    /**
     * @param {FormBuilder} builder
     * @param {{}} options
     */
    buildForm(builder: FormBuilder, options) {
        const myUser = options.data;
        
        // other available options are options that you configured in configureOptions() method
        
        this.addControls({
            'username': builder.control(null, [Validators.required])
        });
    }
    
    configureOptions(resolver: OptionsResolver) {
        resolver.setDefaults({
            'data_class': MyUser,
            'option_2': 'value_2'
        });
        
        resolver.setRequired(['option_1']);
    }

    getBlockPrefix() {
        return 'user';
    }
}
```

# License
MIT
