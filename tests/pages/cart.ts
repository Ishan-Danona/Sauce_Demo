import { expect } from "@playwright/test";
import * as logger from "../logger";
export class CartClass {
  private page: any;
  private yourCartButton: any;
  private yourCartAssert: any;
  private continueShoppingButton: any;
  private continueShoppingAssert: any;
  private productList: any;
  private addToCartButton: any;
  private cartProductAssert: any;
  private removeFromCartButton: any;
  private checkoutButton: any;
  private checkoutAssert: any;

  constructor(page) {
    this.page = page;
    this.yourCartButton = page.locator("path[fill='currentColor']");
    this.yourCartAssert = page.locator("div[class='subheader']");
    this.continueShoppingButton = page.locator("a[class='btn_secondary']");
    this.continueShoppingAssert = page.locator("div[class='product_label']");
    this.productList = page.locator("div[class='inventory_item_name']");
    this.addToCartButton = page.locator(
      "button[class='btn_primary btn_inventory']"
    );
    this.cartProductAssert = page.locator(
      "span[class='fa-layers-counter shopping_cart_badge']"
    );
    this.removeFromCartButton = page.locator(
      "button[class='btn_secondary btn_inventory']"
    );
    this.checkoutButton = page.locator("a[class='btn_action checkout_button']");
    this.checkoutAssert = page.locator("div[class='subheader']");
  }

  async clickCartButton() {
    try {
      await this.yourCartButton.click();
      await expect(this.yourCartAssert).toHaveText("Your Cart");
      await logger.Logger.info("Click cart button passed");
    } catch (error) {
      await console.log(error);
      await logger.Logger.error("Click cart button failed");
    }
  }

  async cart(productName: string) {
    try {
      await this.continueShoppingButton.click();
      await expect(this.continueShoppingAssert).toHaveText("Products");
      for (let i = 0; i < (await this.productList.count()); i++) {
        if ((await this.productList.nth(i).textContent()) == productName) {
          await this.addToCartButton.nth(i).click();
          break;
        }
      }
      await expect(this.cartProductAssert).toHaveText("2");
      await this.yourCartButton.click();
      for (let i = 0; i < (await this.productList.count()); i++) {
        if ((await this.productList.nth(i).textContent()) == productName) {
          await this.removeFromCartButton.nth(i).click();
          break;
        }
      }
      this.checkoutButton.click();
      await expect(this.checkoutAssert).toHaveText(
        "Checkout: Your Information"
      );
      await logger.Logger.info("Cart passed");
    } catch (error) {
      await console.log(error);
      await logger.Logger.error("Cart failed");
    }
  }
}
