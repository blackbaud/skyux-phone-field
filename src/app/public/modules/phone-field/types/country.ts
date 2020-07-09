export interface SkyPhoneFieldCountry {
  iso2: string;
  dialCode?: string;
  exampleNumber?: string;
  name?: string;
  // NOTE: We intentionally don't document these properties as they are internal use properties
  priority?: number;
  areaCodes?: string[];
}
