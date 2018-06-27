import { convertToParamMap, Data, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
  private _subjectParamMap$ = new ReplaySubject<ParamMap>();
  private _subjectParams$ = new ReplaySubject<Params>();
  private _subjectData$ = new ReplaySubject<Data>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  readonly paramMap = this._subjectParamMap$.asObservable();

  readonly params = this._subjectParamMap$.asObservable();

  readonly data = this._subjectData$.asObservable();

  setParamMap(params?: Params) {
    this._subjectParamMap$.next(convertToParamMap(params));
  }

  setParams(params?: Params) {
    this._subjectParams$.next(params);
  }

  setData(data: Data) {
    this._subjectData$.next(data);
  }
}
