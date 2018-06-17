import { promise as wdpromise } from 'selenium-webdriver';
import { browser, by, element, ExpectedConditions } from 'protractor';
import { ElementFinder } from 'protractor/built/element';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getWelcomeMessage() {
    return element(by.css('app-description h1')).getText();
  }

  selectItem(selectIndex: number, value: string): wdpromise.Promise<null> {
    return this.getSelect(selectIndex).then((select) => {
      select.value = value;
      return Promise.resolve();
    });
  }

  isAvailable(): wdpromise.Promise<boolean> {
    const select = this.getSelect(0);
    return browser.wait(ExpectedConditions.elementToBeClickable(select), 2000);
  }

  getSelect(index: number): ElementFinder {
    return element.all(by.css('.form-fields select')).get(index);
  }

  getErrorMessage() {
    return element(by.css('app-root .error'));
  }
}
