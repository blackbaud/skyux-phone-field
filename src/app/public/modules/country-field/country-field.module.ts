import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyAutocompleteModule
} from '@skyux/lookup';

import {
  SkyPhoneFieldResourcesModule
} from '../shared';

import {
  SkyCountryFieldComponent
} from './country-field.component';


@NgModule({
  declarations: [
    SkyCountryFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkyI18nModule,
    SkyPhoneFieldResourcesModule,
    SkyAutocompleteModule
  ],
  exports: [
    SkyCountryFieldComponent
  ]
})
export class SkyCountrySelectModule { }
