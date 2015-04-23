# Mugin
Mugin makes loging into your web applicaions dead simple, just use your mug.

## Automagic Install
	1. Open Terminal and cd the mugin directory
	2. Start the virtual machine 
		1. $ vagrant up
	3. Dependencies
		1. $ bower install
	4. Deploy
		1. $ grunt deploy
	5. Open your favorite flavor of web browser and navigate to 10.0.0.10

## Features
	*Capture image from webcam using [WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC)
	*Access to image(s) and data from [local storage object](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
	*Custom router to analyze resource request, make XMLHttpRequest [AJAX](http://www.w3schools.com/ajax/default.asp), and parse HTML markup.

### Requriments	
	* [X] DOM element creation
	* [X] DOM traversal
	* [X] Capture and handling events
	* [X] Create and handling a data structure (JSON, custom objects, etc)
	* [X] From Validation
	* [X] Closures
	* [X] AJAX

## Development List Items
	* [X] Style register validatoin errors
	* [X] Add favicon to project root
	* [X] Login in with mug and email
	* [ ] Do not show login form if logged in (redirect to profile);
	* [X] Disable inputs on profile
	* [X] Pass mugin stats in url
	* [X] Read mugin stats from url into UI
	* [X] Display validaion errors on index when loggin
	* [ ] Remove CTRL after eval
	* [ ] Refactor message and waring for DRY code

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
