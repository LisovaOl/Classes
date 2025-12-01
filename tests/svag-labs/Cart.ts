import { Page } from "@playwright/test";

export class Cart {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 1) removeFromCartByTitle()
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

  // 2) getPriceByTitle()

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

  // 3) checkout()
  checkout = async () => await this.page.getByText("Checkout").click();

  // 4) continueShopping()
  continueShopping = async () =>
    await this.page.getByText("Continue Shopping").click();
}
