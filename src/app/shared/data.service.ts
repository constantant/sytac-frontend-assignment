import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { filter, map, switchMap, take } from 'rxjs/operators';

export class TrafficMeisterData implements ITrafficMeister {
  fetchData(cb: (err: string, data: IVehicle[]) => void): void {
  }
}

@Injectable()
export class DataService {
  get vehicles$(): Observable<IVehicle[]> {
    return this._data$$.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this._loading$$.asObservable();
  }

  private _data$$: BehaviorSubject<IVehicle[]>;
  private _loading$$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private _trafficMeisterData: TrafficMeisterData) {

  }

  fetchData(): Observable<IVehicle[]> {
    this._loading$$.next(true);
    this._data$$ = new BehaviorSubject([]);
    this._trafficMeisterData.fetchData((err: string, data: IVehicle[]) => {
      this._loading$$.next(false);
      if (err) {
        this._data$$.error(err);
        return;
      }
      this._data$$.next(data);
    });
    return this._data$$.pipe(
      filter((vehicle: IVehicle[]) => !!vehicle.length)
    );
  }

  getVehicle(vehicle: string, brand: string, color: string): Observable<IVehicle> {
    return this._data$$.pipe(
      filter((vehicles: IVehicle[]) => !!vehicles.length),
      map(
        (vehicles: IVehicle[]) => vehicles.find(
          (_vehicle: IVehicle) =>
            _vehicle.type === vehicle &&
            _vehicle.colors.indexOf(color) !== -1 &&
            _vehicle.brand === brand
        )
      ),
      switchMap((data: IVehicle) => {
        this._loading$$.next(true);
        const vehicle$ = new Subject<IVehicle>();
        const img = new Image();
        img.onload = () => {
          vehicle$.next(data);
          this._loading$$.next(false);
        };
        img.onerror = () => {
          vehicle$.next({ ...data, img: null });
          this._loading$$.next(false);
        };
        img.src = data.img;
        return vehicle$;
      }),
      take(1)
    );
  }
}
