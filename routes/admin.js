// Creating a new router through the express module. This router
// will be used within this module so set up the various requests
// which this route will accept.
var router = require('express').Router();

// Requiring the googleapis module, so that it can be used within
// within this module to make requests to specific Google APIs
// i.e. to make request to the Plus API, to get the user's name and
// profile picture from the Google account
var google = require("googleapis");

// Requiring the custom database connection module, so that the one
// connection to the database can be reused throughout the application.
var dbconn = require("../database/connection.js");

// Requiring the custom google OAuth module, which exports an object with 
// a method to generate a new oauth url, and a method which returns
// a new OAuth2Client.
var googleOAuth = require("../google/googleOAuth");

// ALL REQUESTS
router.use(function(req, res, next){
    // Creating an empty array on the request object, to temporarily store
    // any errors that may occur throughout this route, so that they can
    // be rendered in the error page for the admin-errors route (should
    // any errors occur).
    req.adminErrors = [];

    // Allowing this request to continue through this route
    next();
});

// Request to view the list of projects available to this user 
router.get("/:userID", function(req, res, next){
    console.log("Request recieved in admin route. ID=" + req.params.userID);

    // Querying the database for the user with an id that matches that passed within
    // the parameters of the URL. Escaping this value first.
    dbconn.query("SELECT * FROM User WHERE id=" + dbconn.escape(req.params.userID), function (err, rows, fields){
        // Checking if an error was returned from the database
        if(err){
            // Logging this error to the console
            console.log(err);
        } else {
            // Checking that there was at least one result returned from the database
            if(rows.length > 0){
                // Loading the Google Plus object from the googleapis module, so that a
                // request can be made to this API to retrieve this user's profile
                // information
                var plus = google.plus('v1');

                // Creating a new oauth2 client, using a method from the custom google
                // oauth module. This client will be used to authenticate the request
                // to the Google Plus API below.
                var oauth2Client = googleOAuth.generateOAuth2Client();

                // Adding the user's GoogleAuthToken (sourced from the row returned from the 
                // database) as the credentials for the oauth2 client, which wil be included
                // in the request to the Google Plus API below.
                oauth2Client.credentials = JSON.parse(rows[0].google_auth_token);

                // Making a request to the Google Plus API, to get the profile information
                // relating to this user. Passing the oauth2Client created above as the
                // authentication for this request.
                plus.people.get({
                    userId: "me",
                    auth: oauth2Client
                }, function (err, user) {
                    // Checking if an error was returned from the request.
                    if(err) {
                        // Logging the error to the console.
                        console.log("Error loading user profile " + err);
                    } else {
                        // Rendering the admin template, supplying it with the title of the
                        // page, the user's display name, and the link to their profile image (with
                        // the size specification removed - as by default it is set to 50px)
                        res.render("admin", {
                            pageTitle: "Admin Panel",
                            userDisplayName: user.displayName,
                            userProfileImage: user.image.url.replace("?sz=50", ""),
                            userID: req.params.userID 
                        });
                    }
                });
            }
        }
    });
});

// Request to view a specific project belonging to this user
router.get("/:userID/:projectID", function(req, res, next){
    // Querying the database, to check if this user has permissions to access this project, using
    // the project id and user id supplied in the URL parameters (ecscaping both before they are passed
    // to the query).
     dbconn.query("SELECT * FROM Project p LEFT JOIN User_Project up ON p.id = up.project_id WHERE p.id = " + dbconn.escape(req.params.projectID) + " AND up.user_id = " + dbconn.escape(req.params.userID), function(err, rows, fields){
        // Checking if any errors were returned from the database
        if(err){
            // Logging these errors to the console
            console.log(err);
        } else {
            // Setting the default template to render to be the "editproject_content" template
            // which is used for content editors
            var templateToRender = "editproject_content";

            // Determining if a more specific template should be used, based on the user's access
            // level to this project
            switch(rows[0].user_access_level) {
                case 1: {
                    // For administrator level users, changing the template to render to be the
                    // "editproject_admin" template
                    templateToRender = "editproject_admin";
                    break;
                }
            }

            // Rendering the appropriate template for the user's access level to this project
            // (as determined above), passing it the project name as the page title, user ID
            // of the current user, project ID of the current project and project name.
            // The actual contents of this project will be requested through the feeds REST API
            // by requests made on the client side once the page loads.
            res.render(templateToRender, {
                pageTitle: rows[0].project_name,
                userID: req.params.userID,
                projectID: req.params.projectID,
                projectName: rows[0].project_name 
            });
        }
     });
});

// Exporting the router that was set up in this file, so that it can be included
// in the app.js file and specified as the route for all requests to the "/admin" route
module.exports = router;