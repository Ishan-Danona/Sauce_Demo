import { test } from "@playwright/test";
import { LoginClass } from "../pages/login";
import { LogoutClass } from "../pages/logout";
import sauce from "../data/sauce.json";
import fs from "fs";
import { parse } from "csv-parse/sync";

test.describe("Login Logout Page Functionality Test", () => {
  let page, context;
  let login, logout;

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
  });

  test.beforeEach(async () => {
    await page.goto(sauce.url);
  });

  test.afterEach(async () => {
    await page.close();
  });

  for (const csvSauce of csvSauces) {
    test("Testing Login Logout Page Functionality for Valid Data", async () => {
      await login.login(csvSauce.username, csvSauce.password);
      await logout.logout();
    });
  }
  for (const csvSauce of csvSauces) {
    test("Testing Login Logout Page Functionality for Invalid Username", async () => {
      await login.login(sauce.invalidUsername, csvSauce.password);
      await login.loginWithInvalidData();
    });
  }

  for (const csvSauce of csvSauces) {
    test("Testing Login Logout Page Functionality for Invalid Password", async () => {
      await login.login(csvSauce.username, sauce.invalidPassword);
      await login.loginWithInvalidData();
    });
  }

  for (const csvSauce of csvSauces) {
    test("Testing Login Logout Page Functionality for Blank Username", async () => {
      await login.login(sauce.blankUsername, csvSauce.password);
      await login.loginWithBlankUsername();
    });
  }

  for (const csvSauce of csvSauces) {
    test("Testing Login Logout Page Functionality for Blank Password", async () => {
      await login.login(csvSauce.username, sauce.blankPassword);
      await login.loginWithBlankPassword();
    });
  }
});
