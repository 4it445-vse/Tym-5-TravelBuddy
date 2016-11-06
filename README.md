# TravelBuddy

## Table of contents

1. [Setup Local Development](#setup-local-development)
2. [GitFlow](#gitflow)
3. [Development Guidelines](#development-guidelines)

## Setup Local Development

### Requirements

1. some GIT tool (SourceTree)
2. local MySQL server (it is part of XAMPP for example which is easy to use and has built-in phpmyadmin)
3. Installed NodeJS and NPM

### Setup

1. clone repository
2. run `npm install` in both directories `/frontend` and `/backend`
3. **starting local development**:

  3.1 frontend:
    - run `npm start` in frontend directory, it will create nodejs server on adress `localhost:3000` and livereload feature.

  3.2 backend:
    - create `.env` file based on `.env.example`. It is configuration for MySQL database connection. For example if you have MySQL server on localhost with root (default account) and no password it will look like this:

            DB_HOST=localhost
            DB_PORT=3306
            DB_DATABASE=TravelBuddy
            DB_USERNAME=root
            DB_PASS=

   - run `npm run watch-babel` in backend directory. It will create nodejs server on adress `localhost:3001` and automatically restart          server. Livereload doesn't work though.
   - you can access loopback on url `localhost:3001/explorer`

4. Switch into `dev` branch and create your feature branch. Happy hacking

## GitFlow

- Further Git Information - https://git-scm.com/docs/

### Naming Conventions

- use lower case for each feature branch naming
- use name of develeoping feature according to Trello user-stories

### Description

Gitflow defines 5 types of branches: Master (Production), Develop, Feature, Release, Hotfix

- We dont use Release and Hotfix branches

- Master Branch - Sprint Review branch
- Develop Branch - Branch from Master for development
- Features Branch - Branch from Develop for feature development eg. registration-server, registration-frontend

### Setup SourceTree repository with Gitflow
1. Download SourceTree - https://www.sourcetreeapp.com/
2. Install SourceTree
3. Create folder on your local disc eg. C:\GitRepository
4. Run SourceTree
5. Click Clone\New in the upper left corner insert - https://github.com/4it445-vse/Tym-5-TravelBuddy.git
6. Click on GitFlow button to initialize GitFlow for your local repository
7. Click on GitFlow again and create Development branch
8. Click on GitFlow again and select Start new Feature
9. Name your Feature branch
10. Develop your feature
11. Open SourceTree and see your changes. Go to FileStatus tab, Click StageAll or Stage selected files for your revision
12. Click Commit. Write some description. Your Revision is done.
13. You can click on GitFlow again when your feature is ready and click Finish Feature. This will merge your feature branch with Development branch.
13. You can Push to server or continue to Step 8

## Development Guidelines

### Vendor files

CSS files of third parties goes to `public/css` directory. Linking goes to `App.js` using `import`.
Example:

    import '../public/css/font-awesome.min.css';

Same applies to images, logos, graphics, medias and so on. Target directory is `public/assets`.
