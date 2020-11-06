import {
  NgModule
} from '@angular/core';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyPhoneFieldModule
} from '@skyux/phone-field';

import {
  SkyPhoneFieldFixtureAdapterService
} from './phone-field-fixture-adapter.service';

@NgModule({
  exports: [
    SkyPhoneFieldModule,

    // The noop animations module needs to be loaded last to avoid
    // subsequent modules adding animations and overriding this.
    NoopAnimationsModule
  ],
  providers: [
    SkyPhoneFieldFixtureAdapterService
  ]
})
export class SkyPhoneFieldTestingModule { }
