import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class VehicleResolve implements Resolve<IVehicle> {
  constructor(private _dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IVehicle> {
    const { brand, color, vehicle } = route.params as IVehicleForm;
    return this._dataService.getVehicle(vehicle, brand, color);
  }

}
