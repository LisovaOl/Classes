import { test, expect } from "@playwright/test";
import { LogIn } from "./LogIn";
import { users, password } from "./users-list";
import { Inventory } from "./Inventory";
import { products } from "./product-list";

test("Log In as Standard User", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle(/Swag Labs/);

  const logInAsStandard = new LogIn(page, users.standard, password);
  await logInAsStandard.login(users.standard, password);

  await expect(page.locator('[data-test="title"]')).toBeVisible();
});
test("Log In as Locked User", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle(/Swag Labs/);

  const logInAsLockedUser = new LogIn(page, users.locked, password);
  await logInAsLockedUser.login(users.locked, password);

  await expect(
    page.getByText("Epic sadface: Sorry, this user has been locked out.")
  ).toBeVisible();
});

test("Log In as Problem User", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle(/Swag Labs/);

  const logInAsProblemUser = new LogIn(page, users.problem, password);
  await logInAsProblemUser.login(users.problem, password);

  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
});
test("Product List", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle(/Swag Labs/);
  const logInAsStandard = new LogIn(page, users.standard, password);
  await logInAsStandard.login(users.standard, password);

  await expect(page.locator('[data-test="title"]')).toBeVisible();

  const inventory = new Inventory(page);

  await inventory.addToCartByTitle("Sauce Labs Backpack");
  await inventory.addToCartByTitle("Sauce Labs Fleece Jacket");

  await inventory.removeFromCartByTitle("Sauce Labs Backpack");

  const price = await inventory.getPriceByTitle("Sauce Labs Bolt T-Shirt");
  console.log(price);
  await inventory.getPriceByTitle("Sauce Labs Fleece Jacket");
});
