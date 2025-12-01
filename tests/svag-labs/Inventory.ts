import { Page } from "@playwright/test";
//import { products } from "./product-list";

export class Inventory {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getAllProducts = async () => {
    const items = this.page.locator(".inventory_item");
    const count = await items.count();

    const products = [];

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);

      const index = i;
      const title = await item.locator(".inventory_item_name").innerText();
      const price = await item.locator(".inventory_item_price").innerText();
      const description = await item
        .locator(".inventory_item_desc")
        .innerText();

      products.push({
        index: i,
        title: title,
        description: description,
        price: price,
      });
    }
    return products;
  };

  addToCartByTitle = async (title: string) => {
    const items = this.page.locator(".inventory_item");
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const itemTitle = await item.locator(".inventory_item_name").innerText();

      if (itemTitle.trim() === title.trim()) {
        await item.getByRole("button", { name: /add to cart/i }).click();
        return;
      }
    }

    throw new Error(`Product with title "${title}" not found`);
  };

  removeFromCartByTitle = async (title: string) => {
    const items = this.page.locator(".inventory_item");
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const itemTitle = await item.locator(".inventory_item_name").innerText();

      if (itemTitle.trim() === title.trim()) {
        await item.getByRole("button", { name: /remove/i }).click();
        return;
      }
      throw new Error(`Product with title "${title}" not found`);
    }
  };

  getPriceByTitle = async (title: string): Promise<string> => {
    const items = this.page.locator(".inventory_item");
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const itemTitle = await item.locator(".inventory_item_name").innerText();

      if (itemTitle.trim() === title.trim()) {
        const price = await item.locator(".inventory_item_price").innerText();
        return price;
      }
    }

    throw new Error(`Price for product "${title}" not found`);
  };
}
