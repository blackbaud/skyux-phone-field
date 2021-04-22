export interface SkyPhoneFieldFixturePhoneField {

  displayText: string;

  getValue(): Promise<void>;

  setValue(value: string): Promise<void>;

}
