const puppeteer = require('puppeteer');


// content_getter("B01KIFISX2");


// promiser("B01KIFISX2").then(console.log);

function promiser(asin)
{
    return new Promise(resolve=>
        {
            return content_getter(asin,resolve);
        })
}



async function content_getter(asin,resolve)
{
    try{
    let url = "https://www.amazon.com/dp/"+asin;

    let return_obj = {};

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
    })
    let response = await page.goto(url);
      
    console.log(response.status());
    try{
        await page.waitForSelector("#socialProofingAsinFaceout_feature_div",{ timeout: 5000 });
    }
    catch(err)
    {

    }
    if(response.status() == 200)
    {
    return_obj = await page.evaluate(function(return_obj){
        
        let document = window.document;

        return_obj["viewed"] = document.getElementById("social-proofing-faceout-title-tk_viewed")?document.getElementById("social-proofing-faceout-title-tk_viewed").textContent:"Not Available";
        return_obj["brought"] = document.getElementById("social-proofing-faceout-title-tk_bought")?document.getElementById("social-proofing-faceout-title-tk_bought").textContent:"Not Avialable";
        return_obj["Product Title"] = document.getElementById("productTitle")?document.getElementById("productTitle").textContent.trim():"Not Available";
        document.querySelector("#productDetails_techSpec_section_1 tbody").querySelectorAll("tr").forEach(ele=>
            {
                if(ele.querySelector("th").textContent.trim()!=="Best Sellers Rank"&&ele.querySelector("th").textContent.trim()!=="Customer Reviews")
                return_obj[ele.querySelector("th").textContent.trim()] = ele.querySelector("td").textContent.trim(); 
            });
        
        return return_obj;
    },return_obj)
    console.log("Sent");
    return resolve(return_obj);
    }
    else{
        console.log("Outer Error");
        content_getter(asin);
    }
    await browser.close();
    }
    catch(err)
    {
        content_getter(asin,resolve);
    }
}

module.exports = promiser;