import { test } from "@playwright/test";
import { LoginClass } from "../pages/login";
import { LogoutClass } from "../pages/logout";
import { ProductClass } from "../pages/product";
import sauce from "../data/sauce.json";
import fs from "fs";
import { parse } from "csv-parse/sync";

test.describe("Product Page Functionality Test", async () => {
  let page, context;
  let login, logout, product;

  const csvSauces = parse(
    fs.readFileSync(
      "C:/Users/Ishan/Desktop/PlayWright/PlayWright-Sauce-Demo/tests/data/sauce.csv"
    ),
    {
      columns: true,
      skip_empty_lines: true,
    }
  );

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    login = new LoginClass(page);
    logout = new LogoutClass(page);
    product = new ProductClass(page);
  });
  for (const csvSauce of csvSauces) {
    test.beforeEach(async () => {
      await page.goto(sauce.url);
      await login.login(csvSauce.username, csvSauce.password);
    });
  }

  test.afterEach(async () => {
    await logout.logout();
    await page.close();
  });

  test("Testing Product Page Functionality for Valid Data", async () => {
    await product.product(sauce.sortOption, sauce.productName);
    await product.addProductToCart(sauce.addProductName);
    await product.removeProductFromCart(sauce.removeProductName);
  });
});
