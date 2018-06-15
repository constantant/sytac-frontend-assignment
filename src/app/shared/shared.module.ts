import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService, TrafficMeisterData } from './data.service';
import trafficMeister from '../../../service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: TrafficMeisterData,
      useValue: trafficMeister
    },
    DataService
  ],
  declarations: []
})
export class SharedModule {
}
