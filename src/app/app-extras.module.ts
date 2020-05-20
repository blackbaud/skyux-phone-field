import {
  NgModule
} from '@angular/core';

import {
  SkyDocsToolsModule,
  SkyDocsToolsOptions
} from '@skyux/docs-tools';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyPhoneFieldModule
} from './public';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyDocsToolsModule,
    SkyPhoneFieldModule,
    NoopAnimationsModule
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-forms',
        packageName: '@skyux/phone-field'
      }
    }
  ]
})
export class AppExtrasModule { }
