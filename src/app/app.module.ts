import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { SelectComponent } from './select/select.component';
import { SharedModule } from './shared/shared.module';
import { DescriptionComponent } from './description/description.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleResolve } from './vehicle/vehicle-resolve';

export const routes: Routes = [
  { path: '', component: DescriptionComponent },
  { path: ':vehicle/:brand/:color', component: VehicleComponent, resolve: { vehicle: VehicleResolve } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    SelectComponent,
    DescriptionComponent,
    VehicleComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ VehicleResolve ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
