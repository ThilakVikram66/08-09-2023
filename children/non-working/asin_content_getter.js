const {chromium} = require("playwright");

let url = "https://www.amazon.com/dp/B0749LVBW6";
let asin = "B0C36YRQWN";

async function asin_content_getter(asin){
    const browser = await chromium.launch();
    const context = await browser.newContext({
        userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
    });
    const page = await context.newPage();
    await page.waitForLoadState('domcontentloaded');
    await page.goto("https://www.amazon.com/dp/"+asin);
    
    let content = await page.evaluate(function(){
        let information_holder = {};
        let document = window.document;
        if(document.getElementById("socialProofingAsinFaceout_feature_div"))
        {
            information_holder["viewed"] = document.querySelector("#social-proofing-faceout-title-tk_viewed span").textContent;
            information_holder["sales"] = document.querySelector("#social-proofing-faceout-title-tk_bought span").textContent;
        }
        else{
            information_holder["viewed"] = "Not Available";
            information_holder["sales"] = "Not Available";
        }
        information_holder["product_title"] = document.getElementById("productTitle").textContent;
        document.querySelector("#productDetails_techSpec_section_1 tbody").querySelectorAll("tr").forEach(ele=>{
            information_holder[ele.querySelector("th").textContent.trim()] = ele.querySelector("td").textContent.trim();
        })

        return information_holder;
    });
    await page.goto(`https://www.amazon.com/product-reviews/${asin}?th=1&formatType=current_format`);
    page.evaluate(content=>{

    },content)
    console.log(content);
    browser.close();
}

asin_content_getter(asin);