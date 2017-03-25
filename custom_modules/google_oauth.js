// Requiring the file system module, so that this module
// can have access to the file system (to read in the credentials
// of the projects client secret keys)
var fs = require("fs");

var dbQuery = require("./database_query");

// Requiring the Google auth library, which will be used to 
// generate new OAuth2 clients (to be used to authorise, and
// make requests of the Google APIs throughout the server)
var googleAuth = require("google-auth-library");

var google = require("googleapis");

var drive = google.drive("v3");

var fs = require("fs");

// Storing the client secret data for the servers Google projects
// so that they can be used when setting up new OAuth2Clients
var clientSecretData = JSON.parse(fs.readFileSync("./google/client_secret.json"));

// Setting the redirectURL (which will be used by the OAuth2
// request to return a user to the server following a successful login)
// based on that specified in the environment variable i.e. this may
// vary depending on where the server is running
var redirectURL = process.env.SITE_URL + "/google/oauthRedirectURL";

function generateOAuthUrl (cb){
  // Generating a new OAuth2Client using the other method defined in this object
  generateOAuth2Client(null, function(oauth2Client){
    // Creating a new OAuthURL (which the user will use to access the login page
    // on Google to authorise the server to access their account) by using the built
    // in method of the Google Auth libraries OAuth2Client, passing in the access type
    // and API scope that this login would authorise
    var oauthURL = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
        ],
        prompt: "select_account"
    });

    // Returning the OAuth URL to the caller
    cb(oauthURL);
  });
}

function generateOAuth2Client(currentUserID, cb){
  // Generating a new Auth object, using the Google Auth library
  var auth = new googleAuth();

  // Creating a new OAuth2Client using the OAuth2 method of the 
  // auth object, passing in the servers client id, client secret,
  // and the redirect URL to return the user to the server following
  // successful login
  var newOAuth2Client = new auth.OAuth2(
    clientSecretData.web.client_id,
    clientSecretData.web.client_secret
  );

  if(currentUserID == null){
    newOAuth2Client.redirectUri_ = redirectURL;
    cb(newOAuth2Client);
  } else {
    dbQuery.get_User("google_access_token, google_refresh_token", currentUserID, function(err, row){
      if(row){
        var userAccessToken = JSON.parse(row.google_access_token);
        userAccessToken.refresh_token = row.google_refresh_token;
        newOAuth2Client.credentials = userAccessToken;
      }
      cb(newOAuth2Client);
    });
  }
}

function createNewProjectFolder(projectName, currentUserID, cb){
  console.log("About to create new folder");
  generateOAuth2Client(currentUserID, function(oauth2Client){
    var folderMeta = {
      "name" : "ContentDeveloper_" + projectName,
      "mimeType" : "application/vnd.google-apps.folder"
    };

    drive.files.create({
      auth: oauth2Client,
      resource: folderMeta,
      fields: "id"
    }, function(error, file) {
      if(error) {
        console.log(error);
      } else {
        console.log("Successfully created folder. Id: = " + file.id);
        makeFolderPublic(file.id, oauth2Client, function(){
          cb(file.id);
        });
      }
    });
  });
}

function uploadMediaItem(fileInfo, mediaFolderId, currentUserID, cb){  
  generateOAuth2Client(currentUserID, function(oauth2Client){
    if(mediaFolderId != null){
      var fileMetadata = {
        "name": fileInfo.originalname,
        parents: [ mediaFolderId ]
      };
      
      var mediaItem = {
        mimeType: fileInfo.mimetype,
        body: fs.createReadStream(fileInfo.path)
      };
      
      drive.files.create({
        auth: oauth2Client,
        resource: fileMetadata,
        media: mediaItem,
        fields: "id"
      }, function(err, uploadedFile) {
        if(err) {
          console.log(err);
        } else {
          console.log("File successfully uploaded", uploadedFile.id);
          fs.unlink(fileInfo.path, function(err){
            if(err){
              console.log(err);
            }
          });
          cb(uploadedFile.id);
        }
      });
    }
  });    
}

function addUserToMediaFolder(mediaFolderId, currentUserID, addUserID, role, cb){
  dbQuery.get_User("email_address", addUserID, function(err, row){
    if(row){
      generateOAuth2Client(currentUserID, function(oauth2Client){
        drive.permissions.create({
          auth: oauth2Client,
          resource: {
            "type": "user",
            "role": role,
            "emailAddress": row.email_address
          },
          fileId: mediaFolderId,
          fields: "id",
          transferOwnership: role == "owner" ? true : false
        }, function(err, res) {
          if (err) {
            console.log(err);
            cb(null);
          } else {
            console.log("User successfully added to media folder: " + res.id);
            cb(String(res.id));
          }
        });
      });
    }
  });
}

function removeUserFromMediaFolder(mediaFolderId, userPermissionId, currentUserID, cb){
  if(userPermissionId != null){
    generateOAuth2Client(currentUserID, function(oauth2Client){
      drive.permissions.delete({
        auth: oauth2Client,
        fileId: mediaFolderId,
        permissionId: userPermissionId
      }, function(err, res) {
        if (err) {
          console.log(err);
          cb(false);
        } else {
          console.log("User successfully removed from media folder");
          cb(true);
        }
      });
    });
  } else {
    cb();
  }    
}

function updateUserAccessToFolder(mediaFolderId, currentUserID, userPermissionId, role, cb){
  generateOAuth2Client(currentUserID, function(oauth2Client){
    drive.permissions.update({
        auth: oauth2Client,
        fileId: mediaFolderId,
        permissionId: userPermissionId,
        resource: {
          "role": role
        },
        fields: "id",
        transferOwnership: role == "owner" ? true : false
      }, function(err, res) {
        if (err) {
            console.log(err);
          cb(null);
        } else {
          console.log("User access level successfully updated: " + res.id);
          cb(String(res.id));
        }
      });
  });
}

function getAllProjectImages(projectID, mediaFolderId, currentUserID, numFiles=10, nextPageToken=null, cb){
  generateOAuth2Client(currentUserID, function(oauth2Client){
    nextPageToken = nextPageToken == "null" ? null : nextPageToken;
    numFiles = isNaN(numFiles) ? null : numFiles;

    var getFields = "id, name, mimeType";
    var queryString = "'" + mediaFolderId + "' in parents";
    queryString += " and trashed = false";
    
    drive.files.list({
      auth: oauth2Client,
      q: queryString,
      pageSize: numFiles,
      pageToken: nextPageToken,
      fields: "nextPageToken, files(" + getFields + ")"
    }, function(err, results){      
      if(results != null) {
        for(var file of results.files){
          file.url = "https://drive.google.com/uc?id=" + file.id;
        }
        cb(results);
      } else {
        cb(null);
      }
    });
  });
}

function makeFolderPublic(fileId, oauth2Client, cb) {
  drive.permissions.create({
    auth: oauth2Client,
    resource: {
      "type": "anyone",
      "role": "reader"
    },
    fileId: fileId,
    fields: 'id',
  }, function(error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log("Successfully updated permission for: " +  res.id);
      cb();
    }
  }); 
}

// Setting the export of this module to be equal to an object, which 
// contains two methods - one to generate a new OAuth URL, and the other
// to generate new OAuth2Clients
module.exports = {
  generateOAuthUrl: generateOAuthUrl,
  generateOAuth2Client: generateOAuth2Client,
  createNewProjectFolder: createNewProjectFolder,
  uploadMediaItem: uploadMediaItem,
  addUserToMediaFolder: addUserToMediaFolder,
  removeUserFromMediaFolder: removeUserFromMediaFolder,
  updateUserAccessToFolder: updateUserAccessToFolder,
  getAllProjectImages: getAllProjectImages
};