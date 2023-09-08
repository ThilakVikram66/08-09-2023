const {chromium} = require("playwright");

async function variation_asin_getter(asin){
    const browser = await chromium.launch();
    const context = await browser.newContext({
        // userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
    });
    const page = await context.newPage();
    await page.goto("https://www.amazon.com/dp/"+asin);
    
    let content = await page.evaluate(function(asin){
        if(window.isTwisterPage == 1)
        return Object.values(window.Twister.dimensionalSummaryModule.dimensionCombinationToASINMap);
        else
        return [asin];
    },asin);
    console.log(content);
    browser.close();
    return content;
}

// variation_asin_getter(url,asin);

module.exports = variation_asin_getter;