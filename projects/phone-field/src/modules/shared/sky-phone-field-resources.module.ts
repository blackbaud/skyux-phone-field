/**
 * NOTICE: DO NOT MODIFY THIS FILE!
 * The contents of this file were automatically generated by
 * the 'ng generate @skyux/i18n:lib-resources-module modules/shared/sky-phone-field' schematic.
 * To update this file, simply rerun the command.
 */

import { NgModule } from '@angular/core';
import {
  getLibStringForLocale,
  SkyAppLocaleInfo,
  SkyI18nModule,
  SkyLibResources,
  SkyLibResourcesProvider,
  SKY_LIB_RESOURCES_PROVIDERS
} from '@skyux/i18n';

const RESOURCES: { [locale: string]: SkyLibResources } = {
  'EN-US': {"skyux_phone_field_default_label":{"message":"Phone number"},"skyux_phone_field_country_search_dismiss":{"message":"Dismiss country search"},"skyux_phone_field_country_search_label":{"message":"Dismiss country search"},"skyux_phone_field_country_search_placeholder":{"message":"Search for a country"},"skyux_phone_field_country_select_label":{"message":"Choose country."},"skyux_phone_field_country_selected_label":{"message":"{0} is currently selected."}},
};

export class SkyPhoneFieldResourcesProvider implements SkyLibResourcesProvider {
  public getString(localeInfo: SkyAppLocaleInfo, name: string): string {
    return getLibStringForLocale(RESOURCES, localeInfo.locale, name);
  }
}

/**
 * Import into any component library module that needs to use resource strings.
 */
@NgModule({
  exports: [SkyI18nModule],
  providers: [{
    provide: SKY_LIB_RESOURCES_PROVIDERS,
    useClass: SkyPhoneFieldResourcesProvider,
    multi: true
  }]
})
export class SkyPhoneFieldResourcesModule { }
