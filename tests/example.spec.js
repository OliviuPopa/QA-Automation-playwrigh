// @ts-check
const { test, expect } = require('@playwright/test');
const { SauceDemoBasePage } = require('../pages/base.page');


test.skip('Should login', async({ page }) => {
  const SauceDemo = new SauceDemoBasePage(page);
  await SauceDemo.goto('');
  await SauceDemo.logIn('standard_user', 'secret_sauce');
  // await SauceDemo.goto('inventory.html')
})

test.describe.only('Hooks', () => {

  test.beforeEach(async ({page}) => {
    const SauceDemo = new SauceDemoBasePage(page);
    await SauceDemo.goto('');
    await SauceDemo.logIn('standard_user', 'secret_sauce');
  })

  test('Test Add to cart', async({ page}) => {
    const SauceDemo = new SauceDemoBasePage(page);
    await SauceDemo.addItemToCart('Bike Light')
    await SauceDemo.addItemToCart('Bolt T-shirt')
  })


  test('Total banance equals expected', async({page}) => {
    const SauceDemo = new SauceDemoBasePage(page);
    await SauceDemo.addItemToCart('Bike Light')
    await SauceDemo.addItemToCart('Bolt T-shirt')
    await SauceDemo.goToCheckOut('Oliviu','Popa','020231');
    let firstItem = await SauceDemo.getTotalItemsPrice('$15.99');
    let secondItem = await SauceDemo.getTotalItemsPrice('$9.99');
    let totalprice = `$${firstItem + secondItem}`
    expect(await SauceDemo.getTotalPrice()).toEqual(totalprice);

  })


  test.skip('Filter Items by Name(A-Z)', async({page}) => {
    const SauceDemo = new SauceDemoBasePage(page);
    await SauceDemo.filterItems('az')
    await SauceDemo.compareNameAtZ()
  })

  test.skip('Filter Items by Name(Z-A', async({page}) => {
    const SauceDemo = new SauceDemoBasePage(page);
    await SauceDemo.filterItems('za')
    await SauceDemo.compareNameZtA()
  })

  test.skip('Filter Items Low to High', async({page}) => {
    const SauceDemo = new SauceDemoBasePage(page);
    await SauceDemo.filterItems('lohi');
    await SauceDemo.comparePricesLowToHigh();
  })

  test.skip('Filter Items High to Low', async({page}) => {
    const SauceDemo = new SauceDemoBasePage(page);
    await SauceDemo.filterItems('hilo');
    await SauceDemo.comparePricesHighToLow();
  })


  test.skip('Reset app functionality', async({page}) => {
    const SauceDemo = new SauceDemoBasePage(page);
    await SauceDemo.addItemToCart('Bike Light')
    await SauceDemo.addItemToCart('Bolt T-shirt')
    await SauceDemo.resetApp()
    await SauceDemo.goToCart.click()
    await expect(SauceDemo.inventoryItemName).not.toBeVisible();
    // await SauceDemo.verifyCartIsEmpty() // cum pot sa fac expectul asta fara metoda. 

  })

  test.skip('Log out functionality', async({page}) => {
    const SauceDemo = new SauceDemoBasePage(page);
    await SauceDemo.goto('');
    await SauceDemo.logIn('standard_user', 'secret_sauce');
    await SauceDemo.logoutFunctionality();
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  })

})

test.skip('Users login problem', async({page}) => {
  const SauceDemo = new SauceDemoBasePage(page);
  await SauceDemo.goto('');
  await SauceDemo.logIn('locked_out_user', 'secret_sauce');
  await expect(page.locator("//h3[text()='Epic sadface: Sorry, this user has been locked out.']")).toBeVisible()
})
