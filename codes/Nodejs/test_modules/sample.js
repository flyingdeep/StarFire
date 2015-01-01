///var sss = require("./../helper_modules/customize_Des.js");
//console.log(sss.strEnc("flyingdeep","FifthSea"));
var reformJsonObject = function (e)
{
    for (var item in e)
    {
        if (e[item] == null)
        {
            delete e[item]
        }
    }
};
var ssJson ="{ user_name: 'flyingdeep', password: 'K+2C13bP9ZwBopvJZwhu7g' }";

JSON.parse(ssJson);


