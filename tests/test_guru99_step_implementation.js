/* globals gauge*/
"use strict";
const { openBrowser,write, closeBrowser, goto,screenshot,into,link,$,click,button,radioButton,alert,confirm,accept,clear } = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';
var faker = require('faker');
var customerId;

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    await closeBrowser();
});

gauge.screenshotFn = async function() {
    return await screenshot({ encoding: 'base64' });
};

step("Goto guru99 bank demo website.", async () => {
    var url = "http://demo.guru99.com/V4/index.php";
    await goto(url);
});

step("Login website as manager.", async () => {
    var username = "mngr249689";
    var password = "maqubur";
    await write(username,into($('input[name="uid"]')));
    await write(password,into($('input[name="password"]')));
    await click(button('LOGIN'));
});

step("Check <Log out> menu is displayed.", async (menu) => {
    await click ($('#closeBtn'));
    assert.ok(link(menu).exists());
});

step("Logout of the website.", async () => {
    alert('You Have Succesfully Logged Out!!', async() =>  await accept());
    await click(link('Log out'));
});

step("Click on New Customer link.", async () => {
    await click(link('New Customer'));
});

step("Add new customer details and save.", async () => {
    var customerName  = faker.name.firstName();
    var dateOfBirth = "23-10-1990";
    var address = faker.address.streetAddress();
    var cityName = faker.address.city();
    var state = faker.address.state();
    var pinno = faker.random.number(999999);
    var mobNo= faker.random.number(9999999999);
    var emailId = faker.internet.email();

    await write(customerName, into($('input[name="name"]')));
    await radioButton('male').select();
    await write(dateOfBirth, into($('#dob')));
    await write(address,into($('textarea[name="addr"]')));
    await write(cityName,into($('input[name="city"]')));
    await write(state,into($('input[name="state"]')));
    await write(pinno,into($('input[name="pinno"]')));
    await write(mobNo,into($('input[name="telephoneno"]')));
    await write(emailId,into($('input[name="emailid"]')));
    await write('Passw@111',into($('input[name="password"]')));
    await click(button('Submit'));
});

step("Check the newly added customer details.", async () => {
        assert.strictEqual(await $('#customer > tbody > tr > td > p').text(),"Customer Registered Successfully!!!", "Registration message incorrect!!");
        customerId = await $('#customer > tbody > tr:nth-child(4) > td:nth-child(2)').text();
	    assert.strictEqual(await $('#customer > tbody > tr:nth-child(5) > td:nth-child(2)').text(),customerName, "Customer Name mismatch!");
        assert.strictEqual(await $('#customer > tbody > tr:nth-child(6) > td:nth-child(2)').text(),"male", "Customer Gender mismatch!");
        var actualDob = $('#customer > tbody > tr:nth-child(7) > td:nth-child(2)').text();
	    assert.strictEqual(await actualDob, "1990-10-23","Customer DOB mismatch!");
	    assert.strictEqual(await $('#customer > tbody > tr:nth-child(8) > td:nth-child(2)').text(),address, "Customer Address mismatch!");
	    assert.strictEqual(await $('#customer > tbody > tr:nth-child(9) > td:nth-child(2)').text(),cityName, "Customer City mismatch!");
	    assert.strictEqual(await $('#customer > tbody > tr:nth-child(10) > td:nth-child(2)').text(),state, "Customer State mismatch!");
	    assert.strictEqual(await $('#customer > tbody > tr:nth-child(11) > td:nth-child(2)').text(),pinno.toString(), "Customer Pin mismatch!");
	    assert.strictEqual(await $('#customer > tbody > tr:nth-child(12) > td:nth-child(2)').text(),mobNo.toString(), "Customer Mobile No. mismatch!");
	    assert.strictEqual(await $('#customer > tbody > tr:nth-child(13) > td:nth-child(2)').text(),emailId, "Customer Email mismatch!");
        await click(link('Continue'));

});

step("Click on Edit Customer link, enter customer id and click on Submit.", async () => {
    await click(link('Edit Customer'));
    await write(customerId, into($('input[name="cusid"]')));
    await click(button('Submit'));
});


step("Edit the address details and click save.", async () => {
    var editAddress = faker.address.secondaryAddress();
    await clear($('textarea[name="addr"]'));
    await write(editAddress,into($('textarea[name="addr"]')));
    await click(button('Submit'));

});

 step("Check the edited customer details.", async () => {
    assert.strictEqual(await $('#customer > tbody > tr:nth-child(4) > td:nth-child(2)').text(),customerId, "Customer Id mismatch!");
    assert.strictEqual(await $('#customer > tbody > tr:nth-child(8) > td:nth-child(2)').text(),editAddress, "Customer Address mismatch!");
});

step("Delete customer.", async function() {
	await click(link('Delete Customer'));
    await write(customerId, into($('input[name="cusid"]')));
    confirm('Do you really want to delete this Customer?', async() =>  await accept());
    alert('Customer deleted Successfully', async() =>  await accept());
    await click(button('Submit'));
});

step("Goto Google Website", async function() {
    await goto("www.google.co.in");
	  });

    step("Write Apple iPhone", async function() {
    await write("Apple iphone");
    });
    
    step("Search Result", async function() {
    await press("Enter");
    assert.ok(text("Apple iphone").exists());
      
    });
        