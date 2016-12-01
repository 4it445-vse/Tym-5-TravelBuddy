module.exports = function(app) {
  // Function to support file renaming after upload
  app.dataSources.storage.connector.getFilename = function(file, req, res) {
      //First checking the file type..
        var pattern = /^image\/.+$/;
        var value = pattern.test(file.type);
        if(value ){
            var fileExtension = file.name.split('.').pop();
            var time = new Date().getTime();
            var userId = req.accessToken.userId;

            //Now preparing the file name..
            //customerId_time_orderId.extension
            var NewFileName = '' + userId + '_' + time + '.' + fileExtension;

            //And the file name will be saved as defined..
            return NewFileName;
        }
        else{
            throw "FileTypeError: Only File of Image type is accepted.";
        }
    };
}
