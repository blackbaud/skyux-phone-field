import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  SkyStatusIndicatorModule
} from '@skyux/indicators';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyPhoneFieldCountry,
  SkyPhoneFieldNumberReturnFormat
} from '@skyux/phone-field';

import {
  SkyPhoneFieldFixture
} from './phone-field-fixture';

import {
  SkyPhoneFieldTestingModule
} from './phone-field-testing.module';

const COUNTRY_AU: SkyPhoneFieldCountry = {
  name: 'Australia',
  iso2: 'au',
  dialCode: '+61'
};
const COUNTRY_US: SkyPhoneFieldCountry = {
  name: 'United States',
  iso2: 'us',
  dialCode: '+1'
};
const DATA_SKY_ID = 'test-phone-field';
const VALID_AU_NUMBER = '0212345678';
const VALID_US_NUMBER = '8675555309';

//#region Test component
@Component({
  selector: 'phone-field-test',
  template: `
  <form
    class='phone-field-demo'
    [formGroup]="phoneForm"
  >
    <sky-phone-field
      data-sky-id="${DATA_SKY_ID}"
      [allowExtensions]="allowExtensions"
      [defaultCountry]="defaultCountry"
      [returnFormat]="returnFormat"
      [supportedCountryISOs]="supportedCountryISOs"
      [(selectedCountry)]="selectedCountry"
      (selectedCountryChange)="selectedCountryChange($event)"
    >
      <input
        formControlName="phoneControl"
        skyPhoneFieldInput
        [skyPhoneFieldNoValidate]="noValidate"
      >
    </sky-phone-field>

    <sky-status-indicator *ngIf="!phoneControl.valid"
      descriptionType="none"
      indicatorType="danger"
    >
      Enter a phone number matching the format for the selected country.
    </sky-status-indicator>
  </form>
`
})
class PhoneFieldTestComponent implements OnInit {
  public allowExtensions: boolean = true;
  public defaultCountry: string;
  public noValidate: boolean = false;
  public returnFormat: SkyPhoneFieldNumberReturnFormat;
  public selectedCountry: SkyPhoneFieldCountry;
  public showInvalidDirective: boolean = false;
  public supportedCountryISOs: string[];

  public phoneControl: FormControl;
  public phoneForm: FormGroup;

  public selectedCountryChange(query: string) { }

  public ngOnInit(): void {
    this.phoneControl = new FormControl();
    this.phoneForm = new FormGroup({
      'phoneControl': this.phoneControl
    });
  }
}
//#endregion Test component

fdescribe('PhoneField fixture', () => {
  let fixture: ComponentFixture<PhoneFieldTestComponent>;
  let testComponent: PhoneFieldTestComponent;
  let phonefieldFixture: SkyPhoneFieldFixture;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        PhoneFieldTestComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SkyPhoneFieldTestingModule,
        SkyStatusIndicatorModule
      ]
    });

    // create the fixture, waiting until it's stable since it selects a country on init
    fixture = TestBed.createComponent(
      PhoneFieldTestComponent
    );
    testComponent = fixture.componentInstance;
    phonefieldFixture = new SkyPhoneFieldFixture(fixture, DATA_SKY_ID);
  });

  /* --> Doesn't work because of default format initialization
  it('should allow changing default country', async () => {

    const returnFormat = testComponent.returnFormat;

    // change the default country
    testComponent.defaultCountry = COUNTRY_AU.iso2;
    fixture.detectChanges();
    await fixture.whenStable();

    // verify selected country
    expect(testComponent.selectedCountry.name).toBe(COUNTRY_AU.name);
    expect(testComponent.returnFormat).toEqual(returnFormat);

    // enter a valid phone number for the default country
    await phonefieldFixture.setInputText(VALID_AU_NUMBER);

    // expect the model to use the proper dial code and format
    expect(phonefieldFixture.inputText).toBe(VALID_AU_NUMBER);
    expect(testComponent.modelValue).toEqual('+61 2 1234 5678');
  });
  */
  it('should allow exensions by default', async () => {
    // enter a valid phone number for the default country
    const validNumberWithExt = `${COUNTRY_US.dialCode} ${VALID_US_NUMBER} ext 4`;
    await phonefieldFixture.setInputText(validNumberWithExt);

    // expect the model to contain the extension and be valid
    expect(phonefieldFixture.inputText).toBe(validNumberWithExt);
    expect(testComponent.phoneControl.value).toEqual('(867) 555-5309 ext. 4');
    expect(testComponent.phoneForm.valid).toBeTrue();
  });

  it('should honor allowExtensions flag', async () => {
    // turn off extensions
    testComponent.allowExtensions = false;
    fixture.detectChanges();
    await fixture.whenStable();

    // enter a valid phone number for the default country
    const validNumberWithExt = `${COUNTRY_US.dialCode} ${VALID_US_NUMBER} ext 4`;
    await phonefieldFixture.setInputText(validNumberWithExt);

    // expect the model to contain the extension, but be invalid
    expect(phonefieldFixture.inputText).toBe(validNumberWithExt);
    expect(testComponent.phoneControl.value).toEqual('(867) 555-5309 ext. 4');
    expect(testComponent.phoneForm.valid).toBeFalse();
  });

  it('should use selected country', async () => {
    // enter a valid phone number for the default country
    await phonefieldFixture.setInputText(VALID_US_NUMBER);

    // expect the model to use the proper dial code and format
    expect(phonefieldFixture.inputText).toBe(VALID_US_NUMBER);
    expect(testComponent.phoneControl.value).toEqual('(867) 555-5309');
  });

  it('should use newly selected country', async () => {
    const selectedCountryChangeSpy = spyOn(fixture.componentInstance, 'selectedCountryChange');

    // change the country
    await phonefieldFixture.selectCountry(COUNTRY_AU.name);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(testComponent.selectedCountry.name).toBe(COUNTRY_AU.name);
    expect(selectedCountryChangeSpy).toHaveBeenCalledWith(jasmine.objectContaining(COUNTRY_AU));

    // enter a valid phone number for the new country
    await phonefieldFixture.setInputText(VALID_AU_NUMBER);

    // expect the model to use the proper dial code and format
    expect(phonefieldFixture.inputText).toBe(VALID_AU_NUMBER);
    expect(testComponent.phoneControl.value).toEqual('+61 2 1234 5678');
  });
});
