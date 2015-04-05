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



function uploadSingleStandImage()
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
        //xhr.upload.addEventListener("progress", uploadProgress, false);
        //  xhr.addEventListener("load", uploadComplete, false);
        // xhr.onload = uploadComplete;
        //  xhr.addEventListener("error", uploadFailed, false);


        //xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", OSS_DOMAIN);//修改成自己的接口
        xhr.onreadystatechange = function(e){
            //  alert("");
            if (xhr.readyState == 4)
            {
                alert("complete");
            }


        };
        xhr.addEventListener("loaded", function(){

            alert("");
        }, false);

        xhr.send(fd);

    });

}