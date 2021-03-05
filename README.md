# Boilerplate Wordpress Theme

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

- MySql
```
Port: 3306
User: wordpress
Password: wordpress
Database: wordpress
```

# Docker 
## Start server
On root folder
```
docker-compose up -d
```
## Stop server
On root folder
```
docker-compose down
```

## Rebuild docker
```
docker-compose up -d --build
```

## Remove all docker files
```
docker-composer down -v --rmi local
```

# Start working on theme
1. enter in the theme directory
2. install composer dependencies -> composer install
3. install nodejs dependencies -> npm i

# How to compile js and css files
- npm run dev -> for development
- npm run build -> for build prod files
