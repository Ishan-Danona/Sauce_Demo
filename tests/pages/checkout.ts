import { expect } from "@playwright/test";
import * as logger from "../logger";
export class CheckoutClass {
  private page: any;
  private checkoutButton: any;
  private checkoutAssert: any;
  private firstName: any;
  private lastName: any;
  private zipCode: any;
  private continueButton: any;
  private errorMessageAssert: any;
  private finishButton: any;
  private orderCompleteAssert: any;

  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator("a[class='btn_action checkout_button']");
    this.checkoutAssert = page.locator("div[class='subheader']");
    this.firstName = page.locator("input[id='first-name']");
    this.lastName = page.locator("input[id='last-name']");
    this.zipCode = page.locator("input[id='postal-code']");
    this.continueButton = page.locator(
      "input[class='btn_primary cart_button']"
    );
    this.errorMessageAssert = page.locator("h3[data-test='error']");
    this.finishButton = page.locator("a[class='btn_action cart_button']");
    this.orderCompleteAssert = page.locator("h2[class='complete-header']");
  }

  async checkout(firstName: string, lastName: string, zipCode: string) {
    try {
      await this.checkoutButton.click();
      await expect(this.checkoutAssert).toHaveText(
        "Checkout: Your Information"
      );
      await this.firstName.fill(firstName);
      await expect(this.firstName).toHaveAttribute("value", firstName);
      await this.lastName.fill(lastName);
      await expect(this.lastName).toHaveAttribute("value", lastName);
      await this.zipCode.fill(zipCode);
      await expect(this.zipCode).toHaveAttribute("value", zipCode);
      await this.continueButton.click();
      if (firstName == "")
        await expect(this.errorMessageAssert).toHaveText(
          "Error: First Name is required"
        );
      else if (lastName == "")
        await expect(this.errorMessageAssert).toHaveText(
          "Error: Last Name is required"
        );
      else if (zipCode == "")
        await expect(this.errorMessageAssert).toHaveText(
          "Error: Postal Code is required"
        );
      else {
        await expect(this.checkoutAssert).toHaveText("Checkout: Overview");
        await this.finishButton.click();
        await expect(this.orderCompleteAssert).toHaveText(
          "THANK YOU FOR YOUR ORDER"
        );
      }
      await logger.Logger.info("Checkout passed");
    } catch (error) {
      await console.log(error);
      logger.Logger.error("Checkout failed");
    }
  }
}
