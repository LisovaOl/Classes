import { Page } from "@playwright/test";

export class Inventory {
  page: Page;
  inventory_item_name: string;
  inventory_item_price: string;

  constructor(
    page: Page,
    inventory_item_name: string,
    inventory_item_price: string
  ) {
    this.page = page;
    this.inventory_item_name = inventory_item_name;
    this.inventory_item_price = inventory_item_price;
  }

  addToCartByTitle = async (inventory_item_name: string) => {
    await this.page
      .locator(`[data-test="add-to-cart-${inventory_item_name}"]`)
      .click();
  };

  removeFromCartByTitle = async (inventory_item_name: string) => {
    await this.page
      .locator(`[data-test="remove-${inventory_item_name}"]`)
      .click();
  };

  // getPriceByTitle = async (inventory_item_name: string) => {
  //   await this.page.locator(`[data-test="inventory-item-price"]`);

  // };
}
