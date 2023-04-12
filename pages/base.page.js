const { expect } = require('@playwright/test');
// const { first, zip } = require('cypress/types/lodash');

exports.SauceDemoBasePage = class SauceDemoBasePage {

    constructor(page) {
        this.page = page;

        // login locators 
        this.userNameField = page.getByPlaceholder('Username');
        this.passWordField = page.getByPlaceholder('Password');
        this.loginBtn = page.locator("//input[@class='submit-button btn_action']");

        //add to cart locators
        this.addBackPack = page.locator("//*[@id='add-to-cart-sauce-labs-backpack']");
        this.addToCart = page.locator(`//button[@class='btn btn_primary btn_small btn_inventory']`)
        this.goToCart = page.locator('//a[@class="shopping_cart_link"]')
        // this.addToCart = page.locator(`(//button[@class='btn btn_primary btn_small btn_inventory'])[${i}]`)

        //go to checkout locators

        this.checkoutBtn = page.locator('//button[@class="btn btn_action btn_medium checkout_button"]')
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.zipCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueBtn = page.locator('//input[@class="submit-button btn btn_primary cart_button btn_action"]')

        //filter locator
        this.filterBtn = page.locator('.product_sort_container');
        this.priceLocator = page.locator('//div[@class="inventory_item_price"]')
        this.nameLocator = page.locator("//div[@class='inventory_item_name']")
        
        //reset app locators
        this.menuBtn = page.locator('#react-burger-menu-btn');
        this.resetAppBtn = page.locator("//a[@id='reset_sidebar_link']");
        
        //cart locators
        this.shoppingCartcount = page.locator('//span[@class="shopping_cart_badge"]');
        this.inventoryItemName = page.locator('//div[@class="inventory_item_name"]');

        //logout 
        this.logOutBtn = page.locator('//a[@id="logout_sidebar_link"]')




    }

    async goto(path){
        await this.page.goto(`https://www.saucedemo.com/${path}`);
    }

    async logIn(username, password){
        await this.userNameField.fill(username)
        await this.passWordField.fill(password)
        await this.loginBtn.click()
    }

    async addItemToCart(item) {
        let lowerCaseItem = item.toLowerCase();
        let itemArray = lowerCaseItem.split(/[ -]/);
        let myStr = ''
        for( let i = 0; i < itemArray.length; i++) {
            myStr += `-${itemArray[i]}`
        }
        await this.page.locator(`[data-test="add-to-cart-sauce-labs${myStr}"]`).click()

    }

    async addItemToCart2() {
        await this.addBackPack.click()
    }

    async goToCheckOut(firstnm, lastnm, zipcode) {
        await this.goToCart.click()
        await this.checkoutBtn.click()
        await this.firstName.fill(firstnm);
        await this.lastName.fill(lastnm);
        await this.zipCode.fill(zipcode)
        await this.continueBtn.click();
    }

    async getTotalItemsPrice(sum) {
        let priceLoc = await this.page.getByText(sum).innerText()
        // let price = 
        // console.log(priceLoc)
        let myArr = priceLoc.split('$')
        let finalPrice = 0
        let intSum = Number(myArr[1]);
        finalPrice += intSum
        // console.log(finalPrice)
        return finalPrice
    }

    async getTotalPrice(){
        let priceLoc = await this.page.getByText('Item total: $25.98').innerText();
        let myArr = priceLoc.split(' ')
        console.log(myArr[2])
        return myArr[2]
    }

    async filterItems(selectOpt){
        await this.filterBtn.click();
        // await this.filterLowHi.click();
        await this.filterBtn.selectOption(selectOpt);
    }

    async makePricesNumber(PriceArr){
        let numberArr = []
        for (let i = 0; i < PriceArr.length; i++) {
            let splitItArr = PriceArr[i].split('$');
            let makeItInt = Number(splitItArr[1]);
            numberArr.push(makeItInt);
        }
        return numberArr;
    }

    async compareLtH(numberArr){
        for (let j = 0; j < numberArr.length - 1; j++){
            if (numberArr[j] <= numberArr[j+1]) {
            }
            else {
                return false;
            }
    }
    return true
    }
    
    async compareHtL(numberArr){
        for (let j = 0; j < numberArr.length - 1; j++){
            if (numberArr[j] >= numberArr[j+1]) {
            }
            else {
                return false;
            }
        }
        return true
    }

    
    async comparePricesLowToHigh() { 
        const PriceArr = await this.priceLocator.allInnerTexts();
        let numberArr = this.makePricesNumber(PriceArr)
        return this.compareLtH(numberArr)

    }
    

    async comparePricesHighToLow() { 
        const PriceArr = await this.priceLocator.allInnerTexts();
        let numberArr = this.makePricesNumber(PriceArr)
        return this.compareHtL(numberArr)
    
    }

    async compareNameAtZ() {
        const ArrToBeSorted = await this.nameLocator.allInnerTexts()
        const sortedArr = ArrToBeSorted.sort();
        const NameArr = await this.nameLocator.allInnerTexts()
        console.log(NameArr[0])
        for (let i = 0; i < NameArr.length; i++) {
            let compareValue = sortedArr[i].localeCompare(NameArr[i])
            if ( compareValue === 0 ){
                return true
            }
            else { 
                throw('Error!')
            }
        }
    }

    async compareNameZtA() {
        const ArrToBeSorted = await this.nameLocator.allInnerTexts()
        const sortedArr = ArrToBeSorted.sort();
        const NameArr = await this.nameLocator.allInnerTexts()
        console.log(NameArr[0])
        for (let i = 0; i < NameArr.length; i++) {
            let compareValue = sortedArr[i].localeCompare(NameArr[i])
            if ( compareValue != 0 ){
                return true
            }
            else { 
                throw('Error!')
            }
        }
    }

    async cartCounter(){
        const count = await this.shoppingCartcount.allInnerTexts();
        let counter = Number(count[0]);
        console.log(counter);
        return counter
    }
    
    async resetApp() {
        await this.menuBtn.click();
        await this.resetAppBtn.click();
    }

    async verifyCartIsEmpty(){
        await expect(this.inventoryItemName).not.toBeVisible();
    }

    async logoutFunctionality() {
        await this.menuBtn.click();
        await this.logOutBtn.click();
        
    }

}






    

