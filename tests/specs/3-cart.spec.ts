import { test } from "@playwright/test";
import { LoginClass } from "../pages/login";
import { LogoutClass } from "../pages/logout";
import { ProductClass } from "../pages/product";
import { CartClass } from "../pages/cart";
import sauce from "../data/sauce.json";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { ReadFromExcel } from "../../util/readFromExcel";

test.describe("Cart Page Functionality Test", async () => {
  let page, context;
  let login, logout, product, cart, readFromExcel, excelProductName;

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
    cart = new CartClass(page);
    readFromExcel = new ReadFromExcel();
    excelProductName = await readFromExcel.getProductName();
  });

  for (const csvSauce of csvSauces) {
    test.beforeEach(async () => {
      await page.goto(sauce.url);
      await login.login(csvSauce.username, csvSauce.password);
      await product.addProductToCart(sauce.addProductName);
    });
  }

  test.afterEach(async () => {
    await logout.logout();
    await page.close();
  });

  test("Testing Cart Page Functionality for Valid Data", async () => {
    await cart.clickCartButton();
    await cart.cart(excelProductName[0]);
  });
});
