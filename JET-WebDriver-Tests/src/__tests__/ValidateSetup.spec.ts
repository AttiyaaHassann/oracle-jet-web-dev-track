import {expect} from "chai";
import ojwd, {DriverManager as dm, Expectation} from "@oracle/oraclejet-webdriver";
import {ojInputText} from "@oracle/oraclejet-webdriver/elements";
import {By, WebDriver, until} from "selenium-webdriver";

describe("Confirm Test Creation Environment is Set Up Correctly", () =>
{
    let driver: WebDriver;

    before(async ()=>{
        driver = await dm.getDriver();
        await ojwd.get(driver, "http://localhost:8000/?ojr=dashboard");
    });

    it("Set a value into oj-input-text and use Chai's expect assertion to confirm value change", async() => {await driver.wait(until.elementLocated(By.id("text-input")), 10000, "Timed out after 10 seconds waiting for InputText", 4000)

        const input= await ojInputText(driver, By.id("text-input"));
        await input.changeValue("Change value to Blue");
        const value = await input.getValue();
        expect(value).to.equal("Change value to Blue");
    });

    it("Set a new value for the Knockout observable in the ViewModel and use Expectation from @oracle/oraclejet-webdriver to confirm change", async() => {await driver.wait(until.elementLocated(By.id("view-model-test")),10000,"Timed out after 10 seconds waiting for InputText", 4000)

        const inputTextComp = await ojInputText(driver, By.id("view-model-test"));
        await inputTextComp.changeValue("Change value to Purple");
        await driver.wait(until.elementLocated(By.id("view-model-test")));
        const vmLocator = By.id("view-model-test");
        const vmExpectation = new Expectation("vmValue()").to.equal("Change value to Purple");
        await ojwd.assertViewModelValue(driver, vmLocator, vmExpectation);
    });

    after(()=>dm.releaseDriver(driver));


})