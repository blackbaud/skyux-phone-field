import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyPhoneFieldComponent
} from '../phone-field.component';

import {
  SkyPhoneFieldInputDirective
} from '../phone-field-input.directive';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './phone-field.component.fixture.html'
})
export class PhoneFieldTestComponent {

  @ViewChild(SkyPhoneFieldInputDirective)
  public inputDirective: SkyPhoneFieldInputDirective;

  @ViewChild(SkyPhoneFieldComponent)
  public phoneFieldComponent: SkyPhoneFieldComponent;

  public modelValue: string;

  public isDisabled: boolean = false;

  public defaultCountry: string;

  public noValidate: boolean = false;

}
