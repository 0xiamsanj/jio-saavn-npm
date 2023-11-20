const jiosaavn = require("jiosaavnapi");

call = async() =>{
    const res = await jiosaavn({lang:['English']})
    console.log(res)
}
call()