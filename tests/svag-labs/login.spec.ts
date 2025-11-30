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
  const AddSauceLabsBackpackToCart = new Inventory(
    page,
    products[0].inventory_item_name,
    products[0].price
  );

  // add "Sauce Labs Backpack" to the Cart
  await AddSauceLabsBackpackToCart.addToCartByTitle(
    products[0].inventory_item_name
  );
  await expect(
    page.locator(`[data-test="remove-${products[0].inventory_item_name}"]`)
  ).toHaveText("Remove");

  // go to Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // remove "Sauce Labs Backpack" from Cart
  await AddSauceLabsBackpackToCart.removeFromCartByTitle(
    products[0].inventory_item_name
  );
  await expect(page.getByText(products[0].name)).toBeVisible({
    visible: false,
  });

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

  // const titles = await page.locator(".inventory_item_name").allInnerTexts();
  // const titlesList = [];
  // for (const title of titles) {
  //   //console.log(title);
  //   titlesList.push(title);
  // }
  // console.log(titlesList);

  // inventory-item-description
  // const titlesDescription = await page
  //   .locator(".inventory-item-description")
  //   .allInnerTexts();
  // const titlesList1 = [];
  // for (const titleD of titlesDescription) {
  //   console.log(titleD);
  //   titlesList1.push(titleD);
  // }
  // //console.log(titlesList);

  const items = page.locator(".inventory_item");
  const count = await items.count();

  const products = [];

  for (let i = 0; i < count; i++) {
    const item = items.nth(i);

    const title = await item.locator(".inventory_item_name").innerText();
    const price = await item.locator(".inventory_item_price").innerText();

    products.push({
      title: title,
      price: price,
    });
  }

  console.log(products);
});
