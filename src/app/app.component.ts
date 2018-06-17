import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivationEnd, Event, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {

  form: FormGroup;
  vehicles$: Observable<string[]>;
  brands$: Observable<string[]>;
  colors$: Observable<string[]>;

  get loading$() {
    return this._dataService.loading$;
  }

  get error$() {
    return this._dataService.vehicles$.pipe(
      filter(() => false),
      catchError((err: string) => of(err))
    );
  }

  private _dataSubscription: Subscription;
  private _formSubscription: Subscription;
  private _routerSubscription: Subscription;

  constructor(private _formBuilder: FormBuilder,
              private _dataService: DataService,
              private _router: Router) {
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      vehicle: [ '' ],
      brand: [ '' ],
      color: [ '' ]
    }, {
      validator: (form: FormGroup) => {
        const { brand, color, vehicle } = form.value as IVehicleForm;
        return brand && color && vehicle ? null : { error: 'requires to fill the whole form' };
      }
    });
    this.form.disable();

    this._setValues();
    this._formSubscription = this.form.valueChanges.pipe(
      filter(() => this.form.valid)
    ).subscribe((value: IVehicleForm) => {
      const { vehicle, color, brand } = value;
      this._router.navigate([ vehicle, brand, color ]);
    });

    this._routerSubscription = this._router.events.pipe(
      filter((event: Event) => event instanceof ActivationEnd)
    ).subscribe((activationEnd: ActivationEnd) => {
      const { snapshot: { params } } = activationEnd;
      this.form.setValue({
        vehicle: '',
        brand: '',
        color: '',
        ...params
      }, {
        emitEvent: false
      });
    });

    this._loadData();
  }

  ngOnDestroy() {
    if (this._formSubscription) {
      this._formSubscription.unsubscribe();
    }
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
    }
    if (this._routerSubscription) {
      this._routerSubscription.unsubscribe();
    }
  }

  tryAgain() {
    this._loadData();
  }

  private _loadData() {
    this._dataSubscription = this._dataService.fetchData().pipe(
      tap(() => {
        this.form.setValue({
          vehicle: '',
          brand: '',
          color: ''
        });
      }),
      catchError(() => of().pipe(filter(() => false)))
    ).subscribe(() => {
      this._router.events.pipe(
        filter((event: Event) => event instanceof ActivationEnd)
      ).subscribe((activationEnd: ActivationEnd) => {
        const { snapshot: { params } } = activationEnd;
        this.form.setValue({
          vehicle: '',
          brand: '',
          color: '',
          ...params
        });
      });

      this.form.enable();
    });
  }

  private _setValues() {
    this.vehicles$ = this.form.valueChanges.pipe(
      switchMap((value: IVehicleForm) => this._dataService.vehicles$.pipe(
        map((vehicles: IVehicle[]) => [ vehicles, value ]),
        catchError(() => of().pipe(filter(() => false)))
      ))
    ).pipe(
      map(([ vehicles, formValue ]) => {
        const { color, brand } = formValue as IVehicleForm;
        const _list = [];
        return (vehicles as IVehicle[])
          .filter((vehicle: IVehicle) => {
            let hasColor = true;
            let hasBrand = true;
            if (color) {
              hasColor = vehicle.colors.indexOf(color) !== -1;
            }
            if (brand) {
              hasBrand = vehicle.brand === brand;
            }
            if (_list.indexOf(vehicle.type) !== -1) {
              return false;
            }
            return hasColor && hasBrand && _list.push(vehicle.type);
          })
          .map((vehicle: IVehicle) => vehicle.type);
      })
    );

    this.brands$ = this.form.valueChanges.pipe(
      switchMap((value: IVehicleForm) => this._dataService.vehicles$.pipe(
        map((vehicles: IVehicle[]) => [ vehicles, value ]),
        catchError(() => of().pipe(filter(() => false)))
      ))
    ).pipe(
      map(([ vehicles, formValue ]) => {
        const { vehicle, color } = formValue as IVehicleForm;
        return (vehicles as IVehicle[])
          .filter((_vehicle: IVehicle) => {
            let hasColor = true;
            let hasVehicle = true;
            if (color) {
              hasColor = _vehicle.colors.indexOf(color) !== -1;
            }
            if (vehicle) {
              hasVehicle = _vehicle.type === vehicle;
            }
            return hasColor && hasVehicle;
          })
          .map((vehicle: IVehicle) => vehicle.brand);
      })
    );

    this.colors$ = this.form.valueChanges.pipe(
      switchMap((value: IVehicleForm) => this._dataService.vehicles$.pipe(
        map((vehicles: IVehicle[]) => [ vehicles, value ]),
        catchError(() => of().pipe(filter(() => false)))
      ))
    ).pipe(
      switchMap(([ vehicles, formValue ]) => {
        const { vehicle, brand } = formValue as IVehicleForm;
        const colors = (vehicles as IVehicle[])
          .filter((_vehicle: IVehicle) => {
            let hasVehicle = true;
            let hasBrand = true;
            if (vehicle) {
              hasVehicle = _vehicle.type === vehicle;
            }
            if (brand) {
              hasBrand = _vehicle.brand === brand;
            }
            return hasVehicle && hasBrand;
          })
          .map((vehicle: IVehicle) => vehicle.colors);
        const _list = [];
        return of([].concat(...colors).filter((color: string) => {
          const hasColor = _list.indexOf(color) !== -1;
          _list.push(color);
          return !hasColor;
        }));
      })
    );
  }
}
