import {
  NgModule
} from '@angular/core';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyCountrySelectModule,
  SkyPhoneFieldModule
} from './public';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyCountrySelectModule,
    SkyPhoneFieldModule,
    NoopAnimationsModule
  ]
})
export class AppExtrasModule { }
