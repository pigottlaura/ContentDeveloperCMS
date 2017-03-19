define({ "api": [
  {
    "type": "post",
    "url": "/feeds/:projectID?action=accessLevels",
    "title": "Create a new access level",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_level_name",
            "description": "<p>Name for the new access level</p>"
          }
        ]
      }
    },
    "name": "CreateAccessLevel",
    "group": "AccessLevels",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "AccessLevels"
  },
  {
    "type": "delete",
    "url": "/feeds/:projectID?action=accessLevels",
    "title": "Delete access level",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "access_level_int",
            "description": "<p>Number of the access level to be deleted</p>"
          }
        ]
      }
    },
    "name": "DeleteAccessLevel",
    "group": "AccessLevels",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "AccessLevels"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID?action=accessLevels",
    "title": "Get project access levels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          }
        ]
      }
    },
    "name": "GetAccessLevels",
    "group": "AccessLevels",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "AccessLevels"
  },
  {
    "type": "put",
    "url": "/feeds/:projectID?action=accessLevels",
    "title": "Update access level name",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "access_level_int",
            "description": "<p>Number of the access level to be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_level_name",
            "description": "<p>New name for the access level</p>"
          }
        ]
      }
    },
    "name": "UpdateAccessLevelName",
    "group": "AccessLevels",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "AccessLevels"
  },
  {
    "type": "post",
    "url": "/feeds/:projectID?action=collaborators",
    "title": "Add a collaborator to a project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of the collaborator to be added</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "accessLevelInt",
            "description": "<p>Requested access level</p>"
          }
        ]
      }
    },
    "name": "AddCollaborator",
    "group": "Collaborators",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "Collaborators"
  },
  {
    "type": "delete",
    "url": "/feeds/:projectID?action=collaborators",
    "title": "Remove a collaborator from a project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "collaboratorID",
            "description": "<p>ID of the collaborator to be removed</p>"
          }
        ]
      }
    },
    "name": "DeleteCollaborator",
    "group": "Collaborators",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "Collaborators"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID?action=collaborators",
    "title": "Get all collaborators for a project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          }
        ]
      }
    },
    "name": "GetCollaborators",
    "group": "Collaborators",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "Collaborators"
  },
  {
    "type": "get",
    "url": "/feeds?action=collaborators",
    "title": "Get projects that current user is a collaborator on",
    "name": "GetUserProjects",
    "group": "Collaborators",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "Collaborators"
  },
  {
    "type": "put",
    "url": "/feeds/:projectID?action=collaborators",
    "title": "Update a collaborators access level to a project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "collaboratorID",
            "description": "<p>User id of the collaborator to be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "accessLevelInt",
            "description": "<p>Requested access level</p>"
          }
        ]
      }
    },
    "name": "UpdateCollaborator",
    "group": "Collaborators",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "Collaborators"
  },
  {
    "type": "post",
    "url": "/feeds/:projectID?action=css",
    "title": "Create/append to custom css",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "custom_css",
            "description": "<p>Custom css rules to be added</p>"
          }
        ]
      }
    },
    "name": "CreateAppendCustomCss",
    "group": "CustomCSS",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "CustomCSS"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID?action=css",
    "title": "Get custom css",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          }
        ]
      }
    },
    "name": "ReadCustomCss",
    "group": "CustomCSS",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "CustomCSS"
  },
  {
    "type": "put",
    "url": "/feeds/:projectID?action=css",
    "title": "Update custom content css",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "custom_css",
            "description": "<p>Custom css rules to be added</p>"
          }
        ]
      }
    },
    "name": "UpdateCustomCss",
    "group": "CustomCSS",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "CustomCSS"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID?action=mediaItems",
    "title": "Get all media items for a project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          }
        ]
      }
    },
    "name": "GetMediaItems",
    "group": "MediaItems",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "MediaItems"
  },
  {
    "type": "post",
    "url": "/feeds/:projectID?action=mediaItems",
    "title": "Upload a media item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "file",
            "description": "<p>Media item file to be uploaded</p>"
          }
        ]
      }
    },
    "name": "UploadMediaItem",
    "group": "MediaItems",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "MediaItems"
  },
  {
    "type": "post",
    "url": "/feeds/:projectID/:itemPath",
    "title": "Create a new content item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":itemPath",
            "description": "<p>Encapsulation path to item within the project</p>"
          },
          {
            "group": "Parameter",
            "type": "any",
            "optional": false,
            "field": "content",
            "description": "<p>Content to be added to the project (datatype depends on project structure)</p>"
          }
        ]
      }
    },
    "name": "CreateItemContent",
    "group": "ProjectContent",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-create.js",
    "groupTitle": "ProjectContent"
  },
  {
    "type": "delete",
    "url": "/feeds/:projectID/:itemPath",
    "title": "Delete a content item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":itemPath",
            "description": "<p>Encapsulation path to item within the project</p>"
          }
        ]
      }
    },
    "name": "DeleteContent",
    "group": "ProjectContent",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-delete.js",
    "groupTitle": "ProjectContent"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID/:itemPath",
    "title": "Get an items content",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":itemPath",
            "description": "<p>Encapsulation path to item within the project</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"structure\"",
              "\"content\""
            ],
            "optional": true,
            "field": "include",
            "description": "<p>To include the structure and content of the item</p>"
          }
        ]
      }
    },
    "name": "GetItemContent",
    "group": "ProjectContent",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-read.js",
    "groupTitle": "ProjectContent"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID",
    "title": "Get entire project content",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"structure\"",
              "\"content\"",
              "\"history\""
            ],
            "optional": true,
            "field": "include",
            "description": "<p>To include the structure, content and commit history of the project</p>"
          }
        ]
      }
    },
    "name": "GetProjectContent",
    "group": "ProjectContent",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-read.js",
    "groupTitle": "ProjectContent"
  },
  {
    "type": "put",
    "url": "/feeds/:projectID/:itemPath",
    "title": "Update encapsulated project content",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":itemPath",
            "description": "<p>Encapsulation path to item within the project</p>"
          },
          {
            "group": "Parameter",
            "type": "any",
            "optional": false,
            "field": "content",
            "description": "<p>Content to be added to the project (datatype depends on project structure)</p>"
          }
        ]
      }
    },
    "name": "UpdateEncapsulatedContent",
    "group": "ProjectContent",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-update.js",
    "groupTitle": "ProjectContent"
  },
  {
    "type": "put",
    "url": "/feeds/:projectID",
    "title": "Update entire project content",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "any",
            "optional": false,
            "field": "content",
            "description": "<p>Content to be added to the project (datatype depends on project structure)</p>"
          }
        ]
      }
    },
    "name": "UpdateProjectContent",
    "group": "ProjectContent",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-update.js",
    "groupTitle": "ProjectContent"
  },
  {
    "type": "post",
    "url": "/feeds?action=createProject",
    "title": "Create a new project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "project_name",
            "description": "<p>Name for the new proejct</p>"
          }
        ]
      }
    },
    "name": "CreateProject",
    "group": "ProjectDetails",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "ProjectDetails"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID?action=cache",
    "title": "Get maximum cache age",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          }
        ]
      }
    },
    "name": "GetCacheAge",
    "group": "ProjectDetails",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "ProjectDetails"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID?action=projectName",
    "title": "Get projects name",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          }
        ]
      }
    },
    "name": "GetProjectName",
    "group": "ProjectDetails",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "ProjectDetails"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID?allSettings",
    "title": "Get all settings for a project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          }
        ]
      }
    },
    "name": "GetProjectSettings",
    "group": "ProjectDetails",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "ProjectDetails"
  },
  {
    "type": "put",
    "url": "/feeds/:projectID?action=cache",
    "title": "Update maximum cache age",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "max_cache_age",
            "description": "<p>Time in milliseconds</p>"
          }
        ]
      }
    },
    "name": "UpdateCacheAge",
    "group": "ProjectDetails",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "ProjectDetails"
  },
  {
    "type": "put",
    "url": "/feeds/:projectID?action=projectName",
    "title": "Update projects name",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "project_name",
            "description": "<p>New name for the project</p>"
          }
        ]
      }
    },
    "name": "UpdateProjectName",
    "group": "ProjectDetails",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "ProjectDetails"
  },
  {
    "type": "put",
    "url": "/feeds/:projectID?allSettings",
    "title": "Update all settings for a project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "project_name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": true,
            "field": "max_cache_age",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "custom_css",
            "description": ""
          }
        ]
      }
    },
    "name": "UpdateProjectSettings",
    "group": "ProjectDetails",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "ProjectDetails"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID?include=history",
    "title": "Get commit history of project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"structure\"",
              "\"content\"",
              "\"history\""
            ],
            "optional": true,
            "field": "include",
            "description": "<p>To include the structure, content and commit history of the project</p>"
          }
        ]
      }
    },
    "name": "GetProjectCommitHistory",
    "group": "ProjectHistory",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-read.js",
    "groupTitle": "ProjectHistory"
  },
  {
    "type": "post",
    "url": "/feeds/:projectID?action=previewCommit&historyOf=structure&commitHash=***",
    "title": "Preview contents of a file at a specific commit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"structure\"",
              "\"content\""
            ],
            "optional": false,
            "field": "historyOf",
            "description": "<p>To get the contents for the history of the content or structure</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "commitHash",
            "description": "<p>The hash of the commit to be accessed</p>"
          }
        ]
      }
    },
    "name": "PreviewCommit",
    "group": "ProjectHistory",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-actions.js",
    "groupTitle": "ProjectHistory"
  },
  {
    "type": "post",
    "url": "/feeds/:projectID/:itemPath",
    "title": "Create a new item structure",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":itemPath",
            "description": "<p>Encapsulation path to item within the project</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "structure",
            "description": "<p>JSON to be added to to the projects structure</p>"
          }
        ]
      }
    },
    "name": "CreateItemStructure",
    "group": "ProjectStructure",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-create.js",
    "groupTitle": "ProjectStructure"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID/:itemPath?include=structure",
    "title": "Get an items structure",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":itemPath",
            "description": "<p>Encapsulation path to item within the project</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"structure\"",
              "\"content\""
            ],
            "optional": true,
            "field": "include",
            "description": "<p>To include the structure and content of the item</p>"
          }
        ]
      }
    },
    "name": "GetItemStructure",
    "group": "ProjectStructure",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-read.js",
    "groupTitle": "ProjectStructure"
  },
  {
    "type": "get",
    "url": "/feeds/:projectID?include=structure,content,history",
    "title": "Get entire project structure",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"structure\"",
              "\"content\"",
              "\"history\""
            ],
            "optional": true,
            "field": "include",
            "description": "<p>To include the structure, content and commit history of the project</p>"
          }
        ]
      }
    },
    "name": "GetProjectStructure",
    "group": "ProjectStructure",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-read.js",
    "groupTitle": "ProjectStructure"
  },
  {
    "type": "put",
    "url": "/feeds/:projectID",
    "title": "Update entire project structure",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": ":projectID",
            "description": "<p>Projects unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "structure",
            "description": "<p>JSON to update the projects structure</p>"
          }
        ]
      }
    },
    "name": "UpdateProjectStructure",
    "group": "ProjectStructure",
    "version": "0.0.0",
    "filename": "routes/components/feeds/feeds-update.js",
    "groupTitle": "ProjectStructure"
  }
] });
