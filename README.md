# Mugin
Loging into your web applicaions is dead simple, just use your mug.

## Usage
To get started, first create a user profile by choosing “Sign Up” from the landing page. Once on the signup page, complete the registration form by entering the required information. Upon successfull registration, allow access to the web camera and login to the application. If successful, a user profile view will render.  

## Install
	1. Start the virtual machine 
		1. $ vagrant up
	2. Dependencies
		1. $ bower install
	3. Deploy
		1. $ grunt deploy
	4. Open your favorite flavor of web browser and navigate to 192.168.22.10

## Features
	1. Image comparison 
	2. Image capture
	3. Access to image and data from local storage
	4. Custom applicaion routing 

## The “Black Box” demystified
Mugin is simple client-side web application that allows a user to login using a email address and image. It is constructed with CSS3, HTML5, and JavaScript.  

###Authentication
Mugin preforms two factor authentication using email addresses and images. The email addresses are analyzed by way of a case insensitive comparison. Images are analyzed for similarities and a difference score is computed. 

###Routing
Mugin is a single page application where each route is lazy loaded. The resources required get complied after the route is resolved.

### Support
At the time of building Mugin getusermedia is in early adption. Thus, support for core functionality of Mugin is spotty. Please make reference to [caniuse](http://caniuse.com/#feat=stream) for web browser support. 

##Packages
Several packages were used in the making of this JavaScript application. All are awesome because each is open source - go community!

###Bootstrap
Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web. More @ [Bootstrap](http://http://getbootstrap.com)

####Bower
Bower is a dependency management tool which handels fetching and installing packages. More @ [Bower](http://bower.io/)

###Cookies
A lightweight vanilla JavaScript plugin to set, get and remove cookies. More @ [Cookies](https://github.com/harrisonde/cookies)

###Grunt
The JavaScript task runner. More @ [Grunt](https://http://gruntjs.com/)

###Nginx
HTTP server to handel requests. More @ [Nginx](http://nginx.org/en)

###Resemble
Analyse and compare images with Javascript and HTML5. More @ [Resemble](https://github.com/Huddle/Resemble.js)

###Vagrant
Create and configure portable development environments. More @ (Vagrant)[https://www.vagrantup.com/]

###Vaprobash
Va​grant Pro​visioning Bash Scripts. More @ (Vaprobash)[http://fideloper.github.io/Vaprobash/index.html]

## Developer Notes
### Requriments	
	* [X] DOM element creation
	* [X] DOM traversal
	* [X] Capture and handling events
	* [X] Create and handling a data structure (JSON, custom objects, etc)
	* [X] From Validation
	* [X] Closures
	* [X] AJAX

### Development List Items
	* [X] Style register validatoin errors
	* [X] Add favicon to project root
	* [X] Basic CSS
	* [X] Handle if user trys to login without registering first
	* [ ] Firefox - user mug is not full size
	* [X] Login in with mug and email
	* [ ] Do not show login form if logged in (redirect to profile);
	* [X] Disable inputs on profile
	* [X] Pass mugin stats in url
	* [X] Read mugin stats from url into UI
	* [X] Display validaion errors on index when loggin
	* [ ] Validate email address when reg for mug
	* [ ] email address might need to be lowercase or save as lower case when reg for mug
	* [ ] Refactor message and waring for DRY code