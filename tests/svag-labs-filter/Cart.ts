import { Page } from "@playwright/test";

export class Cart {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 1) removeFromCartByTitle()
  removeFromCartByTitle = async (title: string) => {
    const items = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", { hasText: title }),
    });

    await items.getByRole("button", { name: /remove/i }).click();
  };

  // 2) getPriceByTitle()

  getPriceByTitle = async (title: string): Promise<string> => {
    const product = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", { hasText: title }),
    });

    const price = await product.locator(".inventory_item_price").innerText();
    return price;
  };

  // 3) checkout()
  checkout = async () => await this.page.getByText("Checkout").click();

  // 4) continueShopping()
  continueShopping = async () =>
    await this.page.getByText("Continue Shopping").click();
}
