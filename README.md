# Boilerplate Wordpress Theme

 ## In Progress ## 
 
  This is a boilerplate complete, i am trying split the html from php code and make code more organizable.
 This boilerplate uses:
 - Composer - to install dependencies of php
 - Webpack to build scss and javascript
 - Gulp to build final .zip file
 - The code is organized by components and pages
 - Uses the parent theme twentynineteen
 - Reset some features of parent theme
 
Some feature for this boilerplate just send a Pull request or a comment.

# Requirements

 - [Nodejs](https://nodejs.org/en/download/)
-  [PHP](http://php.net/)
-  [DOCKER](https://docs.docker.com/)

# Install composer in bin folder
```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

## Check the .env file to see the ports of applications

### This is an example of .env file
### Example
```
WEBPACK_DEV_SERVER_PORT=3000
PHP_MY_ADMIN_PORT=8090
WORDPRESS_PORT=8089
MYSQL_PORT=3306

MY_SQL_ROOT_PASSWORD=password
MY_SQL_DATABASE=wordpress
MYSQL_USER=wordpress
MYSQL_PASSWORD=wordpress
```


## Login system
- phpMyAdmin
```
http://localhost:8090
User: root
Password: password
```

- MySql
```
Port: 3306
User: wordpress
Password: wordpress
Database: wordpress
```

- Webpack server
```
Port: 3000
```

- WordPress server
```
Port: 8089
```

## Structure

### Main Folder
 ```
.
+-- Dockerfile-wordpress   -> Wordpress script file to install xdebug and mail system
+-- docker-compose.yml     -> Docker Compose file to start apache, mysql server
+-- root                   -> root folder with all WordPress files
+-- wp-content             -> wp_content from WordPress
|   +-- themes             -> Folder with all themes
|   	+-- boilderplate-theme -> Root theme Folder
```


### Theme Folder

 ```
.
+-- boilderplate-theme      -> Root Theme Folder
|	+-- assets              -> Assets Folder
|		+-- JS              -> JS Folder
|		+-- SCSS            -> SCSS Folder
|   +-- APP                 -> Folder to php code to include in Setup.php
|       +-- Modules         -> Php files separated by features
|       +-- Reset           -> Reset parent theme unused features
|       +-- Setup           -> Folder with Setup theme (Call modules files)
|   +-- templates           -> Folder with twig templates
|       +-- components      -> Folder with components twig
|       +-- pages           -> Folder with page .twig
|   	+-- *.twig
|   +-- .editorconfig       -> Used for IDE / Text Editor
|   +-- .jshintrc           -> configurations for jsHint (javascript linter)
|   +-- .stylelintrc        -> configurations for stylelint of SCSS files
|   +-- composer.json       -> Composer dependecies
|   +-- gulpfile.js         -> Gulp automation tool configuration file
|   +-- package.json        -> NPM dependencies
```

### Install Dependencies Inside theme folder

 1. Open terminal
 2. Execute command  `cd ./wp-content/themes/boilerplate-theme`
 3. Execute command `npm install`
 4. Execute command `./composer install`

### How to Run project

This project does't need an apache/mysql configuration, it can run it docker file.

#### Start server mysql / apache / phpmyadmin

 1. Install Docker
 ```
 Run server -> docker-compose up -d
 Stop server -> docker-compose down
```

2. Run Project with BrowserSync
 ```
  Open terminal
  Execute command  `cd ./wp-content/themes/boilerplate-theme`
  Execute command  `gulp dev`
```

### WP-CLi

 1. Backup database to 'root' folder
 ```
    docker-compose run wp-cli wp db export backup.sql
 ```
 
 2. Recover database from sql file
 ```
    docker-compose run wp-cli wp db import backup.sql
 ```

### Gulp tasks

 ```
 - gulp dev -> Run wordpresss theme in browser theme for dev
 - gulp build --production -> Build theme for prod
 - gulp build:scss -> Build scss to style.css
 - gulp build:theme -> Create a .zip with all files ready for production
```

### Lint tests

 ```
 - npm run lint:js -> Run JS Lint test
 - npm run lint:scss  -> Run lint for scss
```

### Thirdy part Library

-  [Timber](https://timber.github.io/docs/)


