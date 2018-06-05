# [Curriculum Vitae from Adrian Jost](https://adrianjost.hackedit.de)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://forthebadge.com)

# setup
## install dependencies
you need to install gulp and then all the dependencies 
 > npm install

## Database config
create the file `src/backend/config.php` with your SQL database credentials
```php
<?php
/*
// mysql_connect("database-host", "username", "password")
$conn = mysql_connect("localhost","root","root") 
			or die("cannot connected");

// mysql_select_db("database-name", "connection-link-identifier")
@mysql_select_db("test",$conn);
*/

/**
 * mysql_connect is deprecated
 * using mysqli_connect instead
 */

$databaseHost = '******';
$databaseName = '******';
$databaseUsername = '******';
$databasePassword = '******';

$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName); 
 
?>
```
## secure your backend
Create an `.htpasswd` file for your backend `src/backend/.htpasswd`.
You could use an tool like [this](https://www.htaccessredirect.net/htpasswd-generator).

## autodeploy via sFTP
to deploy with a single command to your sFTP Server, you need to create the file `.ftppass`
```
{
    rootUser: {
        user: '******',
        pass: '******'
    }
}
```
You also need to update the root deployment folder at the `gulpfile.js`.
Just search for: `remotePath` there and you will find it.

More detailed instructions can be found [here](https://www.npmjs.com/package/gulp-sftp#authentication).

# development
run 
 > `gulp watch` or `npm run watch` 

to compile all the scss files. Everything else is up to you 🤗

# deployment
If you set up everything correctly you can auto deploy it by running
 > npm run deploy

Or if you wan't deploy manually, run
 > npm run build

and copy everything from `./build` to your host.

Of course your webserver need to support PHP (7). Maybe you also need to update the `.htaccess` at the `src` and or `src/backend` folder.

# Credits
The frontend is completly written by me, but I was to lazy for the backend so I started with a basic php CRUD application from [this blogpost](http://blog.chapagain.com.np/very-simple-add-edit-delete-view-in-php-mysql/).