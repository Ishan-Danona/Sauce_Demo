import * as logger from "../logger";
export class LogoutClass {
  private page: any;
  private openMenuButton: any;
  private logoutButton: any;

  constructor(page) {
    this.page = page;
    this.openMenuButton = page.locator("button:text('Open Menu')");
    this.logoutButton = page.locator("a[id='logout_sidebar_link']");
  }

  async logout() {
    try {
      await this.openMenuButton.click();
      await this.logoutButton.click();
      await logger.Logger.info("logout passed");
    } catch (error) {
      await console.log(error);
      await logger.Logger.error("logout failed");
    }
  }
}
