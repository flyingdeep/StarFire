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

    this.addSelectedStandImages = function(callback, images)
    {
        serverProxy.addStandImages(function(e)
            {
                if (e.success == "true")
                {
                    callback(e.result) ;

                }
                else
                {
                    callback(null);
                }
            }, images
        );
    };

    this.removeSelectedStandImages = function(callback, images)
    {
        serverProxy.removeStandImages(function(e)
            {
                if (e.success == "true")
                {
                    callback(e.result) ;

                }
                else
                {
                    callback(null);
                }
            }, images
        );
    };

    this.createNewStand = function(callback,standId, creatorType, standType, standName, typeDetailDescription, description, createUserId, position)
    {
        var positionArr = position.split(",");
        var positionLng = positionArr[0];
        var positionLat = positionArr[1];
        serverProxy.createStand(function(e)
            {
                if (e.success == "true")
                {
                    callback(e.result) ;

                }
                else
                {
                    callback(null);
                }
            }, standId, creatorType, standType, standName, typeDetailDescription, description, createUserId, positionLng, positionLat);
    };

    this.authenticateUser = function(callback,username,password)
    {

        serverProxy.authenticateUser(function(e)
        {

            if (e && e.success && e.success == "true")
            {
                callback(e.result) ;

            }
            else
            {
                callback(null);
            }
        },username,password);
    };




};
