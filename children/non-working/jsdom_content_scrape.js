const {JSDOM} = require("jsdom");
// let asin = "B0749LVBW6";

// content_returner(asin,p_asin);

// main_promise("B089KFZ99P","C089KFZ99P")
function main_promise(asin,p_asin){
    return new Promise(resolve=>
        {
            return content_returner(asin,p_asin,resolve);
        })
}


content_returner("B089KFZ99P","C089KFZ99P")
async function content_returner(asin,p_asin)
{
    let return_obj = {};
    console.log(asin);
    await JSDOM.fromURL(`https://www.amazon.com/dp/${asin}?th=1`,{
        userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
    }).then(dom=>{
    let document = dom.window.document;
    console.log(document.querySelector("title").textContent);
    return_obj["viewed"] = document.getElementById("social-proofing-faceout-title-tk_viewed")?document.getElementById("social-proofing-faceout-title-tk_viewed").textContent:"Not Available";
    return_obj["brought"] = document.getElementById("social-proofing-faceout-title-tk_bought")?document.getElementById("social-proofing-faceout-title-tk_bought").textContent:"Not Avialable";
    return_obj["Product Title"] = document.getElementById("productTitle")?document.getElementById("productTitle").textContent.trim():"Not Available";
    
    // ********************************** spec
    document.querySelector("#productDetails_techSpec_section_1 tbody").querySelectorAll("tr").forEach(ele=>
        {
            if(ele.querySelector("th").textContent.trim()!=="Best Sellers Rank"&&ele.querySelector("th").textContent.trim()!=="Customer Reviews")
            return_obj[ele.querySelector("th").textContent.trim()] = ele.querySelector("td").textContent.trim(); 
        })
    });
    await JSDOM.fromURL(`https://www.amazon.com/product-reviews/${asin}?th=1&formatType=current_format`).then(dom=>{
    return_obj["Reviews&Ratings"] = dom.window.document.querySelector("[data-hook=cr-filter-info-review-rating-count]").textContent.trim();
});
// console.log(return_obj);
return_obj["Parent Asin"] = p_asin
return return_obj;
}

module.exports = main_promise;