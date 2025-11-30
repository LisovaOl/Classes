import { Page } from "@playwright/test";

export class LogIn {
  // properties
  page: Page;
  userName: string;
  password: string;
  // constructor
  constructor(page: Page, userName: string, password: string) {
    this.page = page;
    this.userName = userName;
    this.password = password;
  }
  // methods
  private fillUserName = async (userName: string) =>
    await this.page.locator('[data-test="username"]').fill(userName);
  private fillPassword = async (password: string) =>
    await this.page.locator("#password").fill(password);

  clickSignUp = async () =>
    await this.page.locator('[data-test="login-button"]').click();

  async login(userName: string, password: string) {
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.clickSignUp();
  }
}
