import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { DataService } from './shared/data.service';
import { DataServiceStub } from '../testing/data-service-stub';
import { RouterStub } from '../testing/router-stub';
import { SelectStubComponent } from '../testing/select-component-stub';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('AppComponent', () => {
  let testDataService: DataServiceStub;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dataStub: DataService;
  beforeEach(async(() => {
    const testRouter = new RouterStub();
    testDataService = new DataServiceStub();
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SelectStubComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: Router, useValue: testRouter },
        { provide: DataService, useValue: testDataService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents().then(() => {
      dataStub = fixture.debugElement.injector.get(DataService);
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));
  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
  it(`should have a form`, async(() => {
    fixture.detectChanges();
    expect(component.form).toBeDefined();
  }));
  it(`should be available car brands only`, async(() => {
    fixture.detectChanges();
    component.brands$.subscribe((brands: string[]) => {
      expect(brands).toContain('Bugatti Veyron');
      expect(brands).toContain('Ferrari F40');
      expect(brands).toContain('Lamborghini Huracán');
      expect(brands).toContain('Porsche Carrera GT');
      expect(brands).not.toContain('Boeing 787 Dreamliner');
      expect(brands).not.toContain('USRA 0-6-6');
      expect(brands).not.toContain('Canadair North Star');
      expect(brands).not.toContain('Airbus A400M Atlas');
      expect(brands).not.toContain('Bloch MB.131');
      expect(brands).not.toContain('EMD GP40');
      expect(brands).not.toContain('Amer 4-4-0');
    });
    fixture.detectChanges();
    component.form.setValue({
      vehicle: 'car',
      brand: '',
      color: ''
    });
    fixture.detectChanges();
  }));
  it(`should be available car colors only`, async(() => {
    fixture.detectChanges();
    component.colors$.subscribe((colors: string[]) => {
      expect(colors).toContain('red');
      expect(colors).toContain('black');
      expect(colors).toContain('yellow');
      expect(colors).toContain('white');
      expect(colors).toContain('green');
      expect(colors).not.toContain('blue');
      expect(colors).not.toContain('brown');
      expect(colors).not.toContain('grey');
    });
    component.form.setValue({
      vehicle: 'car',
      brand: '',
      color: ''
    });
    fixture.detectChanges();
  }));
  it(`should be available colors of "Ferrari F40" only`, async(() => {
    fixture.detectChanges();
    component.colors$.subscribe((colors: string[]) => {
      expect(colors).toContain('red');
      expect(colors).toContain('yellow');
      expect(colors).not.toContain('black');
      expect(colors).not.toContain('white');
      expect(colors).not.toContain('green');
      expect(colors).not.toContain('blue');
      expect(colors).not.toContain('brown');
      expect(colors).not.toContain('grey');
    });
    component.form.setValue({
      vehicle: 'car',
      brand: 'Ferrari F40',
      color: ''
    });
    fixture.detectChanges();
  }));
  it(`should be available brands of green color only`, async(() => {
    fixture.detectChanges();
    component.brands$.subscribe((brands: string[]) => {
      expect(brands).toContain('Boeing 787 Dreamliner');
      expect(brands).toContain('Canadair North Star');
      expect(brands).toContain('Porsche Carrera GT');
      expect(brands).not.toContain('Bugatti Veyron');
      expect(brands).not.toContain('Ferrari F40');
      expect(brands).not.toContain('Lamborghini Huracán');
      expect(brands).not.toContain('USRA 0-6-6');
      expect(brands).not.toContain('Airbus A400M Atlas');
      expect(brands).not.toContain('Bloch MB.131');
      expect(brands).not.toContain('EMD GP40');
      expect(brands).not.toContain('Amer 4-4-0');
    });
    component.form.setValue({
      vehicle: '',
      brand: '',
      color: 'green'
    });
    fixture.detectChanges();
  }));
  it('should render header text', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.header-text').textContent).toContain('TrafficMeister');
  }));
  it('should show an error message', fakeAsync(() => {
    const errorMessage = `Fetch data error`;
    spyOnProperty(dataStub, 'vehicles$').and.returnValue(throwError(errorMessage));
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.error')).not.toBeNull();
    expect(compiled.querySelector('.error p').textContent).toContain(errorMessage);
    tick();
  }));
});
