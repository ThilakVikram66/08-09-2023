let parent_asins = require("./children/parent_asin_getter");
let variation_asins = require("./children/variation_asin_getter");
let asin_content_getter = require("./children/content_scrape1");
const fs = require("fs");
let url = "https://www.amazon.com/gp/bestsellers/automotive/15735581/ref=pd_zg_hrsr_automotive";

starter(url);
async function starter(url)
{
    fs.writeFile("result.json","",(err)=>{
        if(err)
        {
            console.log("cleared successfully");
        }
    })
    let information_holder = [];
    let P_asins = await parent_asins(url);
    console.log(P_asins);
    let count = 0;
    for(var p_asin of P_asins){
        
    console.log("P_entered");
        let v_asins = await variation_asins(p_asin);
        // for(let v_asin of v_asins)
        let promise_container = [];
        for(let i=0;i<=v_asins.length;i+3)
        {
            console.log("entered");
            if(i<v_asins.length)
            {
                promise_container.push(asin_content_getter(v_asins[i]).then(res=>information_holder.push(res)));
            }
            if(i+1<v_asins.length)
            {
                promise_container.push(asin_content_getter(v_asins[i+1]).then(res=>information_holder.push(res)));
            }
            if(i+2<v_asins.length)
            {
                promise_container.push(asin_content_getter(v_asins[i+2]).then(res=>information_holder.push(res)));
            }
            await Promise.all(promise_container).then(console.log("completed promises"));
            console.clear();
            console.log(count+" completed from "+P_asins.length+" Parent Asin");
            console.log(i+" Variation Completed From "+p_asin);
            console.log("Total Information :"+information_holder.length);
            // console.table(information_holder);
            fs.writeFile("result.json",JSON.stringify(information_holder),(err)=>{
                if(err)
                {
                    console.log("cleared successfully");
                }
                else
                {
                    console.log("success");
                }
            })
        }
        count++;
    };
}