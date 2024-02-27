import { expect } from "@playwright/test";
import * as logger from "../logger";
import { Excel } from "../writeInExcel";
export class LoginClass {
  private page: any;
  private username: any;
  private password: any;
  private loginButton: any;
  private errorMessageAssert: any;
  private errorButton: any;
  private excel = new Excel();

  constructor(page) {
    this.page = page;
    this.username = page.locator("input[id='user-name']");
    this.password = page.locator("input[id='password']");
    this.loginButton = page.locator("input[id='login-button']");
    this.errorMessageAssert = page.locator("h3[data-test='error']");
    this.errorButton = page.locator("button[class='error-button']");
  }

  async login(username: string, password: string) {
    try {
      expect(this.page).toHaveTitle("Swag Labs");
      // await this.excel.exTest(
      //   "login2",
      //   "Login-Details",
      //   1,
      //   username,
      //   2,
      //   password
      // );
      await this.username.fill(username);
      await this.password.fill(password);
      await this.loginButton.click();
      await logger.Logger.info("Login passed");
    } catch (error) {
      await console.log(error);
      await logger.Logger.error("Login failed");
    }
  }

  async loginWithInvalidData() {
    try {
      await expect(this.errorMessageAssert).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
      );
      await this.errorButton.click();
      await logger.Logger.info("Login with invalid data passed");
    } catch (error) {
      await console.log(error);
      await logger.Logger.error("Login with invalid data failed");
    }
  }

  async loginWithBlankUsername() {
    try {
      await expect(this.errorMessageAssert).toHaveText(
        "Epic sadface: Username is required"
      );
      await this.errorButton.click();
      await logger.Logger.info("Login with blank username passed");
    } catch (error) {
      await console.log(error);
      await logger.Logger.error("Login with blank username failed");
    }
  }

  async loginWithBlankPassword() {
    try {
      await expect(this.errorMessageAssert).toHaveText(
        "Epic sadface: Password is required"
      );
      await this.errorButton.click();
      await logger.Logger.info("Login with blank password passed");
    } catch (error) {
      await console.log(error);
      await logger.Logger.error("Login with blank password failed");
    }
  }
}
