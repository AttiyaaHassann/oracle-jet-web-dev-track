// import {expect} from "chai" ;
// import {By, WebDriver, until} from "selenium-webdriver";
// import ojwd, {DriverManager as dm} from "@oracle/oraclejet-webdriver";
// import {ojInputText, ojButton, ojListView, ojDialog, } from "@oracle/oraclejet-webdriver/elements";

// describe("Create and Delete an Activity Item in the Soccer activities of the Web App", ()=>//DESCRIPTION FOR THE SUITE OF ONE OR MORE TESTS THAT YOU WILL WRITE
//     {
//     let driver:WebDriver;

//     before(async() => {
//         driver = await dm.getDriver();
//         await ojwd.get(driver,"http://localhost:8000/?ojr=dashboard");
//     });

//     it("Select an activity", async() => {   
//         await driver .wait(until.elementLocated(By.id("activitiesList")),20000,"Timed out after 20 seconds waiting for Activities List", 2000) //.wait() pattern , to interact with oracle JET Components , our test script needs to wait until these elemenys are availaible in the browser DOM so a test proceeds only when the element is located 
//         //wait mathod uses 3 params (timeout 10 secs, timeout error msg, polling value of 4 sec)
//         const activitiesList = await ojListView(driver,
//             By.id("activitiesList")
//         );
//     await activitiesList.changeSelected([4]);
//     const val: any = await activitiesList.getFirstSelectedItem();
//     expect (val.data.name).to.equal("Soccer");
//     });

//     it("Open the Create New Item dialog", async ()=>{
//         await driver .wait(until.elementLocated(By.id("createButton")), 20000, "Timed out after 20 seconds waiting for Create Button", 2000)
//         const createBtn = await ojButton(driver, By.id("createButton"));
//         createBtn.doAction();
        
//         await driver .wait(until.elementLocated(By.id("createDialog")),20000,"Timed out after 20 seconds waiting for Create Dialog", 2000)

//         const createDialog = await ojDialog(driver, By.id("createDialog")) ;
//         const title =await createDialog.getDialogTitle();
//         expect(title).to.equal("Create New Item");
//     });

//     it('Create New Activity Item',
//         async()=>{
//             const createNewName = await ojInputText(driver, By.id("name"));
//             await createNewName.changeValue ("WebDriver-Created Activity Item");
//             const createNewPrice = await ojInputText(driver, By.id("price"));
//             await createNewPrice.changeValue("100");
//             const createNewDesc = await ojInputText(driver, By.id("short_desc"));
//             await createNewDesc.changeValue("WebDriver-created activity item");
//             const createNewInStock = await ojInputText(driver, By.id("quantity_instock"));
//              await createNewInStock.changeValue("15");
//             const createNewShipped = await ojInputText(driver, By.id("quantity_shipped"));
//              await createNewShipped.changeValue("16");
//         });

//     it('Get Instance of Submit Button',
//         async()=>{
//             await driver.wait(until.elementLocated(By.id("submitBtn")), 20000, "Timed out after 20 seconds waiting for sumitBtn", 4000)
//             const submitBtn = await ojButton(driver, By.id('submitBtn'));
//             submitBtn.click();
//         } );

//      it("Close the Create New Item Dialog", async () => {

//         await driver
//             .wait(until.elementLocated(By.id("createDialog")),
//                 20000,
//                 "Timed out after 20 seconds waiting for createDialog",
//                 4000
//             )
//         const createDialog = await ojDialog(driver, By.id('createDialog'));
//         createDialog.doClose()
//     });

//     after(() => dm.releaseDriver(driver)); // Releasing the driver connection to the web app oracle JET
// })



import { expect } from "chai";
import { By, WebDriver, until } from "selenium-webdriver";
import ojwd, { DriverManager as dm, fetchKeyByFilter } from "@oracle/oraclejet-webdriver";
import { ojInputText, ojButton, ojListView, ojDialog, } from "@oracle/oraclejet-webdriver/elements";
import {ListViewElement} from "ojs/ojlistview"

describe("Create and Delete an Activity Item in the Soccer activities of the Web App", () => {//DESCRIPTION FOR THE SUITE OF ONE OR MORE TESTS THAT YOU WILL WRITE
    let driver: WebDriver;

    before(async () => {
        driver = await dm.getDriver();
        await ojwd.get(driver, "http://localhost:8000/?ojr=dashboard");
    });

    it("Select an activity", async () => {
        await driver
            .wait( //wait mathod uses 3 params (timeout 10 secs, timeout error msg, polling value of 4 sec)
//         
                until.elementLocated(By.id("activitiesList")),
                20000,
                "Timed out after 20 seconds waiting for Activities List",
                2000
            )
        const activitiesList = await ojListView(
            driver,
            By.id("activitiesList")
        );
        await activitiesList.changeSelected([4]);
        const val: any = await activitiesList.getFirstSelectedItem();
        expect(val.data.name).to.equal("Soccer");

    });

    it("Open the Create New Item dialog", async () => {
        await driver
            .wait(
                until.elementLocated(By.id("createButton")),
                20000,
                "Timed out after 20 seconds waiting for Create Button",
                2000
            )
        const createBtn = await ojButton(driver, By.id("createButton"));
        createBtn.doAction();
        await driver
            .wait(
                until.elementLocated(By.id("createDialog")),
                20000,
                "Timed out after 20 seconds waiting for Create Dialog",
                2000
            )

        const createDialog = await ojDialog(driver, By.id("createDialog"));
        const title = await createDialog.getDialogTitle();
        expect(title).to.equal("Create New Item");

    });

    it('Create New Activity Item', async () => {

        const createNewName = await ojInputText(driver, By.id("name"));
        await createNewName.changeValue("WebDriver-Created Activity Item");
        const createNewPrice = await ojInputText(driver, By.id("price"));
        await createNewPrice.changeValue("100");
        const createNewDesc = await ojInputText(driver, By.id("short_desc"));
        await createNewDesc.changeValue("WebDriver-created activity item");
        const createNewInStock = await ojInputText(driver, By.id("quantity_instock"));
        await createNewInStock.changeValue("15");
        const createNewShipped = await ojInputText(driver, By.id("quantity_shipped"));
        await createNewShipped.changeValue("16");
    });

    it("Get Instance of Submit Button ", async () => {

        await driver
            .wait(until.elementLocated(By.id("submitBtn")),
                20000,
                "Timed out after 20 seconds waiting for submitBtn",
                4000
            )
        const submitBtn = await ojButton(driver, By.id('submitBtn'));
        submitBtn.click();
    });

    it("Close the Create New Item Dialog", async () => {

        await driver
            .wait(until.elementLocated(By.id("createDialog")),
                20000,
                "Timed out after 20 seconds waiting for createDialog",
                4000
            )
        const createDialog = await ojDialog(driver, By.id('createDialog'));
        createDialog.doClose()
    });

    // Now we will try to delete the created Activity 

    it("Select an Activity to delete an activity item", async() =>{
        await driver.wait(until.elementLocated(By.id("activitiesList")),20000,"Timed out after 20 seconds waiting for Activities List", 2000)
        const activitiesList = await ojListView (driver, By.id("activitiesList"));

        await activitiesList.changeSelected([4]);
        const val: any = await activitiesList.getFirstSelectedItem();
        expect(val.data.name).to.equal("Soccer");
    });

    it("Select an activity item to delete from the Activity Items List", async() =>{
        const itemsList = await ojListView(driver, By.id("itemsList"));
        const key = await fetchKeyByFilter<ListViewElement<string, any>,string>(itemsList,"data",{ text: "WebDriver-Created Activity Item"

        } );

        await itemsList.changeSelected([key]);
    });

     it("Click the Delete button", async () => {
        await driver
            .wait(
                until.elementLocated(By.id("deleteButton")),
                20000,
                "Timed out after 20 seconds waiting for Create Button",
                2000
            )
        const deleteBtn = await ojButton(driver, By.id("deleteButton"));
        deleteBtn.doAction();
    });


    it("Click OK in the browser's confirmation dialog to confirm deletion ", async () => {
        await driver
            .wait(
                until.alertIsPresent()
            )
        // Switch to the alert and accept the alert (click OK)
        const alert = driver.switchTo().alert();
        alert.accept();
    });

    after(() => dm.releaseDriver(driver));  // Releasing the driver connection to the web app oracle JET
});