const {chromium} = require("playwright");

// let url = "https://www.amazon.com/gp/bestsellers/automotive/15735581/ref=pd_zg_hrsr_automotive";

async function parent_asins_requester(url){
    const browser = await chromium.launch();
    const context = await browser.newContext({
        // userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
    });
    const page = await context.newPage();
    
    await page.goto(url);
    let content = await page.evaluate(function(){
        let document = window.document;
        let parent_asins = [];
        try{
        let asins_container_json = JSON.parse(document.querySelectorAll(".p13n-desktop-grid")[0].getAttribute("data-client-recs-list"));
            asins_container_json.forEach(single => {
                parent_asins.push(single.id);
            });
            return parent_asins;
        }
        catch(err)
        {
            console.error(err);
            return "Errored";
        }
    });
    // console.log(content);
    browser.close();
    return content;
}

// parent_asins_requester(url);

module.exports = parent_asins_requester;
