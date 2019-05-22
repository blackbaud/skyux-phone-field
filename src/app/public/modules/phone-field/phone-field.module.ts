import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyAutocompleteModule
} from '@skyux/lookup';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyPhoneFieldResourcesModule
} from '../shared';

import {
  SkyPhoneFieldComponent
} from './phone-field.component';

import {
  SkyPhoneFieldInputDirective
} from './phone-field-input.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    SkyPhoneFieldComponent,
    SkyPhoneFieldInputDirective
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkyDropdownModule,
    SkyI18nModule,
    SkyPhoneFieldResourcesModule,
    SkyIconModule,
    SkyAutocompleteModule
  ],
  exports: [
    SkyPhoneFieldComponent,
    SkyPhoneFieldInputDirective
  ]
})
export class SkyPhoneFieldModule { }
