var processFacadeClass = function()
{
    var serverProxy = new serverProxyClass(AUTH_USER,AUTH_PASS);
    this.getStandTypes = function(callback)
    {
        serverProxy.getStandTypes(callback);
    }


}
