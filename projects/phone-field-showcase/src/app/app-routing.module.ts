import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneFieldVisualComponent } from './visual/phone-field/phone-field-visual.component';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {
    path: '',
    component: VisualComponent,
  },
  {
    path: 'visual/phone-field',
    component: PhoneFieldVisualComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
