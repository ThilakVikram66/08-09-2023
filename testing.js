
async function main()
    {
        let a = [1,2,34,5,6];
        for(let i of a)
        {
            await setTimeout(() => {
                console.log(i);
            }, 2000);
        }
    }

    main()
