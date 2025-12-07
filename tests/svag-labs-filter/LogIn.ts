import { Page, Locator } from "@playwright/test";

export class LogIn {
  // properties
  page: Page;
  userInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  // constructor
  constructor(page: Page, userName: string, password: string) {
    this.page = page;
    // locators
    this.userInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator('[data-test="login-button"]');
  }
  // methods

  async login(userName: string, password: string) {
    await this.userInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
