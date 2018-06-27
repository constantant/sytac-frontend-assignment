import { ActivationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

export class RouterStub {
  get events() {
    return of(this._activationEnd);
  }

  private _activationEnd: ActivationEnd;

  constructor() {
    const snapshot = new ActivatedRouteSnapshot();
    this._activationEnd = new ActivationEnd(snapshot);
  }

  navigate() {
  }
}
