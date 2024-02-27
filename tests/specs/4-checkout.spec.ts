import { test } from "@playwright/test";
import { LoginClass } from "../pages/login";
import { LogoutClass } from "../pages/logout";
import { ProductClass } from "../pages/product";
import { CartClass } from "../pages/cart";
import { CheckoutClass } from "../pages/checkout";
import sauce from "../data/sauce.json";
import fs from "fs";
import { parse } from "csv-parse/sync";

test.describe("Checkout Page Functionality Test", async () => {
  let page, context;
  let login, logout, product, cart, checkout;

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
    checkout = new CheckoutClass(page);
  });

  for (const csvSauce of csvSauces) {
    test.beforeEach(async () => {
      await page.goto(sauce.url);
      await login.login(csvSauce.username, csvSauce.password);
      await product.addProductToCart(sauce.addProductName);
      await cart.clickCartButton();
    });
  }

  test.afterEach(async () => {
    await logout.logout();
    await page.close();
  });

  test("Testing Cart Page Functionality for Valid Data", async () => {
    await checkout.checkout(sauce.firstName, sauce.lastName, sauce.zipCode);
  });
  test("Testing Cart Page Functionality for Blank First Name", async () => {
    await checkout.checkout(
      sauce.blankFirstName,
      sauce.lastName,
      sauce.zipCode
    );
  });
  test("Testing Cart Page Functionality for Blank Last Name", async () => {
    await checkout.checkout(
      sauce.firstName,
      sauce.blankLastName,
      sauce.zipCode
    );
  });
  test("Testing Cart Page Functionality for Blank Zip Code", async () => {
    await checkout.checkout(
      sauce.firstName,
      sauce.lastName,
      sauce.blankZipCode
    );
  });
});
