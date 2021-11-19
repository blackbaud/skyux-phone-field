import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';
import { SkyInputBoxModule } from '@skyux/forms';
import { SkyPhoneFieldModule } from '@skyux/phone-field';
import { PhoneFieldVisualComponent } from './phone-field/phone-field-visual.component';
import { VisualComponent } from './visual.component';
import { SkyIdModule } from '@skyux/core';

@NgModule({
  declarations: [PhoneFieldVisualComponent, VisualComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SkyE2eThemeSelectorModule,
    SkyIdModule,
    SkyInputBoxModule,
    SkyPhoneFieldModule,
  ],
})
export class VisualModule {}
