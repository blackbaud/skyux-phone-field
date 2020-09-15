import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  SkyPhoneFieldModule
} from '@skyux/phone-field';

import {
  PhoneFieldDemoComponent
} from './phone-field-demo.component';

@NgModule({
  declarations: [
    PhoneFieldDemoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkyPhoneFieldModule
  ],
  exports: [
    PhoneFieldDemoComponent
  ]
})
export class PhoneFieldDemoModule { }
