var eventHandlerManagerClass = function()
{
    this.toggleTarget_Sharp_Change = function()
    {
        if ($("#toggleTarget").prop("checked"))
        {
            $("#searchInput").prop("placeholder","搜索摊位");
        }
        else
        {
            $("#searchInput").prop("placeholder","搜索地址");
        }
    };
    this.searchForm_Sharp_Submit = function()
    {
        if ($("#toggleTarget").prop("checked"))
        {
            searchStand(map);
        }
        else
        {
            searchLocation(map);
        }
        return false;
    };

};