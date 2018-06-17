import { AppPage } from './app.po';
import { VehiclePage } from './vehicle/vehicle.po';
import { browser, ExpectedConditions } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let pageVehicle: VehiclePage;

  beforeEach(() => {
    page = new AppPage();
    pageVehicle = new VehiclePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getWelcomeMessage()).toEqual('Welcome to Traffic Meister!');
  });

  it('should select a vehicle and show a result', () => {
    page.navigateTo();
    expect(page.getWelcomeMessage()).toEqual('Welcome to Traffic Meister!');

    page.isAvailable()
      .then(() => expect(page.getErrorMessage()).toBeNull())
      .then(() => {
        page.selectItem(0, 'car')
          .then(() => page.selectItem(1, 'Bugatti Veyron'))
          .then(() => page.selectItem(2, 'red'))
          .then(() => {
            browser.wait(ExpectedConditions.visibilityOf(pageVehicle.getRoot()), 2000).then(() => {
              expect(pageVehicle.getVehicleId()).toEqual('#1');
              expect(pageVehicle.getVehicleType()).toEqual('car');
              expect(pageVehicle.getVehicleBrand()).toEqual('Bugatti Veyron');
            }).catch(() => {
              expect(page.getErrorMessage()).not.toBeNull();
            });
          })
      })
      .catch(() => {
        expect(page.getErrorMessage()).not.toBeNull();
      });
  });
});
