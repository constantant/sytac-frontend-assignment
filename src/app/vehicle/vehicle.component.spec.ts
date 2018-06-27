import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { VehicleComponent } from './vehicle.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('VehicleComponent', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;
  const activatedRouteStub = new ActivatedRouteStub();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
    activatedRouteStub.setParams({ color: 'black' });
    activatedRouteStub.setData({
      vehicle: {
        id: 1,
        type: 'car',
        brand: 'Bugatti Veyron',
        colors: [ 'red', 'black' ],
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%28' +
        '1%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._' +
        'April_2012%2C_D%C3%BCsseldorf.jpg'
      }
    });
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterAll(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
