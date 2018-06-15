import { TestBed, inject } from '@angular/core/testing';

import { DataService, TrafficMeisterData } from './data.service';
import { DataStub } from '../../testing/data-stub';
import { switchMap } from 'rxjs/operators';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {
          provide: TrafficMeisterData,
          useClass: DataStub
        }
      ]
    });
  });

  it('should be created', inject([ DataService ], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should return Airbus A400M Atlas', inject([ DataService ], (service: DataService) => {
    const vehicle = 'airplane';
    const brand = 'Airbus A400M Atlas';
    const color = 'white';
    service.fetchData().pipe(
      switchMap(() => service.getVehicle(vehicle, brand, color))
    ).subscribe((_vehicle: IVehicle) => {
      expect(_vehicle.id).toEqual(5);
      expect(_vehicle.type).toEqual(vehicle);
      expect(_vehicle.brand).toEqual(brand);
      expect(_vehicle.colors).toContain(color);
      expect(_vehicle.colors).toContain('red');
    });
  }));
});
