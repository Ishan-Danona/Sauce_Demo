import { expect } from "@playwright/test";
import * as logger from "../logger";
export class ProductClass {
  private page: any;
  private pageAssert: any;
  private sortBy: any;
  private openMenuButton: any;
  private numberOfMenuOptionsAssert: any;
  private closeMenuButton: any;
  private yourCartButton: any;
  private yourCartAssert: any;
  private allItemsButton: any;
  private productList: any;
  private backButton: any;
  private productNameAssert: any;
  private cartProductAssert: any;
  private addOrRemoveFromCartButton: any;

  constructor(page) {
    this.page = page;
    this.pageAssert = page.locator("div[class='product_label']");
    this.sortBy = page.locator("select[class='product_sort_container']");
    this.openMenuButton = page.locator("button:text('Open Menu')");
    this.numberOfMenuOptionsAssert = page.locator(
      "a[class='bm-item menu-item']"
    );
    this.closeMenuButton = page.locator("button:text('Close Menu')");
    this.yourCartButton = page.locator("path[fill='currentColor']");
    this.yourCartAssert = page.locator("div[class='subheader']");
    this.allItemsButton = page.locator("a[id='inventory_sidebar_link']");
    this.productList = page.locator("div[class='inventory_item_name']");
    this.backButton = page.locator(
      "button[class='inventory_details_back_button']"
    );
    this.productNameAssert = page.locator(
      "div[class='inventory_details_name']"
    );
    this.cartProductAssert = page.locator(
      "span[class='fa-layers-counter shopping_cart_badge']"
    );
    this.addOrRemoveFromCartButton = page.locator(
      "div[class='pricebar']>button"
    );
  }

  async product(sortingOption: string, productName: string) {
    try {
      await expect(this.pageAssert).toHaveText("Products");
      await this.sortBy.selectOption(sortingOption);
      await this.openMenuButton.click();
      await expect(this.numberOfMenuOptionsAssert).toHaveCount(4);
      await this.closeMenuButton.click();
      await this.yourCartButton.click();
      await expect(this.yourCartAssert).toHaveText("Your Cart");
      await this.openMenuButton.click();
      await this.allItemsButton.click();
      for (let i = 0; i < (await this.productList.count()); i++) {
        if ((await this.productList.nth(i).textContent()) == productName) {
          await this.productList.nth(i).click();
          await expect(this.productNameAssert).toHaveText(productName);
          break;
        }
      }
      await this.backButton.click();
      await logger.Logger.info("product passed");
    } catch (error) {
      await console.log(error);
      await logger.Logger.error("product failed");
    }
  }

  async addProductToCart(addProductName: string) {
    try {
      for (let i = 0; i < (await this.productList.count()); i++) {
        if ((await this.productList.nth(i).textContent()) == addProductName) {
          await this.addOrRemoveFromCartButton.nth(i).click();
          break;
        }
      }
      await expect(this.cartProductAssert).toHaveText("1");
      await logger.Logger.info("Add product to cart passed");
    } catch (error) {
      await console.log(error);
      await logger.Logger.error("Add product to cart failed");
    }
  }

  async removeProductFromCart(removeProductName) {
    try {
      for (let i = 0; i < (await this.productList.count()); i++) {
        if (
          (await this.productList.nth(i).textContent()) == removeProductName
        ) {
          await this.addOrRemoveFromCartButton.nth(i).click();
          break;
        }
      }
      await expect(this.cartProductAssert).toHaveText("2");
      for (let i = 0; i < (await this.productList.count()); i++) {
        if (
          (await this.productList.nth(i).textContent()) == removeProductName
        ) {
          await this.addOrRemoveFromCartButton.nth(i).click();
          break;
        }
      }
      await expect(this.cartProductAssert).toHaveText("1");
      await logger.Logger.info("Remove from cart passed");
    } catch (error) {
      await console.log(error);
      await logger.Logger.error("Remove from cart failed");
    }
  }
}
