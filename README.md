# Bug Tracker
This's a project that support nodejs for a bug tracker API.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Contact](#contact)

## General info
The project only support format JSON file


## Technologies
* body-parser - version 1.19.0
* mongodb - version 3.6.2
* bcrypt - version 5.0.0
* nodemailer - version 6.4.16
* express - version 4.17.1

## Setup
* Setup a Heroku and MongoDB
* Create your ENV variables: MONGO_URI, EMAIL and PASSWORD 
* The variables should be set in your environment

### Installation
$ git clone git@github.com:NayaraCReis/cbwa-ca-project.git
$ npm install

Link demo
https://cbwa-ca-project.herokuapp.com

## Features
List of features ready and TODOs for future development
* Add users, projects, issues and comments
* retrieving all and individual list elements

*GET METHODS:*
Get all users
/users

Get a user by email 
/users/:email

Get all projects 
/projects

Get a single project 
/projects/:slug

Get all issues 
/issues

Get a issue by issueNumber 
/issues/:slug

Get all issues for a project 
/projects/:slug/issues


Get a single comment 
/issues/:issueNumber/comments/:commentId

Get all comments for an issue 
/issues/:issueNumber/comments

*POST METHODS:*
Add a user 
/users

Add a comment 
/issues/:issueNumber/comments

Add a project 
/projects

Add a issue for a project 
/projects/:slugName/issues


## Status
Project is: _in progress_,


## Contact
Created by [NayaraCReis]