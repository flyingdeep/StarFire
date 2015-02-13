var commonHelperClass = function()
{

    this.constructStandTypeHTML= function(callback)
    {
        var processOperation = new processFacadeClass();
        var standTypesCallback = function(e)
        {


        }
        processOperation.getStandOwnerMessagesByStandId(standTypesCallback);
    }

}
