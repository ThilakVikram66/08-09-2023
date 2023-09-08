const axios = require('axios');
const {JSDOM} = require('jsdom');

main("B0749LVBW6");
async function main(asin)
{
    let content_page = "https://www.amazon.com/dp/"+asin;
    let review_page = "https://www.amazon.com/product-reviews/"+asin+"?th=1&formatType=current_format";
    let return_obj = {};
    await promiser(content_page).then(res=>
        {
            let dom = new JSDOM(res);
            let document = dom.window.document;
            console.log(document.querySelector("title").textContent);
            // ****************************************** viwed and brought
            return_obj["viewed"] = document.querySelector("#social-proofing-faceout-title-tk_viewed").textContent;
            
            return_obj["brought"] = document.querySelector("#social-proofing-faceout-title-tk_bought").textContent;

            retunr
        });
        console.log(return_obj);
}


function promiser(url)
{
    return new Promise(res=>
        {
            return scrapper(url,res);
        })
}

async function scrapper(url,resolve)
{
    axios.get(url).then(res=>
        {
            console.log(Object.keys(res));
            if(res.status == 200)
            {
                resolve(res.data);
            }
            // console.log(res.data);
        }).catch(err=>
            {
                console.log("errored");
                scrapper(url,resolve);
            })
}