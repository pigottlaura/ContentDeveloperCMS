// Creating a new router through the express module. This router
// will be used within this module so set up the various requests
// which this route will accept.
var router = require('express').Router();

// Request to get the entire content of a project
router.get("/:projectID", function(req, res, next){
    if(req.fileData.admin != null){
        // Adding the value of the project structure property of the project admin file, 
        // as the structure property on the responseObject.
        req.responseObject.structure = req.fileData.admin.project_structure;

        // Adding the content of the project (as returned from the content.json file) as 
        // a property on the response object, as the response will contain both the content
        // and the structure
        req.responseObject.content = req.fileData.content;
    } else {
        // Setting the content of the project (as stored on the request object) as 
        // the response object, as no structure will be returned alongside the content
        req.responseObject = req.fileData.content;
    }
            
    // Sending the response object back in the response (which may contain the project structure,
    // project content and possibly some errors)
    res.send(req.responseObject);
});

// Request to get the content of a collection in a project
router.get("/:projectID/*", function(req, res, next){
    var contentData = req.fileData.content;
    var structureData = req.fileData.admin != null ? req.fileData.admin.project_structure : null;

    var encapsulationData = req.allParams.slice(1);

    // Looping through the encapsulationData array (i.e. parameters passed to the
    // request URL) to drill down into the fileData object, to find the property that
    // needs to have an item created on it. 
    for(var i=0; i<encapsulationData.length; i++){

        if(contentData[encapsulationData[i]] != undefined){
            // Setting the contentData equal to the next level of the encapsulationData array
            // i.e. to keep drilling down into the contentData object
            contentData = contentData[encapsulationData[i]];
        } else {
            req.feedsErrors.push("'" + encapsulationData.join("/") + "' does not exist.");
            return next(new Error()); 
        }

        if(structureData != null){
            // Ignoring index values, as these will have no relevance to the project structure
            if(isNaN(encapsulationData[i])){
                if(structureData.items != undefined){
                    structureData = structureData.items;
                }
                
                if(structureData.attributes != undefined){
                    structureData = structureData.attributes;
                }

                if(structureData[encapsulationData[i]] != undefined){
                    structureData = structureData[encapsulationData[i]];
                }
            } else {
                if(structureData.items != undefined){
                    structureData = structureData.items;
                } else {
                    req.feedsErrors.push(encapsulationData[i] + " is not defined to contain items. Please create this items structure first.");
                    return next(new Error()); 
                }
            }
        }
        
    }

    // Checking if admin data has been read from the projects admin.json file
    if(structureData != null){
        // Adding the value of the collections project structure property of the project admin file, 
        // as the structure property on the responseObject.
        req.responseObject.structure = structureData;

        // Adding the content of the project (as returned from the content.json file) as 
        // a property on the response object, as the response will contain both the content
        // and the structure
        req.responseObject.content = contentData;
    } else {
        // Setting the collection content of the project as the response object, as no structure 
        // will be returned alongside the content
        req.responseObject = contentData;
    }
            
    // Sending the response object back in the response (which may contain the project structure,
    // project content and possibly some errors)
    res.send(req.responseObject);
});

// Exporting the router that was set up in this file, so that it can be included
// in the feeds.js route and specified as the route for all get requests to read
// elements from a project
module.exports = router;