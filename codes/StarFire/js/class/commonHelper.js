var commonHelperClass = function()
{
    this.constructStandTypeHTML= function(callback)
    {
        var processOperation = new processFacadeClass();
        var standTypesCallback = function(e)
        {

            if(e)
            {
                var radioText;
                var radioValue;
                var itemString = "";
                var standTypeRadioIdBase = "standType_";
                var idName;

               for (var item in e)
               {
                   radioText = e[item].type_name;
                   radioValue = e[item].stand_type_id;
                   idName = standTypeRadioIdBase + item;
                   itemString = itemString + '<div class="gcol2"><input id="'+ idName +'" type="radio"  name="standTypeRadio" value="'+ radioValue
                       +'"><label for="'+idName+'">'+ radioText +'</label></div>';
               }
                itemString = itemString + "&nbsp;";
                callback(itemString);

            }
            else
            {
                callback(null);
            }

        }
        processOperation.getStandTypes(standTypesCallback);
    }

}
