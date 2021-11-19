import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-field-visual',
  templateUrl: './phone-field-visual.component.html',
})
export class PhoneFieldVisualComponent implements OnInit {
  public phoneNumber: string;

  public phoneNumberInputBox: string;

  public phoneForm: FormGroup;

  public phoneControl: FormControl;

  public ngOnInit() {
    this.phoneControl = new FormControl();
    this.phoneForm = new FormGroup({
      phoneControl: this.phoneControl,
    });
  }
}
