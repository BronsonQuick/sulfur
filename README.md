Sulfuric
======

Media manager written for Chassis [Chassis](https://github.com/Chassis/Chassis) &amp; WP-API [WP-API](https://github.com/WP-API/WP-API).

Sulfuric *tries* to display all files uploaded to the your Chassis install and *tries* allows you to upload new ones.

### Requirements

Sulfuric is a fork of [sulfur](https://github.com/Automattic/sulfur) and it's a standalone web application that sends requests to WP-API [WP-API](https://github.com/WP-API/WP-API)

### Installation

1. Install [Vagrant](http://vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/).
2. Clone [Chassis](https://github.com/Chassis/Chassis):

   ```bash
   git clone --recursive git@github.com:Chassis/Chassis.git sulfuric
   vagrant plugin install vagrant-hostsupdater
   ```

3. Grab a copy of WP API:

   ```bash
   cd sulfuric
   mkdir -p content/plugins content/themes
   cp -r wp/wp-content/themes/* content/themes
   git clone git@github.com:WP-API/WP-API.git content/plugins/json-rest-api
   git clone git@github.com:WP-API/Basic-Auth.git content/plugins/basic-auth
   ```

4. Grab a copy of Sulfuric
	```
	git clone git@github.com:BronsonQuick/sulfur.git sulfuric
	```

5. Start the virtual machine:

   ```bash
   vagrant up
   ```

6. Activate both WP-API plugins and change the permalinks
	```
	vagrant ssh
	cd /vagrant/wp
	wp plugin activate json-rest-api
	wp plugin activate basic-auth
	wp rewrite structure '/%year%/%monthnum%/%postname%'
	```

7. Browse to http://vagrant.local/sulfuric/index.html
