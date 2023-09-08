const asin_content_getter = require('./children/content_scrape1');
const fs = require('fs');
let file = require("./Tracker/asins.json");

main();
async function main()
{
    let information_holder = [];
    let promise_container = [];
    for(let i=0;i<file.length;i+2)
    {
        
        if(i<file.length)
        {
            promise_container.push(asin_content_getter(file[i]).then(res=>information_holder.push(res)));
        }
        if(i+1<file.length)
        {
            promise_container.push(asin_content_getter(file[i+1]).then(res=>information_holder.push(res)));
        }
        
        await Promise.all(promise_container).then(console.log("Promise Completed"));
        console.clear();
        console.log("Total "+information_holder.length+" From "+file.length);
        promise_container = [];
        fs.writeFile("result.json",JSON.stringify(information_holder),err=>{
            if(err)
            {
                console.log("Errored on fs");
            }
            else
            {
                console.log("Stored Success");
            }
        })
    }
}