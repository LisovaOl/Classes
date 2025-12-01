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

  // add "Sauce Labs Backpack" object
  // const AddSauceLabsBackpackToCart = new Inventory(
  //   page,
  //   products[0].inventory_item_name,
  //   products[0].price
  // );

  // add "Sauce Labs Backpack" to the Cart
  // await AddSauceLabsBackpackToCart.addToCartByTitle(
  //   products[0].inventory_item_name
  // );
  // await expect(
  //   page.locator(`[data-test="remove-${products[0].inventory_item_name}"]`)
  // ).toHaveText("Remove");

  // // go to Cart
  // await page.locator('[data-test="shopping-cart-link"]').click();

  // // remove "Sauce Labs Backpack" from Cart
  // await AddSauceLabsBackpackToCart.removeFromCartByTitle(
  //   products[0].inventory_item_name
  // );
  // await expect(page.getByText(products[0].name)).toBeVisible({
  //   visible: false,
  // });

  // // add "Sauce Labs Fleece Jacket" object
  // const AddSauceLabsFleeceJacketToCart = new Inventory(
  //   page,
  //   products[1].inventory_item_name,
  //   products[1].price
  // );

  // // add "Sauce Labs Fleece Jacket" to the Cart
  // await AddSauceLabsFleeceJacketToCart.addToCartByTitle(
  //   products[1].inventory_item_name
  // );
  // await expect(
  //   page.locator(`[data-test="remove-${products[1].inventory_item_name}"]`)
  // ).toHaveText("Remove");

  // await page.locator('[data-test="shopping-cart-link"]').click();

  // // remove "Sauce Labs Fleece Jacket" from Cart
  // await AddSauceLabsFleeceJacketToCart.removeFromCartByTitle(
  //   products[1].inventory_item_name
  // );
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
  //const allProducts = await inventory.getAllProducts();
  //console.log(allProducts);

  await inventory.addToCartByTitle("Sauce Labs Backpack");
  await inventory.addToCartByTitle("Sauce Labs Fleece Jacket");

  await inventory.removeFromCartByTitle("Sauce Labs Backpack");

  await inventory.getPriceByTitle("Sauce Labs Backpack");
  await inventory.getPriceByTitle("Sauce Labs Fleece Jacket");
  // console.log(allProducts[0].title);
  // console.log(allProducts[0].description);
  // console.log(allProducts[0].price);
});
