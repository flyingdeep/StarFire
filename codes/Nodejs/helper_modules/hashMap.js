	exports.hashMapBaseClass = function() {
        this.set = function(key,value){this[key] = value;};

        this.get = function(key){return this[key];};

        this.contains = function(key){return this.get(key) == null?false:true;};

        this.remove = function(key){delete this[key];};

        this.count= function()
        {
            var _count = 0;
            for (var item in this)
            {
                if (typeof this[item] != "function")
                {
                    _count++;
                }
            }
          return _count;
        };
    };

