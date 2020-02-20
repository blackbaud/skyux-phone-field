export interface SkyCountrySelectCountry {
  name: string;
  iso2: string;
  // NOTE: We intentionally don't document these properties as they are internal use properties
  priority?: number;
}
