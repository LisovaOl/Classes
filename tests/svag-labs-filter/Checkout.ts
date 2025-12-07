import { Page } from "@playwright/test";
import { userForCheckout } from "./users-list";

export class Checkout {
  page: Page;
  firstName: string;
  lastName: string;
  zipCode: string;

  constructor(
    page: Page,
    firstName: string,
    lastName: string,
    zipCode: string
  ) {
    this.page = page;
    this.firstName = firstName;
    this.lastName = lastName;
    this.zipCode = zipCode;
  }
  //     сторінка checkout-step-one
  // https://www.saucedemo.com/checkout-step-one.html

  // 1) fillFirstName()
  fillFirstName = async (firstName: string) =>
    await this.page.locator('[data-test="firstName"]').fill(firstName);

  // 2) fillLastName()
  fillLastName = async (lastName: string) =>
    await this.page.locator('[data-test="lastName"]').fill(lastName);

  // 3) fillZipCode()
  fillZipCode = async (zipCode: string) =>
    await this.page.locator('[data-test="postalCode"]').fill(zipCode);

  // 4) continue()
  clickOnContinueButton = async () =>
    await this.page.locator('[data-test="continue"').click();
}
