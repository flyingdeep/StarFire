var commonHelperClass = function()
{

    var processOperation = new processFacadeClass();
    this.constructStandTypeHTML= function(callback, baseIdName)
    {
        //console.log(baseIdName);
        var standTypesCallback = function(e)
        {

            if(e)
            {
                var radioText;
                var radioValue;
                var itemString = "";
                var standTypeRadioIdBase = baseIdName;
                var idString;
                var nameString = baseIdName+"Radio";

               for (var item in e)
               {

                   radioText = e[item].type_name;
                   radioValue = e[item].stand_type_id;
                   idString = standTypeRadioIdBase + item;
                   itemString = itemString + '<div class="gcol2"><input id="'+ idString +'" type="radio"  name="'+nameString+'" value="'+ radioValue
                       +'"><label for="'+idString+'">'+ radioText +'</label></div>';
               }
                itemString = itemString + "&nbsp;";
                callback(itemString);

            }
            else
            {
                callback(null);
            }

        };
        processOperation.getStandTypes(standTypesCallback);
    };


    this.getOSSSignatureAndPolicy = function(callback)
    {

        processOperation.getImageUploadSecurityString(function(e)
        {
            if(e)
            {
                callback(e);

            }
            else
            {
                callback(null);
            }


        }
        );
    };

    this.getUserBelongedLocation = function()
    {
        return "上海";

    };



};
