import { AppPage } from '../app.po';
import { VehiclePage } from './vehicle.po';
import { browser, ExpectedConditions } from 'protractor';

describe('workspace-project Vehicle', () => {
  let page: VehiclePage;
  let pageApp: AppPage;

  beforeEach(() => {
    page = new VehiclePage();
    pageApp = new AppPage();
  });

  it('should display Amer 4-4-0 page', () => {
    page.navigateTo('train', 'Amer 4-4-0', 'black');
    browser.wait(ExpectedConditions.visibilityOf(page.getRoot()), 2000).then(() => {
      expect(page.getVehicleId()).toEqual('#9');
      expect(page.getVehicleType()).toEqual('train');
      expect(page.getVehicleBrand()).toEqual('Amer 4-4-0');
    }).catch(() => {
      expect(pageApp.getErrorMessage()).not.toBeNull();
    });
  });

  it('should display Boeing 787 Dreamliner', () => {
    page.navigateTo('airplane', 'Boeing 787 Dreamliner', 'green');
    browser.wait(ExpectedConditions.visibilityOf(page.getRoot()), 2000).then(() => {
      expect(page.getVehicleId()).toEqual('#2');
      expect(page.getVehicleType()).toEqual('airplane');
      expect(page.getVehicleBrand()).toEqual('Boeing 787 Dreamliner');
    }).catch(() => {
      expect(pageApp.getErrorMessage()).not.toBeNull();
    });
  });
});
