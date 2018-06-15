import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: [ './vehicle.component.scss' ]
})
export class VehicleComponent implements OnInit {

  data$: Observable<IVehicle>;
  color$: Observable<string>;

  constructor(private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.data$ = this._activatedRoute.data.pipe(
      map((data: Data) => data[ 'vehicle' ])
    );
    this.color$ = this._activatedRoute.params.pipe(
      map((data: Params) => data[ 'color' ])
    );
  }

}
