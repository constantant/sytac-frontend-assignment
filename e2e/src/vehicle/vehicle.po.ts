import { browser, by, element } from 'protractor';

export class VehiclePage {
  navigateTo(vehicle: string, brand: string, color: string) {
    return browser.get(`/${vehicle}/${brand}/${color}`);
  }

  getRoot() {
    return element(by.css('app-vehicle'));
  }

  getVehicleId() {
    return element(by.css('app-vehicle li')).getText();
  }

  getVehicleType() {
    return element.all(by.css('app-vehicle li')).get(1).getText();
  }

  getVehicleBrand() {
    return element.all(by.css('app-vehicle li')).get(2).getText();
  }
}
