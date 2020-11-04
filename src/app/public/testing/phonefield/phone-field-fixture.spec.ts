import {
  Component
} from '@angular/core';

import {
  ComponentFixture,
  fakeAsync,
  TestBed
} from '@angular/core/testing';

import {
  expect,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

import {
  SkyCountryFieldCountry
} from '@skyux/lookup';

import {
  SkyPhoneFieldNumberReturnFormat,
  SkyPhoneFieldCountry
} from '@skyux/phone-field';

import {
  SkyPhoneFieldFixture
} from './phone-field-fixture';

import {
  SkyPhoneFieldTestingModule
} from './phone-field-testing.module';

const COUNTRY_AU: SkyCountryFieldCountry = {
  iso2: 'au',
  name: 'Australia',
  dialCode: '61'
};
const COUNTRY_US: SkyCountryFieldCountry = {
  name: 'United States',
  iso2: 'us',
  dialCode: '1'
};
const DATA_SKY_ID = 'test-phone-field';
const VALID_AU_NUMBER = '0212345678';
const VALID_US_NUMBER = '8675555309';

//#region Test component
@Component({
  selector: 'phone-field-test',
  template: `
<div>
  <sky-phone-field
    data-sky-id="${DATA_SKY_ID}"
    [allowExtensions]="allowExtensions"
    [defaultCountry]="defaultCountry"
    [returnFormat]="returnFormat"
    [supportedCountryISOs]="supportedCountryISOs"
    [(selectedCountry)]="selectedCountry"
  >
    <input
      [disabled]="isDisabled"
      skyPhoneFieldInput
      [skyPhoneFieldNoValidate]="noValidate"
      [(ngModel)]="modelValue"
    />
  </sky-phone-field>

  <div *ngIf="showInvalidDirective">
    <input
      type="text"
      skyPhoneFieldInput
    />
  </div>
</div>
`
})
class PhoneFieldTestComponent {
  public allowExtensions: boolean = true;
  public defaultCountry: string;
  public isDisabled: boolean = false;
  public modelValue: string;
  public noValidate: boolean = false;
  public returnFormat: SkyPhoneFieldNumberReturnFormat;
  public selectedCountry: SkyPhoneFieldCountry;
  public showInvalidDirective: boolean = false;
  public supportedCountryISOs: string[];
}
//#endregion Test component

describe('PhoneField fixture', () => {
  let fixture: ComponentFixture<PhoneFieldTestComponent>;
  let testComponent: PhoneFieldTestComponent;
  let phonefieldFixture: SkyPhoneFieldFixture;

  //#region helpers
  // function detectChangesFakeAsync(): void {
  //   fixture.detectChanges();
  //   tick();
  // }
  //#endregion

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PhoneFieldTestComponent
      ],
      imports: [
        SkyPhoneFieldTestingModule
      ]
    });

    fixture = TestBed.createComponent(
      PhoneFieldTestComponent
    );
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
    phonefieldFixture = new SkyPhoneFieldFixture(fixture, DATA_SKY_ID);
  });

  it('should expose phone field default values', fakeAsync(async () => {
    // expect all values to be undefined since the popover element does not exist
    expect(phonefieldFixture.countrySearchText).toEqual('');
  }));

  it('should expose phone field properties', fakeAsync(async () => {
    // give properties non-default values
    testComponent.defaultCountry = 'gb';
    fixture.detectChanges();

    // expect all values to be undefined since the popover element does not exist
    // expect(popoverFixture.title).toEqual(testComponent.popoverTitle);
    // expect(SkyAppTestUtility.getText(popoverFixture.body)).toEqual(testComponent.popoverBody);
    // expect(popoverFixture.alignment).toEqual(testComponent.popoverAlignment);
    // expect(popoverFixture.position).toEqual(testComponent.popoverPlacement);
  }));

  it('should use selected country dial code', fakeAsync(async () => {
    // enter a valid phone number (the default country is 'us')
    phonefieldFixture.setInputText(VALID_US_NUMBER);

    // expect the model to use the proper dial code and format
    expect(phonefieldFixture.inputText).toBe(VALID_US_NUMBER);
    expect(testComponent.modelValue).toEqual('(867) 555-5309');
  }));

  it('should use newly selected country dial code', fakeAsync(async () => { }));

  it('should allow extensions by default', fakeAsync(async () => { }));

  it('should honor allow extensions flag', fakeAsync(async () => { }));
});
