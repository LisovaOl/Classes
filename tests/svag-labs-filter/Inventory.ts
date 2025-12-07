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
    const product = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", { hasText: title }),
    });

    await product.getByRole("button", { name: /add to cart/i }).click();
  };

  removeFromCartByTitle = async (title: string) => {
    const items = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", { hasText: title }),
    });

    await items.getByRole("button", { name: /remove/i }).click();
  };

  getPriceByTitle = async (title: string): Promise<string> => {
    const product = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", { hasText: title }),
    });

    const price = await product.locator(".inventory_item_price").innerText();
    return price;
  };
}
