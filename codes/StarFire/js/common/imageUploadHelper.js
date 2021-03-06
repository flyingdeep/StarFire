/**
 * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
 * @param {Image} source_img_obj The source Image Object
 * @param {Integer} quality The output quality of Image Object
 * @return {Image} result_image_obj The compressed Image Object
 */
var jic = {
    compress: function(source_img_obj, quality, output_format){

        var mime_type = "image/jpeg";
        if(output_format!=undefined && output_format=="png"){
            mime_type = "image/png";
        }


        var cvs = document.createElement('canvas');
        //naturalWidth真实图片的宽度
        cvs.width = source_img_obj.naturalWidth;
        cvs.height = source_img_obj.naturalHeight;
        var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
        var newImageData = cvs.toDataURL(mime_type, quality/100);
        var result_image_obj = new Image();
        result_image_obj.src = newImageData;
        return result_image_obj;
    }
}


var generateOSSAutoFilenameCode = function(comingSeed)
{
   var preString = "Ma";
   var timeSeed = (new Date()).getTime();
    return preString+timeSeed+"" + comingSeed;
};

function uploadSingleUserImage(callback)
{
    var xhr = null;
    var fileNameCode = generateOSSAutoFilenameCode(inputSeed);
    var key = fileNameCode + fileExtension;
    var commonHelper = new commonHelperClass();
    commonHelper.getOSSSignatureAndPolicy(function(e)
    {

        var OSSBase64Policy = e.base64policy;
        var OSSSignature = e.signature;
        var fd = new FormData();
        fd.append("key", key);
        //fd.append("success_action_redirect", "http://www.baidu.com");
        fd.append("success_action_status", 201);
        fd.append("OSSAccessKeyId", OSS_ACCESS_KEY_ID);
        fd.append("policy", OSSBase64Policy);
        fd.append("Signature", OSSSignature);
        fd.append("file", document.getElementById('userPic').files[0]);
        xhr = new XMLHttpRequest();
        xhr.open("POST", OSS_DOMAIN);//修改成自己的接口
        xhr.onreadystatechange = function(e){

            if (xhr.readyState == 4)
            {
                if (xhr.status == 201) {
                    callback(fileNameCode);
                }
                else
                {
                    callback(null);
                }
                //alert("complete");
            }


        };
        xhr.send(fd);

    });
}

function uploadSingleStandImage(callback)
{
    var xhr = null;
    var fileNameCode = generateOSSAutoFilenameCode(inputSeed);
    var key = fileNameCode + fileExtension;
    var commonHelper = new commonHelperClass();
    commonHelper.getOSSSignatureAndPolicy(function(e)
    {

        var OSSBase64Policy = e.base64policy;
        var OSSSignature = e.signature;
        var fd = new FormData();
        fd.append("key", key);
        //fd.append("success_action_redirect", "http://www.baidu.com");
        fd.append("success_action_status", 201);
        fd.append("OSSAccessKeyId", OSS_ACCESS_KEY_ID);
        fd.append("policy", OSSBase64Policy);
        fd.append("Signature", OSSSignature);
        fd.append("file", document.getElementById('file').files[0]);
        xhr = new XMLHttpRequest();
        xhr.open("POST", OSS_DOMAIN);//修改成自己的接口
        xhr.onreadystatechange = function(e){

            if (xhr.readyState == 4)
            {
                if (xhr.status == 201) {
                    callback(fileNameCode);
                }
                else
                {
                    callback(null);
                }
                //alert("complete");
            }


        };
        xhr.send(fd);

    });
}

function generateUserImagePreview(imgId, imgsrc, containerWidth)
{
    var tempImg = new Image();
    tempImg.src = imgsrc;
    // var quality =  50;
    // var compressedSrc =  jic.compress(tempImg,quality).src;
    var crDefaultHeight = CR_DEFAULT_IMG_HEIGHT_MAX;
    var crDefaultWidth = CR_DEFAULT_IMG_WIDTH_MAX;
    var defaultCanvasRatio = crDefaultHeight/crDefaultWidth;
    if (crDefaultWidth>containerWidth*0.7)
    {
        crDefaultWidth = containerWidth*0.7;
        crDefaultHeight = crDefaultWidth * defaultCanvasRatio;
    }

    var imageRatio = tempImg.height/tempImg.width;
    if (tempImg.width * crDefaultHeight > tempImg.height * crDefaultWidth)
    {
        if (tempImg.width> crDefaultWidth)
        {
            tempImg.width = crDefaultWidth;
            tempImg.height = tempImg.width*imageRatio;
        }
    }
    else
    {
        if (tempImg.height> CR_DEFAULT_IMG_HEIGHT_MAX)
        {
            tempImg.height = CR_DEFAULT_IMG_HEIGHT_MAX;
            tempImg.width = tempImg.height/imageRatio;
        }
    }
    var resultString = "<img src='" + imgsrc + "' width='" + tempImg.width + "' height='" + tempImg.height + "' style='position:relative; left:0px; top:0px;vertical-align:middle;'>";
    return resultString;
}

function generateImagePreviewBox(imgId, imgsrc, containerWidth)
{

    var tempImg = new Image();
    tempImg.src = imgsrc;
    // var quality =  50;
    // var compressedSrc =  jic.compress(tempImg,quality).src;
    var crDefaultHeight = CR_DEFAULT_IMG_HEIGHT_MAX;
    var crDefaultWidth = CR_DEFAULT_IMG_WIDTH_MAX;
    var defaultCanvasRatio = crDefaultHeight/crDefaultWidth;
    if (crDefaultWidth>containerWidth/2)
    {
        crDefaultWidth = containerWidth/2;
        crDefaultHeight = crDefaultWidth * defaultCanvasRatio;
    }

    var imageRatio = tempImg.height/tempImg.width;
    if (tempImg.width * crDefaultHeight > tempImg.height * crDefaultWidth)
    {
        if (tempImg.width> crDefaultWidth)
        {
            tempImg.width = crDefaultWidth;
            tempImg.height = tempImg.width*imageRatio;
        }
    }
    else
    {
        if (tempImg.height> CR_DEFAULT_IMG_HEIGHT_MAX)
        {
            tempImg.height = CR_DEFAULT_IMG_HEIGHT_MAX;
            tempImg.width = tempImg.height/imageRatio;
        }
    }
    var resultString = "<div style='float: left;text-align:center;line-height:" + crDefaultHeight + "px;position:relative;background-color:#ddffff;width:"+ crDefaultWidth +"px;height:" + crDefaultHeight + "px;' id='"+ imgId +"'>";
    resultString = resultString + "<img src='" + imgsrc + "' width='" + tempImg.width + "' height='" + tempImg.height + "' style='position:relative; left:0px; top:0px;vertical-align:middle;'>";
    resultString = resultString + "<img src='./images/cross_small.png'  style='width:30px; position:absolute; right:0px; top:0px;' onclick='createStandEntity.images[\"" +imgId;
    resultString = resultString+ "\"]=0; $(\"#" + imgId +  "\").remove();' >";
    resultString = resultString + "</div>";
    return resultString;
}

