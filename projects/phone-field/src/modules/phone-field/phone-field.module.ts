import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SkyIconModule } from '@skyux/indicators';

import { SkyI18nModule } from '@skyux/i18n';

import { SkyCountryFieldModule } from '@skyux/lookup';

import { SkyThemeModule } from '@skyux/theme';

import { SkyPhoneFieldResourcesModule } from '../shared/sky-phone-field-resources.module';

import { SkyPhoneFieldComponent } from './phone-field.component';

import { SkyPhoneFieldInputDirective } from './phone-field-input.directive';

@NgModule({
  declarations: [SkyPhoneFieldComponent, SkyPhoneFieldInputDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkyCountryFieldModule,
    SkyI18nModule,
    SkyIconModule,
    SkyPhoneFieldResourcesModule,
    SkyThemeModule,
  ],
  exports: [SkyPhoneFieldComponent, SkyPhoneFieldInputDirective],
})
export class SkyPhoneFieldModule {}
