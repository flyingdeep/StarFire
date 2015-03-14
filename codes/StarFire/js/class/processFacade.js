var processFacadeClass = function()
{
    var serverProxy = new serverProxyClass(AUTH_USER,AUTH_PASS);
    this.getStandTypes = function(callback)
    {
        serverProxy.getStandTypes(function(e)
            {
                if (e.success == "true")
                {
                      callback(e.result);

                }
                else
                {
                    callback(null);
                }
            }
        );
    };

    this.getImageUploadSecurityString = function(callback)
    {
        serverProxy.getImageUploadSecurityString(function(e)
            {
                if (e.success == "true")
                {
                    callback(e.result) ;

                }
                else
                {
                    callback(null);
                }
            }
        );
    };
};
